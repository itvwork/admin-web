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
                    <router-link :to="{ name:'editTeachSort',params:{id:item._id} }">修改</router-link>
                    <button @click="del(item._id,item.cover)">删除</button>
                </td>
            </tr>

        </tbody>
    </table>

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
                    name: 'addTeachSort'
                },
                name: '添加教程分类',
                class: 'btn-add-model'
            }],
            list: [],
            loading: '',
            tips: '',
            num: 0
        }
    },
    created() {

        this.getData();

    },

    methods: {
        async getData() {
            let data = await this.$ajax.post(this.Api.teachSort, {
                data: '',
                token: this.$store.state.token
            });
            this.list = data.data;
        },
        async del(id, cover) {
          ui.confirm.show({
            info: "警告",
            title: "你确定删除",
            bg: true,
            fun: this.deldata,
            part:  {
                _id: id,
                cover: cover
            },
            warn: "warn"
          });
        },
        async deldata(deldata){
            ui.loading.show("删除中");
          let data = await this.$ajax.post(self.Api.teachSortDel, {
              data: deldata,
              token: this.$store.state.token
          });
          if (data.err_code == 200) {
              ui.loading.close();
              ui.tips.show("删除成功");
              this.getData();
          } else {
              ui.loading.close();
              ui.tips.show("删除失败，已经删除，或不存在");
          }
        }
    },
    events: {}
};
</script>
