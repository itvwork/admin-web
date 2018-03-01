
<template>
    <section class="ui" v-show="toggole">
        <div class="ui-wrap" :class="{warn:warn=='warn',success:warn=='success'}"  draggable="true">
            <div class="ui-outdoor">
                <em class="ui-icon ui-icon-close" @click="close()"></em>
                <div class="ui-top">
                    <p class="ui-icon ui-icon-title"></p>
                    <h2 v-if="title">{{title}}</h2>
                    <p class="ui-words">{{info}}</p>
                </div>
                <div class="ui-btn-group">
                    <button class="btn-sure" @click="sure()">{{btnsure}}</button>
                    <button class="btn-cancel" @click="close()">{{btnclose}}</button>
                </div>
            </div>
        </div>
        <div class="bg" v-show="bg" @click="close()"></div>
    </section>
</template>

<script>
    export default {

        data() {
            return {
                title: '',
                info: '',
                bg: false,
                btnsure: '确定',
                btnclose: '关闭',
                toggole: false,
                sureFun:'',
                part:'',
                warn:'warn',
                cancel:'',

            }
        },
        created() {

        },
        methods: {
            sure() {

                this.sureFun(this.part);
            },
            close() {
                this.bg=false;
                this.toggole=false;
                if(typeof this.cancel==='function'){
                    this.cancel();
                }
            }

        }
    };
</script>
