import { createSelector } from 'reselect';

const getBases = state => state.bases;

const parseBases = createSelector(
    [getBases],
    (bases) => {
        bases.list = bases.list.map((item) => {
            item.key = item.id;
            return item;
        });
        return bases;
    },
);

export default parseBases;
