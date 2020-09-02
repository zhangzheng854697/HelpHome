<template>
	<div id="app">
		<div class="content_title">
			<span>
				项目编号管理
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
			  	<span>一级学科</span>
				  <el-select v-model="SubjectPId" filterable @change="handleSubjectsPIdChange" placeholder="请选择一级学科">
				    <el-option
				      v-for="item in SubjectPIds"
				      :key="item.S_Code"
				      :label="item.S_Name"
				      :value="item.S_Code">
				    </el-option>
				  </el-select>
			  </el-col>
			  
			  <el-col :xs='24' :md='12' :lg="8">
			  	<span>检索</span>
				<el-input v-model="SearchValue" placeholder="请输入内容">
					<el-button slot="append" icon="el-icon-search" @click='SearchStatu()'></el-button>
				</el-input>
				
			  </el-col>
			  <el-col :xs='24' :md='12' :lg="8">
			  	<span>销售状态</span>
				  <el-select v-model="CStatesValue" filterable @change="handleCStatesChange" placeholder="请选择销售状态">
				    <el-option
				      v-for="item in CStates"
				      :key="item.StateCode"
				      :label="item.StateName"
				      :value="item.StateCode">
				    </el-option>
				  </el-select>
			  </el-col>
			  
			  <el-col :xs='24' :md='12' :lg="8">
			  	<span>二级学科</span>
				  <el-select v-model="SubjectId" filterable @change="handleSubjectIdChange" placeholder="请选择二级学科">
				    <el-option
				      v-for="item in SubjectIds"
				      :key="item.S_Code"
				      :label="item.S_Name"
				      :value="item.S_Code">
				    </el-option>
				  </el-select>
			  </el-col>
			</el-row>

		</div>
		<div class="ButtonBox">
			<el-button type="primary" @click='$router.push("AddProject")'>新增</el-button>
			<el-button type="success" @click='OnFile()'>预览/导出Excel</el-button>
			
		</div>
		<div class="content">
			<el-table
				ref="multipleTable"
				:row-key="getRowKey"
			    :data="tableData"
			    border
			    @row-click='clickRow'
			    style="width: 100%">
			    <el-table-column
			      type="selection"

			      width="50"
			      :reserve-selection="true">
			    </el-table-column>
			    <el-table-column
			      prop="rowIndex"
			      label="序号"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="P_Code"
			      label="项目编号"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="S_Name"
			      label="合作学校"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="P_Name"
			      label="项目名称">
			    </el-table-column>
			    <el-table-column
			      prop="S_Name1"
			      label="一级学科"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="S_Name2"
			      label="二级学科"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="P_FZR"
			      label="学校负责人"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="P_MFZR"
			      label="项目负责人"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="P_MCXFZR"
			      label="程序负责人"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="StateName"
			      label="销售状态"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="CreateTime"
			      label="创建时间"
			      width="100">
			    </el-table-column>
			    <el-table-column label="操作" width="197">
			        <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
				          type="primary"
				          @click.stop="handleInfo(scope.$index, scope.row)">详情</el-button>
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
		  <span>是否确认作废？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="centerDialogVisible = false;handleDelete()">确 定</el-button>
		  </span>
		</el-dialog>

		<el-dialog title="数据预览" :visible.sync="dialogTableVisible" id="OnFile">
			<div>
				<p>共选中<span> {{TotalSelect}} </span>条数据，<a v-bind:href="DownloadUrl" target="_blank"> 点击此处下载excel表格</a></p>
			</div>
			<el-table :data="OnFileData">
				<el-table-column label="序号" width="50">
					<template slot-scope="scope">
		              {{scope.$index+1}} 
		            </template>
				</el-table-column>
				<el-table-column property="P_Code" label="项目编号" width="120"></el-table-column>
				<el-table-column property="S_Name1" label="一级学科" width="150"></el-table-column>
				<el-table-column property="S_Name2" label="二级学科" width="150"></el-table-column>
				<el-table-column property="S_Name" label="合作学校" width="150"></el-table-column>
				<el-table-column property="P_FZR" label="学校负责人" width="150"></el-table-column>
				<el-table-column property="P_Name" label="项目名称"></el-table-column>
				
			</el-table>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
  import global_ from '../Global.js';
  export default {
    data() {
      return {
      	TipShow:false,
      	dialogTableVisible:false,
      	centerDialogVisible:false,
      	SearchValue:'',
      	DownloadUrl:'',
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
        OnFileData:[],
        TotalSelect:'', 
      }
    },
	methods:{
		getRowKey (row) {
	      return row.P_Id
	    },
		clickRow(row){
			this.$refs.multipleTable.toggleRowSelection(row);
		},
		handleDeleteBefore(index,row){
			console.log(row)
			this.centerDialogVisible = true;
			this.F_Id = row.P_Id;
		},
		LoadManage(){
			this.offset = (this.currentPage-1)*this.limit
			let _that = this;
			this.$axios({
			    method: 'get',
			    url: global_.HandlerZy,
			    // headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'QryProject','limit':_that.limit,'offset':_that.offset,'order':'asc','name':_that.SearchValue,'schoolId':_that.SchoolValue,'SubjectPId':_that.SubjectPId,'SubjectId':_that.SubjectId,'CStateId':_that.CStatesValue}
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

			let F_Id = row.P_Id;
			this.$router.push({path:'EditProject',query:{'id':F_Id}})
		},
		handleDelete(){
			let F_Id = this.F_Id;
			let _that = this;
			let fromdata = `mode=EditProjectZF&id=${F_Id}`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerZy,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data :fromdata
			})
			.then(function(response){
				console.log(response)
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
	    handleSubjectIdChange(val){
	    	this.LoadManage()
	    },
	    SearchStatu(){
	    	this.LoadManage()
	    },
	    handleInfo(index,row){
	    	let F_Id = row.P_Id;
			this.$router.push({path:'InfoProject',query:{'id':F_Id}})
	    },
	    OnFile(){

	    	let rows = this.$refs.multipleTable.selection;
	    	console.log(rows)
	    	if(rows.length<=0){

	    		this.$layer.msg('请勾选内容后再导出');

	    		return
	    	}
	    	this.OnFileData = rows;
	    	this.TotalSelect = rows.length
	    	this.dialogTableVisible = true;
	    	let arr = [];
	    	let excelName = '梦之路产品清单';
	    	rows.forEach(function(item,i){
	    		arr.push(item.P_Id)
	    	})
	    	let _that = this;
	    	let formdata = `mode=DataSetToExcel&pIds=${arr}&excelName=${excelName}`
			this.$axios({
			    method: 'post',
			    url: global_.HandlerDaoChu,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    data:formdata
			})
			.then(function(response){
				let res = response.data;
				if(res.success){
					_that.DownloadUrl = global_.url_prefix+"/Project_Excel/" + res.msg
					// window.open(global_.url_prefix+"Project_Excel/" + res.msg);
				}
			})
			.catch(function(response){
				console.log(response)
			})
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
		    params :{'mode':'ResSubjectByPId','PId':'1'}
		})
		.then(function(response){
			_that.SubjectPIds = response.data
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
	.cell .el-button+.el-button{margin-right:0px;margin-left:0px}
	.el-button+.el-button{margin-right:10px;margin-left:10px}
	.InfoTable td{border:1px solid #ccc; padding:10px;}
	.InfoTable tr td:nth-child(odd){font-size:16px;font-weight:bolder;text-align:right}
	.InfoTable tr td:nth-child(even){text-align:left}
	.InfoTable tr td:nth-child(2){width:254px}
	.InfoTable tr td:nth-child(4){width:180px}
	.ButtonBox{width:235px;margin-top:20px}
	.dialog-footer button{margin:0 10px}
	>>>#OnFile .el-dialog__body .el-table__body-wrapper{max-height:500px;overflow-y:auto}
	#OnFile a{color:red}
	#OnFile a:hover{text-decoration:none}
	>>>.el-dialog__body{padding-top:10px}
	>>>.el-dialog{width:70%} 
</style>