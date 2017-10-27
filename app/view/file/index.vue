<template>
    <indoor>

        <table class="list-table" >
            <thead>
            <tr>
                <th>标题</th>
                <th>封面</th>
                <th>所属分类</th>
                <th>作者</th>
                <th>添加时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>中华人民</td>
                <td><img width="100" src="/wgc/style/file/car.jpg"/></td>
                <td>分类</td>
                <td>admin</td>
                <td>2017-12-11 11:00:00</td>
                <td>操作</td>
            </tr>
            <tr>
                <td>中华人民</td>
                <td><img width="100" src="/wgc/style/file/car.jpg"/></td>
                <td>分类</td>
                <td>admin</td>
                <td>2017-12-11 11:00:00</td>
                <td>操作</td>
            </tr>
            <tr>
                <td>中华人民</td>
                <td><img width="100" src="/wgc/style/file/car.jpg"/></td>
                <td>分类</td>
                <td>admin</td>
                <td>2017-12-11 11:00:00</td>
                <td>操作</td>
            </tr>
            </tbody>
        </table>
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
                        name: 'caseadd'
                    },
                    name: '添加案例',
                    class: 'btn-add-model'
                }
                ]
            }
        },
        created() {
            let self=this;
            this.getdata();
            if(this.$root.uievent._events['flieDel']) return false ;
            this.$root.uievent.$on('flieDel',async function (id) {
                self.num++;
                self.loading="删除中";
                self.$store.commit('uiclose',{type:'confirm'});
                let data=await this.$ajax.post(self.Api.caseSortDel,{data:{_id:id},token:self.$store.state.token});
                if(data.err_code==200){
                    self.loading="";
                    self.tips="删除成功";
                    self.getdata();
                }else{
                    self.loading="";
                    self.tips="删除失败，已经删除，或不存在";
                }
            })
        },

        watch: {

            username: function (val, oldval) {
                console.log(this.login);
            }
        },
        methods: {
            async getdata() {
                let data = await this.$ajax.post(this.Api.file, {data: '', token: this.$store.state.token});
                this.list=data.data;
            }
        },
        events: {}
    };
</script>
