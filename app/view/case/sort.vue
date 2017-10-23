<template>
    <indoor>
        <addbtn :btn="btn"></addbtn>
        <table class="list-table" cellpadding="1" cellspacing="1" border="0">
            <thead>
            <tr>
                <th>分类图标</th>
                <th>分类名称</th>
                <th>添加时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in list">
                <td>{{item._id}}<img width="50" height="50" :src="Api.imgurl+item.cover.url"/></td>
                <td>{{item.title}}</td>
                <td>{{$tool.formatDate(item.add_time)}}</td>
                <td>  <router-link :to="{ name:'editCaseSort',params:{id:item._id} }">修改</router-link>
                    <button @click="del(item._id)">删除</button>
                </td>
            </tr>

            </tbody>
        </table>
        <loading v-show="loading" :loading="loading"></loading>
        <vue-tips v-if="tips" :tips.sync="tips"></vue-tips>
    </indoor>
</template>

<script>
    import addbtn from '../../commpents/meun/addbtn'

    export default {
        components: {addbtn},
        data() {
            return {
                btn: [{
                    type: 'link',
                    url: {
                        name: 'addCaseSort'
                    },
                    name: '添加案例分类',
                    class: 'btn-add-model'
                }
                ],
                list:[],
                delid:'',
                loading:'',
                tips:'',
                num:0
            }
        },
        created() {
                let self=this;
                this.getdata();
                this.$root.uievent.$on('delCaseSort',async function () {
                    self.num++;
                    self.loading="删除中";
                    self.$store.commit('uiclose',{type:'confirm'});
                    console.log(self.num,self.delid);
//                    let data=await this.$ajax.post(self.Api.caseSortDel,{_id:self.delid,token:self.$store.state.token});
//                    if(data.err==1){
//                        self.loading="";
//                        self.tips="删除成功";
//                        self.getdata();
//                    }else{
//                        self.loading="";
//                        self.tips="删除失败，已经删除，或不存在";
//                    }
                })
        },
        watch: {
            username: function (val, oldval) {
                console.log(this.login);
            }
        },
        methods: {
            sub() {
                console.log(this.$data);
            },
            async getdata() {
                 let data = await this.$ajax.post(this.Api.caseSort, {data: '', token: this.$store.state.token});
                this.list=data.data;
            },
            async del(id){
                console.log(id);
                this.delid=id;
                this.$store.commit('uishow',{
                    wrap:'warn',
                    title:'警告',
                    word:'是否删除该分类',
                    type:'confirm',
                    even:'delCaseSort',
                    isclose:true
                });
//            let data=await this.$ajax.post(this.Api.storelist,{id:id,token:this.$store.state.token});
//            console.log(data);
            }
        },
        events: {}
    };
</script>
