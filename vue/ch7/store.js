import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//Storeの定義
const store = new Vuex.Store({
    state: {
        // initial tasks
        tasks: [
            {
                id: 1,
                name: '牛乳を買う',
                done: false
            },
            {
                id: 2,
                name: 'Vue.jsの本を買う',
                done: true
            }
        ],

        //次に追加するタスクのID
        //実際のアプリではサーバーで生成したり,UUIDを使う
        nextTaskId: 3,

    },
    mutations: {
        //add task
        addTask (state, { name }) {
            state.tasks.push({
                id: state.nextTaskId,
                name,
                done: false
            })

            // 次に追加するタスクに付与するIDの更新
            state.nextTaskId++
        },

        //complete task
        toggleTaskStatus (state, { id }) {
            const filtered = state.tasks.filter(task => {
                return task.id === id
            })

            filtered.forEach(task => {
                task.done = !task.done
            })
        },
    },
})

export dafault store
