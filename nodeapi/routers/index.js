/**
 *作者: 任贸华
 *功能描述: nodeapi配置文件
 *参数说明:
 *时间: 2018/4/16 12:05
 */
const express = require('express');
const router = express.Router();

/**
 *作者: 任贸华
 *功能描述: 菜单接口  老接口
 *参数说明:
 *时间: 2018/4/16 12:05
 */
router.post('/oldmenuData', (req, res) => {
    const {current, pageSize} = req.query;
    res.json({
        state: '000001', data: {
            topmenudata: [
                {key: '1', name: '首页', url: '/'},
                {key: '2', name: '订单管理', url: '/order/'},
                {key: '3', name: '物流管理', url: '/logisticsconfig/'},
                {key: '4', name: '系统配置', url: '/systemconfig/'},
                {key: '5', name: '用户中心', url: '/user/'},
            ],
            leftmenudata: [
                {
                    name: '首页', key: '0', parent: '/',
                    son: [{key: '01', name: '数据走势', url: '/'},],
                },
                {
                    name: '平台订单', key: '1', parent: '/order/',
                    son: [
                        {
                            key: '11',
                            name: '速卖通订单',
                            url: '/order/smtorderlist/',
                            son: [{key: '111', name: '速卖通订单详情', url: '/order/smtorderlist/smtorderdetail/'}]
                        },
                        {key: '12', name: '订单导入', url: '/order/smtorderimport/'},
                    ],

                },
                {
                    name: '订单管理', key: '2', parent: '/order/',
                    son: [
                        {
                            key: '21',
                            name: '全部订单',
                            url: '/order/orderlist/',
                            son: [{key: '211', name: '订单详情', url: '/order/orderlist/orderdetail/'}]
                        },
                        {
                            key: '22',
                            name: '异常订单',
                            url: '/order/exceptionorderlist/',
                            son: [{key: '221', name: '异常订单详情', url: '/order/exceptionorderlist/exceptionorderdetail/'}]
                        }
                    ],

                },
                {
                    name: '分仓订单', key: '3', parent: '/order/',
                    son: [
                        {
                            key: '31', name: '分仓订单 ', url: '/order/deliveryparcellist/',
                            son: [
                                {key: '311', name: '分仓订单详情', url: '/order/deliveryparcellist/deliveryparceldetail/'},
                                {
                                    key: '312',
                                    name: '系统异常详情',
                                    url: '/order/deliveryparcellist/deliveryparceldetailabnormal/'
                                },
                                {
                                    key: '313',
                                    name: '追踪号异常详情',
                                    url: '/order/deliveryparcellist/deliveryparceldetailnocode/'
                                },
                                {
                                    key: '314',
                                    name: '追踪码分配异常详情',
                                    url: '/order/deliveryparcellist/deliveryparceldetailnocodeallot/'
                                },
                                {
                                    key: '315',
                                    name: '储位异常详情',
                                    url: '/order/deliveryparcellist/deliveryparceldetailnostorage/'
                                }
                            ]
                        },
                        {
                            key: '32', name: '负利润审核', url: '/order/negativeprofitauditlist/',
                            son: [{
                                key: '322',
                                name: ' 负利润异常详情',
                                url: '/order/negativeprofitauditlist/negativeprofitauditdetailfail/'
                            }]
                        }
                    ],

                },
                {
                    name: '订单配置', key: '4', parent: '/order/',
                    son: [
                        {key: '41', name: '抓单转换', url: '/order/conversion/'},
                        {
                            key: '42', name: '渠道标记', url: '/order/channellist/',
                            son: [
                                {key: '421', name: '渠道标记详情', url: '/order/channellist/channelsignall/'},
                            ]
                        },
                        {key: '43', name: '指定仓发货', url: '/order/warehouselist/'},
                        {key: '44', name: '收货人信息拦截', url: '/order/orderconsignee/'}
                    ],

                },
                {
                    name: '系统配置', key: '5', parent: '/systemconfig/',
                    son: [{key: '51', name: '平台授权', url: '/systemconfig/settings/'}],
                },
                {
                    name: '报关单',
                    key: '7',
                    parent: '/logisticsconfig/',
                    son: [
                        {key: '71', name: '报关单列表', url: '/logisticsconfig/declaration/list/'},
                    ],
                },
                {
                    name: '设置',
                    key: '8',
                    parent: '/logisticsconfig/',
                    son: [
                        {key: '81', name: '报关设置', url: '/logisticsconfig/customsSet/'},
                    ],
                },
                {
                    name: '日志',
                    key: '9',
                    parent: '/logisticsconfig/',
                    son: [
                        {key: '91', name: '操作日志', url: '/logisticsconfig/operateLog/'},
                    ],
                },
                {
                    name: '用户中心',
                    key: '10',
                    parent: '/user/',
                    son: [
                        {key: '101', name: '组织架构', url: '/user/organization/'},
                        {key: '111', name: '用户管理', url: '/user/usermanagement/'},
                        {key: '121', name: '角色管理', url: '/user/rolemanagement/'},
                        {key: '122', name: '角色授权', url: '/user/operatingAuthorization/'},
                    ],
                },
            ]
        }
    });
});

/**
 *作者: 任贸华
 *功能描述: 菜单接口  新接口
 *参数说明:
 *时间: 2018/6/13 21:27
 */

router.post('/motan/service/api/IUrcService/getAllFuncPermit', (req, res) => {
    const {current, pageSize} = req.query;
    res.json({
        state: '000001', data: [
            {
                "system": {
                    "key": "000",
                    "name": "首页",
                    "url": "/"
                },
                "menu": [
                    {
                        "key": "000-000001",
                        "name": "首页",
                        "url": "/",
                        "module": [
                            {
                                "key": "000-000001-000001",
                                "name": "数据走势",
                                "url": "/",
                                "show": 1,
                                "function": [],
                                "module": []
                            }
                        ]
                    }
                ]
            },
            {
                "system": {
                    "key": "001",
                    "name": "订单管理系统",
                    "url": "/order/"
                },
                "menu": [
                    {
                        "key": "001-000001",
                        "name": "平台订单",
                        "url": "/order/",
                        "module": [
                            {
                                "key": "001-000001-000001",
                                "name": "速卖通订单",
                                "url": "/order/smtorderlist/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000001-000001-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabApi/getOrderList"
                                        ]
                                    },
                                    {
                                        "key": "001-000001-000001-002",
                                        "name": "批量标记",
                                        "url": [
                                            "/oms/order/grab/motan/OrderBadgeApi/batchMarkingBadgeChannel"
                                        ]
                                    },
                                    {
                                        "key": "001-000001-000001-003",
                                        "name": "订单抓取",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabApi/orderManualGrab"
                                        ]
                                    },
                                    {
                                        "key": "001-000001-000001-004",
                                        "name": "标记跟踪号",
                                        "url": [
                                            "/oms/order/grab/motan/OrderBadgeApi/manualBadge"
                                        ]
                                    },
                                    {
                                        "key": "001-000001-000001-005",
                                        "name": "同步订单",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabApi/syncSingleOrder"
                                        ]
                                    },
                                    {
                                        "key": "001-000001-000001-006",
                                        "name": "查看详情",
                                        "url": []
                                    }
                                ],
                                "module": [
                                    {
                                        "key": "001-000001-000001-000001",
                                        "name": "速卖通订单详情",
                                        "url": "/order/smtorderlist/smtorderdetail/",
                                        "show": 0,
                                        "function": [
                                            {
                                                "key": "001-000001-000001-000001-001",
                                                "name": "查看",
                                                "url": [
                                                    "/oms/order/grab/motan/OrderGrabApi/getOrderDetail"
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "key": "001-000001-000002",
                                "name": "订单导入",
                                "url": "/order/smtorderimport/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000001-000002-001",
                                        "name": "查看",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000001-000002-002",
                                        "name": "导入",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabApi/excelOrderImport"
                                        ]
                                    }
                                ],
                                "module": []
                            }
                        ]
                    },
                    {
                        "key": "001-000002",
                        "name": "订单管理",
                        "url": "/order/",
                        "module": [
                            {
                                "key": "001-000002-000001",
                                "name": "全部订单",
                                "url": "/order/orderlist/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000002-000001-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/manage/motan/ICompanyOrderManageApi/getOrderList"
                                        ]
                                    },
                                    {
                                        "key": "001-000002-000001-002",
                                        "name": "查看详情",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000002-000001-003",
                                        "name": "导出订单列表",
                                        "url": [
                                            "/oms/order/manage/motan/ICompanyOrderManageApi/exportOrder"
                                        ]
                                    }
                                ],
                                "module": [
                                    {
                                        "key": "001-000002-000001-000001",
                                        "name": "全部订单详情",
                                        "url": "/order/orderlist/orderdetail/",
                                        "show": 0,
                                        "function": [
                                            {
                                                "key": "001-000002-000001-000001-001",
                                                "name": "查看",
                                                "url": [
                                                    "/oms/order/manage/motan/ICompanyOrderManageApi/getOrderDetail"
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "key": "001-000002-000002",
                                "name": "异常订单",
                                "url": "/order/exceptionorderlist/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000002-000002-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/manage/motan/ICompanyOrderManageApi/getOrderExceptionType"
                                        ]
                                    },
                                    {
                                        "key": "001-000002-000002-002",
                                        "name": "查看详情",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000002-000002-003",
                                        "name": "导出订单列表",
                                        "url": [
                                            "/oms/order/manage/motan/ICompanyOrderManageApi/exportOrder"
                                        ]
                                    }
                                ],
                                "module": [
                                    {
                                        "key": "001-000002-000002-000001",
                                        "name": "异常订单详情",
                                        "url": "/order/exceptionorderlist/exceptionorderdetail/",
                                        "show": 0,
                                        "function": [
                                            {
                                                "key": "001-000002-000002-000001-001",
                                                "name": "查看",
                                                "url": [
                                                    "/oms/order/manage/motan/ICompanyOrderManageApi/getOrderDetail"
                                                ]
                                            },
                                            {
                                                "key": "001-000002-000002-000001-002",
                                                "name": "撤单",
                                                "url": [
                                                    "/oms/order/manage/motan/ICompanyOrderManageApi/examineOrder"
                                                ]
                                            },
                                            {
                                                "key": "001-000002-000002-000001-003",
                                                "name": "修改收货地址",
                                                "url": "/oms/order/manage/motan/ICompanyOrderManageApi/updateConsigneeMessage"
                                            },
                                            {
                                                "key": "001-000002-000002-000001-004",
                                                "name": "我要留言",
                                                "url": [
                                                    "/oms/order/manage/motan/ICompanyOrderManageApi/addOrderRemarks"
                                                ]
                                            },
                                            {
                                                "key": "001-000002-000002-000001-005",
                                                "name": "添加商品",
                                                "url": [
                                                    "/oms/order/manage/motan/ICompanyOrderManageApi/updateGoodsForOrder"
                                                ]
                                            },
                                            {
                                                "key": "001-000002-000002-000001-006",
                                                "name": "修改商品",
                                                "url": [
                                                    "/oms/order/manage/motan/ICompanyOrderManageApi/updateGoodsForOrder"
                                                ]
                                            },
                                            {
                                                "key": "001-000002-000002-000001-007",
                                                "name": "手工分仓",
                                                "url": [
                                                    "/oms/order/manage/motan/ICompanyOrderManageApi/splitOrderToPackage"
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "key": "001-000003",
                        "name": "分仓订单",
                        "url": "/order/",
                        "module": [
                            {
                                "key": "001-000003-000001",
                                "name": "分仓订单列表",
                                "url": "/order/deliveryparcellist/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000003-000001-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/manage/motan/IPackageApi/getPackageList"
                                        ]
                                    },
                                    {
                                        "key": "001-000003-000001-002",
                                        "name": "查看详情",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000003-000001-003",
                                        "name": "导出订单列表",
                                        "url": [
                                            "/oms/order/manage/motan/IPackageApi/exportOrder"
                                        ]
                                    }
                                ],
                                "module": [
                                    {
                                        "key": "001-000003-000001-000001",
                                        "name": "分仓订单详情",
                                        "url": "/order/deliveryparcellist/deliveryparceldetail/",
                                        "show": 0,
                                        "function": [
                                            {
                                                "key": "001-000003-000001-000001-001",
                                                "name": "查看",
                                                "url": [
                                                    "/oms/order/manage/motan/IPackageApi/getPackageDetail"
                                                ]
                                            },
                                            {
                                                "key": "001-000003-000001-000001-002",
                                                "name": "物流面单",
                                                "url": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "key": "001-000003-000002",
                                "name": "负利润审核",
                                "url": "/order/negativeprofitauditlist/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000003-000002-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/manage/motan/IPackageApi/getDeficitPackageList"
                                        ]
                                    },
                                    {
                                        "key": "001-000003-000002-002",
                                        "name": "查看详情",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000003-000002-003",
                                        "name": "批量审核",
                                        "url": [
                                            "/oms/order/manage/motan/IPackageApi/examineDeficitPackage"
                                        ]
                                    },
                                    {
                                        "key": "001-000003-000002-004",
                                        "name": "批量撤单",
                                        "url": [
                                            "/oms/order/manage/motan/IPackageApi/examineDeficitPackage"
                                        ]
                                    },
                                    {
                                        "key": "001-000003-000002-005",
                                        "name": "审核/撤单",
                                        "url": [
                                            "/oms/order/manage/motan/IPackageApi/examineDeficitPackage"
                                        ]
                                    }
                                ],
                                "module": [
                                    {
                                        "key": "001-000003-000002-000001",
                                        "name": "负利润详情",
                                        "url": "/order/negativeprofitauditlist/negativeprofitauditdetailfail/",
                                        "show": 0,
                                        "function": [
                                            {
                                                "key": "001-000003-000002-000001-001",
                                                "name": "查看",
                                                "url": [
                                                    "/oms/order/manage/motan/IPackageApi/getPackageDetail"
                                                ]
                                            },
                                            {
                                                "key": "001-000003-000002-000001-002",
                                                "name": "审核",
                                                "url": [
                                                    "/oms/order/manage/motan/IPackageApi/examineDeficitPackage"
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "key": "001-000004",
                        "name": "订单配置",
                        "url": "/order/",
                        "module": [
                            {
                                "key": "001-000004-000001",
                                "name": "抓单转换",
                                "url": "/order/conversion/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000004-000001-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabConfigApi/findRuleOrderGrabConfigList"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000001-002",
                                        "name": "字段配置",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabConfigApi/addAndUpdateFieldConfig",
                                            "/oms/order/grab/motan/OrderGrabConfigApi/getFieldConfigDetail"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000001-003",
                                        "name": "SKU解析配置",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig",
                                            "/oms/order/grab/motan/OrderGrabConfigApi/addOrUpdateRuleSkuConvert",
                                            "/oms/order/grab/motan/OrderGrabConfigApi/addOrUpdateRuleSkuCharacter",
                                            "/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleSkuConvert",
                                            "/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleSkuCharacter"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000001-004",
                                        "name": "增加条件配置",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabConfigApi/saveConditionConfig"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000001-005",
                                        "name": "修改条件配置",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabConfigApi/getConditionDetail",
                                            "/oms/order/grab/motan/OrderGrabConfigApi/saveConditionConfig"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000001-006",
                                        "name": "删除条件配置",
                                        "url": [
                                            "/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleOrderGrabConfig"
                                        ]
                                    }
                                ],
                                "module": []
                            },
                            {
                                "key": "001-000004-000002",
                                "name": "渠道标记",
                                "url": "/order/channellist/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000004-000002-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleChannel"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000002-002",
                                        "name": "查看详情",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000004-000002-003",
                                        "name": "新增",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000004-000002-004",
                                        "name": "修改",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000004-000002-005",
                                        "name": "删除",
                                        "url": [
                                            "/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleChannel"
                                        ]
                                    }
                                ],
                                "module": [
                                    {
                                        "key": "001-000004-000002-000001",
                                        "name": "渠道标记详情",
                                        "url": "/order/channellist/channelsignall/",
                                        "show": 0,
                                        "function": [
                                            {
                                                "key": "001-000004-000002-000001-001",
                                                "name": "查看",
                                                "url": [
                                                    "/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleChannelMappingDetail"
                                                ]
                                            },
                                            {
                                                "key": "001-000004-000002-000001-002",
                                                "name": "修改渠道信息",
                                                "url": [
                                                    "/oms/order/manage/motan/IOrderManageConfigApi/saveChanneDetail"
                                                ]
                                            },
                                            {
                                                "key": "001-000004-000002-000001-003",
                                                "name": "修改仓库信息",
                                                "url": [
                                                    "/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailWarehouse"
                                                ]
                                            },
                                            {
                                                "key": "001-000004-000002-000001-004",
                                                "name": "修改第三方信息",
                                                "url": [
                                                    "/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailMapping"
                                                ]
                                            },
                                            {
                                                "key": "001-000004-000002-000001-005",
                                                "name": "修改标记信息",
                                                "url": [
                                                    "/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailSign"
                                                ]
                                            },
                                            {
                                                "key": "001-000004-000002-000001-006",
                                                "name": "修改标记信息",
                                                "url": [
                                                    "/oms/order/manage/motan/IOrderManageConfigApi/deleteChannelDetailSign"
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "key": "001-000004-000003",
                                "name": "指定发货仓",
                                "url": "/order/warehouselist/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000004-000003-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleWarehouse"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000003-002",
                                        "name": "查看详情",
                                        "url": [
                                            "/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleWarehouseDetail"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000003-003",
                                        "name": "新增",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000004-000003-004",
                                        "name": "修改",
                                        "url": [
                                            "/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleWarehouseDetail",
                                            "/oms/order/manage/motan/IOrderManageConfigApi/updateConfigRuleWarehouse",
                                            "/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleWarehouse"
                                        ]
                                    }
                                ],
                                "module": []
                            },
                            {
                                "key": "001-000004-000004",
                                "name": "收货人信息拦截",
                                "url": "/order/orderconsignee/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "001-000004-000004-001",
                                        "name": "查看",
                                        "url": [
                                            "/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleAddressee"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000004-002",
                                        "name": "查看详情",
                                        "url": [
                                            "/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleAddresseeDetail"
                                        ]
                                    },
                                    {
                                        "key": "001-000004-000004-003",
                                        "name": "新增",
                                        "url": []
                                    },
                                    {
                                        "key": "001-000004-000004-004",
                                        "name": "修改",
                                        "url": [
                                            "/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleAddresseeDetail",
                                            "/oms/order/manage/motan/IOrderManageConfigApi/updateConfigRuleAddressee",
                                            "/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleAddressee"
                                        ]
                                    }
                                ],
                                "module": []
                            }
                        ]
                    }
                ]
            },
            {
                "system": {
                    "key": "002",
                    "name": "物流管理",
                    "url": "/logisticsconfig/"
                },
                "menu": [
                    {
                        "key": "002-000001",
                        "name": "报关单",
                        "url": "/logisticsconfig/",
                        "module": [
                            {
                                "key": "002-000001-000001",
                                "name": "报关单列表",
                                "url": "/logisticsconfig/declaration/list/",
                                "show": 1,
                                "function": [],
                                "module": []
                            }
                        ]
                    },
                    {
                        "key": "002-000002",
                        "name": "设置",
                        "url": "/logisticsconfig/",
                        "module": [
                            {
                                "key": "002-000002-000001",
                                "name": "详细设置",
                                "url": "/logisticsconfig/customsSet/",
                                "show": 1,
                                "function": [],
                                "module": []
                            }
                        ]
                    },
                    {
                        "key": "002-000003",
                        "name": "日志",
                        "url": "/logisticsconfig/",
                        "module": [
                            {
                                "key": "002-000003-000001",
                                "name": "操作日志",
                                "url": "/logisticsconfig/operateLog/",
                                "show": 1,
                                "function": [],
                                "module": []
                            }
                        ]
                    }
                ]
            },
            {
                "system": {
                    "key": "003",
                    "name": "系统配置",
                    "url": "/systemconfig/"
                },
                "menu": [
                    {
                        "key": "003-000001",
                        "name": "平台授权",
                        "url": "/systemconfig/",
                        "module": [
                            {
                                "key": "003-000001-000001",
                                "name": "平台授权列表",
                                "url": "/systemconfig/",
                                "show": 1,
                                "function": [
                                    {
                                        "key": "003-000001-000001-001",
                                        "name": "查看",
                                        "url": ["/oms/order/grab/motan/SellStoreAccountApi/findStoreList"]
                                    }
                                ],
                                "module": []
                            }
                        ]
                    }
                ]
            },
            {
                "system": {
                    "key": "004",
                    "name": "应用中心",
                    "url": "/user/"
                },
                "menu": [
                    {
                        "key": "004-000001",
                        "name": "用户中心",
                        "url": "/user/",
                        "module": [
                            {
                                "key": "004-000001-000001",
                                "name": "组织架构",
                                "url": "/user/organization/",
                                "show": 1,
                                "function": [],
                                "module": []
                            },
                            {
                                "key": "004-000001-000002",
                                "name": "用户管理",
                                "url": "/user/usermanagementlist/",
                                "show": 1,
                                "function": [],
                                "module": [
                                    {
                                        "key": "004-000001-000002-000001",
                                        "name": "数据权限模板",
                                        "url": "/user/usermanagementlist/datapermissiontempl/",
                                        "show": 1,
                                        "function": [],
                                        "module": [
                                            {
                                                "key": "004-000001-000002-000001-000001",
                                                "name": "查看方案",
                                                "url": "/user/usermanagementlist/datapermissiontempl/viewplan/",
                                                "show": 0,
                                                "function": []
                                            },
                                            {
                                                "key": "004-000001-000002-000001-000002",
                                                "name": "新增/编辑方案",
                                                "url": "/user/usermanagementlist/datapermissiontempl/compileplan/",
                                                "show": 0,
                                                "function": []
                                            }
                                        ]
                                    },
                                    {
                                        "key": "004-000001-000002-000002",
                                        "name": "数据授权",
                                        "url": "/user/usermanagementlist/datapauthorization/",
                                        "show": 1,
                                        "function": [],
                                        "module": []
                                    },
                                    {
                                        "key": "004-000001-000002-000003",
                                        "name": "操作权限列表",
                                        "url": "/user/usermanagementlist/functionalpermissionlist/",
                                        "show": 1,
                                        "function": [],
                                        "module": []
                                    }
                                ]
                            },
                            {
                                "key": "004-000001-000003",
                                "name": "角色管理",
                                "url": "/user/rolemanagement/",
                                "show": 1,
                                "function": [],
                                "module": [{
                                    "key": "004-000001-000003-000001",
                                    "name": "新增修改界面",
                                    "url": "/user/rolemanagement/addupdaterole/",
                                    "show": 0,
                                    "function": []
                                }, {
                                    "key": "004-000001-000003-000002",
                                    "name": "角色授权界面",
                                    "url": "/user/rolemanagement/operatingAuthorization/",
                                    "show": 0,
                                    "function": []
                                }, {
                                    "key": "004-000001-000003-000003",
                                    "name": "分配用户界面",
                                    "url": "/user/rolemanagement/allocUser/",
                                    "show": 0,
                                    "function": []
                                }]
                            }
                        ]
                    }
                ]
            }
        ]
    });
});


/**
 *作者: 任贸华
 *功能描述: mock数据
 *参数说明:
 *时间: 2018/4/16 12:06
 */
router.get('/bd', (req, res) => {
    const {current, pageSize} = req.query;

    const data = [];
    for (let i = 1; i <= `${pageSize || 10}`; i++) {
        data.push({
            key: i + '',
            companyName: `${current || 1}1`,
            source: '1',
            level: '2',
            type: '3',
            category: '4',
            brand: '5',
            contacts: '6',
            Follow: '7',
            time: '17/08/22 14:25',
            leader: '8',
            Operation: i % 2 == 0 ? '111' : '222',
        });
    }

    res.json({
        code: 'ok', count: 200, data: data
    });
})


module.exports = router
