
<template>
<div class="ui-circle-box" :class="type" :style="{width:w,height:h}">
    <svg viewBox="0 0 100 100">
      <path d="M 50,50 m 0,-45
    a 45,45 0 1 1 0,90
    a 45,45 0 1 1 0,-90" :stroke="baseColor" stroke-width="5" fill-opacity="0"></path>
    <path d="M 50,50 m 0,-45
    a 45,45 0 1 1 0,90
    a 45,45 0 1 1 0,-90" stroke-linecap="round" :stroke="turnColor" stroke-width="5" fill-opacity="0"
    :style="{'stroke-dashoffset': percent(sent)}"style="stroke-dasharray: 282.743px, 282.743px;  transition: stroke-dashoffset 0.2s ease 0s, stroke 0.2s ease;"></path></svg>
    <div class="vuk-circle-percent" :style="{'font-szie':fontsize}">{{word}}</div>
</div>
</template>
<style lang="less">

@import "../../const.less";
.vuk-circle-percent{
  position: absolute;
  .tranxy(-50%,-50%);
  left: 50%; top: 50%;
}
</style>
<script>
//101.788px-0
export default {
    props: {
        baseColor: {
            type: String,
            default: '#eaeef2'
        },
        turnColor: {
            type: String,
            default: '#2db7f5'

        }
    },

    data() {
        return {
            w: '100px',
            h: '100px',
            type: '',
            sent:80,
            word:'进度文字',
            fontsize:'16px'
        }
    },
    created() {
    },
    methods: {
        percent(type) {
            let big = 282.743;
            let sent = big - type / 100 * big + 'px';
            console.log(type);
            return sent;
        }
    }
};
</script>
