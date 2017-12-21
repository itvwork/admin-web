<template>
<indoor>
  <form-edit ref='form'>
    <input-text toggleTitle=1 title="标题：" tips="请输入标题" :value.sync="data.title" :schema="schema" rule="title" tw="1rem"></input-text>
    <vue-editor :detail.sync="data.content"></vue-editor>
    <div class="sub-bar" style="padding-left: 1.3rem">
      <button class="btns btn-sub" @click="send()">{{subword}}</button>
    </div>
  </form-edit>
</indoor>
</template>
<script>
import addbtn from '../../commpents/meun/addbtn';

let schema = {
  title: {
    tirm: false,
    rule: ['require', ],
    msg: ['标题是必须']
  }
};


export default {
  components: {
    addbtn
  },
  data() {
    return {
      data: {
        title:'ui设计课程',
        content:'vue,angular,js,app',
        pid:this.$route.params.id
      },
      sort: [],
      model: [],
      forbid: true,
      subword: "提交",
      schema: new Schema(schema, this),
      tips: ''
    }
  },
  created() {
      


  },
  watch: {

    '$route': function(to, from) {
      if (this.$route.query.page) {
        this.$refs.page.change({});
      }
    }

  },
  methods: {
    async getSort() {
      let data = await this.$ajax.post(this.Api.teachSort, {
        data: '',
        token: this.$store.state.token
      });
      this.sort = data.data;

    },
    async send() {
      if (this.subword == "数据提交中…") {
          return false;
      }
      if (!this.schema.allvalt()) {
          return false;
      }

      this.subword = "数据提交中…"
      let data = await this.$ajax.post(this.Api.lessionAdd, {data: this.data, token: this.$store.state.token});
      this.subword = "提交";



      }

  },

};
</script>
