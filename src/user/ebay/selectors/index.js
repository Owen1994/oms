import {createSelector} from 'reselect'
import {timestampFromat} from '@/util/baseTool'

const getAuthorizations = state => state.authorizations;

export const parseAuthorizations = createSelector(
    [getAuthorizations],
    authorizations => {
        authorizations.list = authorizations.list.map(item => {
            item.createTime = timestampFromat(item.createTime, 2);  //添加时间
            item.operateTime = timestampFromat(item.operateTime, 2);  //更新时间
            item.tokenAuthTime = timestampFromat(item.tokenAuthTime, 2);  //Token授权时间
            item.tokenValidity = timestampFromat(item.tokenValidity, 2);  //token有效期
            return item;
        });
        return authorizations;
    }
);