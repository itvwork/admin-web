<template>
  <transition  enter-active-class="atm messageIn"
    leave-active-class="atm messageOut" @after-leave="destroyElement()">
    <div class="vuk-message-box" :style="{'z-index':index}"  @click="close" v-show="visible">
          {{word}}
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
    background-color:lighten(@blue,32%);
    padding: 10px;
    .border-radius(0,6px);
    border: solid 1px lighten(@gray,70%);
    min-width: 100px;
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
        index:2000,
        word:'',
        speed:3000
      }
    },
    mounted(){

      setTimeout(()=>{
        this.close()
      },this.speed);
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
