import {
    message,
} from 'antd';

/**
 * 打印插件
 * @param width
 * @param height
 * @param type  1 .html div内容  2.pdfurl pdf链接 3.url 普通链接
 * @param content
 * @param direction
 */

export const printWpUrl = (width, height, type, content, direction) => {
    // 1. 获得默认的WebPrinter实例
    const wp = Strato.WebPrinter.getInstance();
    wp.on('CONNECTED', () => {
        const task = {
            config: {
                width, // 宽
                height, // 高
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
            },
            content,
            type,
            timeout: 30000,
            printer: `${width}*${height}`,
            timeoutAction: 'proceed', // 超时仍然打印
            pdfRenderType: 'DIRECT',
            name: `面单打印${new Date().getTime()}`,
        };
        // console.log(task);
        // 设置打印方向(横向|纵向)
        if (direction) {
            task.orientation = 'LANDSCAPE'; // 横向打印
        } else {
            task.orientation = 'PORTRAIT';// 纵向打印
        }
        // 生成打印任务
        wp.newTask(task);
        wp.getLicense((license) => {
            if (license) {
                // const customerName = license.customerName;// 客户名称
                // const startDate = new Date(license.startDate);
                // const endDate = new Date(license.endDate);
            } else {
                message.error('尚未安装授权');
            }
        });
    });
    wp.on('ENDED', (task) => {
        const { status } = task;
        if (status === 'FINISHED') {
            message.success('打印成功');
        }
        if (status === 'ERROR') {
            message.error('打印异常');
        }
        if (status === 'CANCELED') {
            message.warn('打印取消');
        }
        // if (callback) {
        //     callback();
        // }
    });
    wp.on('DISCONNECTED', () => {
        // console.log('DISCONNECTED');
    });
};


/**
 * 插件打印div
 * @param div 内容
 * @param width 纸张宽度
 * @param height 纸张高度
 * @param direction 是否是横向
 * @param callback 打印成功后回调
 */
export const printDiv = (div, width = 100, height = 100, direction = false, callback = null) => {
    const body = `<body style="margin: 0;padding:0">${div.outerHTML}<style>*{margin:0;padding:0}</style></body>`;
    printWpUrl(width, height, 'HTML', body, direction, callback);// 有问题.
};
/**
 * 浏览器打印
 * @param div
 */
export const windowPrintDiv = (div) => {
    // 给窗口界面重新赋值，赋自己拼接起来的html内容
    document.body.innerHTML = div.innerHTML;
    // 调用window.print方法打印新窗口.
    window.print();
    window.location.reload();// 重新加载
};
/**
 * 分割數組
 * @param list
 * @param length
 * @returns {Array}
 */
export const sliceArr = (list, length) => {
    const result = [];
    for (let i = 0, len = list.length; i < len; i += length) {
        result.push(list.slice(i, i + length));
    }
    return result;
};
