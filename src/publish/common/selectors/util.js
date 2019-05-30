/**
 * 作者: pzt
 * 描述: 将http开头的图片文件转换成https开头
 * 时间: 2018/8/22 11:32
 * @param <string> img 图片文件
 **/
export const httpToHttps = (url)=>{
    const isHttpReg = /^(http:){1}.*/;
    if(url && isHttpReg.test(url)){
        url.replace(/http:{1}/, 'https:');
    }
    return url
}