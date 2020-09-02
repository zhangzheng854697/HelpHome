<template>
	<el-container>
		<el-aside width="200px">
			<Nav></Nav>
		</el-aside>
		<el-container>
			<el-header height="68px">
				<Header></Header>
			</el-header>
			<el-main v-bind:style="{height: MainHeight+'px'}">
				<keep-alive>
					<router-view v-if="$route.meta.KeepAlive"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.KeepAlive"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<script type="text/javascript">

	import Nav from '@/components/Nav.vue'
	import Header from '@/components/Header.vue'
	export default {
	  components:{
	    'Nav': Nav,
	    'Header':Header,

	  },
	  data(){
	  	return {
	  		MainHeight:968,
	  	}
	  	
	  },
	  mounted(){
	    this.MainHeight = window.innerHeight-100

	  }
	}
</script>
<style scoped>
.el-aside{width: 200px;}
.is-vertical{width: 100%;box-sizing: border-box;height: 100%}
.el-aside{border-right:1px solid #eee;overflow:hidden;box-shadow:0px 0px 10px #ccc;}
.el-header{background:#fff;border-bottom:1px solid #ccc;line-height:68px;}
.is-vertical{height:auto}
.el-main::-webkit-scrollbar {width : 6px;height: 1px;}
.el-main::-webkit-scrollbar-thumb {border-radius: 10px;box-shadow : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background:#b7b7b7;}
.el-main::-webkit-scrollbar-track {box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);border-radius: 10px;background:#ededed;}
.el-main{padding:20px 30px}
</style>