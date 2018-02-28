<template>
<section @resize="size($event)" class="wrap-box" @dragleave="dragleave($event)" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
    <alert></alert>
    <confirm></confirm>
    <vue-tips></vue-tips>
    <loading></loading>
    <div class="left-box-meun" v-show="navshow">
        <div class="logo-admin" @click="message">
            微改车
        </div>
        <menu ref="meun">
            <div class="item-menu" :class="{active:active=='index'}">
                <router-link :to="{name:'home'}"><i class="icon-home"></i>首页</router-link>
            </div>
            <div class="item-menu" :class="{active:active=='ad'}">
                <router-link :to="{name:'ad'}"><i class="icon-ad"></i>广告管理</router-link>
                <div class="meun-sub">
                    <router-link :to="{ name:'adlist' }">广告列表</router-link>
                    <router-link :to="{ name: 'adSort' }">广告分类</router-link>
                </div>
            </div>
            <div class="item-menu" :class="{active:active=='case'}">
                <router-link :to="{ name:'case' }"><i class="icon-brand"></i>品牌案例</router-link>
                <div class="meun-sub">
                    <router-link :to="{ name:'caselist' }">案例列表</router-link>
                    <router-link :to="{ name: 'caseSort' }">案例分类</router-link>
                </div>
            </div>
            <div class="item-menu" :class="{active:active=='news'}">
                <router-link :to="{ name:'news' }"><i class="icon-news"></i>资讯</router-link>
                <div class="meun-sub">
                    <router-link :to="{ name:'newslist' }">资讯列表</router-link>
                    <router-link :to="{ name: 'newsSort' }">资讯分类</router-link>
                </div>
            </div>
            <div class="item-menu" :class="{active:active=='teach'}">
                <router-link :to="{ name:'teach' }"><i class="icon-teach"></i>网络学堂</router-link>
                <div class="meun-sub">
                    <router-link :to="{ name:'teachlist' }">教程列表</router-link>
                    <router-link :to="{ name: 'teachSort' }">教程分类</router-link>
                </div>
            </div>
            <div class="item-menu" :class="{active:active=='file'}">
                <router-link :to="{name:'file'}"><i class="icon-home"></i>附件管理</router-link>
            </div>
            <!--<div class="item-menu">-->
            <!--<router-link :to="{name:'store'}"> <i class="icon-brand"></i>店铺管理</router-link>-->
            <!--</div>-->
        </menu>
    </div>
    <div class="message-bar">
        <div class="user-bar">
            <i class="user-header" @click="userMess=!userMess"><img src="/wgc/style/file/header.jpg"/></i>
            <span class="user-word" @click="userMess=!userMess">欢迎：admin </span>
            <div class="message-user-box" v-show="userMess">
                <div class="message-user-indoor">
                    <i class="triangle"></i>
                    <span>修改密码</span>
                    <span>设置信息</span>
                    <span>退出</span>
                </div>
            </div>
        </div>
        <i class="icon-nav" @click="navshow=!navshow"></i>
    </div>
    <section class="right-box" @click="userMess=false" ref="scroll" @scroll="scroll">
        <crumbs></crumbs>
        <router-view></router-view>
    </section>

</section>
</template>
<style lang="less">
.item-menu {
    overflow: hidden;
    -webkit-transition: height 0.3s;
}
.item-menu.active {

    overflow: hidden;
    -webkit-transition: height 0.3s;
}
</style>
<script>
export default {
    data() {
        return {
            login: {
                username: 'admmin',
                pwd: '123'
            },
            username: 'adminstreis',
            navshow: true,
            userMess: false,
            bg: false,
            active: ''
        }
    },
    created() {
        var width = document.body.offsetWidth;

        if (width <= 780) {
            this.navshow = false;
        } else {
            this.navshow = true;
        }

    },

    watch: {
        $route(to, from) {
            this.meun();
        }
    },
    mounted() {
        let self = this;
        window.onresize = function temp() {
            var width = document.body.offsetWidth;

            if (width <= 780) {
                self.navshow = false;
            } else {
                self.navshow = true;
            }
        };
        this.meun();
        this.$on('close',function(value){
            alert(value);
        })


    },
    updated() {
        this.toggle();

    },

    methods: {
        meun() {
            let arr = this.$route.path.split('/');
            this.active = arr[2];

        },
        toggle() {
            let dom = this.$refs.meun;
            let active = dom.querySelector('.active');
            let domchildren = dom.children;
            let height=0;
            for (let i = 0, l = domchildren.length; i < l; i++) {
                let box = domchildren[i].querySelector('a');
                var bstyle = window.getComputedStyle ? window.getComputedStyle(box, null) : null || box.currentStyle;
                domchildren[i].style.height=bstyle.height;
                console.log(height);
            }
            let sub=active.querySelector('.meun-sub');
            if(sub){
               let h=0;
                let a =active.querySelector('a');
                var astyle = window.getComputedStyle ? window.getComputedStyle(a, null) : null || a.currentStyle;
                let style = window.getComputedStyle ? window.getComputedStyle(sub, null) : null || sub.currentStyle;
                h+=parseInt(astyle.height);
                h+=parseInt(style.height);
                active.style.height=h+'px';

            }
        },
        sub() {
            console.log(this.$data);
        },
        dragleave: function(e) { //拖离
            e.preventDefault();
        },
        drop: function(e) { //拖后放
            e.preventDefault();
        },
        dragenter: function(e) { //拖进
            e.preventDefault();
        },
        dragover: function(e) { //拖来拖去
            e.preventDefault();
        },
        tiggle: function(e) {
            e.preventDefault();
        },
        size(e) {
            console.log('navs');
        },
        scroll(e) {
            this.$root.uievent.$emit("scroll", e);
        },
        message(){
          this.$vuk.message({
              word:'有消息'
          });
        }

    },
    events: {}
};
</script>
