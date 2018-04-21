<template>
<div class="vuk-list-checkbox">
    <label class="vuk-list-checkbox-lable">
      <input class="picon" type="checkbox"  v-model="allCheck" true-value="全不选" false-value="全选"/>
      {{allCheck}}
  </label>
    <label class="vuk-list-checkbox-lable" v-for="(item,index) in arr">
        <input class="picon" type="checkbox" :value="item._id" v-model="checked"/>
        {{item.title}}
  </label>
</div>
</template>
<style lang="less">
.vuk-list-checkbox {
    display: flex;
}
@import '../const.less';
.vuk-list-checkbox-lable {
    display: block;

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
            state: 1
        }
    },
    watch: {
        checked(news, olds) {
          if(this.state==1)return;
            this.$emit('update:tags', news);
        },
        tags(news,olds){
          if(this.tags.length==this.arr.length){
            this.allCheck="全不选";

          }else{
            this.allCheck="全选";

          }
          this.state=0;
        },
        allCheck(news,olds){
            if(news=="全不选"){
                let arr=[];
                for(let i=0,l=this.arr.length;i<l;i++){
                  arr.push(this.arr[i]['_id']);
                }
                this.checked=arr;
            }else{
              if(this.state==0){
                this.state==1;
                this.checked=this.tags;
                thhis.state=0;
              }else{
                this.checked=[];
              }

            }
        }

    },
    methods: {

    }



}
</script>
