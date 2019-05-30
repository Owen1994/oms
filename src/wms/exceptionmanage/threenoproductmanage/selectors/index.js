import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        parts.list = parts.list ? parts.list.map((item) => {
            item.imageList = item.imageList.map(img => ({ src: img }));
            return item;
        }) : [];
        return parts;
    },
);

export default parseParts;
