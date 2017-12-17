
<template>
    <div class="vue-loading" v-show="toggle">
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
                toggle: false
            }
        },
        created() {
            ui['loading'] = this;
        },
        methods: {
            show(data) {
                data = data ? data : '加载中……';
                this.loading = data;
                this.toggle = true;
            },
            close() {
                this.toggle = false;
            }
        }
    };
</script>
