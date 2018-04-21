<template>
<div class="vuk-list-checkbox">
    <button class="picon" :class="{'active':arr.length==checked.length }" @click="propAll()">
          {{arr.length==checked.length?"全不选":"全选"}}
    </button>
    <label class="vuk-list-checkbox-lable" v-for="(item,index) in arr">
        <input class="picon" type="checkbox" :value="item._id" v-model="checked"/>
        {{item.title}}
  </label>
</div>
</template>
<style lang="less">

@import '../const.less';
.vuk-list-checkbox {
    display: flex;
    button{
      padding: 15px;
      padding-left: 0px;

      font-size: 0.12rem;
      &::before {
          content: '\e720';
          font-size: 0.16rem;
      }

      &.active::before{
        content: '\e721';
        font-size: 0.16rem;
          color: @blue;
      }
    }
}
.vuk-list-checkbox-lable {
    padding: 15px;
    input {
        opacity: 1;
        &::after {
            content: '\e720';
            font-size: 0.16rem;
        }
        &:checked::after {
            content: '\e721';
            font-size: 0.16rem;
            color: @blue;
        }

    }
}
</style>
<script>
export default {
    props: {
        arr: {
            type: Array,
            default: () => {
                return []
            }
        },
        tags: {
            type: Array,
            default: () => {
                return []
            }
        },

    },
    data() {
        return {
            checked: this.tags,
            allCheck:'全选',
          
        }
    },
    watch: {
        checked(news, olds) {

            this.$emit('update:tags', news);
        }
    },
    methods: {
      propAll(){
          if(this.arr.length==this.checked.length){
            this.checked=[];

          }else{
            let arr=[];
            for(let i=0,l=this.arr.length;i<l;i++){
              arr.push(this.arr[i]['_id']);
            }
            this.checked=arr;
          }
      }
    },
    filters: {

    }



}
</script>
