const menus = require('./systemmenus');
const BUILD_ARGVS = process.env.BUILD_ARGVS;
let url = '';
switch (BUILD_ARGVS) {
    case 'dev'://开发环境
        url = 'http://192.168.201.211:8000'
        break;
    case 'test'://测试环境
        url = 'http://10.90.1.204:8000'
        break;
    case 'test1'://测试环境-oms测试环境1
        url = 'http://10.90.1.174:8000'
        break;
    case 'pre'://预发布环境
        url = 'http://10.90.1.109:8000'
        break;
    case 'sj'://审核环境
        url = 'http://10.90.1.101:8000'
        break;
    case 'pro'://生产环境
        url = 'http://www.soter.youkeshu.com'
}

const proxy = [
    {
        context: [
            '/mockjsdata'
        ],
        target: 'http://192.168.201.211:9090'
    },
    {
        context: [
            '/urc/motan/service',
            '/urc/motan/service/api/IUrcService/',
            '/arm/motan/service/api/IArmService/',
            '/pls/motan/service/api/IPlsFacadeService/',
            '/pls/ebay/motan/service/api/IEbayService/',
            '/pls/pricing/motan/service/api/IPricingService/',
            '/oms/order/manage/',
            '/oms/order/grab/',
            '/customs/api',
            '/yks/file/server/',
            '/pim/motan/service/api/IPimService',
            '/listing/base/ext/IListingExtInfoService',
            '/listing/base/query',
            '/listing/base/dataimport',
            '/smtbatchlisting/api',
            '/irp/api/',
            '/customerServiceSystem/index/api',
            '/pmsservice/api/',
            '/pdm/motan/service/api/',
            '/logisticsservice/api/',
            '/eco/motan/service/api/',
            '/wmsservice/api/',
            '/channelservice/api/',
        ],
        target: url
    },
    {
        context: [
            '/fanyi/'
        ],
        target: 'http://api.fanyi.baidu.com'
    }
]

const createHistoryApiFallback = () => {
    const result = { rewrites: [] };
    result.rewrites = menus.reduce((urls, item) => {
                        urls.push({ from: new RegExp(`^${item.systemUrl}`), to: `/${item.directory}/index.html` })
                        return urls;  
                    }, [{from: /^\/$/, to: '/login/index.html'}])
    return result;
}

const historyApiFallback = createHistoryApiFallback()
module.exports = {
    proxy,
    historyApiFallback
}
