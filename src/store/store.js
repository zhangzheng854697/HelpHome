import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)
const state={
    Taglist:{},
    reload:[],
}

const mutations={
    addTag(){

        state.Taglist = 'ceshi';
        console.log(state.Taglist)
    }
}

export default new Vuex.Store({
    state,mutations
})
