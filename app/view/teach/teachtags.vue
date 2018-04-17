<template>
<indoor>
    <vuk-node :toggleTitle="false" @change="update" tw="1rem" :value.sync="tags"></vuk-node>
    <vuk-pop></vuk-pop>
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
            }]
        }
    },
    watch: {

    },
    
    created() {

        setTimeout(() => {
            console.log(this.tags);
        }, 3000)
    },
    methods: {
        async update(i) {
            console.log(i);
        },
        async getData(page) {

        },
        async getSort() {

        },
        async del(id) {

        },
        async deldata(deldata) {

        },

    }
};
</script>
