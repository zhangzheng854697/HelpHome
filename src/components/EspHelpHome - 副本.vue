<template>
	<div class="main">
		<div class="logobox">
			<div class="logo">
				<img src="../assets/Esplogo.png" >
			</div>
			<div class="tab">
				<a href="#">使用帮助</a>
				<a href="http://115.28.176.223:88">反馈中心</a>
			</div>
		</div>
		<div><h2>意见反馈</h2></div>
		<div>
			<span><span style='color:red'>* </span>学校</span>
			  <el-select v-model="SchoolValue" filterable placeholder="请选择学校">
			    <el-option
			      v-for="item in SchoolOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
		</div>
<!-- 		<div>
			<span>所属项目</span>
			  <el-select v-model="ObjValue" filterable placeholder="请选择项目">
			    <el-option
			      v-for="item in ObjOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
		</div> -->
		<div>
			<span><span style='color:red'>* </span>姓名</span>
			<el-input v-model="UserName" placeholder="请输入姓名"></el-input>
		</div>
		<div>
			<span><span style='color:red'>* </span>登陆账号</span>
			<el-input v-model="UserNumber" placeholder="请输入登陆账号"></el-input>
		</div>

		<div>
			<span><span style='color:red'>* </span>联系方式</span>
			<el-input v-model="UserPhone" placeholder="请填写您的手机号或者邮箱地址，以便于我们给您回复"></el-input>
		</div>
		<div>
			<span style="line-height: 138px"><span style='color:red'>* </span>问题描述</span>
			<el-input type="textarea" style="" placeholder="请填写具体的内容帮助我们了解您的意见与建议" v-model="desc" maxlength="255" :rows="6" resize="none" show-word-limit></el-input>
		</div>
		<div>
			<span>上传图片</span>
			<p>（最多3张图片，图片大小不能超过2MB，<a href="https://www.yasuotu.com/" target="_blank">使用图片压缩工具。</a>）</p>
		</div>
		<div class="ImageBox">
			<el-upload
			  :action="uploadUrl"
			  ref="upload"
			  :limit="3"
			  :on-exceed="handleExceed"
			  accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PBG,.GIF,.BMP"
			  list-type="picture-card"
			  :auto-upload="false"
			  :on-error="uploadError"
			  :on-sucess="uploadSuccess"
			  :on-change="submitFile">
			    <i slot="default" class="el-icon-plus"></i>
			    <div slot="file" slot-scope="{file}">
			      <img
			        class="el-upload-list__item-thumbnail"
			        :src="file.url" alt=""
			      >
			      <span class="el-upload-list__item-actions">
			        <span
			          class="el-upload-list__item-preview"
			          @click="handlePictureCardPreview(file)"
			        >
			          <i class="el-icon-zoom-in"></i>
			        </span>
			        <span
			          v-if="!disabled"
			          class="el-upload-list__item-delete"
			          @click="handleDownload(file)"
			        >
			          <i class="el-icon-download"></i>
			        </span>
			        <span
			          v-if="!disabled"
			          class="el-upload-list__item-delete"
			          @click="handleRemove(file)"
			        >
			          <i class="el-icon-delete"></i>
			        </span>
			      </span>
			    </div>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</div>
		<div class="foot">
			<el-button type="primary" @click="submit">提交反馈</el-button>
		</div>
		<el-dialog :close-on-press-escape='false' :close-on-click-modal='false' :show-close='false' title="关注微信公众号" :visible.sync="dialogTableVisible" width="400px">
		  	<div class="InfoTable">
		  		<img :src="WxImg" style="width:200px">
		  	</div>
		  	<p>请使用微信扫码关注公众号，我们随后会在公众号中回复您，感谢您的宝贵意见！</p>
		</el-dialog>
	</div>
</template>
<style scoped>
	.logo{float: left;}
	.tab{float: right;}
	.main{max-width: 800px;margin:0 auto;padding:10px;box-sizing: border-box;}
	.main>div>span{width: 15%;display: inline-block;text-align: right;margin:26px 12px 0 0;}
	.main>div p{display: inline-block;width: 80%;text-align: left;}
	.main>div>.el-input,.main>div .el-textarea,.main>div .el-select{width: 80%;}
	.main>div .el-textarea{margin-top:26px;}
	.foot{margin:20px 0;}
	.ImageBox{margin-top:20px;}
	@media screen and (max-width: 800px) {
		.main>div>span{width: 20%}
		.main>div>.el-input,.main>div .el-textarea,.main>div .el-select{width: 75%;}
	}
	h2{font-size:24px;margin:10px 0;}
	>>>.el-dialog__body{padding:0px 20px 30px 20px;}
	>>>.el-dialog{border-radius: 5px}
</style>
<script>
import global_ from './Global.js';
export default {

  data() {
	return {
		dialogTableVisible:false,
		uploadUrl:global_.upload_json,
		dialogImageUrl: '',
		dialogVisible: false,
		disabled: false,
		SchoolOptions:[],
		SchoolValue:'',
		// ObjOptions:[],
		ObjValue:'JNJ0000101',
		UserName:'',
		UserNumber:'',
		UserPwd:'',
		UserPhone:'',
		desc:'',
		imgFile:[],
		uuid:'',
		WxImg:'',
		openid:''
		}
  	},
  methods:{
  	
  	handleRemove(file) {
  		// 删除网页图片
  		let fileList = this.$refs.upload.uploadFiles;
  		console.log(fileList)
  		let index = fileList.findIndex(fileItem=>{
  			return fileItem.uid == file.uid;
  		})
  		fileList.splice(index,1)

  		//删除imgfile 参数
  		console.log(this.imgFile)
  		console.log(file)
  		let imgfileIndex = this.imgFile.findIndex(item=>{
  			return item == file.resUrl
  		})
  		this.imgFile.splice(imgfileIndex,1) 

  		//删除服务器图片
      },
	handlePictureCardPreview(file) {
		this.dialogImageUrl = file.url;
		this.dialogVisible = true;
	},
	handleDownload(file) {
		console.log(this.dialogImageUrl);
	},
	handleExceed(files, fileList){
		this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
	},
	submitFile(file){
		let _that = this;
		const isLt2M = file.size / 1024 / 1024 < 2;
		if(!isLt2M){
			this.$message.warning("文件不得大于2M");
			this.handleRemove(file);
			return;
		}
		var type = "imgFile";
        var formData = new FormData();//这里需要实例化一个FormData来进行文件上传 
        formData.append(type, file.raw);
		this.$axios({
		    method: 'post',
		    url: this.uploadUrl,
		    data: formData
		})
		.then(function(response){
			let url = response.data.url.split('..')[1]
			file.resUrl = url
			_that.imgFile.push(url)
			
		})
		.catch(function(response){
			console.log(response)
		})
	},
	uploadError(response){
		console.log(response)
	},
	uploadSuccess(response){
		console.log(response)
	},
	SendWX(){
		let _that = this;
		this.$axios({
		    method: 'get',
		    url: 'https://www.xinke081.cn/wechat/qrcode.php?scene=1001',
		})
		.then(function(response){
			let res = response.data.data;

			console.log(res)
			_that.WxImg = res.url;
			_that.uuid = res.uuid;
			_that.dialogTableVisible = true;
			_that.CheckWx();
		})
		.catch(function(response){
			console.log(response)
		})

	},
	CheckWx(){
		let _that = this;
		let interval = setInterval(function(){
			_that.$axios({
			    method: 'get',
			    url: 'https://www.xinke081.cn/wechat/check.php?act=feedback&uuid='+_that.uuid,
			})
			.then(function(response){
				let res = response.data;
				if(res.code == 1000){
					console.log(res)
					clearInterval(interval)
					_that.openid = res.data.openid;
					_that.dialogTableVisible = false;
					_that.sendManage();
				}
				
			})
			.catch(function(response){
				console.log(response)
			})

		},1000)
		
	},
	sendManage(){
		let that = this;
		let SCode = this.SchoolValue;
		let PCode = this.ObjValue;
		let uname = this.UserName;
		let un = this.UserNumber;
		let upwd = this.UserPwd;
		let uphone = this.UserPhone;
		let pics = '';
		let desc = this.desc;
		let openid = this.openid;
		this.imgFile.forEach(function(item){
			pics+=item+';'
		})
		let SendData = {
			'mode':'InsFeedback',
			'version':'1.0',
			'SCode':SCode,
			'PCode':PCode,
			'uname':uname,
			'un':un,
			'upwd':upwd,
			'uphone':uphone,
			'pics':pics,
			'desc':desc
		}
		let fromdata = `mode=InsFeedback&version=1.0&SCode=${SCode}&PCode=${PCode}&uname=${uname}&un=${un}&upwd=${upwd}&uphone=${uphone}&pics=${pics}&desc=${desc}&openid=${openid}`
		this.$axios({
		    method: 'post',
		    url: global_.HandlerFeedback,
		    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		    data :fromdata
		})
		.then(function(response){
			
			that.$message('提交成功');
		})
		.catch(function(response){
			console.log(response)
		})
	},
	submit(){
		let that = this;
		let SCode = this.SchoolValue;
		let PCode = this.ObjValue;
		let uname = this.UserName;
		let un = this.UserNumber;
		let upwd = this.UserPwd;
		let uphone = this.UserPhone;
		let pics = '';
		let desc = this.desc;
		if(!SCode){
			this.$message.error('请填写学校');
			return;
		}else if(!PCode){
			this.$message.error('请填写所属项目');
			return;
		}else if(!uname){
			this.$message.error('请填写姓名');
			return;
		}else if(!un){
			this.$message.error('请填写登陆账号');
			return;
		}else if(!uphone){
			this.$message.error('请填写联系方式');
			return;
		}else if(!desc){
			this.$message.error('请填写问题描述');
			return;
		}
		this.SendWX();
	}

  },
  mounted(){
  	let _that = this
  	this.$axios({
		    method: 'post',
		    url: global_.HandlerZy,
		    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		    params :{'mode':'ResSchool'}
		})
		.then(function(response){
			response.data.forEach(function(item,index){
				_that.SchoolOptions.push({'value':item.S_Code,'label':item.S_Name})
			})
		})
		.catch(function(response){
			console.log(response)
		})


	

  }
}
</script>
