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
          <span class="is-required" >项目名称 :</span>
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
				  	<span class="is-required">采购学校 :</span>
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
				  	<span class="is-required">部署人员 :</span>
					<el-select v-model="C_Deploy" filterable @change="handleResPersonChange" placeholder="请选择">
						<el-option
						  v-for="item in ResPerson"
						  :key="item.person_Number"
						  :label="item.person_Name"
						  :value="item.person_Number">
						</el-option>

					</el-select>
			    </el-col>
			    <el-col>
			    	<span class="is-required">部署状态 :</span>
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
				  	<span class="is-required">项目网址 :</span>
					<el-input v-model="ProjectWeb" placeholder="请输入项目网址">

					</el-input>
			    </el-col>
			    <el-col>
				  	<span>序列号 :</span>
					<el-input v-model="License" placeholder="请输入序列号">

					</el-input>
			    </el-col>

			    <el-col>
			    	<span class="is-required">市场人员 :</span>
					<el-select v-model="C_Market" filterable @change="handleCResPersonChange" placeholder="请选择市场人员">
						<el-option
						  v-for="item in C_ResPerson"
						  :key="item.person_Number"
						  :label="item.person_Name"
						  :value="item.person_Number">
						</el-option>
					</el-select>
			    </el-col>
          <el-col>
            <span class="is-required">客户状态 :</span>
            <el-select v-model="ClientState" filterable  placeholder="请选择客户状态">
              <el-option
                v-for="item in select_ClientState"
                :key="item.ClientCode"
                :label="item.ClientState"
                :value="item.ClientCode">
              </el-option>
            </el-select>
          </el-col>
          <el-col>
            <span>使用日期 :</span>
            <el-date-picker
              v-model="SelectTime"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="left">
            </el-date-picker>
          </el-col>

          <el-col>
            <span>客户联系人 :</span>
            <el-input v-model="liaison" placeholder="请输入客户联系人">

            </el-input>
          </el-col>
          <el-col>
            <span>联系方式 :</span>
            <el-input v-model="liaisonPhone" placeholder="请输入联系方式">

            </el-input>
          </el-col>
			    <el-col>
			    	<span class='text_title'>项目参数 :</span>
					<el-input type="textarea" style="" placeholder="请输入项目参数" v-model="Remark"  :rows="6" resize="none" show-word-limit></el-input>
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
          liaison:'',
          liaisonPhone:'',
          pickerOptions: {
            shortcuts: [{
              text: '最近一个月',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近五年',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(end.getTime() + 157766400000);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '永久',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(end.getTime() + 2492985600000);
                  picker.$emit('pick', [start, end]);
                }
              }]
          },
          SelectTime:'',
          ClientState:'',
          select_ClientState:[
            {
              'ClientCode':1,
              'ClientState':'正式客户'
            },
            {
              'ClientCode':2,
              'ClientState':'意向用户'
            },
            {
              'ClientCode':3,
              'ClientState':'试用客户'
            },
          ],
      		License:'',
      		P_Id:'',
      		SelectProject:[],
      		ProjectValue:'',
   			  SelectSchool:[],
      		SchoolValue:'',
      		ResPerson:[],
      		C_Deploy:'',
      		C_DeployName:'',
      		C_Market:'',
      		C_MarketName:'',
      		C_ResPerson:[],
      		CStates:[{
	      		StateCode:2,
	      		StateName:'学校服务器'
	      	},{
	      		StateCode:1,
	      		StateName:'公司服务器'
	      	}],
	      	StatesValue:'',

	      	ProjectWeb:'',
	      	Remark:''
      	}
    },
	methods:{
		LoadProject(){
			let _that = this;
			let fromdata = `mode=ResProject&configure=5`
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
			    url: global_.HandlerPerson,
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
			    url: global_.HandlerPerson,
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
		handleSchoolChange(){

		},
		handleResPersonChange(){

		},
		handleCResPersonChange(){

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
			}else if(!this.ClientState){
				this.$layer.msg('请选择客户状态');
				return;
			}else if(this.StatesValue!=1&&this.StatesValue!=2){
        this.$layer.msg('请选择部署状态');
        return;
      }else if(!this.ProjectWeb){
				this.$layer.msg('请填写项目地址');
				return;
			}

			let _that = this;
			let fromdata = `mode=InsSchoolClient&Remark=${this.Remark}`
      let StartDate = '';
      let EndDate = '';
      if(this.SelectTime){
        StartDate = new Date(this.SelectTime[0])
        EndDate = new Date(this.SelectTime[1])
        StartDate=StartDate.getFullYear() + '-' + (StartDate.getMonth() + 1) + '-' + StartDate.getDate() ;
        EndDate=EndDate.getFullYear() + '-' + (EndDate.getMonth() + 1) + '-' + EndDate.getDate() ;
      }
			this.$axios({
			    method: 'post',
			    url: global_.HandlerSchoolClient,
			    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			    params :{
			      'SCode':_that.SchoolValue,
            'PCode':_that.ProjectValue,
            'Person1':_that.C_Deploy,
            'Person6':_that.C_Market,
            'DeployState':_that.StatesValue,
            'Website':_that.ProjectWeb,
            'MACLicense':_that.License,
            'ESPLicense':'',
            'Version':'',
            'ClientState':_that.ClientState,
            'Amount':'',
            'StartDate':StartDate,
            'EndDate':EndDate,
            'liaison':_that.liaison,
            'Phone':_that.liaisonPhone,
            'Role':5
          },
			    data:fromdata
			})
			.then(function(response){
				let res = response.data
				if(res.success == true){
					_that.CopyMsg(res.msg);
					_that.$layer.msg('编辑成功');
					setTimeout(function(){ _that.backPage() }, 1500);
				}
			})
			.catch(function(response){
				console.log(response)
			})
		},
		CopyMsg(val){
			var input = document.createElement("input");
		    input.value = val;
		    document.body.appendChild(input);
		    input.select();
		    document.execCommand("Copy");
		    document.body.removeChild(input);
		},
		backPage(){
			this.$router.push('/XtxManage')
		}
	},
    mounted(){

    	this.LoadProject()
    	this.LoadSchool()
    	this.LoadPerson()
    	this.LoadCPerson()
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
>>>.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{width:440px}

</style>
