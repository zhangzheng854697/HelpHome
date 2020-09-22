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
          <!--<tr v-for="(item , index) in C_License">-->
            <!--<td v-if="index==0">序列号：</td>-->
            <!--<td v-else></td>-->
            <!--<td colspan="2">-->
              <!--<el-input v-model="C_License[index]"  :disabled="disabled">-->
              <!--</el-input>-->
            <!--</td>-->
          <!--</tr>-->
          <tr>
            <td>序列号：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                :rows="TableData.C_Amount+1"
                v-model="C_License"
                :disabled="disabled">
              </el-input>
            </td>
          </tr>
          <tr>
            <td>序列号数量：</td>
            <td colspan="1">
              <el-input v-model="TableData.C_Amount"  :disabled="disabled">

              </el-input>
            </td>
          </tr>
					<tr>
						<td>客户名称：</td>
						<td>
							<el-input v-model="TableData.S_Name"  :disabled="disabled">

							</el-input>
						</td>
						<td>版本：</td>
						<td>
							<el-input v-model="TableData.VersionName" :disabled="disabled">

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
						<td>备注：</td>
						<td colspan="3">
							<el-input
							  type="textarea"
							  :rows="4"

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
          C_License:'',
          TableData:{},
          testarea1:'123123',
      		textarea:'1.实验内容：（1）气体分析仪器的操作（2）无创心功能的操作（3）血液成分分析仪操作（4）运动过程中呼吸、心功能、血液等变化2.参数特点：通过“虚拟快进”、“时空融合”等虚拟手段，突破真实实验的局限性，在没有运动伤害和致命风险情况下，直观再现运动过程中的氧运输系统机能变化。帮助学生深入理解人体机能状态的个体差异与影响因素，培养学生研究分析能力与科研意识。为将来开具个性化的运动训练方案和健身处方累积经验。',
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
				console.log(res)
        _that.TableData = res;
        _that.C_License = res.C_License.replace(/;/g,'\r\n');

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
			this.$router.push('/EspManage')
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
