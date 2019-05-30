const path = require('path');

// 需要启用cssmodules的目录
const cssmodules = [
    path.resolve(__dirname, '../src/application'),
    path.resolve(__dirname, '../src/basicdata'),
    path.resolve(__dirname, '../src/common'),
    path.resolve(__dirname, '../src/components'),    
    path.resolve(__dirname, '../src/compliance'),    
    path.resolve(__dirname, '../src/constants'),
    path.resolve(__dirname, '../src/customerservice'),
    path.resolve(__dirname, '../src/login'),
    path.resolve(__dirname, '../src/logistics'),  
    path.resolve(__dirname, '../src/npd'),
    path.resolve(__dirname, '../src/offline'),
    path.resolve(__dirname, '../src/order'),
    path.resolve(__dirname, '../src/pms'),
    path.resolve(__dirname, '../src/publish'), 
    path.resolve(__dirname, '../src/systemconfig'), 
    path.resolve(__dirname, '../src/user'),
    path.resolve(__dirname, '../src/util'), 
    path.resolve(__dirname, '../src/utils'),
    path.resolve(__dirname, '../src/wms'), 
    path.resolve(__dirname, '../src/index'),           
    /node_modules/,
    // path.resolve(__dirname, '../src/order/analysis'),
];

module.exports = cssmodules;
