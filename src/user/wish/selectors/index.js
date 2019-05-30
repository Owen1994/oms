import {createSelector} from 'reselect'
import {timestampFromat} from '@/util/baseTool'

const getAuthorizations = state => state.authorizations;

export const parseAuthorizations = createSelector(
    [getAuthorizations],
    authorizations => {
        authorizations.data = authorizations.data.map(item => {
            item.key = item.sellerId;
            item.keyValidityStartTime = timestampFromat(item.keyValidityStartTime, 2, '-');  //密钥开始时间
            item.keyValidityEndTime = timestampFromat(item.keyValidityEndTime, 2, '-');  //密钥结束时间
            item.operationTime = timestampFromat(item.operationTime, 2, '-');  //操作时间
            return item;
        });
        return authorizations;
    }
);