/**
*作者: 任贸华
*功能描述: 下拉框配置
*参数说明:
 * @param {string} name 获取参数name
 * @return {object}
*时间: 2018/4/2 16:39
*/
export const levelOptions = (name) => {
    switch (name) {
        case '订单状态':
            return [
                {label: '待分仓', value: 'dfc'},
                {label: '待分仓2', value: 'dfc2'},
                {label: '待分仓3', value: 'dfc3'}
            ]
        case '过滤器主键':
            return [
                {label: '物流渠道名称', value: 'newChannelCode'},
                {label: '销售账号', value: 'ordersBelongAccount'},
                {label: '订单金额', value: 'orderAmount'}
            ]
        case '币种':
            return [
                {label: 'USD', value: 'USD'},
                {label: 'RMB', value: 'RMB'},
            ]
        case '仓库':
            return [
                {label: '1号仓', value: 'CCN001'},
                {label: '2号仓', value: 'CCN002'},
                {label: '3号仓', value: 'CCN003'},
                {label: '4号仓', value: 'CFT004'},
                {label: '5号仓', value: 'CCN005'},
                {label: '6号仓', value: 'CCN006'},
                {label: '7号仓', value: 'CCN007'}
            ]
        case '优先级':
            return [
                {label: 1, value: 1},
                {label: 2, value: 2},
                {label: 3, value: 3},
                {label: 4, value: 4},
                {label: 5, value: 5}
            ]
        case '标记规则优先级':
            return [
                {label: 1, value: 1},
                {label: 2, value: 2},
                {label: 3, value: 3},
                {label: 4, value: 4},
                {label: 5, value: 5},
                {label: 6, value: 6},
                {label: 7, value: 7},
                {label: 8, value: 8},
                {label: 9, value: 9},
                {label: 10, value: 10},
            ]
        case '过滤器条件':
            return [
                {label: '等于', value: '1'},
                {label: '大于', value: '2'},
                {label: '小于', value: '3'},
                {label: '大于等于', value: '4'},
                {label: '小于等于', value: '5'},
                {label: '不等于', value: '6'}
            ]
        case '过滤器逻辑':
            return [
                {label: 'and', value: '1'},
                {label: 'or', value: '2'},
            ]
        case '企业名称':
            return [
                {label: '企业名称', value: 'companyName'},
                {label: '企业地址', value: 'address'},
                {label: '手机', value: 'mobile'}
            ]
        case '企业性质':
            return [
                {label: '全部', value: ''},
                {label: '厂家', value: '厂家'},
                {label: '一级代理商', value: '一级代理商'},
                {label: '经销商', value: '经销商'},
                {label: '集采', value: '集采'},
                {label: '其它', value: '其它'},

            ]
        case '速卖通订单状态':
            return [
                {label: '全部', value: ''},
                {label: '等待买家付款', value: '等待买家付款'},
                {label: '买家申请取消', value: '买家申请取消'},
                {label: '等待您发货', value: '等待您发货'},
                {label: '部分发货', value: '部分发货'},
                {label: '等待买家收货', value: '等待买家收货'},
                {label: '等待成团', value: '等待成团'},
                {label: '已结束的订单', value: '已结束的订单'},
                {label: '含纠纷的订单', value: '含纠纷的订单'},
                {label: '冻结中的订单', value: '冻结中的订单'},
                {label: '等待您确认金额', value: '等待您确认金额'},
                {label: '资金未到账', value: '资金未到账'},
                {label: '其他', value: '其他'},

            ]
        case '是否负利润':
            return [
                {label: '全部', value: ''},
                {label: '否', value: 0},
                {label: '是', value: 1},

            ];
        case '是否偏远':
            return [
                {label: '全部', value: ''},
                {label: '否', value: 0},
                {label: '是', value: 1},

            ];
        case '是否追踪':
            return [
                {label: '全部', value: ''},
                {label: '头程可追踪平邮', value: '1'},
                {label: '半程可追踪平邮', value: '2'},
                {label: '全程可追踪挂号', value: '3'},
            ];
        case '渠道状态':
            return [
                {label: '全部', value: ''},
                {label: '启用', value: '0'},
                {label: '停用', value: '1'}
            ];

        case '渠道分组':
            return [
                {label: '全部', value: ''},
                {label: '线上发货', value: '1'},
                {label: '国内专线', value: '2'},
                {label: '国外专线', value: '3'},
                {label: '中国邮政', value: '4'},
                {label: '外国邮政', value: '5'},
                {label: '国际快递', value: '6'},
            ];
        case '渠道类型':
            return [
                {label: '全部', value: ''},
                {label: '邮政', value: '1'},
                {label: '专线', value: '2'},
                {label: '快递', value: '3'},
            ];
        case 'selectPlatform':
            return [
                {label: '速卖通', value: ''},
            ];
        case 'orderTemplate':
            return [
                {label: '普通订单导入模板', value: ''},
            ];
        case '授权状态':
            return [
                {label: '全部', value: ''},
                {label: '启用', value: 1},
                {label: '停用', value: 2}
            ];
        case '是否拦截':
            return [
                {label: '请选择', value: ''},
                {label: '是', value: 1},
                {label: '否', value: 2},
            ];
        case '账号类型':
            return [
                {label: '主账号', value: 1},
                {label: '子账号', value: 2}
            ];
        case '分页显示条数':
            return ['20', '30', '40', '50', '100'];
        case '系统名称':
            return [
                {label: '请选择系统', value:''},
                {label: '老erp系统', value:'erp'},
                {label: '物流优选系统', value:'preferred'},
                {label: '海外仓WMS', value:'wms'},
                {label: '汇总进销存', value:'hzSaveSell'},
                {label: 'oms订单管理系统', value:'oms'},
                {label: '汇总分仓', value:'hzWarehouse'}
            ];
        case 'tipOrderType':
            return [
                {label: '全部', value: ''},
                {label: '普货', value: 0},
                {label: '尖货', value: 1}
            ];
        case 'orderSource':
            return [
                {label: '全部', value: ''},
                {label: '线上订单', value: 0},
                {label: '手工订单', value: 1}
            ];
        case 'pickerConfig':
            return {
                showTime: {format: 'HH:mm'},
                format: "YYYY-MM-DD HH:mm"
            };
        case 'deliveryType':
            return [
                {label: '请选择', value: ''},
                {label: 'all', value: 'all'},
                {label: 'part', value: 'part'},
            ];
        case 'pageInit':
            return {
                pagedata: 20,
                pagenum: 1
            }
        case 'currency':
            return [{label: '美元(USD)', value: 'usd'}]
            
        case 'isFake':
            return [
                { label: '全部', value: '' },
                { label: '是', value: 2 },
                { label: '否', value: 1 },
            ];
        case '使用跟踪号':
            return [
                { label: '全部', value: -1 },
                { label: '跟踪号1', value: 1 },
                { label: '跟踪号2', value: 2 },
            ];
        default:
            return []
    }
}