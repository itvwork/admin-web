<template>
<indoor>
  <ul class="teach-item-content">
      <li class="cover"><img :src="Api.imgurl+chapter.cover" /></li>
      <li class="info">
        <h2>{{chapter.title}}</h2>
        <p></p>
        {{chapter.add_time|datesec}}
        </li>
  </ul>
  <!-- <table class="list-table">
    <thead>
      <tr>
        <th>序号</th>
        <th>封面</th>
        <th>查看次数</th>
        <th>添加时间</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in list">
        <td>{{index+1}}</td>
        <td>{{item.title}}</td>
        <td>{{item.view}}</td>
        <td>{{$tool.formatDate(item.add_time)}}</td>
        <td>
          <router-link :to="{ name:'teachEdit',params:{id:item._id} }">修改</router-link>
          <router-link :to="{ name:'chapterlist', params:{id:item._id} }">查看章节</router-link>
          <button @click="del(item._id)">删除</button>
        </td>
      </tr>
    </tbody>
  </table> -->
  <!-- <page ref="page" sub=10 v-if="rows>10" :rows.sync="rows"></page> -->
</indoor>
</template>

<style lang="less">
@import "../../commpents/const.less";
.teach-item-content{
  display: flex;
   border-radius: 5px;
  .cover{
    width: 140px;
    height: 140px;
    img{ width: 100%; height: 100%;}

  }
  .info{flex: 1;}
}
</style>
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
          name: 'addchapter',
           params:this.$route.params.id
        },
        name: '添加章节',

        class: 'btn-add-model'
      }],
      list: [],
      tips: '',
      rows: 0,
      loading: '',
      sort: '',
      chapter:{}
    }
  },
  watch: {

  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
        let res = await this.$ajax.post(this.Api.teachMsg,{data:{_id:this.$route.params.id}, token: this.$store.state.user.token});
        if(res.err_code==200){
          this.chapter=res.data;
        }

    },
    async getSort() {


    },
    sortName(id) {

    },
    async del(id) {

    },
    async deldata(id) {

    }
  }
};
</script>
