import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0
    },

    mutations: {
        increment (state, amount){
            state.count += amount
        }
    }
})

//State参照する
console.log(store.state.count) // -> 0

//ミューテーションを実行し、State更新
store.commit('increment', 1)

console.log(store.state.count) // -> 1

