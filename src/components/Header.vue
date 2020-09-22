<template>
	<div>
		<div class="left">
			<el-tag @click="ToProjectCode()" :effect="effect">项目编码管理</el-tag>
			<el-tag
			  v-for="tag in tags"
			  :key="tag.name"
			  closable
			  :type="tag.type"
			  @click="LinkTo(tag)"
			  @close="handleClose(tag)"
			  :effect="tag.effect">
			  {{tag.name}}

			</el-tag>
		</div>
		<div class="right">
			<div class="block">
				<div class="userImage">
					<div>
						<img src="../assets/user.png" height="50" width="50">
					</div>
					<div class="userBox">
						<!--<h1>{{Code}}</h1><br/>-->
						<h1>{{User}}</h1>

					</div>

					<div class="logOut">
            <div  @click="ChangePassword()">修改密码</div>
            <div  @click="LogOut()">退出登录</div>

					</div>
				</div>
			</div>
		</div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible"  :before-close="BfClosePsdBox">
      <el-form :model="form">
        <el-form-item label="用户名:" >
          <el-input v-model="form.person_Name" autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属部门:" >
          <el-input v-model="form.D_Name" autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="旧密码:" >
          <el-input v-model="form.OPsd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码:" >
          <el-input v-model="form.NPsd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" >
          <el-input v-model="form.SNPsd" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BfClosePsdBox()">取 消</el-button>
        <el-button type="primary" @click="ChangePsdSure()">确 定</el-button>
      </div>
    </el-dialog>
	</div>

</template>
<script type="text/javascript">
	import global_ from './Global.js';
	import store from '../store/store.js'
	import addTag from './main.js'
	export default{
		data(){
			return{
				User:'',
				Code:'',
				tags:'',
				effect:'light',
        dialogFormVisible:false,
        form: {
          person_Name: '',
          D_Name: '',
          OPsd: '',
          NPsd: '',
          SNPsd:''
        },
			}
		},
		methods:{
			LogOut(){
				let _that = this;
				this.$axios({
				    method: 'post',
				    url: global_.HandlerLogout,
				    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				})
				.then(function(response){
					_that.$router.push('/Login')

				})
				.catch(function(response){
					console.log(response)
				})
			},
      ChangePassword(){
        let _that = this;
        this.$axios({
            method: 'post',
            url: global_.HandlerPwd,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            params :{'mode':'QueryPersonByUId'}
           })
          .then(function(response){
            let res = response.data[0];
            _that.form.person_Name = res.person_Name;
            _that.form.D_Name = res.D_Name+'--'+res.D_Name1;

          })
          .catch(function(response){
            console.log(response)
          })
        this.dialogFormVisible = true
      },
      ChangePsdSure(){

			  if(this.form.OPsd == ""){
          this.$layer.msg('请输入旧密码');
          return
        }else if(this.form.NPsd == ""){
          this.$layer.msg('请输入新密码');
          return ;
        }else if(this.form.SNPsd == ""){
          this.$layer.msg('请确认新密码');
          return ;
        }else if(this.form.NPsd != this.form.SNPsd){
          console.log(this.form.NPwd )
          console.log(this.form.NPsd )
          this.$layer.msg('两次密码输入不一样');
          return ;
        }
			  let _that = this;
			  let fromdata = `mode=EditPwd&yPwd=${this.form.OPsd}&xPwd=${this.form.NPsd}`
        this.$axios({
          method: 'post',
          url: global_.HandlerPwd,
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
          data:fromdata
        })
        .then(function(response){
          console.log(response)
          let res = response.data;
          if(res.success == true){
            _that.$layer.msg('修改成功');
            _that.form.person_Name = '';
            _that.form.D_Name = '';
            _that.form.OPsd = '';
            _that.form.NPsd = '';
            _that.form.SNPsd = '';
            _that.dialogFormVisible = false
          }else{
            _that.$layer.msg(res.msg);
          }

        })
        .catch(function(response){
          console.log(response)
        })

      },
      BfClosePsdBox(){
        this.form.person_Name = '';
        this.form.D_Name = '';
        this.form.OPsd = '';
        this.form.NPsd = '';
        this.form.SNPsd = '';
        this.dialogFormVisible = false
      },
			LinkTo(tag){
				this.$router.push({path:'/'+tag.href})
			},
			handleClose(tag){
				let arr = this.$store.state.tags
				let index = arr.indexOf(tag)
				if(this.$route.path == '/'+arr[index].href){
					this.$router.push({path:'/ProjectCode'})
				}
				arr.splice(index,1)
			},
			ToProjectCode(){
				if(this.$route.path!='/ProjectCode'){
					this.$router.push({path:'/ProjectCode'})
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
					_that.$router.push('/Login')
				}else{
					_that.User = response.data[0].person_Name;
					_that.Code = response.data[0].person_Number;

				}
			})
			.catch(function(response){
				console.log(response)
				_that.$router.push('Login')
			})

			// console.log(this.$store.state)
			addTag.addTag(this.$route.path);
			this.tags = this.$store.state.tags;

		},
		watch:{
		  $route(to,from){
		    addTag.addTag(to.path);
			this.tags = this.$store.state.tags;
			let Path = this.$route.path.split('/')[1]
			if(Path == 'ProjectCode'){
				this.effect = 'light'
			}else{
				this.effect = 'plain'
			}
		  }
		},
	}
</script>
<style scoped>
h1 span{cursor:pointer}
.left{float:left}
.right{float:right}
.el-tag{border:0px;height:66px;line-height:68px;border-radius:0px;padding:0 20px;cursor:pointer;border-right:1px solid #eee;float:left}
.block{margin-top:7px;cursor:pointer}
.block>div>div{float:left}
.userImage{line-height:22px;height:50px;position: relative;padding-bottom:10px}
.block>div>div span{float:left}
.block>div>div h1{display:inline-block}
.userBox{min-width:50px;text-align:center;margin:15px 12px 0 4px}
.logOut{border:1px solid #ccc;position:absolute;top:55px;border-radius:5px;background: #fff;overflow:hidden;opacity:0;transition: all .2s ease-in-out;z-index:999}
.logOut>div{padding:10px 20px}
.logOut>div:hover{background:#eee}
.userImage:hover .logOut{opacity:1;transition: all .2s ease-in-out;}
>>>.el-header{line-height:auto}
>>>.el-dialog{width:550px}
>>>.el-dialog__header{line-height:20px;margin-bottom:20px}
>>>.el-form-item__label{width:108px}
.PsdBox p{height:20px;line-height:20px;margin-top:10px}
>>>.el-dialog__body{padding:0 20px}
>>>.el-input{width:400px}
.PsdBox span{width:100px;display:inline-block;text-align:right}
>>>.el-dialog__footer{padding:0 0 20px ;text-align:center}
.PsdBox p{text-align:left;font-size:18px}
.PsdBox p span{font-size:14px;}

</style>
