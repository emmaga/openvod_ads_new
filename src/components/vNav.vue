<template>
  <el-menu :default-active="navActive" class="el-menu-vertical-demo" @open="" @close="" theme="">
    <el-menu-item class="Txt-left" index="1" @click="jumpToAdsBoard">广告投放</el-menu-item>
    <el-menu-item class="Txt-left" index="2" @click="jumpToAdsMaterial">广告素材</el-menu-item>
    <el-menu-item class="Txt-left" index="3" @click="jumpToMenuAdv">菜单广告位</el-menu-item>
    <el-menu-item class="Txt-left" index="4" @click="jumpToMenuAdsMaterial">菜单广告位素材</el-menu-item>
    <el-menu-item class="Txt-left" index="5" @click="jumpToUserManage" v-if="role === 'Admin'">用户管理</el-menu-item>
  </el-menu>
</template>

<script>
  import router from '../router'
  export default {
    data () {
      return {
//        navActive: '4'
      }
    },
    computed: {
      navActive () {
        if (router.currentRoute.fullPath === '/main/adsBoard') {
          return '1'
        } else if (router.currentRoute.fullPath === '/main/adsMaterial') {
          return '2'
        } else if (router.currentRoute.fullPath === '/main/menuAdv') {
          return '3'
        } else if (router.currentRoute.fullPath === '/main/menuAdsMaterial') {
          return '4'
        } else if (router.currentRoute.fullPath === '/main/userManage') {
          return '5'
        } else {
          return '1'
        }
      },
      role: function () {
        return this.$store.state.role
      }
    },
    methods: {
      jumpToAdsBoard: function () {
//        this.navActive = '1'
        this.$router.push('/main/adsBoard')
      },
      jumpToAdsMaterial: function () {
//        this.navActive = '2'
        this.$router.push('/main/adsMaterial')
      },
      jumpToMenuAdv: function () {
//        this.navActive = '3'
        this.$router.push('/main/menuAdv')
      },
      jumpToMenuAdsMaterial: function () {
//        this.navActive = '4'
        this.$router.push('/main/menuAdsMaterial')
      },
      jumpToUserManage: function () {
//        this.navActive = '5'
        this.$router.push('/main/userManage')
      }
    },
    created () {
      this.$store.commit('getUserRole')
    }
  }
</script>

<style lang="css" scoped>
</style>
