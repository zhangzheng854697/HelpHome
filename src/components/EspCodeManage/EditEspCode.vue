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
          <span class="is-required">客户名称 :</span>
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
          <span class="is-required">版本 :</span>
          <el-select v-model="select_Version" filterable @change="handleCStatesChange" placeholder="请选择版本">
            <el-option
              v-for="item in Version"
              :key="item.StateCode"
              :label="item.StateName"
              :value="item.StateCode">
            </el-option>
          </el-select>
        </el-col>
        <el-col v-for="item in LicenseList" v-bind:key="item.LicenseId">
          <span>{{item.LicenseTitle}}</span>
          <el-input v-model="item.License" placeholder="请输入序列号">
            <div v-if="item.LicenseAdd" slot="append">
              <i  class="el-input__icon el-icon-circle-plus-outline"  @click="addLicense()"></i>
              <i  class="el-input__icon el-icon-circle-plus-outline"  style="visibility:hidden"></i>
            </div>
            <div v-else="item.LicenseAdd" slot="append">
              <i class="el-input__icon el-icon-circle-plus-outline"  @click="addLicense()"></i>
              <i class="el-input__icon el-icon-remove-outline"  @click="deleteLicese(item)"></i>
            </div>
          </el-input>

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
          <span class='text_title'>备注 :</span>
          <el-input type="textarea" style="" placeholder="请输入备注" v-model="Remark"  :rows="6" resize="none" show-word-limit></el-input>
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
        LicenseList:[
          {
            LicenseTitle:'序列号:',
            LicenseId:0,
            License:'',
            LicenseAdd:true,
          },
        ],
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
        Version:[{
          StateCode:1,
          StateName:'生理学'
        },{
          StateCode:2,
          StateName:'案例版'
        }],
        select_Version:'',
        ProjectWeb:'',
        Remark:''
      }
    },
    methods:{
      addLicense(Num){
        let License = ''
        if(Num){
          License = Num
        }
        let index = this.LicenseList.length-1
        let Lindex = this.LicenseList[index].LicenseId+1
        let obj = {
          'LicenseTitle':'',
          'LicenseId':Lindex,
          'License':License,
          'LicenseAdd':false
        }
        this.LicenseList.push(obj)
      },
      deleteLicese(item){
        let index = this.LicenseList.indexOf(item)
        this.LicenseList.splice(index,1)
      },
      LoadProject(){
        let _that = this;
        let fromdata = `mode=ResProject&configure=7`
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
      LoadManage(){
        let F_id = this.$route.query.id
        this.P_Id = F_id;

        let _that = this;
        let fromdata = `mode=QrySchoolClientById&id=${F_id}`
        this.$axios({
          method: 'post',
          url: global_.HandlerSchoolClient,
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
          data:fromdata
        })
          .then(function(response){
            let res = response.data[0];
            _that.ProjectValue = res.P_Code
            _that.SchoolValue = res.S_Code
            _that.C_Deploy = Number(res.C_Deploy)
            _that.C_Market = res.C_Market
            _that.select_Version = Number(res.C_Version)
            _that.StatesValue = Number(res.C_DeployState)
            _that.License = res.C_License
            _that.ProjectWeb = res.C_Website
            _that.Remark = res.C_Remark
            _that.ClientState = res.C_ClientState
            _that.liaison = res.C_liaison
            _that.liaisonPhone = res.C_Phone
            let EndDate = _that.getDateStr(res.C_EndDate)
            let StartDate = _that.getDateStr(res.C_StartDate)
            _that.SelectTime = [new Date(StartDate),new Date(EndDate)]
            console.log(_that.SelectTime)
            let C_License = res.C_License.split(';')
            C_License.pop();
            C_License.forEach(function(item,i){
              if(i == 0){
                _that.LicenseList[0].License = item;
              }else{
                _that.addLicense(item)
              }
            })
          })
          .catch(function(response){
            console.log(response)
          })
      },
      getDateStr(date){
        let arr = date.replace(/-/g,',')
        return arr;
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
        let LicenseArray='';
        for(let i=0;i<this.LicenseList.length;i++){
          if(!this.LicenseList[i].License){
            this.$layer.msg('请填写完整序列号');
            return false;
          }
          LicenseArray += this.LicenseList[i].License+';';
        }
        if(!this.ProjectValue){
          this.$layer.msg('请选择项目');
          return;
        }else if(!this.SchoolValue){
          this.$layer.msg('请选择采购学校');
          return;
        }else if(!this.C_Market){
          this.$layer.msg('请选择市场人员');
          return;
        }else if(!this.select_Version){
          this.$layer.msg('请选择市场人员');
          return;
        }else if(!this.ClientState){
          this.$layer.msg('请选择版本');
          return;
        }

        let _that = this;
        let fromdata = `mode=EditSchoolClient&Remark=${this.Remark}&id=${_that.P_Id}`
        let StartDate = '';
        let EndDate = '';
        if(this.SelectTime){
          StartDate = new Date(this.SelectTime[0])
          EndDate = new Date(this.SelectTime[1])
          StartDate=StartDate.getFullYear() + '-' + (StartDate.getMonth() + 1) + '-' + StartDate.getDate();
          EndDate=EndDate.getFullYear() + '-' + (EndDate.getMonth() + 1) + '-' + EndDate.getDate();
        }
        this.$axios({
          method: 'post',
          url: global_.HandlerSchoolClient,
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
          params :{
            'SCode':_that.SchoolValue,
            'PCode':_that.ProjectValue,
            'Person1':'',
            'Person6':_that.C_Market,
            'DeployState':'',
            'Website':'',
            'MACLicense':'',
            'ESPLicense':LicenseArray,
            'Version':_that.select_Version,
            'ClientState':_that.ClientState,
            'Amount':_that.LicenseList.length,
            'StartDate':StartDate,
            'EndDate':EndDate,
            'liaison':_that.liaison,
            'Phone':_that.liaisonPhone,
            'Role':7
          },
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
        this.$router.push('/EspManage')
      }
    },
    mounted(){
      this.LoadProject()
      this.LoadSchool()
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
  >>>.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{width:440px}
  >>>.el-input-group__append, .el-input-group__prepend{background-color:#fff;border:0px;padding:0 10px}
  >>>.el-input__icon{line-height:38px;font-size: 22px;font-weight: 700}
  >>>.el-input__icon:hover{color:#077af3;cursor:pointer}
</style>
