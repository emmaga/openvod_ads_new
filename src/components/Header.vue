<template>
  <div style="overflow:hidden;background: #324157;;color: #fff;height: 60px;line-height: 60px;">
    <span style="font-size: 18px;float: left;margin-left: 20px;">广告库</span>
    <!--<button class="btn logout" style="float: right;margin-right:20px;margin-top: 13px;background: gray;color: #000;"-->
            <!--@click="logout">退出-->
    <!--</button>-->
    <el-button type="danger" style="float: right;margin-right:20px;margin-top: 13px;"
               @click="logout">退出</el-button>
    <!--<button class="btn logout" style="float: right;margin-right:20px;margin-top: 13px;background: gray;color: #000;"-->
            <!--@click="resetPwdShow = true">修改密码-->
    <!--</button>-->
    <el-button type="primary" style="float: right;margin-right:20px;margin-top: 13px;"
               @click="resetPwdShow = true">修改密码</el-button>
    <span style="float: right;margin-right:20px;">{{username}}, 您好</span>
    <div id="changePwd" v-show="resetPwdShow">
      <div id="changePwd-content">
        <div class="FS18">修改密码<button class="btn" style="position: absolute;top: 30px;right: 20px;" @click="resetForm('ruleForm2');resetPwdShow = false">&times;</button></div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码"  required prop="oldPwd">
            <el-input type="password" v-model="ruleForm2.oldPwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码"  required prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" required prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="Txt-right">
          <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
          <el-button class="MarginLeft20" @click="resetForm('ruleForm2');resetPwdShow = false">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { clearUserInfo, md5 } from '@/static/js/Common'
  export default {
    data () {
      var validatePass0 = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入旧密码'))
        } else {
          callback()
        }
      }
      var validatePass1 = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        resetPwdShow: false,
//        account: 'iiiiprince',
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldPwd: ''
        },
        rules2: {
          oldPwd: [
            {validator: validatePass0, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass1, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      logout: function () {
        clearUserInfo('token')
        clearUserInfo('account')
        this.$router.push('/login')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            alert('修改密码成功!')
            this.axios.post('/user', {
              action: 'changePassword',
              data: {
                OldPassword: md5()('' + this.ruleForm2.oldPwd),
                Password: md5()('' + this.ruleForm2.checkPass)
              }
            })
              .then((data) => {
                console.log(data)
                if (data.status === 200) {
                  this.$message({
                    type: 'success',
                    message: '修改密码成功!'
                  })
                  this.resetForm('ruleForm2')
                  this.resetPwdShow = false
                } else {
                  this.$message('！')
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
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    computed: {
      username: function () {
        return this.$store.state.username
      },
      role: function () {
        return this.$store.state.role
      }
    },
    created () {
      this.$store.commit('getUserName')
    }
  }
</script>

<style lang="css" scoped>
  .logout:hover {
    color: #fff !important;
  }

  #changePwd {
    /*display: none;*/
    background: rgba(0, 0, 0, 0.8);
    /*width: 100%;*/
    z-index: 2;
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
  }

  #changePwd-content {
    position: relative;
    padding: 20px;
    width: 45%;
    margin: 100px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }
</style>
