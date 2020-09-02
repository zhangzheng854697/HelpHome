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

const myRoutes = [
	{
		path:'/AppInner',
		component:AppInner,
		children:[
			{
				path:'/HelpManage',
				name:'HelpManage',
				meta:{
					title:"帮助中心",
					KeepAlive: true
				},
				component:HelpManage
			},
			
			{
				path:'/EditManage',
				name:'EditManage',
				meta:{
					title:"帮助中心",
					KeepAlive: false
				},
				component:EditManage
			},
			{
				path:'/ProjectCode',
				name:'ProjectCode',
				meta:{
					title:"项目编码",
					KeepAlive: true
				},
				component:ProjectCode
			},
			{
				path:'/EditProject',
				name:'EditProject',
				meta:{
					title:"项目编码--修改",
					KeepAlive: false
				},
				component:EditProject
			},
			{
				path:'/addProject',
				name:'addProject',
				meta:{
					title:"项目编码--新增",
					KeepAlive: false
				},
				component:addProject
			},
			{
				path:'/InfoProject',
				name:'InfoProject',
				meta:{
					title:"项目编码--详情",
					KeepAlive: false
				},
				component:InfoProject
			},
			{
				path:'/XtxManage',
				name:'XtxManage',
				meta:{
					title:"形态学项目编码",
					KeepAlive: true
				},
				component:XtxManage
			},
			{
				path:'/EditXtxCode',
				name:'EditXtxCode',
				meta:{
					title:"形态学项目编码--修改",
					KeepAlive: false
				},
				component:EditXtxCode
			},
			{
				path:'/AddXtxCode',
				name:'AddXtxCode',
				meta:{
					title:"形态学项目编码--新增",
					KeepAlive: false
				},
				component:AddXtxCode
			},

		]
	},
	{
		path:'/',
		name:'Login',
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

