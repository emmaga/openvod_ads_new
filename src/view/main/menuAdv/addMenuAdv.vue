<template>
  <!--添加菜单广告位弹窗-->
  <div class="addMenuAdvPositonModal" v-show="addMenuData.show">
    <div class="addMenuAdvPositonModal_content">
      <div class="FS20 mar-bottom15">添加广告位
        <button class="btn" style="float: right" @click="closeAddMenuAdv">&times;</button>
      </div>
      <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
      <div style="width: 90%;">
        <el-form :model="addMenuAdvData" :rules="rules2" ref="addMenuAdvData" label-width="35%" class="demo-ruleForm">
          <el-form-item label="名字" required prop="Name">
            <el-input type="text" v-model="addMenuAdvData.Name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" required prop="Description">
            <el-input type="text" v-model="addMenuAdvData.Description" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="TxtRight">
        <el-button type="primary" @click="submitForm('addMenuAdvData')">添加</el-button>
        <el-button class="MarginLeft20" @click="closeAddMenuAdv">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
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
      return {
        addMenuAdvData: {
          Name: '',
          Description: ''
        },
        rules2: {
          Name: [
            {validator: Name, trigger: 'blur'}
          ],
          Description: [
            {validator: Description, trigger: 'blur'}
          ]
        }
      }
    },
    props: ['addMenuData'],
    methods: {
      closeAddMenuAdv () {
        this.$emit('close', false)
        this.$refs['addMenuAdvData'].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/menuposition', {
              action: 'add',
              data: this.addMenuAdvData
            })
              .then((data) => {
                console.log(data)
                console.log(data.data.rescode)
                if (!data) return
                if (data.data.rescode === '200') {
                  this.$message({
                    type: 'success',
                    message: '广告位添加成功!'
                  })
                  this.closeAddMenuAdv()
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

  .addMenuAdvPositonModal {
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
  .addMenuAdvPositonModal_content {
    position: relative;
    padding: 20px;
    width: 50%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
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
