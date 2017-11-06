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
                <td><img width="50" height="50" :src="Api.imgurl+item.cover" /></td>
                <td>{{item.title}}</td>
                <td>{{$tool.formatDate(item.add_time)}}</td>
                <td>
                    <router-link :to="{ name:'editCaseSort',params:{id:item._id} }">修改</router-link>
                    <button @click="del(item._id,item.cover)">删除</button>
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
    components: {
        addbtn
    },
    data() {
        return {
            btn: [{
                type: 'link',
                url: {
                    name: 'addNewsSort'
                },
                name: '添加资讯分类',
                class: 'btn-add-model'
            }],
            list: [],
            loading: '',
            tips: '',
            num: 0
        }
    },
    created() {
        let self = this;
        this.getData();
        delete this.$root.uievent._events['delNewsSort'];
        this.$root.uievent.$on('delNewsSort', async function(deldata) {
            self.num++;
            self.loading = "删除中";
            self.$store.commit('uiclose', {
                type: 'confirm'
            });
            let data = await this.$ajax.post(self.Api.newsSortDel, {
                data: deldata,
                token: self.$store.state.token
            });
            if (data.err_code == 200) {
                self.loading = "";
                self.tips = "删除成功";
                self.getData();
            } else {
                self.loading = "";
                self.tips = "删除失败，已经删除，或不存在";
            }
        })
    },

    methods: {
        async getData() {
            let data = await this.$ajax.post(this.Api.newsSort, {
                data: '',
                token: this.$store.state.token
            });
            this.list = data.data;
        },
        async del(id, cover) {
            this.$store.commit('uishow', {
                wrap: 'warn',
                title: '警告',
                word: '是否删除该分类',
                type: 'confirm',
                even: 'delNewsSort',
                isclose: true,
                data: {
                    _id: id,
                    cover: cover
                }
            });
            //            let data=await this.$ajax.post(this.Api.storelist,{id:id,token:this.$store.state.token});
            //            console.log(data);
        }
    },
    events: {}
};
</script>
