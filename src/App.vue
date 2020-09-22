<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-textarea__inner{font-size: 14px;font-family: yahei;}
.content_title{font-size:18px;font-weight: bold;text-align:left;position:relative}
.content_title>span{padding-left:16px}
.content_title:before{content:'';position:absolute;border:4px solid #409eff;height:16px;border-radius:5px;margin-top:1px}
.el-dialog__header{padding:10px 20px 10px;border-bottom:1px solid #ccc}
.el-dialog__headerbtn{top:14px}
.el-dialog--center .el-dialog__body{padding:25px 25px 10px}
.is-required:before{content: "*";color: #f56c6c;margin-right: 5px;font-weight: bold;}
</style>
