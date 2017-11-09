<template>
<indoor>
    <form-edit ref='form'>
        <input-text toggleTitle=1 title="分类名称：" tips="请输入分类名称" :value.sync="data.title" :schema="schema" rule="title" tw="1rem"></input-text>
        <input-text toggleTitle=1 title="分类名称：" tips="请输入图片要压缩的宽度" :value.sync="data.width" :schema="schema" rule="width" tw="1rem"></input-text>
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
    width: {
        rule: ['require'],
        msg: ['压缩的宽度是必须的']
    }
};


export default {

    data() {
        return {
            data: {
                title: '',
                width: ''
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
        delete this.$root.uievent._events['adSortModel'];
        this.$root.uievent.$on('adSortModel', function() {
            self.$store.commit('uiclose', {
                type: 'confirm'
            });
            self.$router.push({
                name: 'adSort'
            })
        });
        this.$root.uievent.$on('close', function() {
            self.$store.commit('uiclose', {
                type: 'confirm'
            });
            self.data = {
                title: "",
                cover: '',
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
        async send() {
            if (this.subword == "数据提交中…") {
                return false;
            }

            if (!this.schema.allvalt()) {
                return false;
            }

            this.subword = "数据提交中…";
            let data = await this.$ajax.post(this.Api.adSortAdd, {
                data: this.data,
                token: this.$store.state.token
            });
            if (data.err_code == 200) {
                this.$store.commit('uishow', {
                    wrap: 'success',
                    title: '添加成功,返回列表,或继续添加',
                    btnsure: '返回列表',
                    btnclose: '继续添加',
                    type: 'confirm',
                    even: 'adSortModel'
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
