<template>
  <div>
    <v-header></v-header>
    <div class="main-box">
      <v-nav class="main-nav" style="display: inline-block;width: 150px;vertical-align: top;"></v-nav><div class="main-content" style="display: inline-block;"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
  import nav from '@/components/vNav'
  import header from '@/components/Header'

  export default {
    data () {
      return {}
    },
    components: {
      'v-nav': nav,
      'v-header': header
    }
  }
</script>

<style lang="css" scoped>
  .main-nav{
    /*padding-top: 20px;*/
    /*background-color: brown;*/
    height: -moz-calc(100vh - 60px);
    /*chrome safari*/
    height:-webkit-calc(100vh - 60px);
    /*Standard */
    height: calc(100vh - 60px);
  }
  .main-content{
    width: -moz-calc(100% - 150px);
    /*chrome safari*/
    width:-webkit-calc(100% - 150px);
    /*Standard */
    width: calc(100% - 150px);
    height: -moz-calc(100vh - 60px);
    /*chrome safari*/
    height:-webkit-calc(100vh - 60px);
    /*Standard */
    height: calc(100vh - 60px);
  }
  .main-box{
  }
</style>
