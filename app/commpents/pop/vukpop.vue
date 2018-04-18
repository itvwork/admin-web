<template>
<span class="popvuk">
    <div class="bg" ></div>
    <slot></slot>
</span>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            default: 'vuk-pop'
        },
        bg:{
          type:Boolean,
          default:false
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        document.body.append(this.$el);
    },
    watch: {

    },
    created() {

    },
    updated() {

    },
    beforeDestroy() {
        document.body.removeChild(this.$el);
    }

};
</script>
