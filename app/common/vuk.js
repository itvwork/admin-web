export default {
    data() {
        return {
            $vukvm:{

            }
        }
    },
    created() {


    },
    watch: {
        // $route(to, from) {
        //     if(JSON.stringify(this.$vukvm)=='{}')return;
        //     for (let i of this.vukvm) {
        //         this.vukvm[i].remove();
        //     }
        // }
    },
    methods:{
      add(index,vm){

          this.$data.$vukvm[index]=vm;
      }
    },
    beforeDestroy() {
      console.log(this.$data.$vukvm);
      //if(JSON.stringify(this.$data.$vukvm)=='{}')return;
      //this.$data.$vukvm['tips'].remove();

    }
};
