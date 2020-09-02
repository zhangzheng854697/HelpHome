<template>
	<div id="app">
		<div class="content_title">
			<span>
				反馈信息
			</span>
		</div>
		<div id="select">
			<el-row >
				<el-col :xs='24' :md='12' :lg="8">
					<span>学校</span>
					<el-select v-model="SchoolValue" filterable @change="handleSchoolChange" placeholder="请选择">
						<el-option
						  v-for="item in SchoolOptions"
						  :key="item.S_Code"
						  :label="item.S_Name"
						  :value="item.S_Code">
						</el-option>
						
					</el-select>
				</el-col>
				<el-col :xs='24' :md='12' :lg="8">
					<span>所属项目</span>
				  <el-select v-model="ProjectValue" filterable @change="handleProjectChange" placeholder="请选择所属项目">
				    <el-option
				      v-for="item in ProjectOptions"
				      :key="item.P_Code"
				      :label="item.P_Name"
				      :value="item.P_Code">
				    </el-option>
				  </el-select>
				</el-col>
				<el-col :xs='24' :md='12' :lg="8">
				  	<!-- <span>输入关键字</span> -->
					<el-input v-model="Name" placeholder="请输入相关人员"></el-input>
					<el-button @click="SearchName()">搜索</el-button>
				</el-col>
				<el-col :xs='24' :md='12' :lg="8">
					<span>审核状态</span>
				  <el-select v-model="FStart" filterable @change="handleStartChange" placeholder="请选择所属项目">
				    <el-option
				      v-for="item in F_States"
				      :key="item.Code"
				      :label="item.Name"
				      :value="item.Code">
				    </el-option>
				  </el-select>
				</el-col>
				
			</el-row>
		</div>
		<div class="content">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="rowIndex"
			      label="序号"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="S_Name"
			      label="学校"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="P_Code"
			      label="实验编码"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="P_Name"
			      label="实验名称"
			      width="360">
			    </el-table-column>
			    <el-table-column
			      prop="U_Name"
			      label="姓名">
			    </el-table-column>
			    <el-table-column
			      prop="U_Number"
			      label="账号">
			    </el-table-column>
			    <el-table-column
			      prop="CreateTime"
			      label="提交时间"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="F_StateName"
			      label="状态"
			      width="70">
			    </el-table-column>
			    <el-table-column
			      prop="F_EditName"
			      label="修改人">
			    </el-table-column>
			    <el-table-column label="操作" width="150">
			        <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="handleEdit(scope.$index, scope.row)">审核</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDeleteBefore(scope.$index, scope.row)">删除</el-button>
			        </template>
			    </el-table-column>
			</el-table>
			<el-pagination
			  background
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-sizes="[10, 20, 50, 100]"
		      :page-size="10"
		      layout="sizes, prev, pager, next"
		      :total="totalManage">
		    </el-pagination>
		   
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="centerDialogVisible"
		  :append-to-body="true"
		  width="20%"
		  center>
		  <span>确认删除？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="centerDialogVisible = false;handleDelete()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
  import global_ from '../Global.js';
  export default {
    data() {
      return {
      	F_States:[{
      		Code:'1',
      		Name:'未审核'
      	},{
      		Code:'2',
      		Name:'处理中'
      	},{
      		Code:'3',
      		Name:'已修改'
      	},{
      		Code:'4',
      		Name:'驳回'
      	}],
      	FStart:'',
      	centerDialogVisible:false,
      	Name:'',
      	input:'',
      	ProjectValue:'',
      	SchoolValue:'',
      	currentPage:1,
      	limit:10,
      	offset:0,
      	totalManage:0,
      	SchoolOptions:[{
          S_Code: '',
          S_Name: ''
        }],
        ProjectOptions:[{
          P_Code: '',
          P_Name: ''
        }],
        tableData: [{
          rowIndex: '',
          S_Name: '',
          U_Name: '',
          U_Number:'',
          U_Password:'',
          P_Name:'',
          CreateTime:'',
          F_StateName:'',
          F_Id:'',
          F_EditName:'',
        }],

      }
    },
	methods:{
		handleStartChange(){
			this.LoadManage()
			
		},
		SearchName(){
			this.LoadManage()
		},
		handleDeleteBefore(index,row){
			this.centerDialogVisible = true;
			this.F_Id = row.F_Id;
		},
		LoadManage(){
			this.offset = (this.currentPage-1)*this.limit
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerFeedback,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'QryFeedback','SCode':this.SchoolValue,'PCode': this.ProjectValue,'limit': this.limit, 'offset': this.offset,'name':this.Name,'FState':this.FStart}
			})
			.then(function(response){
				_that.tableData = response.data.rows
				_that.totalManage = response.data.total
			})
			.catch(function(response){
				console.log(response)
			})
		},
		handleEdit(index,row){
			let F_Id = row.F_Id;
			this.$router.push({path:'EditManage',query:{'id':F_Id}})
		},
		handleDelete(){
			let F_Id = this.F_Id;
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerFeedback,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'DelFeedback','id':F_Id}
			})
			.then(function(response){

				_that.$layer.msg('删除成功');
				_that.LoadManage()
			})
			.catch(function(response){
				console.log(response)
			})
		},
		handleSizeChange(val) {
			this.limit = val;
			this.LoadManage()
        	console.log(`每页 ${val} 条`);
	    },
	    handleCurrentChange(val) {
	    	this.currentPage = val;
	    	this.LoadManage()
	        console.log(`当前页: ${val}`);
	    },
	    handleSchoolChange(val){
	    	this.LoadManage()
	    },
	    handleProjectChange(val){
	    	this.LoadManage()
	    }
	},
    mounted(){
    	let _that = this
		this.LoadManage()
    	this.$axios({
		    method: 'post',
		    url: global_.HandlerZy,
		    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		    params :{'mode':'ResSchool'}
		})
		.then(function(response){
			_that.SchoolOptions = response.data
		})
		.catch(function(response){
			console.log(response)
		})

		this.$axios({
		    method: 'post',
		    url: global_.HandlerZy,
		    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		    params :{'mode':'ResProject'}
		})
		.then(function(response){
			_that.ProjectOptions = response.data
		})
		.catch(function(response){
			console.log(response)
		})
    },
    activated(){
    	this.LoadManage()
    }
  }
</script>
<style scoped>
	#select{background:#eee;padding:16px 0;border-radius: 5px;margin-top: 20px}
	#select div span{margin-right:10px;}
	#select .el-col{margin:10px 0;padding-left:10px;text-align:left}
	.content{padding:10px 0;margin-top: 20px}
	.el-input{width:217px;}
	.el-pagination{margin-top:20px}
	>>> .el-dialog{border-radius:5px}
	.el-dialog__body span{font-size:16px}
	.el-col>span{width:66px;display:inline-block;text-align:right;}
</style>