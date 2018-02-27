<template>
  <transition  enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight" @after-leave="destroyElement()">
    <div class="vuk-message-box" :style="{'z-index':index}"  @click="close" v-show="visible">
          中华人民------------
    </div>
  </transition>
</template>
<style lang="less">
  @import "../../const.less";
  .vuk-message-box{
    position: fixed;
    z-index: 2000;
    left: 50%;
    top: 20px;
    .tranxy(-50%,0);
    transition: transform .3s;
  }


</style>
<script>
  export default {
    name: 'VukAlert',
    data(){
      return {
        visible:false,
        onClose:null,
        top:'0px',
        index:2000
      }
    },
    mounted(){
      let self=this;
      // setTimeout(()=>{
      //   this.close()
      // },3000);
    },
    methods:{
      close(){
        this.visible=false;
      },
      destroyElement() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
          this.onClose(this.index);
      }
    }
  };
</script>
