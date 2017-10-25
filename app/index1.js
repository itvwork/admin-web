import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router1';
import App from './app2.vue';



//components

//import VueMarkdown from 'vue-markdown';
import VueMarkdown from './commpents/editor/vue-markdown.vue';

export let Components = {
    VueMarkdown
};

for(let i in Components){
    let name = i.replace('_', '-');
    Vue.component(name,Components[i]);
};

Vue.use(VueRouter);


Vue.config.devtools = true;


const router = new VueRouter({
     //mode: 'history',
    routes
})








new Vue({
    el: '#app',

    router: router,
    render: h => h(App),
    data:{
        uievent:new Vue()
    }
})
