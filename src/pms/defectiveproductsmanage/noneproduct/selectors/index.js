import { createSelector } from 'reselect';
// import { timestampFromat } from '../../../../util/baseTool';

const getData = state => state.getMainDataList;


const parseData = createSelector(
    [getData],
    (data) => {
        return data;
    },
);

export default parseData;
