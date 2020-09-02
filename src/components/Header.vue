<template>
	<h1>welcome {{User}} <span @click='LogOut()'>注销</span></h1>
</template>
<script type="text/javascript">
	import global_ from './Global.js';
	import store from '../store/store.js'
	export default{
		data(){
			return{
				User:''
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
					_that.$router.push('Login')

				})
				.catch(function(response){
					console.log(response)
				})
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
					_that.$router.push('Login')
				}else{
					_that.User = response.data[0].person_Name;
				}
				
			})
			.catch(function(response){
				console.log(response)
				_that.$router.push('Login')
			})
			// console.log(store)

			console.log(this.$store.state)


		}
	}
</script>
<style scoped>
h1 span{cursor:pointer}

</style>