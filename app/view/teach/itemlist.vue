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
          <router-link :to="{ name:'chapterlist', params:{id:item._id} }">查看章节</router-link>
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
          name: 'addchapter',
           params:this.$route.params.id
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

  },
  methods: {
    async getData(page) {
        
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
