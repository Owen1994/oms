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


export const CHANNEL_STATE = [
    {
        code: 0,
        name: '全部'
    },
    {
        code: 1,
        name: '启用中'
    },
    {
        code: 2,
        name: '已关闭'
    }
]

export const PACKAGE_TYPE = [
    {
        code: 2,
        name: '挂号'
    },
    {
        code: 1,
        name: '平邮'
    },
];

export const Logistics_Type_List = [
    {
        code: '1',
        name: '邮政'
    },
    {
        code: '2',
        name: '专线'
    },
    {
        code: '3',
        name: '虚仓专线'
    },
];

export const TRACK_TYPE = {
    1: [
        {
            code: 1,
            name: '到上网'
        },
        {
            code: 2,
            name: '到封发'
        },
        {
            code: 3,
            name: '到交航'
        },
        {
            code: 4,
            name: '到落地'
        },
        {
            code: 5,
            name: '到妥投'
        }
    ],
    2: [
        {
            code: 1,
            name: '到上网'
        },
        {
            code: 5,
            name: '到妥投'
        },
    ]
}
