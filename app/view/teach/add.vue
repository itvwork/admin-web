<template>
<indoor>
  <form-edit ref='form'>
    <input-text toggleTitle=1 title="标题：" tips="请输入标题" :value.sync="data.title" :schema="schema" rule="title" tw="1rem"></input-text>
    <vue-select toggleTitle=1 :sort="sort" title="分类：" tips="请选择分类" :value.sync="data.sort" :schema="schema" rule="sort" tw="1rem"></vue-select>
    <code-box width=450 imgtype="cover" :value.sync="data.cover" toggleTitle=1 tw="1rem" title="封面:" :schema="schema" rule="cover"></code-box>
    <textarea-edit tw="1rem"  title="标签：" tips="请输入课程简介" :value.sync="data.info" ></textarea-edit>
    <textarea-edit tw="1rem"  title="知识点：" tips="请输入讲到知识点" :value.sync="data.knowledge" ></textarea-edit>
    <label class="vuk-list-checkbox-lable">
        <div class="row-title" style="width: 1rem;">标签：</div>
        <div class="text-outdoor"><vuk-list-checkbox :tags.sync="data.tags" :arr.sync="tags"></vuk-list-checkbox></div>
    </label>
    <div class="sub-bar" style="padding-left: 1.3rem">
      <button class="btns btn-sub" @click="send()">{{subword}}</button>
    </div>
  </form-edit>
  <!-- <vuk-pop :bg="true">
      <div  class="tags-wrap" >
          <vuk-list-checkbox :tags.sync="tagsed" :arr.sync="tags"></vuk-list-checkbox>
      </div>
  </vuk-pop> -->
</indoor>
</template>
<style lang="less">
@import '../../commpents/const.less';
.tags-wrap{
  position: absolute;
  z-index: 101;
  top: 50%;
  left: 50%;
  background-color: @white;
  min-height:300px;
  max-width: 600px;
  max-height: 600px;
  width: 100%;
  height: 100%;
  .tranxy;
  .border-radius(0,4px);
}
</style>
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
        title:'ui设计课程',
        sort: '',
        cover: '',
        info: 'ui设计课程ui设计课程ui设计课程ui设计课程',
        tags:[],
        knowledge:'vue,angular,js,app'
      },
      sort: [],
      model: [],
      forbid: true,
      subword: "提交",
      schema: new Schema(schema, this),
      tips: '',
      tags:[],

    }
  },
  created() {
    let self = this;
    this.getSort();
    this.getTags();


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
    async getTags(){
      let data = await this.$ajax.post(this.Api.teachTags, {
          token: this.$store.state.user.token,
          data: ''
      });
      if (data.err_code = 200) {
          this.tags = data.data;
      }
    },
    async send() {
      if (this.subword == "数据提交中…") {
          return false;
      }
      if (!this.schema.allvalt()) {
          return false;
      }
      this.subword = "提交中…";
      let data = await this.$ajax.post(this.Api.teachAdd, {data: this.data, token: this.$store.state.user.token});

      //let data = await this.$ajax.post(this.Api.teachAdd, {data: this.data, token: this.$store.state.token});
    //   if (data.err_code == 200) {
    //       this.$store.commit('uishow', {
    //           wrap: 'success',
    //           title: '添加成功,返回列表,或继续添加',
    //           btnsure: '返回列表',
    //           btnclose: '继续添加',
    //           type: 'confirm',
    //           even: 'teachAdd'
    //       });
    //   } else {
    //       this.tips = data.err_msg;
    //       this.subword="提交";
    //   }
      }

  },

};
</script>
