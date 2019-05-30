import {
    LIST,
    GET_MESSAGE_LIST,
    GET_BUYER_EMAIL_LIST,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';

// 消息列表
export const listAction = value => ({
    type: LIST,
    payload: value,
});

export const messageListFetch = ({ name, value }) => (dispatch) => {
    dispatch(listAction({ loading: true }));
    const listFetch = fetchPost(GET_MESSAGE_LIST, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                const d = data.data;
                if (d && d.messageStatusList && d.messageStatusList.length) {
                    d.messageStatusList = d.messageStatusList.map((v) => {
                        v.code = v.key;
                        v.name = `${v.text}（${v.num}）`;
                        return v;
                    });
                }
                dispatch(listAction({ [name]: d }));
                return Promise.resolve(d);
            } else if (data !== true) {
                dispatch(listAction({ [name]: [] }));
            }
        })
        .finally(() => {
            dispatch(listAction({ loading: false }));
        });
    return listFetch;
};

export const emailListFetch = ({ name, value }) => (dispatch) => {
    dispatch(listAction({ loading: true }));
    const listFetch = fetchPost(GET_BUYER_EMAIL_LIST, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                const d = data.data;
                if (d && d.emailStatusList && d.emailStatusList.length) {
                    d.emailStatusList = d.emailStatusList.map((v) => {
                        v.code = v.key;
                        v.name = `${v.text}（${v.num}）`;
                        return v;
                    });
                }
                if (d && d.tagList && d.tagList.length) {
                    d.tagList = d.tagList.map((v, i) => {
                        v.code = v.tagId;
                        if (v.tagName === '全部') {
                            v.name = `${v.tagName}`;
                        } else {
                            v.name = `${v.tagName}（${v.num}）`;
                        }
                        return v;
                    });
                }
                dispatch(listAction({ [name]: d, loading: false }));
                return Promise.resolve(data.data);
            }
            dispatch(listAction({ [name]: [], loading: false }));
        });
    return listFetch;
};

const actions = {
    messageListFetch,
    emailListFetch,
};

export default actions;
