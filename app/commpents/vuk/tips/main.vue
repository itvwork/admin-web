
<template>
<transition enter-active-class="atm1 bounceInXy" leave-active-class="atm1 bounceOutXy" @after-leave="destroyElement()">
    <div class="vuk-el-tips" v-html="content||tips" v-show="visible"  ></div>
</transition>
</template>
<style lang="less">
@import "../../const.less";
.vuk-el-tips{
  position: absolute;
  left: 50%; top: 50%;
  .tranxy;
  background-color: rgba(0,0,0,0.8);
  color: @white;
  padding: .1rem .1rem;
  .border-radius(0,4px);
}

</style>
<script>
//101.788px-0

export default {
    props: {
        tips: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            content: '',
            visible:false
        }
    },
    created() {


    },
    watch:{

    },
    beforeDestroy(){
      this.destroyElement();
    },
    methods: {

        destroyElement() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
            this.onClose(this.index);
        },
        remove(){
          this.destroyElement();
        }

    }

};
</script>
