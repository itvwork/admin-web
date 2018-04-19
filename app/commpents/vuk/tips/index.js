import Vue from 'vue';
import Main from './main.vue';
let Ctrl= Vue.extend(Main);
let instance={};
let instances = [];
let seed = 1;

const Tips = function(self,options) {

  instance = new Ctrl({
    data: options
  });

  if(instances.length>0){
      instance.index=instances[instances.length-1].index+1;
  }else{
      instance.index=2000;
  }

  instance.vm = instance.$mount();
  instance.vm.visible = true;
  document.body.appendChild(instance.vm.$el);
  instance.vm.onClose=function(id){
      Tips.close(id)
  }
  instance.vm.closeAll=function(){
    tips.closeAll();
  }
  instance.dom = instance.vm.$el;
  this.$vukvm=instance.vm;
  return instance.vm;
};
Tips.close=function(id){
      for(let i=0,l=instances.length;i<l;i++){
          if(instances[i].index==id){
              instances.splice(i,1);
              break;
          }
      }
}

Tips.closeAll=function(id){
    instances=[];
}

export default Tips;
