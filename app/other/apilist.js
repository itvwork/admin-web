var apidata = {
    meun: [
        {
            name: '静态接口',
            url: {
                name: 'statics',
                params: {
                    id: 'city'
                }
            },
            children: [
                {
                    name:'城市信息列表',
                    url:{
                        name: 'tw',
                        params: {
                            id: 'city'
                        }
                    }
                },
                {
                    name:'航空公司信息列表',
                    url:{
                        name: 'tw',
                        params: {
                            id: 'plane'
                        }
                    }
                },
            ]
        }
    ],
    data: {
        city:{
            name:''
        }

    }
}
