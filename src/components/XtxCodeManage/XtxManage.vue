<template>
	<div id="app">
		<div class="content_title">
			<span>
				形态学注册码管理
			</span>
		</div>
		<div id="select">
			<el-row >
			  <el-col :xs='24' :md='12' :lg="8">
			  	<span>合作学校</span>
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
			  	<span>部署人员</span>
				  <el-select v-model="Person" filterable @change="handleCStatesChange" placeholder="请选择销售状态">
				    <el-option
				      v-for="item in ResPerson"
				      :key="item.person_Id"
				      :label="item.person_Name"
				      :value="item.person_Id">
				    </el-option>
				  </el-select>
			  </el-col>
			  <el-col :xs='24' :md='12' :lg="8">
			  	<span>检索</span>
				<el-input v-model="SearchValue" placeholder="请输入内容">
					<el-button slot="append" icon="el-icon-search" @click='SearchStatu()'></el-button>
				</el-input>
				
			  </el-col>
			</el-row>
		</div>
		<div class="ButtonBox">
			<el-button type="primary" @click='$router.push("AddXtxCode")'>新增</el-button>
		</div>
		<div class="content">
			<el-table
				ref="multipleTable"
			    :data="tableData"
			    border
			    @row-click='clickRow'
			    style="width: 100%">
			    <el-table-column
			      type="selection"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="rowIndex"
			      label="序号"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="C_License"
			      label="许可证编号"
			      width="320">
			    </el-table-column>
			    <el-table-column
			      prop="S_Name"
			      label="采购院校"
			      width="160">
			    </el-table-column>
			    <el-table-column
			      prop="P_Name"
			      label="项目名称">
			    </el-table-column>
			    <el-table-column
			      prop="C_DeployStateName"
			      label="部署状态"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="DeployPerson"
			      label="部署人员"
			      width="100">
			    </el-table-column>
			    <el-table-column label="操作" width="150">
			        <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click.stop="handleDeleteBefore(scope.$index, scope.row)">作废</el-button>
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
		  <span>确认作废？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="centerDialogVisible = false;handleDelete()">确 定</el-button>
		  </span>
		</el-dialog>

		<el-dialog title="详细信息" :visible.sync="dialogTableVisible" width="768px">
		  	<div class="InfoTable">
		  		<table>
		  			<tbody>
		  				<tr>
		  					<td>项目名称：</td>
		  					<td colspan="3">{{InfoData.P_Name}}</td>
		  				</tr>
		  				<tr>
		  					<td>采购学校：</td>
		  					<td>{{InfoData.S_Name}}</td>
		  					<td>部署状态：</td>
		  					<td>{{InfoData.C_DeployStateName}}</td>
		  				</tr>
		  				<tr>
		  					<td>许可证编号：</td>
		  					<td colspan="3">{{InfoData.C_License}}</td>
		  				</tr>
		  				<tr>
		  					<td>项目地址：</td>
		  					<td>{{InfoData.C_Website}}</td>
		  					<td>创建时间：</td>
		  					<td>{{InfoData.CreateTime}}</td>
		  				</tr>
		  				<tr>
		  					<td>部署人员：</td>
		  					<td>{{InfoData.DeployPerson}}</td>
		  					<td>市场人员：</td>
		  					<td>{{InfoData.C_Market}}</td>
		  				</tr>
		  				<tr>
		  					<td>备注：</td>
		  					<td colspan="3">{{InfoData.C_Remark}}</td>
		  				</tr>
		  			</tbody>
		  		</table>
		  	</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
  import global_ from '../Global.js';
  export default {
    data() {
      return {
      	dialogTableVisible:false,
      	centerDialogVisible:false,
      	SearchValue:'',
      	CStatesValue:'',
      	ProjectValue:'',
      	SchoolValue:'',
      	SubjectPId:'',
      	SubjectId:'',
      	F_Id:'',
      	currentPage:1,
      	limit:10,
      	offset:0,
      	totalManage:0,
      	SubjectPIds:[],
      	SubjectIds:[],
      	ResPerson:[],
      	Person:'',
      	SchoolOptions:[{
          S_Code: '',
          S_Name: ''
        }],
        ProjectOptions:[{
          P_Code: '',
          P_Name: ''
        }],
        tableData: [{

        }],
        InfoData:{

        }

      }
    },
	methods:{
		clickRow(row){
			// this.InfoData = row
			// this.dialogTableVisible = true
			this.$refs.multipleTable.toggleRowSelection(row);
		},
		handleDeleteBefore(index,row){
			console.log(row)
			this.centerDialogVisible = true;
			this.F_Id = row.C_Id;
		},
		LoadManage(){
			this.offset = (this.currentPage-1)*this.limit
			let _that = this;
			this.$axios({
			    method: 'get',
			    url: global_.HandlerSchoolCG,
			    // headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'QrySchoolCG','SCode':_that.SchoolValue,'PCode':_that.Person,'limit':_that.limit,'offset':_that.offset,'order':'asc','name':_that.SearchValue}
			})
			.then(function(response){
				_that.tableData = response.data.rows
				console.log(response.data.rows)
				_that.totalManage = response.data.total
			})
			.catch(function(response){
				console.log(response)
			})
		},
		handleEdit(index,row){
			let F_Id = row.C_Id;
			this.$router.push({path:'EditXtxCode',query:{'id':F_Id}})
		},
		handleDelete(){
			let F_Id = this.F_Id;
			let _that = this;
			let fromdata = `mode=DelSchoolCG&id=${F_Id}`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerSchoolCG,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data :fromdata
			})
			.then(function(response){
				_that.$layer.msg('作废成功');
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
	    },
	    handleCStatesChange(val){
	    	this.LoadManage()
	    },
	    handleSubjectsPIdChange(val){
	    	let _that = this;
	    	this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'ResSubjectByPId','PId':_that.SubjectPId}
			})
			.then(function(response){
				console.log(response.data)
				_that.SubjectIds = response.data
				_that.SubjectId = '';
				_that.LoadManage()
			})
			.catch(function(response){
				console.log(response)
			})
	    	console.log('pid')
	    },
	    SearchStatu(){
	    	this.LoadManage()
	    },
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
		    params :{'mode':'ResPerson','SId':'7'}
		})
		.then(function(response){
			console.log(response.data)
			_that.ResPerson = response.data
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
	.el-button+.el-button{margin-right:10px;margin-left:0px}
	.InfoTable td{border:1px solid #ccc; padding:10px;}
	.InfoTable tr td:nth-child(odd){font-size:16px;font-weight:bolder;text-align:right}
	.InfoTable tr td:nth-child(even){text-align:left}
	.InfoTable tr td:nth-child(2){width:254px}
	.InfoTable tr td:nth-child(4){width:180px}
	.ButtonBox{width:100px;margin-top:20px}
</style>