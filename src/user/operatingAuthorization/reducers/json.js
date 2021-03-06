export var sysContext = [
    {
        name: '首页',
        key: '000001',
        url: '/',
        page: [{
            key: 's000001',
            name: '数据走势',
            url: '/',
        }],
    },
    {
        name: '平台订单',
        key: '000002',
        url: '/orderconfig/',
        page: [{
            key: 's000001',
            name: '速卖通订单',
            url: '/smtorderlist/',
            page: [{
                key: 'h000005',
                name: '速卖通订单详情',
                url: '/smtorderdetail/',
                function: [{
                    key: '001',
                    name: '删除订单001',
                }],
            }],
            function: [{
                key: '002',
                name: '查询速卖通订单列表',
                function: [{
                    key: '003',
                    name: '速卖通订单编辑',
                },
                {
                    key: '007',
                    name: '速卖通订单删除',
                },
                ],
            }],
        },
        {
            key: '000003',
            name: '订单导入',
            url: '/smtorderimport/',
        },
        ],
    },
];
