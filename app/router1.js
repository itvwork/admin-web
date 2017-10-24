export default [

  {
    name:'home',
    path: '',
    component:   require('./view1/index.vue')
  },
  {
    name:'homes',
    path: ':id',
    component:   require('./view1/index.vue')
  }
];
