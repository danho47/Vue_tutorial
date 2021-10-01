var headerTemplate =`
    <div>
        <slot name="header"> No title </slot>
    </div>
`

var contentTemplate = `
    <div>
        <slot name="content"> No contents </slot>
    </div>
`

Vue.component('page-header',{
    template: headerTemplate
})

Vue.component('page-content', {
    template: contentTemplate
})

new Vue({
    el: "#fruits-list"
})

Vue.component('user-login', {
    template: '#login-template',
    data: function() {
        return {
            userid: '',
            password: ''
        }
    },
    methods: {
        login: function (){
            auth.login(this.userid,this.password)
        }
    }
})

var auth ={
    login: function(id, pass){
        window.alert("userid:"+id + "\n" + "password:" + pass)
    }
}

new Vue({
    el: "#login-example"
});