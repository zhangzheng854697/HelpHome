<template>
	<div id="main">
		<div class="loginBox">
			<div class="logo">
				<img src="../assets/logo_index.png"  width="460">
			</div>
			<div class="login_bg">
				<div>
          <form  onkeydown="if(event.keyCode==13){return false;}">
            <div>
              <el-input placeholder="请输入账号" autofocus v-model="UserName" @keyup.enter.native="Login">
                <template slot="prepend">账号：</template>
              </el-input>
            </div>
            <div>
              <el-input placeholder="请输入密码" v-model="PassWord" show-password @keyup.enter.native="Login">
                <template slot="prepend">密码：</template>
              </el-input>
            </div>
            <div>
              <el-checkbox v-model="checked">保存为本地常用账号</el-checkbox>
            </div>
            <div>
              <el-button type="primary" @click='Login()'>登 录</el-button>
            </div>
          </form>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
  import global_ from './Global.js';
  export default {
    data() {
      return {
        checked:false,
      	UserName: '',
      	PassWord:'',
      }
    },
	methods:{
		Login(){
			if(this.UserName == ''){
				this.$message.error('请输入账号');
			}else if(this.PassWord == ''){
				this.$message.error('请输入密码');
			}else{
				let fromdata = `uname=${this.UserName}&upwd=${this.PassWord}`
				let _that = this
				this.$axios({
				    method: 'post',
				    url: global_.HandlerLogin,
				    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				    data:fromdata
				})
				.then(function(response){
					let res = response.data
					if(res.success == false){
						_that.$message.error(res.msg);
					}else{
            localStorage.setItem("person_StateID",res[0].person_StateID)
            localStorage.setItem("person_Role",res[0].person_Role)
            localStorage.setItem('checked',_that.checked)
            localStorage.setItem('UserName',_that.checked)
            localStorage.UserName = res[0].person_Number;
            if(_that.checked){
              localStorage.setItem('UserNumber',_that.UserName)
              localStorage.setItem('UserPwd',_that.PassWord)
            }else{
              localStorage.setItem('UserNumber','')
              localStorage.setItem('UserPwd','')
            }
						_that.$router.push('ProjectCode')
					}
				})
				.catch(function(response){
					console.log(response)
				})
			}

		}
	},
  mounted(){
    let _that = this;

    this.$axios({
        method: 'post',
        url: global_.HandlerLoginIserror,
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then(function(response){
      let res = response;
      if(res.data.success == false){
        return false;
      }else{
        localStorage.UserName = response.data[0].person_Number
        console.log(res)
        _that.$router.push('ProjectCode')
      }
    })
    .catch(function(response){
      return false;
    })
    this.checked = localStorage.checked == 'true'?true:false
    if(this.checked){
      this.UserName = localStorage.UserNumber
      this.PassWord = localStorage.UserPwd
    }
  }
  }
</script>
<style scoped>
#main{width: 100%;height: 100%;min-height: 600px;background: url(../assets/login_bg.jpg) center;position: absolute;}
.loginBox{width:520px;height:450px;position:absolute;top:50%;left:50%;margin-left:-260px;margin-top:-225px;}
.login_bg{background:url(../assets/logincon_bg.png) no-repeat center;width: 520px;height: 416px;margin-top:20px;}
.el-input{width:400px;height:48px}
>>> .el-input__inner{height:48px}
.el-button{width:400px;padding:14px 20px;font-size:18px}
.login_bg>div{padding:98px 0}
.login_bg>div .el-input{margin-bottom:30px}
.login_bg>div>div{position:relative}
.el-checkbox{margin-bottom:20px}
</style>
