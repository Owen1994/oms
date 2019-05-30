const LIST_CSELECT = [
    {id: '0', name: 'US'},
    {id: '2', name: 'CA'}
    // {code: 'NC', name: '南昌'},    
    // {code: 'GZ', name: '赣州'},
    // {code: 'JJ', name: '九江'},
    // {code: 'JA', name: '吉安'}
];

const LIST_CTAGS = [
    {code: 'Movies', name: '电影'}, 
    {code: 'Books', name: '看书'}, 
    {code: 'Music', name: '音乐'}, 
    {code: 'Sports', name: '运动'}
];

const LIST_CCHECKBOX = [
    { label: '苹果', value: 'Apple' },
    { label: '梨', value: 'Pear' },
    { label: '桔子', value: 'Orange' },
    { label: '香蕉', value: 'banana' },
    { label: '菠萝', value: 'pineapple' },
]

const LIST_TREEDATA =  [{
                            title: '江西',
                            key: 'JX',
                            children: 
                            [
                                {
                                    title: '南昌',
                                    key: 'nanchan',
                                    children: [
                                        { title: '东湖区', key: 'donghuqu' },
                                        { title: '西湖区', key: 'xihuqu' },
                                        { title: '赣江新区', key: 'gangjiangxinqu' },
                                    ],
                                }, 
                                {
                                    title: '赣州',
                                    key: 'ganzhou',
                                    children: [
                                        { title: '章贡区', key: 'zhanggongqu' },
                                        { title: '南康区', key: 'nankangqu' },
                                        { title: '赣县区', key: 'ganxianqu' },
                                    ],
                                }, 
                                {
                                    title: '九江',
                                    key: 'jiujiang',
                                }
                            ],
                        }, {
                            title: '广东',
                            key: 'GD',
                            children: [
                            { title: '广州', key: 'guangzhou' },
                            { title: '深圳', key: 'shenzhen' },
                            { title: '东莞', key: 'dongguan' },
                            ],
                        }, {
                            title: '福建',
                            key: 'FJ',
                        }];
export default {
    LIST_CSELECT,
    LIST_CTAGS,
    LIST_CCHECKBOX,
    LIST_TREEDATA,
}