import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';


import App from './app.vue';
import Vuex from 'vuex';

import Schema from './validator/index.js';
import http from './common/http';
import Vuk from './commpents/vuk';
//import VueTouch from 'vue-touch';
import './style/styles.less'
window.ui = {};

//components
import form_edit from './commpents/form/form-edit.vue';
import text_edit from './commpents/input/text-edit.vue';
import textarea_edit from './commpents/input/textarea-edit.vue';
import pic from './commpents/upload/pic.vue';
import top from './commpents/top/top.vue';
import back from './commpents/top/back.vue';
import alert from './commpents/ui/alert.vue';
import confirm from './commpents/ui/confirm.vue';
import indoor from './commpents/indoor/indoor.vue';
import page from './commpents/page/page.vue';
import VueEditor from './commpents/editor/vue-editor.vue';
import Cover from './commpents/input/cover.vue';
import crumbs from './commpents/meun/crumbs.vue';
import indexbox from './commpents/router/index-box'
import code_box from './commpents/input/code-box';
import input_text from './commpents/input/input-text';
import VueSelect from './commpents/input/vue-select';
import search from './commpents/meun/search';
import Tool from './common/tool';
import api from './api';
import loading from './commpents/ui/loading.vue';
import vueTips from './commpents/ui/vue-tips.vue';
import VueMarkdown from './commpents/editor/vue-markdown';
import VukListCheckbox from './commpents/input/input-checkbox';
import stateManage from './modules/index';
import VukNode from './commpents/input/vuk-node';
import VukPop from  './commpents/pop/vukpop';
import filter from './filter/filter';



export let Components = {
    VueSelect,
    form_edit,
    text_edit,
    textarea_edit,
    pic,
    top,
    alert,
    confirm,
    indoor,
    page,
    back,
    VueEditor,
    Cover,
    crumbs,
    indexbox,
    code_box,
    input_text,
    search,
    loading,
    vueTips,
    VueMarkdown,
    VueSelect,
    VukNode,
    VukPop,
    VukListCheckbox

};

for (let i in Components) {
    let name = i.replace('_', '-');
    Vue.component(name, Components[i]);
};

for (let i in filter) {
    Vue.filter(i,filter[i]);

};

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(http);
Vue.use(Tool);
//Vue.use(VueTouch);
Vue.use(Vuk.install);

window.Vue = Vue || {};
window.Vuex = Vuex || {};
window.Schema = Schema || {};
window.Api = api;


Vue.config.devtools = true;

Vue.prototype.Api = api;

const router = new VueRouter({
    //mode: 'history',
    routes
})

var store = new Vuex.Store(stateManage);
router.beforeEach((to, from, next) => {

    if (to.fullPath.indexOf('admin') >= 1) {
        if (sessionStorage.getItem("itvusername")) {
            next();
        } else {
            next({
                path: '/login'
            });
        }
    }
    next();
});





new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(App),
    data: {
        uievent: new Vue()
    }
})
