import { createSelector } from 'reselect';
// import { timestampFromat } from '../../../../util/baseTool';

const getDocumentary = state => state.documentaryListObj;

/**
 * 跟单管理列表数据转换
 */
const parseDocumentary = createSelector(
    [getDocumentary],
    (documentarys) => {
        documentarys = documentarys.list.map((documentary) => {
            const dic = documentary;
            return dic;
        });
        return documentarys.list;
    },
);

export default parseDocumentary;
