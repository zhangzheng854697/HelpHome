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
							<el-input v-model="P_Name" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
					</tr>
					<tr>
						<td>产品合并名称：</td>
						<td colspan="2">
							<el-input v-model="P_MergeName" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
					</tr>
					<tr>
						<td>一级学科：</td>
						<td>
							<el-input v-model="S_NameYi" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
						<td>二级学科：</td>
						<td>
							<el-input v-model="S_NameEr" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
					</tr>
					<tr>
						<td>销售状态：</td>
						<td>
							<el-input v-model="StateName" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
						<td>产品报价：</td>
						<td>
							<el-input v-model="P_Price" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
					</tr>
					<tr>
						<td>项目负责人：</td>
						<td>
							<el-input v-model="P_MFZR" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
						<td>程序负责人：</td>
						<td>
							<el-input v-model="P_MCXFZR" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
					</tr>
					<tr>
						<td>学校负责人：</td>
						<td>
							<el-input v-model="P_FZR" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
						<td>联系方式：</td>
						<td>
							<el-input v-model="P_FZR_Phone" placeholder="请输入内容" :disabled="disabled">
								
							</el-input>
						</td>
					</tr>
					<tr>
						<td>项目参数：</td>
						<td colspan="3">
							<el-input
							  type="textarea"
							  :rows="14"
							  placeholder="请输入内容"
							  v-model="textarea"
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
      		P_Name:'',
      		P_MergeName:'',
      		S_NameYi:'',
      		S_NameEr:'',
      		StateName:'',
      		P_Price:'',
      		P_MFZR:'',
      		P_MCXFZR:'',
      		P_FZR:'',
      		P_FZR_Phone:'',
      		textarea:'1.实验内容：（1）气体分析仪器的操作（2）无创心功能的操作（3）血液成分分析仪操作（4）运动过程中呼吸、心功能、血液等变化2.参数特点：通过“虚拟快进”、“时空融合”等虚拟手段，突破真实实验的局限性，在没有运动伤害和致命风险情况下，直观再现运动过程中的氧运输系统机能变化。帮助学生深入理解人体机能状态的个体差异与影响因素，培养学生研究分析能力与科研意识。为将来开具个性化的运动训练方案和健身处方累积经验。',
      		



      	}
    },
	methods:{
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
				console.log(response)
				let res = response.data[0];
				console.log(res)
				_that.P_Name = res.P_Name?res.P_Name:'暂无'
				_that.P_MergeName = res.P_MergeName?res.P_MergeName:'暂无'
				_that.S_NameYi = res.S_NameYi?res.S_NameYi:'暂无'
				_that.S_NameEr = res.S_NameEr?res.S_NameEr:'暂无'
				_that.StateName = res.StateName?res.StateName:'暂无'
				_that.P_Price = res.P_Price?res.P_Price:'暂无'
				_that.P_MFZR = res.P_MFZR?res.P_MFZR:'暂无'
				_that.P_MCXFZR = res.P_MCXFZR?res.P_MCXFZR:'暂无'
				_that.P_FZR = res.P_FZR?res.P_FZR:'暂无'
				_that.P_FZR_Phone = res.P_FZR_Phone?res.P_FZR_Phone:'暂无'
				_that.textarea = res.P_Remark?res.P_Remark:'暂无'

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
			this.$router.push('ProjectCode')
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
>>>.el-textarea.is-disabled .el-textarea__inner{color:#28292b}
</style>