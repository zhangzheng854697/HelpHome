<template>
	<div id="app">
		<div class="content_title">
			<span>
				新增项目
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
				  	<span><span style='color:red'>* </span>所属学科 :</span>
					<el-select v-model="SubjectPId" filterable @change="handleSubjectsPIdChange" placeholder="请选择">
						<el-option
						  v-for="item in SubjectPIds"
						  :key="item.S_Code"
						  :label="item.S_Name"
						  :value="item.S_Code">
						</el-option>

					</el-select>
					<el-select v-model="SubjectId" filterable @change="handleSubjectIdChange" placeholder="请选择">
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
					<el-input v-model="Price" placeholder="请输入产品报价" @change="handlePriceChange">

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
					<el-input type="textarea" style="" placeholder="请填写项目参数" v-model="Remark"  :rows="6" resize="none" show-word-limit></el-input>
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
      		ProjectCode:'zhangsan',
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
	      	CStatesValue:0,
	      	PMFZR:'',
	      	CXFZR:'',
	      	TName:'',
	      	TPhone:'',
	      	Remark:'',


      	}
    },
	methods:{
    handlePriceChange(){
      this.Price = this.Price.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
    },
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
		LoadSubjectId(){
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'ResSubjectByPId','PId':_that.SubjectPId}
			})
			.then(function(response){
				let res = response.data;
				_that.SubjectIds = res;
			})
			.catch(function(response){
				console.log(response)
			})
		},
		handleSchoolChange(){

		},
		handleSubjectsPIdChange(){
			this.LoadSubjectId()

		},
		handleSubjectIdChange(){

		},
		handleCStatesChange(){

		},
		CopyMsg(val){
			var input = document.createElement("input");
		    input.value = val;
		    document.body.appendChild(input);
		    input.select();
		    document.execCommand("Copy");
		    document.body.removeChild(input);
		},
		Submit(){
			if(!this.PName){
				this.$layer.msg('请填写项目名称');
				return;
			}else if(!this.SchoolValue){
				this.$layer.msg('请选择合作学校');
				return;
			}else if(!this.SubjectPId){
				this.$layer.msg('请选择所属学科');
				return;
			}else if(!this.SubjectId){
				this.$layer.msg('请选择二级学科');
				return;
			}else if(this.CStatesValue!=0&&this.CStatesValue!=1){
				this.$layer.msg('请选择销售状态');
				return;
			}else if(!this.PMFZR){
				this.$layer.msg('请填写项目负责人');
				return;
			}else if(!this.CXFZR){
				this.$layer.msg('请填写程序负责人');
				return;
			}
			let _that = this;
			let fromdata = `mode=InsProject&Remark=${this.Remark}&Price=${this.Price}&MergeName=${this.MergeName}`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'PName':_that.PName,'schoolId':_that.SchoolValue,'SubjectPId':_that.SubjectPId,'SubjectId':_that.SubjectId,'PMFZR':_that.PMFZR,'PFZR':_that.TName,'FZRPhone':_that.TPhone,'PMCXFZR':_that.CXFZR,'CState':_that.CStatesValue,},
			    data:fromdata
			})
			.then(function(response){
				let res = response.data
				if(res.success == true){
					_that.CopyMsg(res.msg)

					_that.$layer.msg('新增成功,已复制编码');
					setTimeout(function(){ _that.backPage() }, 1500);
				}
			})
			.catch(function(response){

				console.log(response)
			})
		},
		backPage(){
			this.$router.push('/ProjectCode')
		}
	},
    mounted(){
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
.content .el-textarea{width:440px}
.text_title{line-height:138px}
.button{float:left;margin-left:220px}
</style>
