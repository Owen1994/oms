import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        parts.list.map((item) => {
            item.key = item.id;
            return item;
        });
        return parts;
    },
);

export default parseParts;
