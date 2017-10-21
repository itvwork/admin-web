<template>
  <transition name="brand" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
<section class="pop-select-wrap">

    <h1>

            请选择要增加的车型
            <i class="icon-close" @click="close()"></i>

        </h1>

    <ul class="select-list" v-if="model.length>0">

        <li class="item" v-for="(item,index) in model">

            <label>


                    <img :src="Api.storeimg+item.share_image" />

                    <h3>{{item.model_name}}</h3>

                    <input type="checkbox" v-model="select" :value="item.id" />

                    <i class="icon-select " :class="{'icon-selected':contains(select,item.id),active:contains(select,item.id)}" ></i>

                </label>

        </li>



    </ul>
    <div class="none-car"  v-if="model.length<=0">
        <i class="icon-none-car">

        </i>
        <p>车都让你添加完了，没有更多的车让你添加了</p>
    </div>

    <div class="group-bar">

        <button class="btn-sure" :class="{forbid:select.length<=0}" @click="sub()">确定</button>

    </div>


    <loading v-show="loading" :loading="loading"></loading>
    <vue-tips v-if="tips" :tips.sync="tips"></vue-tips>
</section>
</transition>
</template>

<script>


export default {

    name: 'selector',
    props: {
        value:{
          default:''
        },
        show:{
          default:false
        },
    },
    data() {

        return {

            btn: [{

                type: 'link',

                url: '/admin/shop/add',

                name: '添加店铺',

                class: 'btn-add-model'

            }],

            model:[],
            select: [],
            selected:[],
            loading:'',
            tips:''

        }

    },

    created() {
      this.getdata();

    },

    watch: {


    },

    methods: {
        async getdata(){
          let store_id=this.$route.params.id;
          let data=await this.$ajax.post(this.Api.storemodelNone,{storeId:store_id,pageNum:12,page:1,token:this.$store.state.token});
          let list=data.data.data;
          if(data.state==1){
             for(let i =0, len=list.length;i<len;i++){
               this.model.push(list[i]);
             }
          };
        },


        async sub() {
            if(this.select.length<=0){
                this.tips="请选择模型";
            }

            let store_id=this.$route.params.id;
            let data=await this.$ajax.post(this.Api.storeaddmodel,{data:{store_id:store_id,model_id:this.select},token:this.$store.state.token});
            if(data.state==1){
                this.$emit('sub',this.select);
                this.close();
            }

        },
        close:function(){
            this.$emit('update:show', false);

        },

        contains: function(arr, obj) {

            var i = arr.length;

            while (i--) {

                if (arr[i] == obj) {

                    return true;

                }

            }

            return false;

        }

    },

    events: {



    }

};
</script>
