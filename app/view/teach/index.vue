<template>
<indoor>
  <addbtn :btn="btn"></addbtn>
  <table class="list-table">
    <thead>
      <tr>
        <th>序号</th>
        <th>封面</th>
        <th>所属分类</th>
        <th>添加时间</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in list">
        <td>{{index+1}}</td>
        <td><img width="100" :src="Api.imgurl+item.cover" /></td>
        <td>{{sortName(item.sort)}}</td>
        <td>{{$tool.formatDate(item.add_time)}}</td>
        <td>
          <router-link :to="{ name:'teachEdit',params:{id:item._id} }">修改</router-link>
          <button @click="del(item._id)">删除</button>
        </td>
      </tr>
    </tbody>
  </table>

  <page ref="page" sub=10 v-if="rows>10" :rows.sync="rows"></page>
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
          name: 'teachadd'
        },
        name: '添加教程',
        class: 'btn-add-model'
      }],
      list: [],
      tips: '',
      rows: 0,
      loading: '',
      sort: ''
    }
  },
  watch: {
    '$route': function(to, from) {
      this.getData();
    }
  },
  created() {
    this.getData();
    this.getSort();
    let self = this;
    delete this.$root.uievent._events['delTeach'];
    this.$root.uievent.$on('delTeach', async function(deldata) {
      self.loading = "删除中";
      self.$store.commit('uiclose', {
        type: 'confirm'
      });
      let data = await this.$ajax.post(self.Api.teachDel, {
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
    async getData(page) {
      ui.loading.show("加载中…");
      let data = await this.$ajax.post(this.Api.teachList, {
        data: {
          page: this.$route.query.page ? this.$route.query.page : 1,
          num: 10
        },
        token: this.$store.state.token
      });
      ui.loading.close();
      let list = data.data;
      this.list = list.result;
      this.rows = list.count;
    },
    async getSort() {
      let data = await this.$ajax.post(this.Api.teachSort, {
        data: '',
        token: this.$store.state.token
      });
      this.sort = data.data;

    },
    sortName(id) {
      for (let i = 0, len = this.sort.length; i < len; i++) {
        if (this.sort[i]['_id'] == id) {
          return this.sort[i]['title'];
          break;
        }
      }
    },
    async del(id) {
      ui.confirm.show({
        info: "警告",
        title: "你确定删除",
        bg: true,
        fun: this.deldata,
        part: id,
        warn: "warn"
      });
    },
    async deldata(id) {
      let self = this;
      ui.confirm.close();
      ui.loading.show("删除中…");
      let data = await this.$ajax.post(self.Api.teachDel, {
        data: deldata,
        token: self.$store.state.token
      });
      if (data.err_code == 200) {

        ui.tips.show("删除成功");
        self.getData();
      } else {
        ui.tips.show("删除失败，已经删除，或不存在");
      }
      ui.loading.close();
    }
  }
};
</script>
