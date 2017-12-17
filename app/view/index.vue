<template>
    <section @resize="size($event)" class="wrap-box" @dragleave="dragleave($event)" @drop="drop($event)"
             @dragenter="dragenter($event)" @dragover="dragover($event)">
              <alert></alert>
        <confirm></confirm>
        <vue-tips></vue-tips>
        <loading></loading>
        <div class="left-box-meun" v-show="navshow">
            <div class="logo-admin">
                微改车
            </div>
            <menu>
                <div class="item-menu">
                    <router-link to="/admin/index"><i class="icon-home"></i>首页</router-link>
                </div>
                <div class="item-menu">
                    <router-link :to="{name:'ad'}"><i class="icon-ad"></i>广告管理</router-link>
                    <div class="meun-sub">
                        <router-link :to="{ name:'adlist' }">广告列表</router-link>
                        <router-link :to="{ name: 'adSort' }">广告分类</router-link>
                    </div>
                </div>
                <div class="item-menu">
                    <router-link :to="{ name:'case' }"><i class="icon-brand"></i>品牌案例</router-link>
                    <div class="meun-sub">
                        <router-link :to="{ name:'caselist' }">案例列表</router-link>
                        <router-link :to="{ name: 'caseSort' }">案例分类</router-link>
                    </div>
                </div>
                <div class="item-menu">
                    <router-link :to="{ name:'news' }"><i class="icon-news"></i>资讯</router-link>
                    <div class="meun-sub">
                        <router-link :to="{ name:'newslist' }">资讯列表</router-link>
                        <router-link :to="{ name: 'newsSort' }">资讯分类</router-link>
                    </div>
                </div>
                <div class="item-menu">
                    <router-link :to="{ name:'teach' }"><i class="icon-teach"></i>网络学堂</router-link>
                    <div class="meun-sub">
                        <router-link :to="{ name:'teachlist' }">教程列表</router-link>
                        <router-link :to="{ name: 'teachSort' }">教程分类</router-link>
                    </div>
                </div>
                <div class="item-menu">
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
                bg: false
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
        mounted() {
            let self = this;
            window.onresize = function temp() {
                var width = document.body.offsetWidth;
                console.log(width);
                if (width <= 780) {
                    self.navshow = false;
                } else {
                    self.navshow = true;
                }
            };


        },


        methods: {
            sub() {
                console.log(this.$data);
            },
            dragleave: function (e) {    //拖离
                e.preventDefault();
            },
            drop: function (e) {  //拖后放
                e.preventDefault();
            },
            dragenter: function (e) {    //拖进
                e.preventDefault();
            },
            dragover: function (e) {    //拖来拖去
                e.preventDefault();
            },
            tiggle: function (e) {
                e.preventDefault();
            },
            size(e) {
                console.log('navs');
            },
            scroll(e) {
                this.$root.uievent.$emit("scroll", e);
            }

        },
        events: {}
    };
</script>
