<template>
<label class="row-label">
  <span class="row-title" :style="{width:tw}">{{title}}</span>
  <span class="text-outdoor" >
      <textarea  class="vue-textarea" :placeholder="tips"  :id="id" ref="textarea"   :value="value"  @input="updateValue($event.target.value)"></textarea>
            <em class="err-msg"  v-if="err!==true">{{err}}</em>
  </span>

</label>
</template>
<script>
export default {
     props: {
       value:{
         type:String,
         default:''
       },
        title:{
            type:String,
            default:'标题'
        },
        tips:{
          type:String,
          default:'请输入内容'
        },
        type:{
          type:String,
          default:'text'
        },
        tw:{
          type:String,
          default:'5rem'
        },
        name:{
          type:String,
          default:'username'
        },
         schema:{
             default:false
         },
         rule:{
             default:false
         }

    },


    computed: {

    },
    data() {
        return {

            err:'',
            id:'textarea-'+parseInt(Math.random()*1000)+'-'+parseInt(Math.random()*1000)
        }
    },

    watch: {

    },
    methods: {
      updateValue: function (value) {

          if(this.schema){
              this.err=this.schema.single(this.rule,value);
          }

          this.$emit('update:value', value);

      },
        valtVal:function(){

            this.err=this.schema.single(this.rule,this.value);
            return this.err;
        },
        showErr:function(err){

            this.err=err;
        },
        focus:function(){
            document.getElementById(this.id).focus();
        }

    }
};



</script>
