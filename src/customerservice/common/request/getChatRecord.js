import { GET_MESSAGE_RECORD, GET_BUYER_EMAIL_RECORD } from '../constants';
import { fetchPost } from '../../../util/fetch';

/**
 * 获取沟通记录
 * @param <String> operateType 操作类型 1-站内信，2-买家邮件
 * @param <String> id 消息id
 * @param <String> platformId 平台id
 * @param <Number> pageNumber 总页数
 */
const getChatRecord = (operateType, postData, pageNumber = 1, successCallback, finalCallback) => {
    let postAdd;
    if (operateType === '1') {
        postAdd = GET_MESSAGE_RECORD;
    } else {
        postAdd = GET_BUYER_EMAIL_RECORD;
    }
    postData.pageNumber = pageNumber;
    postData.pageData = 10;
    const getRecord = fetchPost(postAdd, postData, 2).then((result) => {
        if (result && result.state === '000001') {
            successCallback(result);
        }
        if (finalCallback) {
            finalCallback();
        }
    });
    return getRecord;
};
export default getChatRecord;
