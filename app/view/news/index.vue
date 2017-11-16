<template>
<indoor>
  <addbtn :btn="btn"></addbtn>
  <table class="list-table">
    <thead>
      <tr>
        <th>序号</th>
        <th>标题</th>
        <th>所属分类</th>
        <th>来源</th>
        <th>添加时间</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in list">
        <td>{{index+1}}</td>
        <td>{{item.title}}</td>
        <td>{{item.docs[0].title}}</td>
        <td>{{item.author}}</td>
        <td>{{$tool.formatDate(item.add_time)}}</td>
        <td>
        <router-link :to="{ name:'caseEdit',params:{id:item._id} }">修改</router-link>
          <button @click="del(item._id)">删除</button>
          </td>
      </tr>
    </tbody>
  </table>
  <loading v-show="loading" :loading="loading"></loading>
  <vue-tips v-if="tips" :tips.sync="tips"></vue-tips>
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
          name: 'newsadd'
        },
        name: '添加资讯',
        class: 'btn-add-model'
      }],
      list:[],
      tips: '',
      rows: 0,
      loading:'',
      sort:''
    }
  },
  watch:{
    '$route': function(to, from) {
        this.getData();
    }
  },
  created(){
    this.getData();
    let self=this;
    delete this.$root.uievent._events['delNews'];
    this.$root.uievent.$on('delNews', async function(deldata) {
        self.loading = "删除中";
        self.$store.commit('uiclose', {
            type: 'confirm'
        });
        let data = await this.$ajax.post(self.Api.caseDel, {
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
      this.loading = "加载中…";
      let data = await this.$ajax.post(this.Api.newsList, {
        data: {
          page: this.$route.query.page ? this.$route.query.page : 1,
          num: 10
        },
        token: this.$store.state.token
      });
      this.loading = false;
      let list = data.data;
      this.list = list.result;
      this.rows = list.count;
    },

    sortName(id){
      for(let i = 0,len=this.sort.length;i<len;i++){
           if(this.sort[i]['_id']==id){
             return this.sort[i]['title'];
             break;
           }
      }
    },
    async del(id) {
        this.$store.commit('uishow', {
            wrap: 'warn',
            title: '警告',
            word: '是否删除该案例',
            type: 'confirm',
            even: 'delNews',
            isclose: true,
            data: {
                _id: id
            }
        });
    }
  },
  events: {}
};
</script>
