var Auth = {
    //サンプルアプリケーション用のダミー認証モジュール
    login: function (email, pass, cb) {
        setTimeout(function () {
            if (email === 'vue@example.com' && pass === 'vue'){
                //　ログイン成功時はローカルストレージにtokenを保存する
                localStorage.token = Math.random().toString(36).substring(7)
                if (cb) { cb(true) }
            } else{
                if (cb) { cb(false) }
            }
        }, 0)
    },

    logout: function() {
        delete localStorage.token
    },

    loggedIn: function() {
        //　ローカルストレージにtokenがあればログイン状態とみなす
        return !!localStorage.token
    }
}

//ダミーデータの定義
//本来はデータベースの情報をAPI経由で取得
var userData = [
    {
        id: 1,
        name: 'Takuya Tejima',
        description: '東南アジアで働くエンジニア'
    },
    {
        id: 2,
        name: 'Yohei Noda',
        description: 'アウトドア・フットサルが趣味'
    }

]

//擬似的にAPI経由で情報を取得したようにする
var getUsers = function (callback){
    setTimeout(function() {
        callback(null, userData)
    }, 1000)
}

var getUser = function (userId, callback) {
    setTimeout(function () {
      var filteredUsers = userData.filter(function (user) {
        return user.id === parseInt(userId, 10)
      })
      callback(null, filteredUsers && filteredUsers[0])
    }, 1000)
  }
//ログインコンポーネント
var Login = {
    template: '#login',
    data: function () {
        return {
            email: 'vue@exampl.com',
            pass: '',
            error: false
        }
    },
    methods: {
        login: function() {
            Auth.login(this.email, this.pass, (function (loggedIn){
                if (!loggedIn) {
                    this.error = ture
                } else {
                    //redirectパラメータがついてる場合はそのパスに遷移
                    this.$router.replace(this.$route.query.redirect || '/')
                }
            }).bind(this))
        }
    }
}

//User listコンポーネント
var UserList = {
    template: '#user-list',
    data: function() {
        return {
            loading: false,
            users: function(){
                return {}
            },
            error: null
        }
    },

    created: function () {
        this.fetchData()
    },

    watch: {
        '$route': 'fetchData'
    },

    methods: {
        fetchData: function(){
            this.loading = true
            getUsers((function (err, users){
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.users = users
                }
            }).bind(this))
        }
    }
}

//ユーザー詳細コンポーネント
var UserDetail = {
    template: '#user-detail',
    data: function () {
        return {
            loading: false,
            user: null,
            error: null
        }
    },

    created: function(){
        this.fetchData()
    },

    watch: {
        '$route': 'fetchData'
    },

    methods: {
        fetchData: function(){
            this.loading = true
            getUser(this.$route.params.userId, (function (err, user){
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.user = user
                }
            }).bind(this))
        }
    }
}

//新規ユーザ作成
var UserCreate = {
    template: '#user-create',
    data: function (){
        return {
            sending: false,
            user: this.defaultUser(),
            error: null
        }
    },
    created: function (){
    },

    methods: {
        defaultUser: function () {
            return {
                name: '',
                description: ''
            }
        },
        
        createUser: function () {
        //入力パラメータのバリデーション
            if (this.user.name.trim() === '') {
                this.error = 'Nameは必須です'
                return
            }
            if (this.user.description.trim() === ''){
                this.error = 'Descriptionは必須です'
                return
            }
            postUser(this.user, (function(err, user){
                this,sending = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.error = null
                    //デフォルトでフォームリセット
                    this.user = this.defaultUser()
                    alert('新規ユーザーが登録されました')
                    //ユーザー一覧ページに戻る
                    this.$router.push('/users')
                }
            }).bind(this))
        }
    }
}

var router = new VueRouter({
    // 各ルートにコンポーネントをマッピング
    // コンポーネントはVue.extend()によって作られたコンポーネントコンストラクタでも
    // コンポーネントオプションのオブジェクトでも渡せる（？）
    routes: [
        {
            path: '/top',
            component: {
                template: '<div>トップページです</div>'
            }
        },
        {
            path: '/users',
            component: UserList
        },
        {
            path: '/users/new',
            component: UserCreate,
            beforeEnter: function (to, from, next){
                //認証されていない状態でアクセスしたときはloginページに遷移
                if (!Auth.loggedIn()){
                    next({
                        path: '/login',
                        query: { redirect: to.fullPath}
                    })
                } else{
                    //認証済み→新規ユーザ作成ページ
                    next()
                }
            }
        },
        {
            // users/newの前にこのルートを定義→パターンマッチにより/users/newが動作しなくなる
            path: '/users/:userId',
            component: UserDetail
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/logout',
            beforeEnter: function(to, from, next) {
                Auth.logout()
                next('/top')
            }
        },
        {
            //定義されていないパスへの対応
            //トップページからリダイレクト
            path: '*',
            redirect: '/top'
        }
    ]
})

var app = new Vue({
    data: {
        Auth: Auth
    },
    router: router
}).$mount('#app')