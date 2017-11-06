export default [{
    path: '',
    redirect: {
        name: 'home'
    }

}, {
    path: '/login',
    component: function(resolve) {
        require(['./view/login.vue'], resolve)
    }
}, {
    path: '/bar',
    component: function(resolve) {
        require(['./view/bar.vue'], resolve)
    }
}, {
    path: '/404',
    component: function(resolve) {
        require(['./view/404.vue'], resolve)
    }
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
        }, {
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
                }, {
                    name: 'caseadd',
                    path: 'add',
                    meta: {
                        title: '添加案例'
                    },
                    component: function(resolve) {
                        require(['./view/case/add.vue'], resolve)
                    }
                }, {
                    name: 'caseEdit',
                    path: 'edit/:id',
                    meta: {
                        title: '编辑案例'
                    },
                    component: function(resolve) {
                        require(['./view/case/caseEdit.vue'], resolve)
                    }
                }, {
                    name: 'caseSort',
                    path: 'sort',
                    meta: {
                        title: '案例分类'
                    },
                    component: function(resolve) {
                        require(['./view/case/sort.vue'], resolve)
                    }
                }, {
                    name: 'addCaseSort',
                    path: 'sort/add',
                    meta: {
                        title: '添加案例分类'
                    },
                    component: function(resolve) {
                        require(['./view/case/sortadd.vue'], resolve)
                    }
                }, {
                    name: 'editCaseSort',
                    path: 'sort/sortSort/:id',
                    meta: {
                        title: '修改案例分类'
                    },
                    component: function(resolve) {
                        require(['./view/case/caseSortEdit.vue'], resolve)
                    }
                }

            ]

        },
        {
            name: 'news',
            path: 'news',
            meta: {
                title: '资讯'
            },
            component: function(resolve) {
                require(['./commpents/router/index-box.vue'], resolve)
            },
            redirect: {
                name: 'newslist'
            },
            children: [{
                    name: 'newslist',
                    path: 'index',
                    meta: {
                        title: '资讯列表'
                    },
                    component: function(resolve) {
                        require(['./view/news/index.vue'], resolve)
                    }
                }, {
                    name: 'newsadd',
                    path: 'add',
                    meta: {
                        title: '添加资讯'
                    },
                    component: function(resolve) {
                        require(['./view/news/add.vue'], resolve)
                    }
                }, {
                    name: 'newsEdit',
                    path: 'edit/:id',
                    meta: {
                        title: '编辑新闻'
                    },
                    component: function(resolve) {
                        require(['./view/news/caseEdit.vue'], resolve)
                    }
                }, {
                    name: 'newsSort',
                    path: 'sort',
                    meta: {
                        title: '资讯分类'
                    },
                    component: function(resolve) {
                        require(['./view/news/sort.vue'], resolve)
                    }
                }, {
                    name: 'addNewsSort',
                    path: 'sort/add',
                    meta: {
                        title: '添加资讯分类'
                    },
                    component: function(resolve) {
                        require(['./view/news/sortadd.vue'], resolve)
                    }
                }, {
                    name: 'editNewsSort',
                    path: 'sort/sortSort/:id',
                    meta: {
                        title: '修改资讯分类'
                    },
                    component: function(resolve) {
                        require(['./view/news/caseSortEdit.vue'], resolve)
                    }
                }
            ]

        },

        ///店铺列表路由
        {
            name: 'store',
            path: 'store',
            meta: {
                title: '店铺列表'
            },
            component: function(resolve) {
                require(['./commpents/router/index-box.vue'], resolve)
            },
            redirect: {
                name: 'storelist'
            },
            children: [{
                    name: 'storelist',
                    path: 'index',
                    meta: {
                        title: "店铺列表"
                    },
                    component: function(resolve) {
                        require(['./view/store/index.vue'], resolve)
                    }
                }, {
                    name: 'storeadd',
                    path: 'add',
                    meta: {
                        title: "增加店铺"
                    },
                    component: function(resolve) {
                        require(['./view/store/add.vue'], resolve)
                    }
                }, {
                    name: 'storeedit',
                    path: 'edit/:id',
                    meta: {
                        title: "修改店铺"
                    },
                    component: function(resolve) {
                        require(['./view/store/edit.vue'], resolve)
                    }
                }, {
                    name: 'storemodel',
                    path: 'addmodel/:id',
                    meta: {
                        title: '增加车型'
                    },
                    component: function(resolve) {
                        require(['./view/store/addmodel.vue'], resolve)
                    }
                }

            ]
        },

        //文件管理
        {
            name: 'file',
            path: 'file',
            meta: {
                title: '附近管理'
            },
            component: function(resolve) {
                require(['./view/file/index.vue'], resolve)
            }
        }

    ]
}];
