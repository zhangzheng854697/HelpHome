import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)
const state={
    tags:[
			// { name: '项目编号管理', type: '' , effect:'plain',href:'ProjectCode'},
			// { name: '形态学注册码管理', type: '' , effect:'light',href:'XtxManage'},
			// { name: '反馈信息', type: '' , effect:'plain',href:'HelpManage'},
        ],
  person_StateID:'',   //1 是管理员   4是普通用户
}


export default new Vuex.Store({
    state
})
