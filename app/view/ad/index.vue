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
          <td>{{item.docs[0].title}}</td>
          <td>{{$tool.formatDate(item.add_time)}}</td>
          <td>
            <router-link :to="{ name:'addEdit',params:{id:item._id} }">修改</router-link>
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
            name: 'adadd'
          },
          name: '添加广告',
          class: 'btn-add-model'
        }],
        list: [],
        tips: '',
        rows: 0,
        loading: '',
        sort: [{
          title: '首页广告',
          _id: 'HomeBanner',
          width: 1920
        }]
      }
    },
    watch: {
      '$route': function(to, from) {
        this.getData();
      }
    },
    created() {
      this.getData();

    },
    mounted() {},
    methods: {
      async getData(page) {

        ui.loading.show("加载中…");
        let data= await this.$ajax.rsapost(this.Api.adList, {
          data: {
            page: this.$route.query.page ? this.$route.query.page : 1,
            num: 10
          },
          token: this.$store.state.user.token
        });
        ui.loading.close();
        let list = data.data;
        this.list = list.result;
        this.rows = list.count;
         await this.$ajax.post('http://localhost:8099/plane/city/index', {
             data: {
                 flightType: 1,
                 departCity: 'CAN',
                 arriveCity: 'SHA',
                 departDate: '2018-05-23',
                 classType: 0
             }
         });
      },
      sortName(id) {
        for (let i = 0, len = this.sort.length; i < len; i++) {
          if (this.sort[i]['_id'] == id) {
            return this.sort[i]['title'];
            break;
          }
        }
      },
      del(id) {
      let del=  this.$vuk.confirm({
            style:'warn',
            title:'你确定要删除此数据',
            sure:this.deldata,
            surevalue:id
        });
        console.log(del);
        // ui.confirm.show({
        //   info: "警告",
        //   title: "你确定删除",
        //   bg: true,
        //   fun: this.deldata,
        //   part: id,
        //   warn: "warn"
        // });
      },
      async deldata(id) {

        // ui.loading.show("删除中…");
        // ui.confirm.close();
        // let data = await this.$ajax.rsapost(self.Api.adDel, {
        //   data:{
        //     _id:id
        //   },
        //   token: this.$store.state.token
        // });
        // if (data.err_code == 200) {
        //   this.tips = "删除成功";
        //   this.getData();
        // } else {
        //   this.tips = "删除失败，已经删除，或不存在";
        // }
        // ui.loading.close();
      }
    },
    events: {}
  };
</script>
