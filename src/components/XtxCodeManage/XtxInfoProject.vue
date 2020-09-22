<template>
	<div id="app">
		<div class="content_title">
			<span>
				项目详情
			</span>
		</div>
		<div class="content">
			<div class="InfoTable">
				<table>
					<tr>
						<td>项目名称：</td>
						<td colspan="2">
							<el-input v-model="TableData.P_Name"  :disabled="disabled">

							</el-input>
						</td>
					</tr>
          <tr>
            <td>许可证：</td>
            <td colspan="2">
              <el-input v-model="TableData.C_License"  :disabled="disabled">

              </el-input>
            </td>
          </tr>
					<tr>
						<td>采购学校：</td>
						<td>
							<el-input v-model="TableData.S_Name"  :disabled="disabled">

							</el-input>
						</td>
            <td>部署状态：</td>
            <td>
              <el-input v-model="TableData.C_DeployStateName"  :disabled="disabled">

              </el-input>
            </td>
					</tr>
          <tr>
            <td>部署人员：</td>
            <td>
              <el-input v-model="TableData.C_Deploy"  :disabled="disabled">

              </el-input>
            </td>
            <td>项目网址：</td>
            <td>
              <el-input v-model="TableData.C_Website"  :disabled="disabled">

              </el-input>
            </td>
          </tr>
          <tr>
            <td>开始日期：</td>
            <td>
              <el-input v-model="TableData.C_StartDate"  :disabled="disabled">

              </el-input>
            </td>
            <td>结束日期：</td>
            <td>
              <el-input v-model="TableData.C_EndDate"  :disabled="disabled">

              </el-input>
            </td>
          </tr>
					<tr>
						<td>市场人员：</td>
						<td>
							<el-input v-model="TableData.C_Market"  :disabled="disabled">

							</el-input>
						</td>
						<td>客户状态：</td>
						<td>
							<el-input v-model="TableData.ClientStateName"  :disabled="disabled">

							</el-input>
						</td>
					</tr>
          <tr>
            <td>客户联系人：</td>
            <td>
              <el-input v-model="TableData.C_liaison"  :disabled="disabled">

              </el-input>
            </td>
            <td>联系方式：</td>
            <td>
              <el-input v-model="TableData.C_Phone"  :disabled="disabled">

              </el-input>
            </td>
          </tr>
          <tr>
            <td>操作人：</td>
            <td>
              <el-input v-model="TableData.person_Name"  :disabled="disabled">

              </el-input>
            </td>
            <td>操作时间：</td>
            <td>
              <el-input v-model="TableData.CreateTime"  :disabled="disabled">

              </el-input>
            </td>
          </tr>

					<tr>
						<td>项目参数：</td>
						<td colspan="3">
							<el-input
							  type="textarea"
							  :rows="14"

							  v-model="TableData.C_Remark"
							  :disabled="disabled">
							</el-input>
						</td>
					</tr>
				</table>
		    	<div class='button'>
					<el-button type="primary" @click='backPage()'>返 回</el-button>
		    	</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
  import global_ from '../Global.js';
  export default {
    data() {
      return {
      		disabled:true,
          TableData:{},
      }
    },
	methods:{
		LoadManage(){
			let F_id = this.$route.query.id
			let _that = this;
			this.$axios({
			    method: 'post',
			    url: global_.HandlerSchoolClient,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{'mode':'QrySchoolClientById','id':F_id}
			})
			.then(function(response){
				let res = response.data[0];
				_that.TableData = res;

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
		backPage(){
			this.$router.push('/XtxManage')
		}
	},
    mounted(){
    	this.LoadManage()
    },
    activated(){

    }
  }
</script>
<style scoped>
.content{width:1000px;box-sizing:border-box;padding:20px}
.content .el-col{text-align:left;margin-bottom:20px}
.content .el-col>span{margin-right:6px;font-size:18px;display:inline-block;width:136px;text-align:right}

.content .el-textarea{width:800px}
.text_title{line-height:222px}


.InfoTable td{ padding:10px;}
.InfoTable tr td:nth-child(odd){font-size:16px;font-weight:bolder;text-align:right}
.InfoTable tr td:nth-child(even){text-align:left}
.InfoTable tr td:nth-child(2){width:254px}
.InfoTable tr td:nth-child(3){width:80px}

.InfoTable tr td:nth-child(4){width:254px}
.ButtonBox{width:100px;margin-top:20px}
>>>textarea{font-size:16px}
.el-input{width:100%}
>>>.el-input.is-disabled .el-input__inner{color:#28292b}

</style>
