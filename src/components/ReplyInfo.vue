<template>
	<div id="app">
		<div class="content_title">
			<span>
				我的反馈

			</span>
		</div>
		<div class="manage">
			<el-row >
				<el-col :xs='24' :md='12' :lg="8"><span>学校： </span>{{SchoolName}}</el-col>
				<el-col :xs='24' :md='12' :lg="8"><span>姓名： </span>{{UserName}}</el-col>
				<el-col :xs='24' :md='12' :lg="8"><span>实验名称： </span>{{ObjName}}</el-col>
				<el-col :xs='24' :md='12' :lg="8"><span>账号： </span>{{UserNumber}}</el-col>
				<el-col :xs='24' :md='12' :lg="8"><span>联系方式： </span>{{UserPhone}}</el-col>
				<el-col :xs='24' :md='12' :lg="8"><span>提交时间： </span>{{SubmitTime}}</el-col>
				<el-col :xs='24' :md='12' :lg="8" class='img_box' v-show='ImageUrl'><span>图片： </span>
					<div v-for="(item , i) in srcList">
						<el-image 
							style="width: 100px; height: 100px"
							:append-to-body="true"
							:src="item" 
							:preview-src-list="srcList">
						</el-image>
					</div>	
				</el-col>
			</el-row >
		</div>
		<div class="title">
			<span>
				问题描述： 
			</span>
		</div>
		<div class="desc">
			<p>{{desc}}</p>
		</div>

		<div class="content_title">
			<span>
				平台回复
			</span>
		</div>
		<div class="manage">
			<el-row >
				<el-col :xs='24' :md='12' :lg="8"><span>审核状态： </span>{{StateName}}</el-col>
				<el-col :xs='24' :md='12' :lg="8"><span>回复时间： </span>{{EditTime}}</el-col>
			</el-row >
		</div>
		<div class="title">
			<span>
				回复内容： 
			</span>
		</div>
		<div class="desc">
			<p>{{reply}}</p>
		</div>
		
	</div>
</template>
<script type="text/javascript">
  import global_ from './Global.js';
  export default {
    data() {
      return {
      	ImageShow:false,
      	common:'',
      	name:'',
      	radio:'',
      	SchoolName:'',
      	UserName:'',
      	ObjName:'',
      	UserNumber:'',
      	UserPhone:'',
      	SubmitTime:'',
      	desc:'',
      	reply:'',
      	F_id:'',
      	ImageUrl:'',
      	openid:'',
      	EditTime:'',
      	StateName:'',
      	srcList:[],
      }
    },
	methods:{
		LoadManage(){
			let F_id = this.$route.query.id
			this.F_id = F_id;
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerFeedback,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'QryFeedbackById','id':F_id}
			})
			.then(function(response){
				let res = response.data[0]

				console.log(res)
				let srcList = res.F_Pics.split(';');
				srcList.pop()
				srcList.forEach(function(item,i){
					_that.srcList.push(global_.url_prefix+item)
				})
				_that.ImageUrl = _that.srcList[0];
				_that.SchoolName = res.S_Name
				_that.UserName = res.U_Name
				_that.ObjName = res.P_Name
				_that.UserNumber = res.U_Number
				_that.UserPhone = res.U_Phone
				_that.SubmitTime = res.CreateTime
				_that.desc = res.F_Desc
				_that.radio = res.F_State
				_that.common = res.F_common
				_that.name = res.F_EditName
				_that.reply = res.F_EditCont
				_that.openid = res.openid
				_that.EditTime = res.F_EditTime
				_that.StateName = res.F_StateName
			})
			.catch(function(response){
				console.log(response)
			})
		},
		
	},
    mounted(){
    	this.LoadManage()
    }
  }
</script>
<style scoped>
.title{font-size:18px;text-align:left;padding-left:10px;background:#eee}
.manage{background:#eee;width:100%;padding:20px 0;margin-top:20px}
.desc{background:#eee;width:100%;padding:20px 10px;text-align:left;box-sizing:border-box}
.desc p{text-indent: 2em;}
.radio{text-align:left;padding:20px 0 0 10px}
.el-col{text-align:left;padding:10px 0 10px 10px}
.el-input{width:230px;padding:20px 0 0 10px}
.name{text-align:left}
.reply{padding:20px 0 0 10px}
div.button{padding:20px 0}
.img_box{float:left}
.img_box el-image{float:left}
.img_box span{float:left;}
.img_box>div{display:inline-block;margin-left:10px}
.content_title{margin-top:20px;padding-left:10px}
</style>








