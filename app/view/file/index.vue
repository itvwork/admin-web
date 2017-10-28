<template>
    <indoor>

        <table class="list-table">
            <thead>
            <tr>
                <th>封面</th>
                <th>所属分类</th>
                <th>作者</th>
                <th>添加时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in list">
                <td><img width="100" :src="Api.imgurl+item.path"/></td>
                <td>{{item.sort}}</td>
                <td>{{item.author}}</td>
                <td>{{$tool.formatDate(item.add_time)}}</td>
                <td>操作</td>
            </tr>

            </tbody>
        </table>
        <loading v-show="loading" :loading="loading"></loading>
        <vue-tips v-if="tips" :tips.sync="tips"></vue-tips>
        <page ref="page" :sub="row" v-if="rows>10" :rows.sync="rows"></page>
    </indoor>
</template>

<script>
    import addbtn from '../../commpents/meun/addbtn'

    export default {
        components: {addbtn},
        data() {
            return {
                list: [],
                rows: 0,
                row: 10,
                loading: '',
                tips:''
            }
        },
        created() {
            let self = this;
            this.getdata();
            if (this.$root.uievent._events['flieDel']) return false;
            this.$root.uievent.$on('flieDel', async function (id) {

                self.loading = "删除中";
                self.$store.commit('uiclose', {type: 'confirm'});
                let data = await this.$ajax.post(self.Api.caseSortDel, {
                    data: {_id: id},
                    token: self.$store.state.token
                });
                if (data.err_code == 200) {
                    self.loading = "";
                    self.tips = "删除成功";
                    self.getdata();
                } else {
                    self.loading = "";
                    self.tips = "删除失败，已经删除，或不存在";
                }
            })
        },

        watch: {
            '$route': function (to, from) {
                if (this.$route.query.page) {
                    this.$refs.page.change({});
                    this.getdata();
                }
                //   console.log(this.$route.query);
            }
        },
        methods: {
            async getdata() {
                this.loading= '加载中…';
                let search = this.$route.query;
                if(JSON.stringify(search)=="{}"){
                        search={page:1};
                }


                let data = await this.$ajax.post(this.Api.file, {data: search, token: this.$store.state.token});
                if (data.err_code == 200) {
                    this.list = data.data.result;
                    this.rows = data.data.count;
                }else{
                    this.tips="加载失败"
                }
                this.loading="";
            }
        },
        events: {}
    };
</script>
