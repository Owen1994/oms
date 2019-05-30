export const RECEIVE_DATA_LIST = 'receive_data_list';

export const LOADING_STATE  = 'loading_state';

export const CHANNEL_TYPE = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 1,
        name: '国内仓',
    },
    {
        code: 2,
        name: '海外仓'
    }
];

export const PACKAGE_TYPE = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 1,
        name: '平邮'
    },
    {
        code: 2,
        name: '挂号'
    }
];

export const TRAJECTORY_STATE = [
    {
        code: 0,
        name: '全部'
    },
    {
        code: 1,
        name: '暂无轨迹'
    },
    {
        code: 2,
        name: '上网'
    },
    {
        code: 3,
        name: '封发'
    },
    {
        code: 4,
        name: '交航'
    },
    {
        code: 5,
        name: '落地'
    },
    {
        code: 6,
        name: '妥投'
    }
];

export const PACKAGE_STATE = [
    {
        code: 0,
        name: '全部'
    },
    {
        code: 1,
        name: '查询不到'
    },
    {
        code: 2,
        name: '运输途中'
    },
    {
        code: 3,
        name: '到达待取'
    },
    {
        code: 4,
        name: '成功签收'
    },
    {
        code: 5,
        name: '投递失败'
    },
    {
        code: 6,
        name: '可能异常'
    },
    {
        code: 7,
        name: '运输过久'
    }
];
export const SEARCH_TYPES = [
    {
        key: 1,
        label: '内单号'
    },
    {
        key: 2,
        label: '订单追踪码'
    },
    {
        key: 3,
        label: '订单追踪码1'
    }
]