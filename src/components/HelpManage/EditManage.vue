<template>
	<div id="app">
		<div class="content_title">
			<span>
				用户反馈

			</span>
		</div>
		<div class="manage">
			<el-row >
				<el-col :xs='24' :md='12' :lg="8"><span>学校： </span>{{SchoolName}}</el-col>
				<el-col :xs='24' :md='12' :lg="8"><span>实验名称： </span>{{ObjName}}</el-col>
				<el-col :xs='24' :md='12' :lg="8"><span>姓名： </span>{{UserName}}</el-col>
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
				问题描述
			</span>
		</div>
		<div class="desc">
			<p>{{desc}}</p>
		</div>
		<div class="title">
			<span>
				请勾选状态
			</span>
		</div>
		<div class="radio">
			<el-radio-group v-model="radio">
				<el-radio :label="1">未审核</el-radio>
				<el-radio :label="2">处理中</el-radio>
				<el-radio :label="3">已修改</el-radio>
				<el-radio :label="4">驳回</el-radio>
			</el-radio-group>
		</div>
		<div class="title">
			<span>
				请勾选是否常见问题
			</span>
		</div>
		<div class="radio">
			<el-radio-group v-model="common">
				<el-radio :label="1">是</el-radio>
				<el-radio :label="0">否</el-radio>
			</el-radio-group>
		</div>
		<div class="title">
			<span>
				修改人
			</span>
		</div>
		<div class="name">
			<el-input v-model="name" placeholder="请输入姓名"></el-input>
		</div>
		<div class="title">
			<span>
				回复
			</span>
		</div>
		<div class="reply">
			<el-input type="textarea" style="" placeholder="" v-model="reply"  :rows="6" resize="none" show-word-limit></el-input>
		</div>
		<div class="button">
			<el-button type="primary" @click='sendWechart()'>确 认</el-button>
			<el-button @click='backPage()'>取 消</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
  import global_ from '../Global.js';
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
			})
			.catch(function(response){
				console.log(response)
			})
		},
		sendWechart(){
			let F_id = this.$route.query.id
			let _that = this;
			let fromdata = `type=feedback&openid=${_that.openid}&project=${_that.ObjName}&content=${_that.desc}&reply_text=${_that.reply}&remark=&time=${_that.SubmitTime}&url=http://feedback.mengoo.com:88/dist/#/ReplyInfo?id=${F_id}`
			this.$axios({
			    method: 'post',
			    url:'https://www.xinke081.cn/wechat/tmplmsg.php',
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data:fromdata
			})
			.then(function(response){
				let res = response.data;
				console.log(res)
				if(res.code == 1000){

					_that.SubmitReply();
				}
				
			})
			.catch(function(response){
				console.log(response)
			})
		},
		SubmitReply(){
			let F_id = this.F_id
			let state= this.radio
			let editname = this.name
			let common = this.common
			let editcont = this.reply
			let _that = this;
			let fromdata = `state=${state}&editname=${editname}&common=${common}&mode=EditFeedback&id=${F_id}&editcont=${editcont}`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerFeedback,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data:fromdata
			})
			.then(function(response){
				if(response.data.success){
				
					_that.$layer.msg('编辑成功');
					setTimeout(function(){ _that.backPage() }, 1500);
					
				}
				
			})
			.catch(function(response){
				console.log(response)
			})
		},
		backPage(){
			this.$router.push('HelpManage')
		}
		
	},
    mounted(){
    	this.LoadManage()
    }
  }
</script>
<style scoped>
.title{font-size:18px;text-align:left;margin-top:20px}
.manage{background:#eee;width:100%;padding:20px 0;margin-top:20px}
.desc{background:#eee;width:100%;padding:20px 10px;margin-top:20px;text-align:left;box-sizing:border-box}
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
</style>








