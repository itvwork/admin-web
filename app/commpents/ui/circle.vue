
<template>
     <div class="ui-circle-box">
         <svg viewBox="0 0 100 100">
             <path d="M 50,50 m 0,-47
            a 47,47 0 1 1 0,94
            a 47,47 0 1 1 0,-94" :stroke="baseColor" stroke-width="5" fill-opacity="0"></path>
             <path class="outer index" d="M 50,50 m 0,-47
            a 47,47 0 1 1 0,94
            a 47,47 0 1 1 0,-94" stroke-linecap="round" :stroke="turnColor" stroke-width="6" fill-opacity="0"
                   style=""></path>
         </svg>
     </div>
</template>
<script>
    import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            ui: state=> state.ui.alert
        })
    },
    props: {
        baseColor:{
            type:String,
            default:'#eaeef2'
        },
        turnColor:{
            type:String,
            default:'#2db7f5'

        }
    },

    data() {

        return {

        }
    },
    created() {

    },
    methods: {
        closebox: function() {
            this.ui.show=false;
        },
        sure: function() {
            this.$root.uievent.$emit(this.ui.even);

        },
    }
};
</script>
