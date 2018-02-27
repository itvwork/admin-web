import Message from './alert'
const components = [
  Message
];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$vuk ={
    message:Message
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
