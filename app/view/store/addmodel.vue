<template>
<indoor>
    <div class="shop-mess-top">
        <div class="left">
            <img :src="'http://h53d.icar3d.com/images/'+shop.store_ewm" />
        </div>
        <div class="right">
            <h2>{{shop.store_name}}</h2>
            <p>{{shop.store_address}}</p>
        </div>
    </div>
    <h1 class="model-title-has">已经添加的车型</h1>
    <ul class="ul-model" >
        <li class="item-model" v-for="(item,index) in hasModel">
            <div class="outer-model">
                <i class="icon-close" @click="del(item.id)"></i>
                <div class="imgs">
                    <img :src="Api.storeimg+item.share_image" />
                </div>
                <div class="info-bar">
                    <h2>{{item.model_name}}</h2>
                    <h3>{{item.share_title}}</h3>
                    <p>{{item.share_des}}</p>
                </div>
                <div class="handle-bar">
                    <a target="_blank" :href="'http://3dwgc.icar3d.com/'+item.url+'/?model_id='+item.model_id+'&store_id='+item.store_id" class="icon-view" title="查看"></a>

                    <!--<a href="#" class="icon-code" title="生成二维码"></a>-->
                </div>
                <div class="clear"></div>
            </div>
        </li>
    </ul>

    <div class="page-btn"><button class="btn-add-model" @click="open()">添加车型</button>
        <!---->
    </div>
    <selector :value.sync="model" @sub="sub" :show.sync="show_select" v-if="show_select"></selector>
    <loading v-show="loading" :loading="loading"></loading>
    <vue-tips v-if="tips" :tips.sync="tips"></vue-tips>
</indoor>
</template>

<script>
import selector from './selector';

export default {
    components: {
        selector
    },
    data() {
        return {
            btn: [{
                type: 'link',
                url: '/admin/shop/add',
                name: '添加店铺',
                class: 'btn-add-model'
            }],
            confirm:false,
            show_select: false,
            model: [],
            hasModel: [],
            loading:'',
            showpage:false,
            delid:'',
            delindex:'',
            tips:'',
            shop:{
                store_name:"",
                store_phone:'',
                store_ewm:'',
                store_contact:'',
                store_address:'',
                latlng:'',
                id:''
            }

        }
    },
    created() {

        this.getdata();
        let self=this;
        this.$root.uievent.$on('delstoremdel',async function () {
            self.loading="删除中";
            self.$store.commit('uiclose',{type:'confirm'});
            let data=await this.$ajax.post(self.Api.delstoremodel,{id:self.delid,token:self.$store.state.token});



            if(data.state==1){
                self.loading="";
                self.tips="删除成功";
                self.getdata();
            }else{
                self.loading="";
                self.tips="删除失败，已经删除，或不存在";
            }

        });


    },
    watch: {

        '$route': function(to, from) {
            if (this.$route.query.page) {
                this.$refs.page.change({});
            }

            //   console.log(this.$route.query);
        },
        'model': function() {

            if (this.model.length <= 0) {
                return false;
            }
            for (let i = 0; i < this.model.length; i++) {
                this.hasModel.push(this.model[i]);
            }
            this.model = [];
        }

    },
    methods: {
        send: function() {
            let child = this.$refs.form.$children;
            for (let i = 0; i < child.length; i++) {
                if (child[i].rule) {
                    child[i].valtVal();
                }
            }

        },
        async getdata(){
            this.loading='加载中…';
            let store_id=this.$route.params.id;
            let data=await this.$ajax.post(this.Api.sotrehasmodel,{storeId: store_id, token:this.$store.state.token});
            let shopdata= await this.$ajax.post(this.Api.storeDetail,{data:{id:store_id},token:this.$store.state.token});
            this.shop=shopdata.data;
            this.loading=false;
            let list=data.data;

            if(data.state==1){
                this.hasModel=list;
//                    for(let i =0,len=list.length;i<len;i++){
//                        this.hasModel.push(list[i]);
//                    }
            }
        },
        async del(id,index){
            this.delid=id;
            this.delindex=index;

            this.$store.commit('uishow',{
                wrap:'warn',
                title:'警告',
                word:'是否删除该模型',
                type:'confirm',
                even:'delstoremdel',
                isclose:true
            });
//            let data=await this.$ajax.post(this.Api.storelist,{id:id,token:this.$store.state.token});
//            console.log(data);
        },
        open() {
            this.show_select=!this.show_select;
        },
        sub(arg){

            this.getdata()
            this.tips="添加成功";
        }
    },
    events: {

    }
};
</script>
