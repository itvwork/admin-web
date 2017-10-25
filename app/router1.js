export default [
    {
        path: '',
        redirect: {
            name: 'tw',
            params:{id:'city'}
        }
    },
    {
        name: 'statics',
        path: '/statics',
        component: require('./view1/statics.vue'),
        redirect: {
            name: 'tw',
            params:{id:'city'}
        },
        children: [
            {
                name: 'tw',
                path: ':id',
                component: require('./view1/s.vue'),
            }
        ]
    },

    {
        name: 'datas',
        path: ':id',
        component: require('./view1/datas.vue'),
        children: [
            {
                name: 'dw',
                path: ':id',
                component: require('./view1/d.vue'),
            }
        ]
    }
];
