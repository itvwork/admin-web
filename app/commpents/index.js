import Message from './alert';
import Confirm from './confirm';
import Circle from './circle';
const components = [
  Message
];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$vuk ={
    message:Message,
    confirm:Confirm,
    circle:Circle
  };
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


module.exports = {
  install,
  Message
};
module.exports.default = module.exports;
