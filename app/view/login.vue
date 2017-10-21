<template>
<section class="login-bg">
    <div class="login-box">
        <h2 class="login-logo">微改车
        </h2>
        <ul class="ul-login">
            <li class="item-login"><input v-model="sub.username"  class="input-login" type="text" placeholder="请输入登录帐号" />
            </li>
            <li class="item-login"><input v-model="sub.pwd"  class="input-login" type="password" placeholder="请输入登录密码" /></li>
        </ul>
        <div class="btn-box">
            <button class="btn btn-login" @click="submit()">{{stateWord}}</button>
        </div>
        <vue-tips :tips.sync="err_msg" v-if="err_msg"></vue-tips>
    </div>
</section>
</template>
<script>
let schema =new Schema({
   username:{
     tirm:false,
     rule:['require'],
     msg:['用户名不能为空']
  },
  pwd:{
    rule:['require'],
    msg:['用户密码不能为空']
  }
})

export default {
    data() {
        return {
            sub:{
              username: 'admin',
              pwd: '123456'
            },
            stateWord:'登录',
            err_msg:'',
            state:0
        }
    },
    ready() {

    },
    components: {

    },
    watch: {



    },
    methods: {
        async submit() {


            let username=schema.single("username", this.sub.username);
            let pwd=schema.single("pwd", this.sub.pwd);
            if(username!==true){
                this.err_msg=username;
                return false;
            }
            if(pwd!==true){
                this.err_msg=pwd;
                return false;
            }
            if(this.state==1){
              return false;
            }
            this.state=0;


            let ret=await this.$ajax.post(this.Api.login,this.sub);
            if(ret.err_code==200){
              sessionStorage.setItem("itvadmintoken", ret.data.token);
              sessionStorage.setItem("itvusername",ret.data.username);
              this.$store.state.token=ret.data.token;
              this.$store.state.admin=ret.data.username;
              this.$router.push({name:'home'});
            }else{
                this.err_msg=ret.err_msg;
            }


        }

    },
    events: {

    }
};
</script>
