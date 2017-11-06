<template>
<indoor>
  <form-edit ref='form'>
    <input-text toggleTitle=1 title="标题：" tips="请输入标题" :value.sync="data.title" :schema="schema" rule="title" tw="1rem"></input-text>
    <vue-select toggleTitle=1 :sort="sort" title="分类：" tips="请选择分类" :value.sync="data.sort" :schema="schema" rule="sort" tw="1rem"></vue-select>
    <code-box width=450 imgurl="cover" :value.sync="data.cover" imgtype="cover"  toggleTitle=1 tw="1rem" title="封面:" :schema="schema" rule="cover"></code-box>
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
  },
  cover: {
    rule: ['require'],
    msg: ['请上传或选择图片']
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
        cover: '',
        content: ''

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
    this.getData();
    delete this.$root.uievent._events['newsEdit'];
    delete this.$root.uievent._events['close'];
    this.$root.uievent.$on('newsEdit', function() {
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
    async getData(){
      let data = await this.$ajax.post(this.Api.newsDetail, {
        data: {_id:this.$route.params.id},
        token: this.$store.state.token
      });
      this.data=data.data;
    },
    async send() {

      if (this.subword == "数据提交中…") {
        return false;
      }
      if (!this.schema.allvalt()) {
        return false;
      }
      this.subword = "数据提交中…"
      let data = await this.$ajax.post(this.Api.newsEdit, {
        data: this.data,
        token: this.$store.state.token
      });
      if (data.err_code == 200) {
        this.$store.commit('uishow', {
          wrap: 'success',
          title: '添加成功,返回列表,或继续添加',
          btnsure: '返回列表',
          btnclose: '留在本页',
          type: 'confirm',
          even: 'newsEdit'
        });
      } else {
        this.tips = data.err_msg;
        this.subword = '提交';
      }
     }

  },
  events: {}
};
</script>
