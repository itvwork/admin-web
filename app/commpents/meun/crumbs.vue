<template>
<div class="crumbs" v-show="isShow">
  <router-link v-for="(item,index) in crumb" :to="{path:item.path,param:item.params}">{{item.title}}</router-link>
  <span>{{now}}</span>
</div>
</template>

</section>
<script>
export default {
  name: 'crumbs',
  data() {
    return {
      isShow: true,
      crumb: [],
      now: ''
    }
  },
  created() {
    if (this.$route.name == "home") {
      this.isShow = false;
    }
    this.getpath();
  },
  methods: {
    getpath: function() {
      this.crumb = [];
      this.now = this.$route.meta.title;
      let urllist = this.$route.matched;
      console.log(urllist);
      let len = urllist.length;
      if (len > 1) {
        for (let i = 0; i < len - 1; i++) {
          if(urllist[i]['meta']&&urllist[i]['meta']['title']){
            this.crumb.push({
              path: urllist[i]['path'],
              title: urllist[i]['meta']['title'],
            })
          }

          // if (urllist[i]['meta']['title'] != this.now) {
          //   this.crumb.push({
          //     path: urllist[i]['path'],
          //     title: urllist[i]['meta']['title'],
          //   })
          // }
        }
      }
    }
  },
  watch: {
    '$route': function(to, from) {
      if (to.name == "home") {
        this.isShow = false;
      } else {
        this.isShow = true;
        this.getpath();
      }
    },
  }
}
</script>
