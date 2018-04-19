<template>
<div class="row-label">
    <div class="row-title" v-if="toggleTitle" :style="{width:tw}">{{title}}</div>
    <div class="text-outdoor">
        <div class="vuk-node-tips" v-for="(item,index) in value">
            <span ref="edit" contenteditable="true" @blur="changeVal($event,index)" v-text="item.title"></span>
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
            default: () => {
                return []
            }
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
            type: Boolean,
            default: true
        },
        schema: {
            default: false
        },
        rule: {
            default: false
        },
        reback: {
            default: ''
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
            err: '',
            state:0
        }
    },
    watch: {
        'value': function(val, old) {
            if (val.length <= 0) {
                this.showtitle = val;
            }
            if (old.length <= 0) {
                this.showtitle = val;
            }

        }
    },
    created() {

    },
    updated(){
          switch (this.state) {
            case 1:
                this.$refs.edit[this.value.length-1].focus();
              break;
            default:
          }
          this.state=0;
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
        changeVal(e, i) {

            let content=e.target.innerHTML.replace(/<\/?.+?>/ig, "");

            if(content&&content==this.value[i]['title']){
              return false
            }


            this.$emit('change',{data:content,index:i});
        },
        add() {
            let arr = this.value.concat();
            arr.push({
                title: ''
            });
            this.state=1;
            this.$emit('update:value', arr);
        },
        del(index) {

          this.$emit('del', index);
        }
    }

};
</script>
