<template>
<indoor>
  <form-edit ref='form'>
    <input-text toggleTitle=1 title="标题：" tips="请输入标题" :value.sync="data.title" :schema="schema" rule="title" tw="1rem"></input-text>
    <input-text toggleTitle=1 title="作者：" tips="请输入标题" :value.sync="data.author" tw="1rem"></input-text>
    <input-text toggleTitle=1 title="来源(链接)：" tips="请输入标题" :value.sync="data.source"  tw="1rem"></input-text>
    <vue-select toggleTitle=1 :sort="sort" title="分类：" tips="请选择分类" :value.sync="data.sort" :schema="schema" rule="sort" tw="1rem"></vue-select>
    <textarea-edit  title="简介：" tw="1rem" toggleTitle=1  :value.sync="data.info" tips="请输入出简介" ></textarea-edit>
    <vue-editor :detail.sync="data.content"></vue-editor>
    <div class="sub-bar" style="padding-left: 1.3rem">
      <button class="btns btn-sub" @click="send()">{{subword}}</button>
    </div>
  </form-edit>
  <vue-tips :tips.sync="tips" v-if="tips"></vue-tips>
</indoor>
</template>
<script>
import addbtn from '../../commpents/meun/addbtn';

let schema = {
  title: {
    tirm: false,
    rule: ['require', ],
    msg: ['标题是必须']
  },
  sort: {
    rule: ['require'],
    msg: ['请选择分类']
  }
};


export default {
  components: {
    addbtn
  },
  data() {
    return {
      data: {
        sort: '',
        content: '',
        author:'',
        source:'',
        title:''
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
    let self = this;
    this.getSort();
    delete this.$root.uievent._events['newsAdd'];
    delete this.$root.uievent._events['close'];
    this.$root.uievent.$on('newsAdd', function() {
      self.$store.commit('uiclose', {
        type: 'confirm'
      });
      self.$router.push({
        name: 'news'
      })
    });
    this.$root.uievent.$on('close', function() {
      self.$store.commit('uiclose', {
        type: 'confirm'
      });
      self.data = {
        sort: '',
        content: '',
        author:'',
        source:'',
        title:''
      };
      self.subword = '提交'
    });

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
      let data = await this.$ajax.post(this.Api.newsSort, {
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
      let data = await this.$ajax.post(this.Api.newsAdd, {data: this.data, token: this.$store.state.token});
      if (data.err_code == 200) {
          this.$store.commit('uishow', {
              wrap: 'success',
              title: '添加成功,返回列表,或继续添加',
              btnsure: '返回列表',
              btnclose: '继续添加',
              type: 'confirm',
              even: 'newsAdd'
          });
      } else {
          this.tips = data.err_msg;
          this.subword="提交";
      }
     }

  },
  events: {}
};
</script>
