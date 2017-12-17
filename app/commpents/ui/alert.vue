
<template>
<section class="ui" v-if="toggle">
<div class="ui-wrap" :class="wrap" draggable="true">
    <div class="ui-outdoor">
        <em class="ui-icon ui-icon-close" @click="closebox()"></em>
        <div class="ui-top">
            <p class="ui-icon ui-icon-title"></p>
            <h2>{{title}}</h2>
            <p class="ui-words">{{info}}</p>
        </div>
        <div class="ui-btn-group">
            <button class="btn-alert" @click="sure()">确定</button>
        </div>
    </div>
  </div>
  <div class="bg" v-if="bg" @click="closebox()"></div>
  </section>
</template>
<script>


export default {
    data() {
        return {
            toggle:false,
            wrap:'warn',
            title:'确定要删除',
            info:'删除后将不可恢复',
            bg:false
        }
    },
    created(){
         ui['alert']=this;
    },
    methods: {
        closebox: function() {
            this.ui.show=false;
        },
        sure: function() {
            this.$root.uievent.$emit(this.ui.even);

        },
        show(data){

        }
    }
};
</script>
