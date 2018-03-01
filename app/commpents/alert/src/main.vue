<template>
  <transition  enter-active-class="atm messageIn"
    leave-active-class="atm messageOut" @after-leave="destroyElement()">
    <div class="vuk-message-box" :class="style" :style="{'z-index':index}" v-show="visible">
          <i class="icon-status"></i>{{word}}
          <i class="icon-close"  @click="close" ></i>
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
    .border-radius(0,4px);

    min-width: 400px;
    box-sizing: border-box;
    padding: 15px 15px 15px 40px;
    font-size: 14px;
    .icon-status{ position: absolute; left: 15px; font-size: 18px;
        top: 50%; .tranxy(0,-50%);
    }
    &.default{
          background-color:lighten(@blue,32%);
          border: solid 1px lighten(@gray,70%);
          .icon-status::before{
            content: '\e614';
            color: lighten(@gray,20%)
          }
          .icon-status{ font-size: 14px;.tranxy(0,-50%);}
    }
    &.success{
          background-color:lighten(@success,42%);
          border: solid 1px lighten(@success,22%);
            color: darken(@success, 5%);
          .icon-status::before{
            content: '\e743';
          }
    }
    &.warning{
          background-color:lighten(@warning,36%);
          border: solid 1px lighten(@warning,22%);
          color: @warning;
          .icon-status::before{
            content: '\e61e';
          }
    }
    &.danger{
      background-color:lighten(@danger,28%);
      border: solid 1px lighten(@danger,18%);
      color: darken(@danger, 20%);
      .icon-status::before{
        content: '\e6c6';
      }
      .icon-status{.tranxy(0,-56%);}
    }
    .icon-close{ position: absolute; right: 15px; cursor: pointer;}
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
        speed:3000,
        style:'default',
        autoClose:true,

      }
    },
    mounted(){
      if(this.autoClose){
        setTimeout(()=>{
          this.close()
        },this.speed);
      }

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
