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
				  	<span>项目名称 :</span>
					<el-select v-model="ProjectValue" filterable @change="handleSchoolChange" placeholder="请选择">
						<el-option
						  v-for="item in SelectProject"
						  :key="item.P_Code"
						  :label="item.P_Name"
						  :value="item.P_Code">
						</el-option>
						
					</el-select>
			    </el-col>
			    <el-col>
				  	<span>采购学校 :</span>
					<el-select v-model="SchoolValue" filterable @change="handleSchoolChange" placeholder="请选择">
						<el-option
						  v-for="item in SelectSchool"
						  :key="item.S_Code"
						  :label="item.S_Name"
						  :value="item.S_Code">
						</el-option>
						
					</el-select>
			    </el-col>
			    <el-col>
				  	<span>许可证 :</span>
					<el-input v-model="C_License" disabled placeholder="">
						
					</el-input>
			    </el-col>
			    <el-col>
				  	<span>部署人员 :</span>
					<el-select v-model="C_Deploy" filterable @change="handleSubjectsPIdChange" placeholder="请选择">
						<el-option
						  v-for="item in ResPerson"
						  :key="item.person_Id"
						  :label="item.person_Name"
						  :value="item.person_Id">
						</el-option>
						
					</el-select>
			    </el-col>
			    <el-col>
			    	<span>部署状态 :</span>
					<el-select v-model="StatesValue" filterable @change="handleCStatesChange" placeholder="请选择部署状态">
						<el-option
						  v-for="item in CStates"
						  :key="item.StateCode"
						  :label="item.StateName"
						  :value="item.StateCode">
						</el-option>
					</el-select>
			    </el-col>
			    <el-col>
				  	<span>项目网址 :</span>
					<el-input v-model="ProjectWeb" placeholder="请输入项目网址">
						
					</el-input>
			    </el-col>
			    <el-col>
			    	<span>市场人员 :</span>
					<el-select v-model="C_Market" filterable @change="handleCStatesChange" placeholder="请选择市场人员">
						<el-option
						  v-for="item in C_ResPerson"
						  :key="item.person_Id"
						  :label="item.person_Name"
						  :value="item.person_Id">
						</el-option>
					</el-select>
			    </el-col>
			    <el-col>
			    	<span class='text_title'>备注 :</span>
					<el-input type="textarea" style="" placeholder="请填写备注" v-model="Remark"  :rows="6" resize="none" show-word-limit></el-input>
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
      		SelectProject:[],
      		ProjectValue:'',
   			SelectSchool:[],
      		SchoolValue:'',
      		ResPerson:[],
      		C_Deploy:'',
      		C_Market:'',
      		C_ResPerson:[],
      		CStates:[{
	      		StateCode:2,
	      		StateName:'学校服务器'
	      	},{
	      		StateCode:1,
	      		StateName:'公司服务器'
	      	}],
	      	StatesValue:'',

	      	C_License:'',
	      	ProjectWeb:'',
	      	Remark:''
      	}
    },
	methods:{
		LoadProject(){
			let _that = this;
			let fromdata = `mode=ResProject`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data :fromdata
			})
			.then(function(response){
				let res = response.data;
				_that.SelectProject = res
				
			})
			.catch(function(response){
				console.log(response)
			})
		},
		LoadSchool(){
			let _that = this;
			let fromdata = `mode=ResSchool`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data :fromdata
			})
			.then(function(response){
				let res = response.data;
				_that.SelectSchool = res
				
			})
			.catch(function(response){
				console.log(response)
			})
		},
		LoadPerson(){
			let _that = this;
			let fromdata = `mode=ResPerson&SId=7`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data :fromdata
			})
			.then(function(response){
				let res = response.data;
				_that.ResPerson = res
				
			})
			.catch(function(response){
				console.log(response)
			})
		},
		LoadCPerson(){
			let _that = this;
			let fromdata = `mode=ResPerson&SId=3`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data :fromdata
			})
			.then(function(response){
				
				let res = response.data;
				_that.C_ResPerson = res
				
			})
			.catch(function(response){
				console.log(response)
			})
		},
		LoadManage(){
			let F_id = this.$route.query.id
			this.P_Id = F_id;
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerSchoolCG,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'QrySchoolCGById','id':F_id}
			})
			.then(function(response){
				let res = response.data[0];
				console.log(res)
				_that.ProjectValue = res.P_Code
				_that.SchoolValue = res.S_Code
				_that.C_Deploy = Number(res.C_Deploy)
				_that.C_Market = Number(res.C_Market)
				
				_that.StatesValue = res.C_DeployState
				_that.C_License = res.C_License
				_that.ProjectWeb = res.C_Website
				_that.Remark = res.C_Remark
				console.log(_that.C_Market)
				console.log(_that.C_ResPerson)
				
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
			if(!this.ProjectValue){
				this.$layer.msg('请选择项目');
				return;
			}else if(!this.SchoolValue){
				this.$layer.msg('请选择采购学校');
				return;
			}else if(!this.C_Deploy){
				this.$layer.msg('请选择部署人员');
				return;
			}else if(!this.C_Market){
				this.$layer.msg('请选择市场人员');
				return;
			}else if(this.StatesValue!=1&&this.StatesValue!=2){
				this.$layer.msg('请选择部署状态');
				return;
			}else if(!this.ProjectWeb){
				this.$layer.msg('请填写项目地址');
				return;
			}

			let _that = this;
			let fromdata = `mode=EditSchoolCG&Remark=${this.Remark}&id=${this.P_Id}`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerSchoolCG,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'SCode':_that.SchoolValue,'PCode':_that.ProjectValue,'Person1':_that.C_Deploy,'Person6':_that.C_Market,'DeployState':_that.StatesValue,'License':_that.C_License,'Website':_that.ProjectWeb},
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
			this.$router.push('XtxManage')
		}
	},
    mounted(){
    	this.LoadProject()
    	this.LoadSchool()
    	this.LoadPerson()
    	this.LoadCPerson()
    	this.LoadManage()
    },
    activated(){
    	
    }
  }
</script>
<style scoped>
.content{width:1000px;box-sizing:border-box;padding:20px}
.content .el-col{text-align:left;margin-bottom:20px}
.content .el-col span{margin-right:6px;font-size:18px;display:inline-block;width:100px;text-align:right}
.content .el-input{width:440px}
.content .el-textarea{width:440px}
.text_title{line-height:138px}
.button{float:left;margin-left:220px}
</style>