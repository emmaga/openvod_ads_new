<template>
  <!--添加菜单广告位弹窗-->
  <div class="editMenuAdvPositonModal" v-show="editMenuData.show">
    <div class="editMenuAdvPositonModal_content">
      <div class="FS20 mar-bottom15">广告位属性
        <button class="btn" style="float: right" @click="closeeditMenuAdv">&times;</button>
      </div>
      <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
      <div style="width: 90%;">
        <el-form :model="editMenuData.data" :rules="rules2" ref="editMenuData.data" label-width="35%" class="demo-ruleForm">
          <el-form-item label="名字" required prop="Name">
            <el-input type="text" v-model="editMenuData.data.Name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" required prop="Description">
            <el-input type="text" v-model="editMenuData.data.Description" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="Txt-right">
        <el-button type="primary" @click="submitForm('editMenuData.data')">添加</el-button>
        <el-button class="MarginLeft20" @click="closeeditMenuAdv">取消</el-button>
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
    props: ['editMenuData'],
    methods: {
      closeeditMenuAdv () {
        this.$emit('close', false)
      },
      submitForm (formName) {
        console.log()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/menuposition', {
              action: 'edit',
              data: this.editMenuData.data
            })
              .then((data) => {
                console.log(data)
                console.log(data.data.rescode)
                if (!data) return
                if (data.data.rescode === '200') {
                  this.$message({
                    type: 'success',
                    message: '广告位编辑成功!'
                  })
                  this.closeeditMenuAdv()
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

  .editMenuAdvPositonModal {
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
  .editMenuAdvPositonModal_content {
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
