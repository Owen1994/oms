export var data = [
    {
        title: '用户权限系统',
        key: '1',
        children: [
            {
                title: '组织架构1',
                key: '11',
                children: [
                    {
                        title: '查看',
                        key: '111',
                        children: [
                            {
                                title: '查看',
                                key: '1111',
                            },
                            {
                                title: '绑定账号',
                                key: '1112',
                            },
                            {
                                title: '同步钉钉数据',
                                key: '1113',
                            },
                        ],
                    },
                    {
                        title: '绑定账号',
                        key: '112',
                        children: [
                            {
                                title: '查看',
                                key: '1121',
                            },
                            {
                                title: '绑定账号',
                                key: '1122',
                            },
                            {
                                title: '同步钉钉数据',
                                key: '1123',
                            },
                        ],
                    },
                    {
                        title: '同步钉钉数据',
                        key: '113',
                        children: [
                            {
                                title: '查看',
                                key: '1131',
                            },
                            {
                                title: '绑定账号',
                                key: '1132',
                            },
                            {
                                title: '同步钉钉数据',
                                key: '1133',
                            },
                        ],
                    },
                ],
            },
            {
                title: '用户管理1',
                key: '12',
                children: [
                    {
                        title: '查看',
                        key: '121',
                    },
                    {
                        title: '绑定账号',
                        key: '122',
                    },
                    {
                        title: '同步钉钉数据',
                        key: '123',
                    },
                ],
            },

        ],
    },
    {
        title: '订单管理系统',
        key: '2',
        children: [
            {
                title: '组织架构2',
                key: '21',
                children: [
                    {
                        title: '查看',
                        key: '211',
                        relevancy: ['212,213'],
                    },
                    {
                        title: '绑定账号',
                        key: '212',
                    },
                    {
                        title: '同步钉钉数据',
                        key: '213',
                    },
                ],
            },
            {
                title: '用户管理2',
                key: '22',
                children: [
                    {
                        title: '查看',
                        key: '221',
                    },
                    {
                        title: '绑定账号',
                        key: '222',
                    },
                    {
                        title: '同步钉钉数据111',
                        key: '2235',
                    },
                    {
                        title: '同步钉钉数据',
                        key: '2236',
                    },
                    {
                        title: '同步钉钉数据',
                        key: '2238',
                    },
                    {
                        title: '同步钉钉数据',
                        key: '2237',
                    },
                ],
            },
        ],
    },
];


export var data1 = [
    {
        title: '订单管理系统',
        id: '2',
        children: [
            {
                title: '组织架构2',
                id: '21',
                children: [
                    {
                        title: '查看',
                        id: '211',
                        relevancy: ['212', '213'],
                    },
                    {
                        title: '绑定账号',
                        id: '212',
                    },
                    {
                        title: '同步钉钉数据',
                        id: '213',
                    },
                ],
            },
            {
                title: '用户管理2',
                id: '22',
                children: [
                    {
                        title: '查看',
                        id: '221',
                        relevancy: ['222', '2235', '2236', '2238'],
                    },
                    {
                        title: '绑定账号',
                        id: '222',
                    },
                    {
                        title: '同步钉钉数据111',
                        id: '2235',
                    },
                    {
                        title: '同步钉钉数据',
                        id: '2236',
                    },
                    {
                        title: '同步钉钉数据',
                        id: '2238',
                    },
                    {
                        title: '同步钉钉数据',
                        id: '2237',
                    },
                ],
            },
        ],
    },
];
export var defaultKeys = ['221', '222'];

export var json = [
    {
        system: {
            key: '000',
            name: '首页',
            url: '/',
        },
        menu: [
            {
                key: '000-000001',
                name: '首页',
                url: '/',
                module: [
                    {
                        key: '000-000001-000001',
                        name: '数据走势',
                        url: '/',
                        show: 1,
                        function: [],
                        module: [],
                    },
                ],
            },
        ],
    },
    {
        system: {
            key: '001',
            name: '订单管理系统',
            url: '/order/',
        },
        menu: [
            {
                key: '001-000001',
                name: '平台订单',
                url: '/order/',
                module: [
                    {
                        key: '001-000001-000001',
                        name: '速卖通订单',
                        url: '/order/smtorderlist/',
                        show: 1,
                        function: [
                            {
                                key: '001-000001-000001-001',
                                name: '查看',
                                relevancy: ['001-000001-000001-002', '001-000001-000001-003'],
                                url: [
                                    '/oms/order/grab/motan/OrderGrabApi/getOrderList',
                                ],
                            },
                            {
                                key: '001-000001-000001-002',
                                name: '批量标记',
                                url: [
                                    '/oms/order/grab/motan/OrderBadgeApi/batchMarkingBadgeChannel',
                                ],
                            },
                            {
                                key: '001-000001-000001-003',
                                name: '订单抓取',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabApi/orderManualGrab',
                                ],
                            },
                            {
                                key: '001-000001-000001-004',
                                name: '标记跟踪号',
                                url: [
                                    '/oms/order/grab/motan/OrderBadgeApi/manualBadge',
                                ],
                            },
                            {
                                key: '001-000001-000001-005',
                                name: '同步订单',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabApi/syncSingleOrder',
                                ],
                            },
                            {
                                key: '001-000001-000001-006',
                                name: '查看详情',
                                url: [],
                            },
                        ],
                        module: [
                            {
                                key: '001-000001-000001-000001',
                                name: '速卖通订单详情',
                                url: '/order/smtorderlist/smtorderdetail/',
                                show: 0,
                                function: [
                                    {
                                        key: '001-000001-000001-000001-001',
                                        name: '查看',
                                        url: [
                                            '/oms/order/grab/motan/OrderGrabApi/getOrderDetail',
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        key: '001-000001-000002',
                        name: '订单导入',
                        url: '/order/smtorderimport/',
                        show: 1,
                        function: [
                            {
                                key: '001-000001-000002-001',
                                name: '查看',
                                url: [],
                            },
                            {
                                key: '001-000001-000002-002',
                                name: '导入',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabApi/excelOrderImport',
                                ],
                            },
                        ],
                        module: [],
                    },
                ],
            },
            {
                key: '001-000002',
                name: '订单管理',
                url: '/order/',
                module: [
                    {
                        key: '001-000002-000001',
                        name: '全部订单',
                        url: '/order/orderlist/',
                        show: 1,
                        function: [
                            {
                                key: '001-000002-000001-001',
                                name: '查看',
                                url: [
                                    '/oms/order/manage/motan/ICompanyOrderManageApi/getOrderList',
                                ],
                            },
                            {
                                key: '001-000002-000001-002',
                                name: '查看详情',
                                url: [],
                            },
                            {
                                key: '001-000002-000001-003',
                                name: '导出订单列表',
                                url: [
                                    '/oms/order/manage/motan/ICompanyOrderManageApi/exportOrder',
                                ],
                            },
                        ],
                        module: [
                            {
                                key: '001-000002-000001-000001',
                                name: '全部订单详情',
                                url: '/order/orderlist/orderdetail/',
                                show: 0,
                                function: [
                                    {
                                        key: '001-000002-000001-000001-001',
                                        name: '查看',
                                        url: [
                                            '/oms/order/manage/motan/ICompanyOrderManageApi/getOrderDetail',
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        key: '001-000002-000002',
                        name: '异常订单',
                        url: '/order/exceptionorderlist/',
                        show: 1,
                        function: [
                            {
                                key: '001-000002-000002-001',
                                name: '查看',
                                url: [
                                    '/oms/order/manage/motan/ICompanyOrderManageApi/getOrderExceptionType',
                                ],
                            },
                            {
                                key: '001-000002-000002-002',
                                name: '查看详情',
                                url: [],
                            },
                            {
                                key: '001-000002-000002-003',
                                name: '导出订单列表',
                                url: [
                                    '/oms/order/manage/motan/ICompanyOrderManageApi/exportOrder',
                                ],
                            },
                        ],
                        module: [
                            {
                                key: '001-000002-000002-000001',
                                name: '异常订单详情',
                                url: '/order/exceptionorderlist/exceptionorderdetail/',
                                show: 0,
                                function: [
                                    {
                                        key: '001-000002-000002-000001-001',
                                        name: '查看',
                                        url: [
                                            '/oms/order/manage/motan/ICompanyOrderManageApi/getOrderDetail',
                                        ],
                                    },
                                    {
                                        key: '001-000002-000002-000001-002',
                                        name: '撤单',
                                        url: [
                                            '/oms/order/manage/motan/ICompanyOrderManageApi/examineOrder',
                                        ],
                                    },
                                    {
                                        key: '001-000002-000002-000001-003',
                                        name: '修改收货地址',
                                        url: '/oms/order/manage/motan/ICompanyOrderManageApi/updateConsigneeMessage',
                                    },
                                    {
                                        key: '001-000002-000002-000001-004',
                                        name: '我要留言',
                                        url: [
                                            '/oms/order/manage/motan/ICompanyOrderManageApi/addOrderRemarks',
                                        ],
                                    },
                                    {
                                        key: '001-000002-000002-000001-005',
                                        name: '添加商品',
                                        url: [
                                            '/oms/order/manage/motan/ICompanyOrderManageApi/updateGoodsForOrder',
                                        ],
                                    },
                                    {
                                        key: '001-000002-000002-000001-006',
                                        name: '修改商品',
                                        url: [
                                            '/oms/order/manage/motan/ICompanyOrderManageApi/updateGoodsForOrder',
                                        ],
                                    },
                                    {
                                        key: '001-000002-000002-000001-007',
                                        name: '手工分仓',
                                        url: [
                                            '/oms/order/manage/motan/ICompanyOrderManageApi/splitOrderToPackage',
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                key: '001-000003',
                name: '分仓订单',
                url: '/order/',
                module: [
                    {
                        key: '001-000003-000001',
                        name: '分仓订单列表',
                        url: '/order/deliveryparcellist/',
                        show: 1,
                        function: [
                            {
                                key: '001-000003-000001-001',
                                name: '查看',
                                url: [
                                    '/oms/order/manage/motan/IPackageApi/getPackageList',
                                ],
                            },
                            {
                                key: '001-000003-000001-002',
                                name: '查看详情',
                                url: [],
                            },
                            {
                                key: '001-000003-000001-003',
                                name: '导出订单列表',
                                url: [
                                    '/oms/order/manage/motan/IPackageApi/exportOrder',
                                ],
                            },
                        ],
                        module: [
                            {
                                key: '001-000003-000001-000001',
                                name: '分仓订单详情',
                                url: '/order/deliveryparcellist/deliveryparceldetail/',
                                show: 0,
                                function: [
                                    {
                                        key: '001-000003-000001-000001-001',
                                        name: '查看',
                                        url: [
                                            '/oms/order/manage/motan/IPackageApi/getPackageDetail',
                                        ],
                                    },
                                    {
                                        key: '001-000003-000001-000001-002',
                                        name: '物流面单',
                                        url: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        key: '001-000003-000002',
                        name: '负利润审核',
                        url: '/order/negativeprofitauditlist/',
                        show: 1,
                        function: [
                            {
                                key: '001-000003-000002-001',
                                name: '查看',
                                url: [
                                    '/oms/order/manage/motan/IPackageApi/getDeficitPackageList',
                                ],
                            },
                            {
                                key: '001-000003-000002-002',
                                name: '查看详情',
                                url: [],
                            },
                            {
                                key: '001-000003-000002-003',
                                name: '批量审核',
                                url: [
                                    '/oms/order/manage/motan/IPackageApi/examineDeficitPackage',
                                ],
                            },
                            {
                                key: '001-000003-000002-004',
                                name: '批量撤单',
                                url: [
                                    '/oms/order/manage/motan/IPackageApi/examineDeficitPackage',
                                ],
                            },
                            {
                                key: '001-000003-000002-005',
                                name: '审核/撤单',
                                url: [
                                    '/oms/order/manage/motan/IPackageApi/examineDeficitPackage',
                                ],
                            },
                        ],
                        module: [
                            {
                                key: '001-000003-000002-000001',
                                name: '负利润详情',
                                url: '/order/negativeprofitauditlist/negativeprofitauditdetailfail/',
                                show: 0,
                                function: [
                                    {
                                        key: '001-000003-000002-000001-001',
                                        name: '查看',
                                        url: [
                                            '/oms/order/manage/motan/IPackageApi/getPackageDetail',
                                        ],
                                    },
                                    {
                                        key: '001-000003-000002-000001-002',
                                        name: '审核',
                                        url: [
                                            '/oms/order/manage/motan/IPackageApi/examineDeficitPackage',
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                key: '001-000004',
                name: '订单配置',
                url: '/order/',
                module: [
                    {
                        key: '001-000004-000001',
                        name: '抓单转换',
                        url: '/order/conversion/',
                        show: 1,
                        function: [
                            {
                                key: '001-000004-000001-001',
                                name: '查看',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabConfigApi/findRuleOrderGrabConfigList',
                                ],
                            },
                            {
                                key: '001-000004-000001-002',
                                name: '字段配置',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabConfigApi/addAndUpdateFieldConfig',
                                    '/oms/order/grab/motan/OrderGrabConfigApi/getFieldConfigDetail',
                                ],
                            },
                            {
                                key: '001-000004-000001-003',
                                name: 'SKU解析配置',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig',
                                    '/oms/order/grab/motan/OrderGrabConfigApi/addOrUpdateRuleSkuConvert',
                                    '/oms/order/grab/motan/OrderGrabConfigApi/addOrUpdateRuleSkuCharacter',
                                    '/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleSkuConvert',
                                    '/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleSkuCharacter',
                                ],
                            },
                            {
                                key: '001-000004-000001-004',
                                name: '增加条件配置',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabConfigApi/saveConditionConfig',
                                ],
                            },
                            {
                                key: '001-000004-000001-005',
                                name: '修改条件配置',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabConfigApi/getConditionDetail',
                                    '/oms/order/grab/motan/OrderGrabConfigApi/saveConditionConfig',
                                ],
                            },
                            {
                                key: '001-000004-000001-006',
                                name: '删除条件配置',
                                url: [
                                    '/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleOrderGrabConfig',
                                ],
                            },
                        ],
                        module: [],
                    },
                    {
                        key: '001-000004-000002',
                        name: '渠道标记',
                        url: '/order/channellist/',
                        show: 1,
                        function: [
                            {
                                key: '001-000004-000002-001',
                                name: '查看',
                                url: [
                                    '/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleChannel',
                                ],
                            },
                            {
                                key: '001-000004-000002-002',
                                name: '查看详情',
                                url: [],
                            },
                            {
                                key: '001-000004-000002-003',
                                name: '新增',
                                url: [],
                            },
                            {
                                key: '001-000004-000002-004',
                                name: '修改',
                                url: [],
                            },
                            {
                                key: '001-000004-000002-005',
                                name: '删除',
                                url: [
                                    '/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleChannel',
                                ],
                            },
                        ],
                        module: [
                            {
                                key: '001-000004-000002-000001',
                                name: '渠道标记详情',
                                url: '/order/channellist/channelsignall/',
                                show: 0,
                                function: [
                                    {
                                        key: '001-000004-000002-000001-001',
                                        name: '查看',
                                        url: [
                                            '/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleChannelMappingDetail',
                                        ],
                                    },
                                    {
                                        key: '001-000004-000002-000001-002',
                                        name: '修改渠道信息',
                                        url: [
                                            '/oms/order/manage/motan/IOrderManageConfigApi/saveChanneDetail',
                                        ],
                                    },
                                    {
                                        key: '001-000004-000002-000001-003',
                                        name: '修改仓库信息',
                                        url: [
                                            '/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailWarehouse',
                                        ],
                                    },
                                    {
                                        key: '001-000004-000002-000001-004',
                                        name: '修改第三方信息',
                                        url: [
                                            '/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailMapping',
                                        ],
                                    },
                                    {
                                        key: '001-000004-000002-000001-005',
                                        name: '修改标记信息',
                                        url: [
                                            '/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailSign',
                                        ],
                                    },
                                    {
                                        key: '001-000004-000002-000001-006',
                                        name: '修改标记信息',
                                        url: [
                                            '/oms/order/manage/motan/IOrderManageConfigApi/deleteChannelDetailSign',
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        key: '001-000004-000003',
                        name: '指定发货仓',
                        url: '/order/warehouselist/',
                        show: 1,
                        function: [
                            {
                                key: '001-000004-000003-001',
                                name: '查看',
                                url: [
                                    '/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleWarehouse',
                                ],
                            },
                            {
                                key: '001-000004-000003-002',
                                name: '查看详情',
                                url: [
                                    '/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleWarehouseDetail',
                                ],
                            },
                            {
                                key: '001-000004-000003-003',
                                name: '新增',
                                url: [],
                            },
                            {
                                key: '001-000004-000003-004',
                                name: '修改',
                                url: [
                                    '/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleWarehouseDetail',
                                    '/oms/order/manage/motan/IOrderManageConfigApi/updateConfigRuleWarehouse',
                                    '/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleWarehouse',
                                ],
                            },
                        ],
                        module: [],
                    },
                    {
                        key: '001-000004-000004',
                        name: '收货人信息拦截',
                        url: '/order/orderconsignee/',
                        show: 1,
                        function: [
                            {
                                key: '001-000004-000004-001',
                                name: '查看',
                                url: [
                                    '/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleAddressee',
                                ],
                            },
                            {
                                key: '001-000004-000004-002',
                                name: '查看详情',
                                url: [
                                    '/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleAddresseeDetail',
                                ],
                            },
                            {
                                key: '001-000004-000004-003',
                                name: '新增',
                                url: [],
                            },
                            {
                                key: '001-000004-000004-004',
                                name: '修改',
                                url: [
                                    '/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleAddresseeDetail',
                                    '/oms/order/manage/motan/IOrderManageConfigApi/updateConfigRuleAddressee',
                                    '/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleAddressee',
                                ],
                            },
                        ],
                        module: [],
                    },
                ],
            },
        ],
    },
    {
        system: {
            key: '002',
            name: '物流管理',
            url: '/logisticsconfig/',
        },
        menu: [
            {
                key: '002-000001',
                name: '报关单',
                url: '/logisticsconfig/',
                module: [
                    {
                        key: '002-000001-000001',
                        name: '报关单列表',
                        url: '/logisticsconfig/declaration/list/',
                        show: 1,
                        function: [],
                        module: [],
                    },
                ],
            },
            {
                key: '002-000002',
                name: '设置',
                url: '/logisticsconfig/',
                module: [
                    {
                        key: '002-000002-000001',
                        name: '详细设置',
                        url: '/logisticsconfig/customsSet/',
                        show: 1,
                        function: [],
                        module: [],
                    },
                ],
            },
            {
                key: '002-000003',
                name: '日志',
                url: '/logisticsconfig/',
                module: [
                    {
                        key: '002-000003-000001',
                        name: '操作日志',
                        url: '/logisticsconfig/operateLog/',
                        show: 1,
                        function: [],
                        module: [],
                    },
                ],
            },
        ],
    },
    {
        system: {
            key: '003',
            name: '系统配置',
            url: '/systemconfig/',
        },
        menu: [
            {
                key: '003-000001',
                name: '平台授权',
                url: '/systemconfig/',
                module: [
                    {
                        key: '003-000001-000001',
                        name: '数据走势',
                        url: '/systemconfig/settings/',
                        show: 1,
                        function: [
                            {
                                key: '003-000001-000001-001',
                                name: '查看',
                                url: [],
                            },
                        ],
                        module: [],
                    },
                ],
            },
        ],
    },
    {
        system: {
            key: '004',
            name: '用户中心',
            url: '/user/',
        },
        menu: [
            {
                key: '004-000001',
                name: '组织架构',
                url: '/user/',
                module: [
                    {
                        key: '004-000001-000001',
                        name: '组织架构列表',
                        url: '/user/organization/',
                        show: 1,
                        function: [],
                        module: [],
                    },
                ],
            },
            {
                key: '004-000002',
                name: '用户管理',
                url: '/user/',
                module: [
                    {
                        key: '004-000002-000001',
                        name: '用户管理列表',
                        url: '/user/usermanagementlist/',
                        show: 1,
                        function: [],
                        module: [
                            {
                                key: '004-000002-000001-000001',
                                name: '功能权限清单',
                                url: '/user/usermanagementlist/functionalpermissionlist/',
                                show: 0,
                                function: [],
                            },
                        ],
                    },
                    {
                        key: '004-000002-000002',
                        name: '数据权限模板',
                        url: '/user/datapermissiontempl/',
                        show: 1,
                        function: [],
                        module: [
                            {
                                key: '004-000002-000002-000001',
                                name: '查看方案',
                                url: '/user/datapermissiontempl/viewplan/',
                                show: 0,
                                function: [],
                            },
                            {
                                key: '004-000002-000002-000002',
                                name: '新增/编辑方案',
                                url: '/user/datapermissiontempl/compileplan/',
                                show: 0,
                                function: [],
                            },
                        ],
                    },
                ],
            },
            {
                key: '004-000003',
                name: '角色管理',
                url: '/user/',
                module: [
                    {
                        key: '004-000003-000001',
                        name: '角色管理列表',
                        url: '/user/rolemanagement/',
                        show: 1,
                        function: [],
                        module: [],
                    },
                    {
                        key: '004-000003-000002',
                        name: '角色授权界面',
                        url: '/user/operatingAuthorization/',
                        show: 1,
                        function: [],
                        module: [],
                    },
                ],
            },
        ],
    },
];

export var json1 = {
    data: [{
        active: false,
        authorizable: false,
        forever: false,
        isActive: false,
        isAuthorizable: false,
        isForever: false,
        roleId: 1529649147479000001,
        roleName: 'URC业务管理员',
        selectedContext: [{
            sysContext: {
                menu: [{
                    key: '002-000001',
                    module: [{
                        function: [],
                        key: '002-000001-000001',
                        module: [],
                        name: '报关单列表',
                        pageFullPathName: '',
                        show: 1,
                        url: '/logisticsconfig/declaration/list/',
                    }],
                    name: '报关单',
                    url: '/logisticsconfig/',
                }, {
                    key: '002-000002',
                    module: [{
                        function: [],
                        key: '002-000002-000001',
                        module: [],
                        name: '详细设置',
                        pageFullPathName: '',
                        show: 1,
                        url: '/logisticsconfig/customsSet/',
                    }],
                    name: '设置',
                    url: '/logisticsconfig/',
                }, {
                    key: '002-000003',
                    module: [{
                        function: [],
                        key: '002-000003-000001',
                        module: [],
                        name: '操作日志',
                        pageFullPathName: '',
                        show: 1,
                        url: '/logisticsconfig/operateLog/',
                    }],
                    name: '日志',
                    url: '/logisticsconfig/',
                }],
                system: {
                    key: '002',
                    name: '物流管理',
                    url: '/logisticsconfig/',
                },
            },
            sysKey: '002',
        }, {
            sysContext: {
                menu: [{
                    key: '003-000001',
                    module: [{
                        function: [{
                            key: '003-000001-000001-001',
                            name: '查看',
                        }],
                        key: '003-000001-000001',
                        module: [],
                        name: '平台授权列表',
                        pageFullPathName: '',
                        show: 1,
                        url: '/systemconfig/',
                    }],
                    name: '平台授权',
                    url: '/systemconfig/',
                }],
                system: {
                    key: '003',
                    name: '系统配置',
                    url: '/systemconfig/',
                },
            },
            sysKey: '003',
        }],
    }, {
        active: false,
        authorizable: false,
        forever: false,
        isActive: false,
        isAuthorizable: false,
        isForever: false,
        roleId: 1529582122220000002,
        roleName: '复制角色',
        selectedContext: [{
            sysContext: {
                menu: [{
                    key: '001-000001',
                    module: [{
                        function: [{
                            key: '001-000001-000001-001',
                            name: '查看',
                        }, {
                            key: '001-000001-000001-002',
                            name: '批量标记',
                        }, {
                            key: '001-000001-000001-003',
                            name: '订单抓取',
                        }, {
                            key: '001-000001-000001-004',
                            name: '标记跟踪号',
                        }, {
                            key: '001-000001-000001-005',
                            name: '同步订单',
                        }, {
                            key: '001-000001-000001-006',
                            name: '查看详情',
                        }],
                        key: '001-000001-000001',
                        module: [{
                            function: [{
                                key: '001-000001-000001-000001-001',
                                name: '查看',
                            }],
                            key: '001-000001-000001-000001',
                            name: '速卖通订单详情',
                            pageFullPathName: '',
                            show: 0,
                            url: '/order/smtorderlist/smtorderdetail/',
                        }],
                        name: '速卖通订单',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/smtorderlist/',
                    }, {
                        function: [{
                            key: '001-000001-000002-001',
                            name: '查看',
                        }, {
                            key: '001-000001-000002-002',
                            name: '导入',
                        }],
                        key: '001-000001-000002',
                        module: [],
                        name: '订单导入',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/smtorderimport/',
                    }],
                    name: '平台订单',
                    url: '/order/',
                }, {
                    key: '001-000002',
                    module: [{
                        function: [{
                            key: '001-000002-000001-001',
                            name: '查看',
                        }, {
                            key: '001-000002-000001-002',
                            name: '查看详情',
                        }, {
                            key: '001-000002-000001-003',
                            name: '导出订单列表',
                        }],
                        key: '001-000002-000001',
                        module: [{
                            function: [{
                                key: '001-000002-000001-000001-001',
                                name: '查看',
                            }],
                            key: '001-000002-000001-000001',
                            name: '全部订单详情',
                            pageFullPathName: '',
                            show: 0,
                            url: '/order/orderlist/orderdetail/',
                        }],
                        name: '全部订单',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/orderlist/',
                    }, {
                        function: [{
                            key: '001-000002-000002-001',
                            name: '查看',
                        }, {
                            key: '001-000002-000002-002',
                            name: '查看详情',
                        }, {
                            key: '001-000002-000002-003',
                            name: '导出订单列表',
                        }],
                        key: '001-000002-000002',
                        module: [{
                            function: [{
                                key: '001-000002-000002-000001-001',
                                name: '查看',
                            }, {
                                key: '001-000002-000002-000001-002',
                                name: '撤单',
                            }, {
                                key: '001-000002-000002-000001-003',
                                name: '修改收货地址',
                            }, {
                                key: '001-000002-000002-000001-004',
                                name: '我要留言',
                            }, {
                                key: '001-000002-000002-000001-005',
                                name: '添加商品',
                            }, {
                                key: '001-000002-000002-000001-006',
                                name: '修改商品',
                            }, {
                                key: '001-000002-000002-000001-007',
                                name: '手工分仓',
                            }],
                            key: '001-000002-000002-000001',
                            name: '异常订单详情',
                            pageFullPathName: '',
                            show: 0,
                            url: '/order/exceptionorderlist/exceptionorderdetail/',
                        }],
                        name: '异常订单',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/exceptionorderlist/',
                    }],
                    name: '订单管理',
                    url: '/order/',
                }, {
                    key: '001-000003',
                    module: [{
                        function: [{
                            key: '001-000003-000001-001',
                            name: '查看',
                        }, {
                            key: '001-000003-000001-002',
                            name: '查看详情',
                        }, {
                            key: '001-000003-000001-003',
                            name: '导出订单列表',
                        }],
                        key: '001-000003-000001',
                        module: [{
                            function: [{
                                key: '001-000003-000001-000001-001',
                                name: '查看',
                            }, {
                                key: '001-000003-000001-000001-002',
                                name: '物流面单',
                            }],
                            key: '001-000003-000001-000001',
                            name: '分仓订单详情',
                            pageFullPathName: '',
                            show: 0,
                            url: '/order/deliveryparcellist/deliveryparceldetail/',
                        }],
                        name: '分仓订单列表',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/deliveryparcellist/',
                    }, {
                        function: [{
                            key: '001-000003-000002-001',
                            name: '查看',
                        }, {
                            key: '001-000003-000002-002',
                            name: '查看详情',
                        }, {
                            key: '001-000003-000002-003',
                            name: '批量审核',
                        }, {
                            key: '001-000003-000002-004',
                            name: '批量撤单',
                        }, {
                            key: '001-000003-000002-005',
                            name: '审核/撤单',
                        }],
                        key: '001-000003-000002',
                        module: [{
                            function: [{
                                key: '001-000003-000002-000001-001',
                                name: '查看',
                            }, {
                                key: '001-000003-000002-000001-002',
                                name: '审核',
                            }],
                            key: '001-000003-000002-000001',
                            name: '负利润详情',
                            pageFullPathName: '',
                            show: 0,
                            url: '/order/negativeprofitauditlist/negativeprofitauditdetailfail/',
                        }],
                        name: '负利润审核',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/negativeprofitauditlist/',
                    }],
                    name: '分仓订单',
                    url: '/order/',
                }, {
                    key: '001-000004',
                    module: [{
                        function: [{
                            key: '001-000004-000001-001',
                            name: '查看',
                        }, {
                            key: '001-000004-000001-002',
                            name: '字段配置',
                        }, {
                            key: '001-000004-000001-003',
                            name: 'SKU解析配置',
                        }, {
                            key: '001-000004-000001-004',
                            name: '增加条件配置',
                        }, {
                            key: '001-000004-000001-005',
                            name: '修改条件配置',
                        }, {
                            key: '001-000004-000001-006',
                            name: '删除条件配置',
                        }],
                        key: '001-000004-000001',
                        module: [],
                        name: '抓单转换',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/conversion/',
                    }, {
                        function: [{
                            key: '001-000004-000002-001',
                            name: '查看',
                        }, {
                            key: '001-000004-000002-002',
                            name: '查看详情',
                        }, {
                            key: '001-000004-000002-003',
                            name: '新增',
                        }, {
                            key: '001-000004-000002-004',
                            name: '修改',
                        }, {
                            key: '001-000004-000002-005',
                            name: '删除',
                        }],
                        key: '001-000004-000002',
                        module: [{
                            function: [{
                                key: '001-000004-000002-000001-001',
                                name: '查看',
                            }, {
                                key: '001-000004-000002-000001-002',
                                name: '修改渠道信息',
                            }, {
                                key: '001-000004-000002-000001-003',
                                name: '修改仓库信息',
                            }, {
                                key: '001-000004-000002-000001-004',
                                name: '修改第三方信息',
                            }, {
                                key: '001-000004-000002-000001-005',
                                name: '修改标记信息',
                            }, {
                                key: '001-000004-000002-000001-006',
                                name: '修改标记信息',
                            }],
                            key: '001-000004-000002-000001',
                            name: '渠道标记详情',
                            pageFullPathName: '',
                            show: 0,
                            url: '/order/channellist/channelsignall/',
                        }],
                        name: '渠道标记',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/channellist/',
                    }, {
                        function: [{
                            key: '001-000004-000003-001',
                            name: '查看',
                        }, {
                            key: '001-000004-000003-002',
                            name: '查看详情',
                        }, {
                            key: '001-000004-000003-003',
                            name: '新增',
                        }, {
                            key: '001-000004-000003-004',
                            name: '修改',
                        }],
                        key: '001-000004-000003',
                        module: [],
                        name: '指定发货仓',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/warehouselist/',
                    }, {
                        function: [{
                            key: '001-000004-000004-001',
                            name: '查看',
                        }, {
                            key: '001-000004-000004-002',
                            name: '查看详情',
                        }, {
                            key: '001-000004-000004-003',
                            name: '新增',
                        }, {
                            key: '001-000004-000004-004',
                            name: '修改',
                        }],
                        key: '001-000004-000004',
                        module: [],
                        name: '收货人信息拦截',
                        pageFullPathName: '',
                        show: 1,
                        url: '/order/orderconsignee/',
                    }],
                    name: '订单配置',
                    url: '/order/',
                }],
                system: {
                    key: '001',
                    name: '订单管理系统',
                    url: '/order/',
                },
            },
            sysKey: '001',
        }],
    }],
    msg: '成功',
    state: '000001',
};
