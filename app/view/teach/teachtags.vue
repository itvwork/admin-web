<template>
<indoor>
    <vuk-node :toggleTitle="false" @change="update" tw="1rem" @del="del" :value.sync="tags"></vuk-node>
    <!-- <vuk-pop :content="cons">
        </vuk-pop> -->
</indoor>
</template>

<script>

export default {

    data() {
        return {
            tags: [{
                _id: "dsadsad",
                title: 'node'
            }, {
                _id: "dsadsad",
                title: 'js'
            }],
          
        }
    },
    watch: {
        $route(to,from){

        }
    },
    beforeDestroy(){

    },
    mounted() {

    },

    created() {
        this.getData();

    },
    methods: {
        async update(data) {
            this.tags[data.index]['title'] = data.data;
            let res = await this.$ajax.post(this.Api.teachTagsAddOrUpdate, {
                token: this.$store.state.user.token,
                data: this.tags[data.index]
            });
            if (res.err_code == 200) {
                res['data'] ? this.tags[data.index] = res.data : "";
            }

        },
        async getData() {

            let data = await this.$ajax.post(this.Api.teachTags, {
                token: this.$store.state.user.token,
                data: ''
            });
            if (data.err_code = 200) {
                this.tags = data.data;
            }
        },

        async getSort() {

        },
        async del(index) {
          let res = await this.$ajax.post(this.Api.teachTagsDel, {
              token: this.$store.state.user.token,
              data: this.tags[index]
          });
          if(res.err_code==200){
              this.tags.splice(index,1);
          }else{
              this.$vuk.tips({
                content:res.err_msg
              })
          }


        },
        async deldata(deldata) {

        },

    }
};
</script>
