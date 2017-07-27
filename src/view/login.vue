<template>
  <div class="login_box">
    <div class=" login_header padL10px FS18">清鹤广告库管理后台</div>
    <form class="pad10px" @submit.prevent="Login">
      <div class=" TxtAlL blod" style="padding: 15px 0 10px;" check-type="required">账号</div>
      <input class="form-control" type="text" v-model="username" name="username" placeholder="请输入账号">
      <div class=" TxtAlL blod" style="padding: 15px 0 10px;">密码</div>
      <input class="form-control" type="password" v-model="passward" name="passward" placeholder="请输入密码">
      <button class="btn login_btn mar-y20 WID100" type="submit">登陆</button>
    </form>
  </div>
</template>

<script>
  import { md5, setUserInfo } from '@/static/js/Common'
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        passward: '',
        usercode: '',
        isLogin: false
      }
    },
    methods: {
      Login () {
        console.log(this.username + ':' + this.passward)
//        if (this.username === 'iiiiprince' && this.passward === '123456') {
//          alert(1)
//          this.$router.push('/main')
//        }

        this.axios.post('/logon', {
          username: this.username,
          password: md5()('' + this.passward)
        })
          .then((data) => {
//            console.log(data)
            if (!data) return
            setUserInfo('username', this.username)
            setUserInfo('token', data.data.token)
            setUserInfo('role', data.data.role)
            this.$store.commit('setUserName', this.username)
            this.$store.commit('setUserRole', data.data.role)
            this.$router.push('/main')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login_btn{
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }
  .login_btn:hover{
    background: #4db3ff;
    border-color: #4db3ff;
    color: #fff;
  }
  .blod {
    font-weight: bold;
  }

  .pad10px {
    padding-left: 15px;
    padding-right: 15px;
  }

  .login_box {
    width: 300px;
    /*padding: 30px;*/
    border: 1px solid lightgray;
    margin: 0 auto;
    margin-top: 100px;
  }

  .TxtAlL {
    text-align: left;
  }

  .login_header {
    padding: 10px 0;
    border-bottom: 1px solid lightgray;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
