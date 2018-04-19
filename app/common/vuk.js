export default {
    data() {
        return {
            $vukvm: {

            }
        }
    },
    created() {

    },
    watch: {
        $route(to, from) {
            if(JSON.stringify(this.$vukvm)=='{}')return;
            for (let i of this.vukvm) {
                this.vukvm[i].remove();
            }
        }
    },
    // beforeDestroy() {
    //   if(JSON.stringify(this.$vukvm)=='{}')return;
    //   for (let i of this.vukvm) {
    //       this.vukvm[i].remove();
    //   }
    // }
};
