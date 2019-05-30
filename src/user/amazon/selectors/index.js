import { createSelector } from 'reselect';
import { timestampFromat } from '@/util/baseTool';

const getTables = state => state.amazonAuthorizationListObj;

export const parseTables = createSelector(
    [getTables],
    (data) => {
        if (!data.list) {
            return data;
        }
        data.list.forEach((t) => {
            for (let i = 0; i < t.validityOfSecretKey.length; i++) {
                t.validityOfSecretKey[i] = timestampFromat(Number.parseInt(t.validityOfSecretKey[i], 10), 0);
            }
            t.operateTime = t.operateTime ? timestampFromat(Number.parseInt(t.operateTime, 10), 0) : '--';
        });
        return data;
    },
);

export default parseTables;
