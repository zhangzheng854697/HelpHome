<template>
  <div id="app" v-bind:style="{minHeight: NavHeight+'px'}">
    <div class="title">
      <img src="../assets/logo_1.png" height="40" width="124">
    </div>
    <el-menu  class="el-menu-vertical-demo" :unique-opened="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="isRouter" :default-active="defaultActive">
      <div v-for="navlist in menulist" :key="navlist.index">
        <el-menu-item :index="navlist.index" v-if="navlist.hasitem == false">
          <i :class="[navlist.icon]"></i>
          <span slot="title">{{navlist.title}}</span>
        </el-menu-item>
        <el-submenu :index="navlist.index" v-if="navlist.subItems">
          <template slot="title">
            <i :class="[navlist.icon]"></i>
            <span slot="title">{{navlist.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="item in navlist.subItems" :index="item.index" :key="item.index" v-on:click='showPage(item)'>{{item.name}} </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>

    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Nav',
  data () {
    return {
      isRouter:true,
      isCollapse:false,
      defaultActive:'ProjectCode',
      NavHeight:968,
      activeColor:'red',
      menulist:[
        
        {
          title:'项目管理',
          index:'2',
          hasitem:true,
          icon:'el-icon-s-order',
          subItems:[
            {
              index:'ProjectCode',
              name:'项目编号管理',
              url:'ProjectCode'
            },
            {
              index:'XtxManage',
              name:'形态学注册码管理',
              url:'XtxManage'
            },
          ]
        }, 
        {
          title:'反馈信息',
          index:'1',
          hasitem:true,
          icon:'el-icon-user-solid',
          subItems:[
            {
              index:'HelpManage',
              name:'反馈信息',
              url:'HelpManage'
            }
          ]
        },  
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    showPage(item){
      console.log(123)
    }
  },
  mounted(){
    this.NavHeight = window.innerHeight

    let LocalPath = this.$route.path;
    let arr = LocalPath.split('/');
    let LocalRouter = arr.pop();
    this.defaultActive = LocalRouter

  }
}
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;

  }
  .el-submenu{text-align:left}
  .title{height:67px;line-height:67px;border-bottom:1px solid #eee}
  .title img{margin-top:8px}
</style>
