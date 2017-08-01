<template>
  <div id="editAdvPositonModal" v-show="editData.show">
    <div class="editAdvPositonModal_content">
      <div class="FS20 mar-bottom15">广告位属性
        <button class="btn" style="float: right" @click="closeeditAdv">&times;</button>
      </div>
      <div style="width: 90%;">
        <el-form :model="editData.data" :rules="rules2" ref="editAdvData" label-width="35%" class="demo-ruleForm">
          <el-form-item label="广告标识" prop="AdvPositionTemplateName" width="100%">
            <el-select v-model="editData.data.AdvPositionTemplateName" placeholder="请选择">
              <el-option
                v-for="item in editData.templateList"
                :key="item.AdvPositionTemplateName"
                :label="item.AdvPositionTemplateDesc"
                :value="item.AdvPositionTemplateName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名字" required prop="Name">
            <el-input type="text" v-model="editData.data.Name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" required prop="Description">
            <el-input type="text" v-model="editData.data.Description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告策略参数" prop="ScheduleTypeParam">
            <el-input type="text" v-model="editData.data.ScheduleTypeParam" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告策略类型" prop="ScheduleType">
            <el-input type="text" v-model="editData.data.ScheduleType" auto-complete="off"></el-input>
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
        <!--<button class="btn btn-success" id="editSceneBtn" @click="submitForm('editData.data')">修改属性</button>-->
        <!--<button class="btn MarginLeft20 btn-warning" @click="closeeditAdv">取消</button>-->
        <el-button type="primary" @click="submitForm('editAdvData')">修改属性</el-button>
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
      var Description = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入描述'))
        } else {
          callback()
        }
      }
      var AdvPositionTemplateName = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请选择模版'))
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
        rules2: {
          AdvPositionTemplateName: [
            {validator: AdvPositionTemplateName, trigger: 'blur'}
          ],
          Name: [
            {validator: Name, trigger: 'blur'}
          ],
          Description: [
            {validator: Description, trigger: 'blur'}
          ],
          LifeStartTime: [
            {validator: LifeStartTime, trigger: 'blur'}
          ],
          LifeEndTime: [
            {validator: LifeEndTime, trigger: 'blur'}
          ]
        }
      }
    },
    props: ['editData'],
    methods: {
      closeeditAdv () {
        this.$refs['editAdvData'].resetFields()
        this.$emit('close', false)
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            alert('修改密码成功!')
            if (moment(new Date(this.editData.data.LifeEndTime)).format('YYYY-MM-DD h:mm:ss') < moment(new Date(this.editData.data.LifeStartTime)).format('YYYY-MM-DD h:mm:ss')) {
              this.$message({
                type: 'error',
                message: '广告结束时间不能早于开始时间!'
              })
              return
            }
//            console.log(this.editAdvData)
            this.editData.data.LifeStartTime = moment(new Date(this.editData.data.LifeStartTime)).format('YYYY-MM-DD h:mm:ss')
            this.editData.data.LifeEndTime = moment(new Date(this.editData.data.LifeEndTime)).format('YYYY-MM-DD h:mm:ss')
            this.axios.post('/position', {
              action: 'edit',
              data: this.editData.data
            })
              .then((data) => {
                console.log(data)
                console.log(data.data.rescode)
                if (!data) return
                if (data.data.rescode === '200') {
                  this.$message({
                    type: 'success',
                    message: '广告位修改成功!'
                  })
                  this.closeeditAdv()
                }
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
//            this.$message({
//              type: 'error',
//              message: '填写数据有误，请检查!!'
//            })
            return false
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>

  #editAdvPositonModal {
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

  #editAdvPositonModal table {
    margin: auto;
    width: 90%;
  }

  #editAdvPositonModal table tr > td {
    padding: 10px;
  }

  #editAdvPositonModal table tr > td:nth-child(2) {
    /*margin: auto;*/
    /*width: 55%;*/
  }

  .editAdvPositonModal_content {
    position: relative;
    padding: 20px;
    width: 50%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }

  .editAdvPositonModal_content tr {
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
</style>
