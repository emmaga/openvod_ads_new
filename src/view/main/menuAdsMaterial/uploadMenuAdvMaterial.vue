<template>
  <div id="addAdvModal" v-show="addData.show">
    <div class="addAdvModal_content">
      <div class="FS20 mar-bottom15">添加广告

        <button class="btn" style="float: right" @click="closeAddAdv">&times;</button>
      </div>
      <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
      <div style="width: 90%;">
        <el-form :model="addAdvData" :rules="rules2" ref="addAdvData" label-width="35%" class="demo-ruleForm">
          <el-form-item label="中文名称" required prop="name1">
            <el-input type="text" placeholder="请输入中文名称" v-model="addAdvData.Name['zh-CN']" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" required prop="name2">
            <el-input type="text" placeholder="请输入英文名称" v-model="addAdvData.Name['en-US']" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="广告主" required prop="Owner">
            <el-input type="text" placeholder="请输入广告主名称" v-model="addAdvData.Owner" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" required prop="Description">
            <el-input type="text" placeholder="请输入描述" v-model="addAdvData.Description" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="广告开始时间" required prop="LifeStartTime">
            <div class="block">
              <el-date-picker
                v-model="addAdvData.LifeStartTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="广告结束时间" required prop="LifeEndTime">
            <div class="block">
              <el-date-picker
                v-model="addAdvData.LifeEndTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item label="图标" required>
            <div class="block Txt-left pos-rel" >
              <el-upload
                class="avatar-uploader"
                action="http://mres.cleartv.cn/upload"
                accept='.jpg,.png'
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="addAdvData.PicURL" :src="addAdvData.PicURL" class="avatar">
                <i v-if="!addAdvData.PicURL" class="el-icon-plus avatar-uploader-icon"></i>

              </el-upload>
              <span class="pos-abs" style="top: 0px; left: 190px;">建议尺寸：110*110,不超过100K</span>
            </div>
          </el-form-item>

          <el-form-item label="高亮图标" required>
            <div class="block Txt-left pos-rel" >
              <el-upload
                class="avatar-uploader"
                action="http://mres.cleartv.cn/upload"
                accept='.jpg,.png'
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
                :before-upload="beforeAvatarUpload">
                <img v-if="addAdvData.HighlightPicURL" :src="addAdvData.HighlightPicURL" class="avatar">
                <i v-if="!addAdvData.HighlightPicURL" class="el-icon-plus avatar-uploader-icon"></i>

              </el-upload>
              <span class="pos-abs" style="top: 0px; left: 190px;">建议尺寸：110*110,不超过100K</span>
            </div>
          </el-form-item>

        </el-form>
      </div>
      <div class="TxtRight">
        <!--<button class="btn btn-success" id="editSceneBtn" @click="submitForm('addAdvData')">添加</button>-->
        <!--<button class="btn MarginLeft20 btn-warning" @click="closeAddAdv">取消</button>-->
        <el-button type="primary" @click="submitForm('addAdvData')">添加</el-button>
        <el-button class="MarginLeft20" @click="closeAddAdv('addAdvData')">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    data () {
      var name1 = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入中文名称'))
        } else {
          callback()
        }
      }
      var name2 = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入英文名称'))
        } else {
          callback()
        }
      }
      var Description = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入描述'))
        } else {
          callback()
        }
      }
      var Owner = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入广告主名称'))
        } else {
          callback()
        }
      }
      var LifeStartTime = (rule, value, callback) => {
//        console.log(value)
//        console.log(new Date(value).getTime())
//        console.log(moment(new Date(value)).format('YYYY-MM-DD h:mm:ss'))
        if (value === '') {
          callback(new Error('请选择广告开始时间'))
        } else {
          callback()
        }
      }
      var LifeEndTime = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请选择广告结束时间'))
        } else {
          callback()
        }
      }
      return {
        addAdvData: {
          Name: {
            'zh-CN': '',
            'en-US': ''
          },
          Owner: '',
          Description: '',
          LifeStartTime: '',
          LifeEndTime: '',
          PicURL: '',
          PicSize: '',
          HighlightPicURL: '',
          HighlightPicSize: ''
        },
        rules2: {
          name1: [
            {validator: name1, trigger: 'blur'}
          ],
          name2: [
            {validator: name2, trigger: 'blur'}
          ],
          Description: [
            {validator: Description, trigger: 'blur'}
          ],
          Owner: [
            {validator: Owner, trigger: 'blur'}
          ],
          LifeStartTime: [
            {validator: LifeStartTime, trigger: 'blur'}
          ],
          LifeEndTime: [
            {validator: LifeEndTime, trigger: 'blur'}
          ]
        },
        fileList: [],
        successFile: null,
        selectFileBtn: false,
        imageUrl: '',
        imageUrl_Highlight: ''
      }
    },
    props: ['addData'],
    methods: {
      closeAddAdv (formName) {
        this.$emit('close', false)
        this.$refs['addAdvData'].resetFields()
      },
      submitUpload () {
        this.$refs.upload.submit()
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.addAdvData.PicURL === '') {
              this.$message({
                type: 'error',
                message: '请上传图标!'
              })
              return
            }
            if (this.addAdvData.HighlightPicURL === '') {
              this.$message({
                type: 'error',
                message: '请上传高亮图标!'
              })
              return
            }
            this.addAdvData.LifeStartTime = moment(new Date(this.addAdvData.LifeStartTime)).format('YYYY-MM-DD h:mm:ss')
            this.addAdvData.LifeEndTime = moment(new Date(this.addAdvData.LifeEndTime)).format('YYYY-MM-DD h:mm:ss')
            console.log(this.addAdvData)
            this.axios.post('/menuadv', {
              action: 'add',
              data: this.addAdvData
            })
              .then((data) => {
                console.log(data)
                console.log(data.data.rescode)
                if (!data) return
                if (data.data.rescode === '200') {
                  this.$message({
                    type: 'success',
                    message: '广告添加成功!'
                  })
                  this.addAdvData.PicURL = ''
                  this.addAdvData.HighlightPicURL = ''
                  this.selectFileBtn = false
                  this.closeAddAdv()
                }
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            return false
          }
        })
      },
      handleAvatarSuccess (res, file) {
        this.$message({
          type: 'success',
          message: '图标上传成功!'
        })
//        this.imageUrl = URL.createObjectURL(file.raw)
        this.addAdvData.PicURL = file.response.upload_path
      },
      handleAvatarSuccess2 (res, file) {
        this.$message({
          type: 'success',
          message: '高亮图标上传成功!'
        })
        this.addAdvData.HighlightPicURL = file.response.upload_path
      },
      beforeAvatarUpload (file) {
        console.log(file.type)
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 0.1

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 100K!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style lang="css" scoped>

  #addAdvModal {
    /*display: none;*/
    background: rgba(0, 0, 0, 0.8);
    /*width: 100%;*/
    z-index: 667;
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
  }

  #addAdvModal table {
    margin: auto;
    width: 90%;
  }

  #addAdvModal table tr > td {
    padding: 10px;
  }

  #addAdvModal table tr > td:nth-child(2) {
  }

  .addAdvModal_content {
    position: relative;
    padding: 20px;
    width: 50%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }

  .addAdvModal_content tr {
    /*display: block;*/
    margin-top: 20px;
  }

  .WIDTH130 {
    min-width: 150px;
    width: 40%;
  }

  .TxtRight {
    text-align: right;
  }

  .MarginLeft20 {
    margin-left: 20px;
  }

  .Color_gray {
    color: #A5A5A5;
  }

  .el-date-editor.el-input {
    width: 100% !important;
  }

  .el-select {
    width: 100% !important;
  }
  .el-upload-list__item .el-icon-close{
    display: none!important;
  }

</style>

<style>

</style>
