import Vue from 'vue';
import Main from './main.vue';
let MessageConstructor = Vue.extend(Main);

let instance={};
let instances = [];
let seed = 1;

const Confirm = function(options) {
  instance = new MessageConstructor({
    data: options
  });

  if(instances.length>0){
      console.log(instances.length);
      instance.index=instances[instances.length-1].index+1;
  }else{
      instance.index=2000;
  }
  instance.vm = instance.$mount();
  instance.vm.visible = true;
  document.body.appendChild(instance.vm.$el);
  instance.vm.onClose=function(id){
      Confirm.close(id);
  }
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};
Confirm.close=function(id){
      for(let i=0,l=instances.length;i<l;i++){
          if(instances[i].index==id){
              instances.splice(i,1);
              break;
          }
      }
}

Confirm.closeAll=function(id){

}

export default Confirm;
