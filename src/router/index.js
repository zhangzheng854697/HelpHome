import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const AppInner = () => import('@/AppInner.vue')
const HelpManage = () => import('@/components/HelpManage/HelpManage.vue')
const EditManage = () => import('@/components/HelpManage/EditManage.vue')
const HelpHome = () => import('@/components/HelpHome.vue')
const EspHelpHome = () => import('@/components/EspHelpHome.vue')
const ReplyInfo = () => import('@/components/ReplyInfo.vue')
const Login = () => import('@/components/Login.vue')

const ProjectCode = () => import('@/components/ProjectCodeManage/ProjectCode.vue')
const EditProject = () => import('@/components/ProjectCodeManage/EditProject.vue')
const addProject = () => import('@/components/ProjectCodeManage/addProject.vue')
const InfoProject = () => import('@/components/ProjectCodeManage/InfoProject.vue')

const XtxManage = () => import('@/components/XtxCodeManage/XtxManage.vue')
const EditXtxCode = () => import('@/components/XtxCodeManage/EditXtxCode.vue')
const AddXtxCode = () => import('@/components/XtxCodeManage/AddXtxCode.vue')
const XtxInfoProject = () => import('@/components/XtxCodeManage/XtxInfoProject.vue')

const EspManage = () => import('@/components/EspCodeManage/EspManage.vue')
const EditEspCode = () => import('@/components/EspCodeManage/EditEspCode.vue')
const AddEspCode = () => import('@/components/EspCodeManage/AddEspCode.vue')
const EspInfoProject = () => import('@/components/EspCodeManage/EspInfoProject.vue')


const myRoutes = [
	{
		path:'/AppInner',
		component:AppInner,
		children:[
			{
				path:'/HelpManage',
				name:'反馈信息',
				meta:{
					title:"帮助中心",
					KeepAlive: true
				},
				component:HelpManage
			},

			{
				path:'/HelpManage/EditManage',
				name:'用户反馈',
				meta:{
					title:"帮助中心",
					KeepAlive: false
				},
				component:EditManage
			},
			{
				path:'/ProjectCode',
				name:'项目编号管理',
				meta:{
					title:"项目编号",
					KeepAlive: true
				},
				component:ProjectCode
			},
			{
				path:'/ProjectCode/EditProject',
				name:'项目编号--修改',
				meta:{
					title:"项目编号--修改",
					KeepAlive: false
				},
				component:EditProject
			},
			{
				path:'/ProjectCode/addProject',
				name:'项目编号--新增',
				meta:{
					title:"项目编号--新增",
					KeepAlive: false
				},
				component:addProject
			},
			{
				path:'/ProjectCode/InfoProject',
				name:'项目编号--详情',
				meta:{
					title:"项目编号--详情",
					KeepAlive: false
				},
				component:InfoProject
			},
			{
				path:'/XtxManage',
				name:'形态学注册码管理',
				meta:{
					title:"形态学项目编号",
					KeepAlive: true
				},
				component:XtxManage
			},
			{
				path:'/XtxManage/EditXtxCode',
				name:'形态学项目编号--修改',
				meta:{
					title:"形态学项目编号--修改",
					KeepAlive: false
				},
				component:EditXtxCode
			},
			{
				path:'/XtxManage/AddXtxCode',
				name:'形态学项目编号--新增',
				meta:{
					title:"形态学项目编号--新增",
					KeepAlive: false
				},
				component:AddXtxCode
			},
      {
        path:'/XtxManage/XtxInfoProject',
        name:'形态学项目编号--详情',
        meta:{
          title:"形态学项目编号--详情",
          KeepAlive: false
        },
        component:XtxInfoProject
      },
      {
        path:'/EspManage',
        name:'Esp序列号管理',
        meta:{
          title:"Esp序列号管理",
          KeepAlive: true
        },
        component:EspManage
      },
      {
        path:'/EspManage/EditEspCode',
        name:'Esp序列号管理---修改',
        meta:{
          title:"Esp序列号管理--修改",
          KeepAlive: false
        },
        component:EditEspCode
      },
      {
        path:'/EspManage/AddEspCode',
        name:'Esp序列号管理---新增',
        meta:{
          title:"Esp序列号管理---新增",
          KeepAlive: false
        },
        component:AddEspCode
      },
      {
        path:'/EspManage/EspInfoProject',
        name:'Esp序列号管理---详情',
        meta:{
          title:"Esp序列号管理---详情",
          KeepAlive: false
        },
        component:EspInfoProject
      },
		]
	},
	{
		path:'/',
		name:'项目管理系统--登录',
		meta:{
			title:"项目管理系统--登录",
			KeepAlive: false
		},
		component:Login
	},
	{
		path:'/HelpHome',
		name:'HelpHome',
		meta:{
			title:"帮助中心--填写反馈",
			KeepAlive: false
		},
		component:HelpHome
	},
	{
		path:'/EspHelpHome',
		name:'EspHelpHome',
		meta:{
			title:"帮助中心--填写反馈",
			KeepAlive: false
		},
		component:EspHelpHome
	},
	{
		path:'/ReplyInfo',
		name:'ReplyInfo',
		meta:{
			title:"意见反馈详情",
			KeepAlive: false
		},
		component:ReplyInfo
	},
	{
		path:'/Login',
		name:'Login',
		meta:{
			title:"项目管理系统--登录",
			KeepAlive: false
		},
		component:Login
	},
]
const router = new Router({
  mode: 'history',
  routes: myRoutes
})

export default router

