import { createSelector } from 'reselect';

const getListData = state => state.listdata;

const parseListData = createSelector(
    [getListData],
    (lists) => {
        lists.data = lists.data.map((item) => {
            return item;
        });
        return lists;
    },
);

export default parseListData;
