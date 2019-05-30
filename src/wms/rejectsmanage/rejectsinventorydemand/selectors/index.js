import { createSelector } from 'reselect';

const getRejects = state => state.rejects;

const parseRejects = createSelector(
    [getRejects],
    (rejects) => {
        rejects.list = rejects.list.map((item) => {
            item.key = item.id;
            return item;
        });
        return rejects;
    },
);

export default parseRejects;
