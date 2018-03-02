<template>
<section class="ui">
    <transition enter-active-class="atm fadeIn" leave-active-class="atm fadeOut" @after-leave="destroyElement()">
        <div class="ui-wrap" :class="style" draggable="true" v-show="visible">

            <div class="ui-outdoor">
                <em class="ui-icon ui-icon-close" @click="close()"></em>
                <div class="ui-top">
                    <p class="ui-icon ui-icon-title"></p>
                    <h2>{{title}}</h2>
                    <p class="ui-words">{{info}}</p>
                </div>
                <div class="ui-btn-group">
                    <button class="btn-sure" @click="surebtn()">{{btnsure}}</button>
                    <button class="btn-cancel" @click="cancels()">{{btnclose}}</button>
                </div>
            </div>
        </div>
    </transition>
    <transition enter-active-class="atm fadeIn" leave-active-class="atm fadeOut">
        <div class="ui-bg" v-show="visible" @click="close()"></div>
    </transition>
</section>
</template>

<script>
export default {

    data() {
        return {
            title: '是否删除此条数据',
            info: '',
            bg: false,
            btnsure: '确定',
            btnclose: '关闭',
            toggole: false,
            sureFun: '',
            part: '',
            style: 'warn',
            cancel: '',
            sure: '',
            surevalue:'',
            visible: false

        }
    },
    created() {

    },
    methods: {
        cancels() {
            this.visible = false;
            if (typeof this.cancel==='function') {
                this.cancel();
            }
        },
        close() {
            this.visible = false;
        },
        surebtn() {
            if (typeof this.sure ==='function') {
                this.sure(this.surevalue);
            }
        },
        destroyElement() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
            this.onClose(this.index);
        }


    }
};
</script>
