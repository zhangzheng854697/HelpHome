<template>
  <div id="app" v-bind:style="{minHeight: NavHeight+'px'}">
    <div class="title">
      <img src="../assets/logo_1.png" height="40" width="124">
    </div>
    <el-menu class="el-menu-vertical-demo" :unique-opened="false" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="isRouter" :default-active="defaultActive">
      <div v-for="navlist in menulist" :key="navlist.index" v-if="isShow(navlist)">
        <el-menu-item :index="navlist.index" v-if="navlist.hasitem == false">
          <i :class="[navlist.icon]"></i>
          <span slot="title">{{navlist.title}}</span>
        </el-menu-item>
        <el-submenu :index="navlist.index">
          <template slot="title">
            <i :class="[navlist.icon]"></i>
            <span slot="title">{{navlist.title}}</span>
          </template>
          <el-menu-item-group >
            <el-menu-item v-for="item in navlist.subItems" :index="item.index" :key="item.index" v-if="person_Role == '0'">{{item.name}} </el-menu-item>
            <el-menu-item v-for="item in navlist.subItems" :index="item.index" :key="item.index" v-if="person_Role.indexOf(item.userType) != -1">{{item.name}} </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>

    </el-menu>
  </div>
</template>
<script>
import store from '../store/store.js'
export default {
  name: 'Nav',
  data () {
    return {
      person_Role:'',
      isRouter:true,
      isCollapse:false,
      defaultActive:'',
      NavHeight:968,
      activeColor:'red',
      menulist:[

        {
          title:'项目管理',
          index:'2',
          hasitem:true,
          icon:'el-icon-s-order',
          userType:'2,5,7',
          subItems:[
            {
              index:'/ProjectCode',
              name:'项目编号管理',
              url:'ProjectCode',
              userType:'2'
            },
            {
              index:'/XtxManage',
              name:'形态学注册码管理',
              url:'XtxManage',
              userType:'5'
            },
            {
              index:'/EspManage',
              name:'Esp序列号管理',
              url:'EspManage',
              userType:'7'
            },
          ]
        },
        {
          title:'反馈信息',
          index:'1',
          hasitem:true,
          icon:'el-icon-user-solid',
          userType:'4',
          subItems:[
            {
              index:'/HelpManage',
              name:'反馈信息',
              url:'HelpManage',
              userType:'4'
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
    isShow(Num){
      let str = Num.userType;
      let userType=this.person_Role
      if(userType == 0){
        return true
      }
      let strArr = str.split(',')
      for(let i =0;i<strArr.length;i++){
        if(userType.indexOf(strArr[i]) != -1){
          return true;
        }
      }
      return false;
    }
  },
  mounted(){
    this.NavHeight = window.innerHeight
    this.person_Role = localStorage.person_Role
    let LocalPath = this.$route.path;

    this.defaultActive = LocalPath

  },
  watch:{
      $route(to,from){
        this.defaultActive = to.path;
        let _that = this
        let Path = this.$route.path.split('/')[1]
        function isSet(arr){
         for(let i = 0;i<arr.length;i++){
            if(arr[i].href == Path){
              return true;
            }
         }
         return false;
        }
        let TagIsSet = isSet(this.$store.state.tags)

        if(!TagIsSet&&Path!='ProjectCode'){
          this.$store.state.tags.push({'name':to.name,'effect':'light','href':Path})
        }
      }
    },
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
