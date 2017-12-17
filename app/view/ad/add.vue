<template>
  <indoor>
    <form-edit ref='form'>
      <input-text toggleTitle=1 title="标题：" tips="请输入标题" :value.sync="data.title" :schema="schema" rule="title" tw="1rem"></input-text>
      <input-text toggleTitle=1 title="标题：" tips="请输入链接" :value.sync="data.link" :schema="schema" rule="link" tw="1rem"></input-text>
      <vue-select toggleTitle=1 :sort="sort" title="分类：" tips="请选择分类" :value.sync="data.classify" :schema="schema" rule="classify" tw="1rem"></vue-select>
      <code-box v-show="data.classify" :width="width" imgtype="ad" :value.sync="data.cover" toggleTitle=1 tw="1rem" title="封面:" :schema="schema" rule="cover"></code-box>
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
    link: {
      rule: ['require'],
      msg: ['请填写链接']
    },
    classify: {
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
          classify: '',
          cover: '',
          title: '',
          link: ''
        },
        sort: [],
        model: [],
        forbid: true,
        subword: "提交",
        schema: new Schema(schema, this),
        tips: '',
        width: 1920
      }
    },
    created() {
      this.getSort();
    },
    watch: {
      '$route': function(to, from) {
        if (this.$route.query.page) {
          this.$refs.page.change({});
        }
      },
      'data.classify': function(news, olds) {
        this.findClassify();
      }
    },
    methods: {
      findClassify() {
        for (let i = 0, len = this.sort.length; i < len; i++) {
          if (this.sort[i]['_id'] == this.data.classify) {
            this.width = this.sort[i]['width'];
          }
        }
      },
      async getSort() {
        let data = await this.$ajax.post(this.Api.adSort, {
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
        let data = await this.$ajax.post(this.Api.adAdd, {
          data: this.data,
          token: this.$store.state.token
        });
        if (data.err_code == 200) {
          ui.confirm.show({
            info: "警告",
            title: "你确定删除",
            bg: true,
            fun: this.agoAdd,
            part: id,
            btnsure: '返回列表',
            btnclose: '继续添加',
            warn: "success"
          });
        } else {
          ui.tips.show(data.err_msg);
          this.subword = "提交";
        }
      },
      agoAdd() {
        this.$route.push({
          name: 'adlist'
        });
      },
      cancel() {
        this.data = {
          classify: '',
          cover: '',
          title: '',
          link: ''
        };
        this.subword = '提交'
      }
    },
    events: {}
  };
</script>
