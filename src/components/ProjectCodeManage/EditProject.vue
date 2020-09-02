<template>
	<div id="app">
		<div class="content_title">
			<span>
				修改项目
			</span>
		</div>
		<div class="content">
			<el-row >
				<el-col>
				  	<span><span style='color:red'>* </span>项目名称 :</span>
					<el-input v-model="PName" placeholder="请输入项目名称">
						
					</el-input>
			    </el-col>
			    <el-col>
				  	<span><span style='color:red'>* </span>合作学校 :</span>
					<el-select disabled v-model="SchoolValue" filterable @change="handleSchoolChange" placeholder="请选择">
						<el-option
						  v-for="item in SelectSchool"
						  :key="item.S_Code"
						  :label="item.S_Name"
						  :value="item.S_Code">
						</el-option>
						
					</el-select>
			    </el-col>
			    <el-col>
				  	<span><span style='color:red'>* </span>所属学科 :</span>
					<el-select disabled v-model="SubjectPId" filterable @change="handleSubjectsPIdChange" placeholder="请选择">
						<el-option
						  v-for="item in SubjectPIds"
						  :key="item.S_Code"
						  :label="item.S_Name"
						  :value="item.S_Code">
						</el-option>
						
					</el-select>
					<el-select disabled v-model="SubjectId" filterable @change="handleSubjectIdChange" placeholder="请选择">
						<el-option
						  v-for="item in SubjectIds"
						  :key="item.S_Code"
						  :label="item.S_Name"
						  :value="item.S_Code">
						</el-option>
						
					</el-select>
			    </el-col>
			    <el-col>
			    	<span><span style='color:red'>* </span>销售状态 :</span>
					<el-select v-model="CStatesValue" filterable @change="handleCStatesChange" placeholder="请选择销售状态">
						<el-option
						  v-for="item in CStates"
						  :key="item.StateCode"
						  :label="item.StateName"
						  :value="item.StateCode">
						</el-option>
					</el-select>
			    </el-col>
			    <el-col>
				  	<span>产品报价 :</span>
					<el-input v-model="Price" placeholder="请输入产品报价">
						
					</el-input>
			    </el-col>
			    <el-col>
				  	<span>产品合并后名称 :</span>
					<el-input v-model="MergeName" placeholder="请输入多个项目合并后名称">
						
					</el-input>
			    </el-col>
			    <el-col>
				  	<span><span style='color:red'>* </span>项目负责人 :</span>
					<el-input v-model="PMFZR" placeholder="请输入项目负责人">
						
					</el-input>
			    </el-col>
			    <el-col>
				  	<span><span style='color:red'>* </span>程序负责人 :</span>
					<el-input v-model="CXFZR" placeholder="请输入程序负责人">
						
					</el-input>
			    </el-col>
			    <el-col>
				  	<span>学校负责人 :</span>
					<el-input v-model="TName" placeholder="请输入学校负责人">
						
					</el-input>
			    </el-col>
			    <el-col>
				  	<span>联系方式 :</span>
					<el-input v-model="TPhone" placeholder="请输入联系方式">
						
					</el-input>
			    </el-col>
			    <el-col>
			    	<span class='text_title'>项目参数 :</span>
					<el-input type="textarea" style="" placeholder="请填写备注" v-model="Remark"  :rows="10" resize="none" show-word-limit></el-input>
			    </el-col>
			    <el-col>
			    	<div class='button'>
			    		<el-button type="primary" @click='Submit()'>确 认</el-button>
						<el-button @click='backPage()'>取 消</el-button>
			    	</div>
			    </el-col>
			</el-row>

		</div>
	</div>
</template>
<script type="text/javascript">
  import global_ from '../Global.js';
  export default {
    data() {
      return {
      		P_Id:'',
      		PName:'',
      		ObjName:'',
      		SelectSchool:[],
      		SchoolValue:'',
      		SubjectPIds:[],
      		SubjectPId:'',
      		SubjectIds:[],
      		SubjectId:'',
      		Price:'',
      		MergeName:'',
      		CStates:[{
	      		StateCode:-1,
	      		StateName:'--请选择--'
	      	},{
	      		StateCode:0,
	      		StateName:'不可销售'
	      	},{
	      		StateCode:1,
	      		StateName:'可销售'
	      	}],
	      	CStatesValue:'',
	      	PMFZR:'',
	      	CXFZR:'',
	      	TName:'',
	      	TPhone:'',
	      	Remark:'',



      	}
    },
	methods:{
		LoadSchool(){
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'ResSchool'}
			})
			.then(function(response){
				let res = response.data;
				_that.SelectSchool = res;

			})
			.catch(function(response){
				console.log(response)
			})
		},
		LoadSubjectPid(){
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'ResSubjectByPId','PId':1}
			})
			.then(function(response){
				let res = response.data
				_that.SubjectPIds = res;
			})
			.catch(function(response){
				console.log(response)
			})
		},
		LoadSubjectId(PId ,Id){
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'ResSubjectByPId','PId':PId}
			})
			.then(function(response){
				let res = response.data;
				_that.SubjectIds = res;
				_that.SubjectId = Id;
			})
			.catch(function(response){
				console.log(response)
			})
		},
		
		LoadManage(){
			let F_id = this.$route.query.id
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'QryProById','id':F_id}
			})
			.then(function(response){
				let res = response.data[0];
				console.log(res)
				_that.P_Id = res.P_Id
				_that.PName = res.P_Name
				_that.SchoolValue = res.School_Id;
				_that.SubjectPId = res.Subject_PId;
				_that.CStatesValue = res.C_StateId
				_that.PMFZR = res.P_MFZR
				_that.CXFZR = res.P_MCXFZR
				_that.TName = res.P_FZR
				_that.TPhone = res.P_FZR_Phone
				_that.Remark = res.P_Remark
				_that.Price = res.P_Price
				_that.MergeName = res.P_MergeName
				_that.LoadSubjectId(res.Subject_PId,res.Subject_Id)
			})
			.catch(function(response){
				console.log(response)
			})
		},
		handleSchoolChange(){

		},
		handleSubjectsPIdChange(){

		},
		handleSubjectIdChange(){

		},
		handleCStatesChange(){

		},
		Submit(){
			let _that = this;
			let fromdata = `mode=EditProject&Remark=${this.Remark}&id=${this.P_Id}&Price=${this.Price}&MergeName=${this.MergeName}`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'PName':_that.PName,'schoolId':_that.SchoolValue,'SubjectPId':_that.SubjectPId,'SubjectId':_that.SubjectId,'PMFZR':_that.PMFZR,'PFZR':_that.TName,'FZRPhone':_that.TPhone,'PMCXFZR':_that.CXFZR,'CState':_that.CStatesValue},
			    data:fromdata
			})
			.then(function(response){
				let res = response.data
				if(res.success == true){
	    			_that.$layer.msg('编辑成功');

					setTimeout(function(){ _that.backPage() }, 1500);
				}
			})
			.catch(function(response){
				console.log(response)
			})
		},
		backPage(){
			this.$router.push('ProjectCode')
		}
	},
    mounted(){
    	this.LoadManage()
    	this.LoadSchool()
    	this.LoadSubjectPid()
    },
    activated(){
    	
    }
  }
</script>
<style scoped>
.content{width:1000px;box-sizing:border-box;padding:20px}
.content .el-col{text-align:left;margin-bottom:20px}
.content .el-col>span{margin-right:6px;font-size:18px;display:inline-block;width:136px;text-align:right}
.content .el-input{width:440px}
.content .el-textarea{width:800px}
.text_title{line-height:222px}
.button{float:left;margin-left:220px}
</style>