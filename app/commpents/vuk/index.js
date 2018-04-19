import Message from './alert';
import Confirm from './confirm';
import Circle from './circle';
import Tips from './tips';
const components = [
  Message,
  Tips
];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$vuk ={
    message:Message,
    confirm:Confirm,
    circle:Circle,
    tips:Tips
  };
  Vue.prototype.message=Message;
  Vue.prototype.confirm=Confirm;
  Vue.prototype.circle=Circle;
  Vue.prototype.tips=Tips;

};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


module.exports = {
  install,
  Message
};
module.exports.default = module.exports;
