
<template>
    <transition name="tips" enter-active-class="animated bounceIn" leave-active-class="animated  bounceOut">
        <div v-show="toggle" class="vue-tips">
            {{tips}}
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                toggle: false,
                tips: "",
                time: '',
            };
        },
        created() {
            ui["tips"] = this;
        },
        methods: {
            show(tip) {
                let self = this;
                clearTimeout(this.time);
                this.tips = tip;
                this.toggle = true;
                this.time = setTimeout(function() {
                    self.toggle = false;
                }, 2000);
            }
        }
    };
</script>
