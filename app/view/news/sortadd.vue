<template>
    <indoor>
        <form-edit ref='form'>
            <input-text toggleTitle=1  title="分类名称：" tips="请输入分类名称" :value.sync="data.title" :schema="schema"
                        rule="title" tw="1rem"></input-text>
            <code-box :value.sync="data.cover" width=200 toggleTitle=1  imgtype="icon" tw="1rem" title="分类图标<br/>(100*100)" :schema="schema"
                      rule="cover"></code-box>
            <div class="sub-bar" style="padding-left: 1.3rem">
                <button class="btns btn-sub" @click="send()">{{subword}}</button>
            </div>
        </form-edit>
        <vue-tips :tips.sync="tips" v-if="tips"></vue-tips>
    </indoor>
</template>
<script>
    let schema = {
        title: {
            rule: ['require'],
            msg: ['分类标题是必须的']
        },
        cover: {
            rule: ['require'],
            msg: ['分类图标是必须的']
        }
    };


    export default {

        data() {
            return {

                data: {
                    title: '',
                    cover: ''
                },

                model: [],
                forbid: true,
                subword: "提交",
                schema: new Schema(schema, this),
                tips: ''
            }
        },
        created() {
            let self = this;
            delete this.$root.uievent._events['newsSortModel'];
            this.$root.uievent.$on('newsSortModel', function () {
                self.$store.commit('uiclose', {type: 'confirm'});
                self.$router.push({
                    name: 'newsSort'
                })
            });
            this.$root.uievent.$on('close', function () {
                self.$store.commit('uiclose', {type: 'confirm'});
                self.data = {
                    title: "",
                    cover: '',
                };
                self.subword = '提交'
            });

        },
        watch: {

            '$route': function (to, from) {
                if (this.$route.query.page) {
                    this.$refs.page.change({});
                }

            }

        },
        methods: {
            async send() {
                if (this.subword == "数据提交中…") {
                    return false;
                }

                if (!this.schema.allvalt()) {
                    return false;
                }

                this.subword = "数据提交中…";
                let data = await this.$ajax.post(this.Api.newsSortAdd, {data: this.data, token: this.$store.state.token});
                if (data.err_code == 200) {
                    this.$store.commit('uishow', {
                        wrap: 'success',
                        title: '添加成功,返回列表,或继续添加',
                        btnsure: '返回列表',
                        btnclose: '继续添加',
                        type: 'confirm',
                        even: 'newsSortModel'
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
