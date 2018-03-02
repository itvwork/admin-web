
<template>
    <div class="vue-loading" v-show="visible">
        <div class="loading-img">
        </div>
        <p>{{loading}}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: '加载中……',
                visible: false
            }
        },
        created() {

        },
        methods: {

        }
    };
</script>
