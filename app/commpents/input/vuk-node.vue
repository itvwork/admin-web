<template>
  <div class="row-label">
    <div class="row-title" v-if="toggleTitle==1" :style="{width:tw}">{{title}}</div>
    <div class="text-outdoor">
        <div   class="vuk-node-tips" v-for="(item,index) in showtitle" v-model="showtitle[index]">
            <span contenteditable="true" @keydown="changeVal($event,index)">{{item}}</span>
            <i class="icon icon-closex" @dblclick="del(index)"></i>
        </div>
        <button @click="add" class="picon icon-plus btn-vuk-node-tips"></button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default:()=>{return ['none.js','javascript','vue','react']}
    },
    title: {
      type: String,
      default: '标题'
    },
    tips: {
      type: String,
      default: '请输入内容'
    },
    type: {
      type: String,
      default: 'text'
    },
    tw: {
      type: String,
      default: '.1rem'
    },
    name: {
      type: String,
      default: 'username'
    },

    toggleTitle: {
      type: String,
      default: '0'
    },
    schema: {
      default: false
    },
    rule: {
      default: false
    },
    reback:{
      default:''
    },
    valtEvent: {

    }
  },
  computed: {},
  data() {
    return {
      seat: false,
      des: 10,
      option: false,
      showtitle: this.value,
      err: ''
    }
  },
  watch: {
    'value': function(val, old) {
        if(val.length<=0){
          this.showtitle=val;
        }
        if(old.length<=0){
            this.showtitle=val;
        }

    }
  },
  created() {
    let self = this;



  },
  methods: {
    updateValue(index) {
      this.$emit('update:value', this.showtitle);
      this.valtVal();
    },
    valtVal() {
      this.err = this.schema.single(this.rule, this.showtitle);
      return this.err;
    },
    showErr(err) {
      this.err = err;
    },
    changeVal(e,i){
        if(e.keyCode==13){
            e.preventDefault();
        }
      this.showtitle[i]=e.target.innerHTML.replace(/<\/?.+?>/ig,"");
    },
    add(){
      this.showtitle.push('标签名')
    },
    del(index){
      this.showtitle.splice(index,1);
    }
  }

};
</script>
