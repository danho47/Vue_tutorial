<template>
    <div>
        <h2>Tasks</h2>
        <ul>
            <li v-for="task in tasks" v-bind:key="task.id">
                <input type="checkbox" v-bind:checked="task.done">
                <input type="checkbox" v-bind:checked="task.done"
                v-on:change="toggleTaskStatus(task)">
                {{ task.name }}
            </li>
        </ul>

        <form v-on:submit.prevent="addTask">
            <input type="text" v-model="newTaskName" placeholder="新しいタスク">
        </form>
    </div>
</template>

<script> 
export default {
    data (){
        return{
            //入力中の新しいタスク名を一時的に保存する
            newTaskName: '',
        }
    },
    computed: {
        tasks () {
            return this.$store.state.tasks // Read Store
        },
    },

    methods: {
        //add Task
        addTask () {
            //'addTask'のミューテーションをコミット
            this.$store.commit('addTask', {
                name: this.newTaskName,
            })
            this.newTaskName = ''
        },

        //update status of finished task
        toggleTaskStatus (task) {
            // commit
            this.$store.commit('toggleTaskStatus', {
                id: task.id
            })
        },
    }
}
</script>