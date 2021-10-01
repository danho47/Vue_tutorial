//グローバルコンポーネント

Vue.component('fruits-list-title',{
    template: '<h1>フルーツ一覧</h1>',
})

Vue.component('fruits-list-description',{
    template: '<p>季節の代表的なフルーツの一覧</p>',
})

Vue.component('fruits-list-table', {
    template: `
    <table>
        <tr>
            <th>季節</th>
            <th>フルーツ</th>
        </tr>
        <tr>
            <th>春</th>
            <th>いちご</th>
        </tr>
        <tr>
            <th>夏</th>
            <th>すいか</th>
        </tr>
        <tr>
            <th>秋</th>
            <th>なし</th>
        </tr>
        <tr>
            <th>冬</th>
            <th>みかん</th>
        </tr>
    </table> 
    `
})

//親と子

Vue.component('fruits-list',{
    template: '<div><fruits-list-title></fruits-list-title></div>',
})
new Vue({ el: '#main' })

//ローカルコンポーネント
new Vue({ 
    el: '#fruits-list2',
    components: {
        'fruits-list-title':{
            template: '<h1>フルーツ一覧</h1>'
        }
    }
})

//描画関数
Vue.component('input-date-with-today', {
    render: function (createElement) {
        return createElement (
            'input',
            {
                attrs: {
                    type: 'date',
                    value: new Date().toISOString().substring(0,10)
                }
            }
        )
    }
})

new Vue({el: '#app'})

//親→子
Vue.component('item-desc', {
    props: {
        itemName: {
            type: String
        }
    },
    template: '<p>{{ itemName }}は便利</p>'
})

new Vue({
    el: '#item',
    data: {myItem: 'pen'}
})

Vue.component('fruits-item-name', {
    props:{
        fruitsItem: {
            type: Object,
            required: true
        }
    },
    template: '<li> {{ fruitsItem.name }} </li>'
})

new Vue ({
    el: '#fruits',
    data: {
        fruitsItems: [
            {name: '梨'},
            {name: 'イチゴ'}
        ]
    }
})

//子→親　カスタムイベント

//子コンポーネントのカウンターボタン
//ボタンを押す→addToCart()メソッド→incrementカスタムイベント
var counterButton = Vue.extend({
    template: '<span>{{counter}}個<button v-on:click="addToCart">追加</button></span>',
    data: function() {
        return {
            counter: 0
        }
    },
    methods: {
        addToCart: function (){
            this.counter += 1
            this.$emit('increment')//incrementカスタムイベントの発火（？）
        }
    },
})

//親コンポーネント
//v-on:increment(increment)でincrementイベントをlisten
//ボタンを押したときにincrementCartStatus()メソッド
new Vue({
    el: '#fruits-counter',
    components:{
        'counter-button': counterButton
    },
    data: {
        total: 0,
        fruits: [
            {name: 'いちご'},
            {name: '梨'},
        ]
    },
    methods:{
        incrementCartStatus: function () {
            this.total += 1
        }
    }
})

