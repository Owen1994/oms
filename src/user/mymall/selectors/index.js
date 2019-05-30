import {createSelector} from 'reselect'
import {timestampFromat} from '@/util/baseTool'

const getAuthorizations = state => state.authorizations;

export const parseAuthorizations = createSelector(
    [getAuthorizations],
    authorizations => {
        if(!authorizations) {
            authorizations = {data: [], total: 0};
        }
        authorizations.data = !authorizations.data ? [] : authorizations.data.map(item => {
            item.secretKeyValidity = `${timestampFromat(item.secretKeyDtStart, 2)} 至 ${timestampFromat(item.secretKeyDtEnd, 2)}`; // 密钥有效期
            item.modifiedTime = timestampFromat(item.modifiedTime, 2);
            return item;
        });
        return authorizations;
    }
);

export const parseValues = (values) => {
    // 授权状态
    if (!values.authState && values.authState !== 0) {
        delete values.authState;
    }
    // 销售账号
    if (!values.sellerId) {
        delete values.tokenState;
    }
}