export default [
  {
    path: '',
    redirect: {
        name: 'home'
    }

  },
  {
        path: '/login',
        component: function(resolve) {
            require(['./view/login.vue'], resolve)
        }
    },
    {
        path: '/bar',
        component: function(resolve) {
            require(['./view/bar.vue'], resolve)
        },
    },
    {
        path: '/404',
        component: function(resolve) {
            require(['./view/404.vue'], resolve)
        },
    }, {
        name: 'admin',
        path: '/admin',
        meta: {
            title: '首页'
        },
        component: function(resolve) {
            require(['./view/index.vue'], resolve)
        },
        children: [{
                path: 'index',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: function(resolve) {
                    require(['./view/index/index.vue'], resolve)
                }
            },
            {
                path: '',
                redirect: {
                    name: 'home'
                }
            },


            //品牌案例
            {
                name: 'case',
                path: 'case',
                meta: {
                    title: '品牌案例'
                },
                component: function(resolve) {
                    require(['./commpents/router/index-box.vue'], resolve)
                },
                redirect: {
                    name: 'caselist'
                },
                children: [{
                        name: 'caselist',
                        path: 'index',
                        meta: {
                            title: '案例列表'
                        },
                        component: function(resolve) {
                            require(['./view/case/index.vue'], resolve)
                        }
                    },
                    {
                        name: 'caseadd',
                        path: 'add',
                        meta: {
                            title: '添加案例'
                        },
                        component: function(resolve) {
                            require(['./view/case/add.vue'], resolve)
                        }
                    },
                    {
                        name: 'caseSort',
                        path: 'sort',
                        meta: {
                            title: '案例分类'
                        },
                        component: function(resolve) {
                            require(['./view/case/sort.vue'], resolve)
                        },
                    },
                    {
                        name: 'addCaseSort',
                        path: 'sort/add',
                        meta: {
                            title: '添加案例分类'
                        },
                        component: function(resolve) {
                            require(['./view/case/sortadd.vue'], resolve)
                        }
                    },
                    {
                        name: 'editCaseSort',
                        path: 'sort/sortSort/:id',
                        meta: {
                            title: '修改案例分类'
                        },
                        component: function(resolve) {
                            require(['./view/case/caseSortEdit.vue'], resolve)
                        }
                    },
                    {
                        name: 'classify',
                        path: 'classify',
                        meta: {
                            title: '汽车分类'
                        },
                        component: function(resolve) {
                            require(['./view/model/classify.vue'], resolve)
                        }
                    },{
                      name:'mts',
                      path:'mts/:id',
                      meta:{title:'增加店面'},
                      component: function(resolve) {
                          require(['./view/model/addshop.vue'], resolve)
                      }

                    },
                    {
                        name: 'modeladd',
                        path: 'add',
                        meta: {title: '增加模型'},
                        component: function (resolve) {
                            require(['./view/model/add.vue'], resolve)
                        }
                    }

                ]


            },


            ///店铺列表路由
            {
              name:'store',
              path: 'store',
              meta:{title:'店铺列表'},
              component: function(resolve) {
                  require(['./commpents/router/index-box.vue'], resolve)
              },
              redirect: {
                  name: 'storelist'
              },
              children:[
                {
                  name: 'storelist',
                  path: 'index',
                  meta:{title:"店铺列表"},
                  component: function(resolve) {
                      require(['./view/store/index.vue'], resolve)
                  }
                },
                {
                  name: 'storeadd',
                  path: 'add',
                  meta:{title:"增加店铺"},
                  component: function(resolve) {
                      require(['./view/store/add.vue'], resolve)
                  }
                },
                {
                  name: 'storeedit',
                  path: 'edit/:id',
                  meta:{title:"修改店铺"},
                  component: function(resolve) {
                      require(['./view/store/edit.vue'], resolve)
                  }
                }
                ,{
                  name:'storemodel',
                  path:'addmodel/:id',
                  meta:{title:'增加车型'},
                  component: function(resolve) {
                      require(['./view/store/addmodel.vue'], resolve)
                  }
                }

              ]
            }
        ]
    }
];