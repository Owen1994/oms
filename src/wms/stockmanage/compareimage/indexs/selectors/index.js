import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        parts.list = parts.list ? parts.list.map((item) => {
            item.isError = item.isError === 1 ? '是' : '否';
            item.isFunctionalCheck = item.isFunctionalCheck === '1' ? '是' : '否';
            item.imageList = item.imageList.map(img => ({ src: img }));
            item.isCheck = item.isCheck === '1' ? '是' : '否';
            item.priorityName = item.priority.name || '';
            return item;
        }) : [];
        return parts;
    },
);
export default parseParts;
