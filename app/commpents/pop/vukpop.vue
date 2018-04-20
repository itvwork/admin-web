<template>
<span class="popvuk">
    <div class="bg"></div>
    <slot></slot>
</span>
</template>
<style lang="less">
@import '../const.less';
.popvuk{
  .bg{
    position: fixed;
    top: 0px;
    z-index: 100;
    left: 0px; right: 0px; bottom: 0px;
    background-color: rgba(0,0,0,0.8);
  }
}
</style>
<script>
export default {
    props: {
        content: {
            type: String,
            default: 'vuk-pop'
        },
        arr:{
          type:Array,
          default:()=>{
            return []
          }
        },
        bg:{
          type:Boolean,
          default:false
        }
    },
    data() {
        return {
            
        }
    },
    mounted() {
        document.body.append(this.$el);
    },
    watch: {

    },
    created() {

    },
    updated() {

    },
    beforeDestroy() {
        document.body.removeChild(this.$el);
    }

};
</script>
