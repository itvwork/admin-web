
<template>
<section  @resize="size($event)" class="wrap-box" @dragleave="dragleave($event)" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
    <div class="left-box-meun" v-show="navshow">
        <menu>
          <div class="item-menu" v-for="(item,index) in meun">
              <router-link :to="item.url" style="padding-left:0px; display:block; text-align:center">{{item.name}}</router-link>
          </div>
            <!-- <div class="item-menu">
                <router-link to="/admin/index"><i class="icon-home"></i>首页</router-link>
            </div>
            <div class="item-menu">
                <router-link :to="{ name:'case' }"><i class="icon-brand"></i>品牌案例</router-link>
                <div class="meun-sub">
                    <router-link :to="{ name:'caselist' }">案例列表</router-link>
                    <router-link :to="{ name: 'caseSort' }">案例分类</router-link>
                </div>
            </div> -->

        </menu>
    </div>

    <section  class="right-box"   style="top:0px;">
            <router-view></router-view>
    </section>

</section>

</template>

<script>
export default {
    data() {
        return {
          meun:apidata.meun
        }
    },
    created(){
      console.log(this.meun);
      var width=document.body.offsetWidth;

      if(width<=780){
          this.navshow=false;
      }else{
          this.navshow=true;
      }



    },
    mounted(){
      let self=this;
      window.onresize = function temp() {
        var width=document.body.offsetWidth;
          console.log(width);
        if(width<=780){
            self.navshow=false;
        }else{
            self.navshow=true;
        }
        };



    },

    watch: {
        username: function(val, oldval) {
            console.log(this.login);
        },
        '$route': function(to, from) {
          var width=document.body.offsetWidth
          if(width<=780){
              this.navshow=false;
          }

        },
        '$store.state.bg':function(){
          console.log('store----------');
        }
    },
    methods: {
        sub() {
            console.log(this.$data);
        },
        dragleave:function(e){    //拖离
            e.preventDefault();
        },
        drop:function(e){  //拖后放
            e.preventDefault();
        },
        dragenter:function(e){    //拖进
            e.preventDefault();
        },
        dragover:function(e){    //拖来拖去
            e.preventDefault();
        },
        tiggle:function(e){
            e.preventDefault();
        },
        size(e){
          console.log('navs');
        }

    },
    events: {

    }
};
</script>
