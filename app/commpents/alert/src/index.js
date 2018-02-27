import Vue from 'vue';
import Main from './main.vue';
let MessageConstructor = Vue.extend(Main);

let instance={};
let instances = [];
let seed = 1;

const Message = function(options) {
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

  }
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};


export default Message;
