<template>
  <div id="editAdvModal" v-show="editData.show">
    <div class="editAdvModal_content">
      <div class="FS20 mar-bottom15">广告素材属性

        <button class="btn" style="float: right" @click="closeeditAdv">&times;</button>
      </div>
      <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
      <div style="width: 90%;">
        <el-form :model="editData.data" :rules="rules2" ref="editData" label-width="35%" class="demo-ruleForm">
          <el-form-item label="名字" required prop="Name">
            <el-input type="text" placeholder="请输入名字" v-model="editData.data.Name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="时长(秒)" required prop="Duration">
            <el-input type="number" placeholder="请输入时长" v-model="editData.data.Duration" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" required prop="Description">
            <el-input type="text" placeholder="请输入描述" v-model="editData.data.Description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告主" required prop="Owner">
            <el-input type="text" placeholder="请输入广告主名称" v-model="editData.data.Owner" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="上传素材" required prop="LifeStartTime">
            <div class="block Txt-left">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="http://mres.cleartv.cn/upload"
                accept='.mp4,.jpg,.png'
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :on-change="change"
                :file-list="fileList"
                :disabled="selectFileBtn"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png/mp4文件</div>
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label="广告开始时间" required prop="LifeStartTime">
            <div class="block">
              <el-date-picker
                v-model="editData.data.LifeStartTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="广告结束时间" required prop="LifeEndTime">
            <div class="block">
              <el-date-picker
                v-model="editData.data.LifeEndTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="TxtRight">
        <!--<button class="btn btn-success" id="editSceneBtn" @click="submitForm('editData.data')">添加</button>-->
        <!--<button class="btn MarginLeft20 btn-warning" @click="closeeditAdv">取消</button>-->
        <el-button type="primary" @click="submitForm('editData.data')">修改</el-button>
        <el-button class="MarginLeft20" @click="closeeditAdv">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    data () {
      var Name = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入名字'))
        } else {
          callback()
        }
      }
      var Duration = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入时长'))
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
        oldURL: this.editData.URL,
        rules2: {
          Name: [
            {validator: Name, trigger: 'blur'}
          ],
          Duration: [
            {validator: Duration, trigger: 'blur'}
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
        fileStatus: null
      }
    },
    computed: {
    },
    props: ['editData'],
    methods: {
      closeeditAdv () {
        this.$refs.upload.clearFiles()
        this.$refs['editData'].resetFields()
        this.clearInputValue()
        this.selectFileBtn = false
        this.$emit('close', false)
      },
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleRemove (file, fileList) {
        this.fileStatus = null
        this.fileList = []
        this.$refs.upload.clearFiles()
        this.successFile = null
        this.selectFileBtn = fileList.length === 1
        this.clearInputValue()
      },
      handlePreview (file) {
      },
      clearInputValue () {
        let that = this.$refs.upload.$el
        that.children[0].children[1].value = null
      },
      uploadSuccess (response) {
        console.log(response)
        var tempFile = {}
        tempFile.size = response.size
        tempFile.URL = response.upload_path
        this.successFile = tempFile
      },
      change (file, fileList) {
        this.fileStatus = file.status
        this.selectFileBtn = fileList.length === 1
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!(this.fileStatus === null || this.fileStatus === 'success')) {
              this.$message({
                type: 'error',
                message: '请上传素材!'
              })
              return
            }
            if (this.successFile) {
              this.editData.data.URL = this.successFile.URL
              this.editData.data.Size = this.successFile.size
            }

            this.editData.data.LifeStartTime = moment(new Date(this.editData.data.LifeStartTime)).format('YYYY-MM-DD h:mm:ss')
            this.editData.data.LifeEndTime = moment(new Date(this.editData.data.LifeEndTime)).format('YYYY-MM-DD h:mm:ss')
            console.log(this.editData.data)
            this.axios.post('/adv', {
              action: 'edit',
              data: this.editData.data
            })
              .then((data) => {
//                console.log(data)
//                console.log(data.data.rescode)
                if (!data) return
                if (data.data.rescode === '200') {
                  this.$message({
                    type: 'success',
                    message: '广告素材属性修改成功!'
                  })
                  this.editData.data = {
                    LifeEndTime: '',
                    Name: '',
                    LifeStartTime: '',
                    Description: '',
                    Duration: '',
                    Owner: '',
                    URL: null,
                    Size: null
                  }
                  this.$refs.upload.clearFiles()
                  this.selectFileBtn = false
                  this.closeeditAdv()
                }
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>

  #editAdvModal {
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

  #editAdvModal table {
    margin: auto;
    width: 90%;
  }

  #editAdvModal table tr > td {
    padding: 10px;
  }

  #editAdvModal table tr > td:nth-child(2) {
  }

  .editAdvModal_content {
    position: relative;
    padding: 20px;
    width: 50%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }

  .editAdvModal_content tr {
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
