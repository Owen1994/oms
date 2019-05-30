import { fetchPost } from '../../../util/fetch';
import { CHECK__ADD_REFUND } from '../constants';

const checkAddRefund = (postData, successCallback, finalCallback) => {
    fetchPost(CHECK__ADD_REFUND, postData, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                successCallback();
            }
            if (finalCallback) {
                finalCallback();
            }
        });
};
export default checkAddRefund;
