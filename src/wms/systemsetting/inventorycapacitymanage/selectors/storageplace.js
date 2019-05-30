import { createSelector } from 'reselect';

const getStoragePlace = state => state.storageplace;

const parseStoragePlace = createSelector(
    [getStoragePlace],
    (storageplace) => {
        storageplace.list = storageplace.list.map((item) => {
            item.key = item.id;
            return item;
        });
        return storageplace;
    },
);

export default parseStoragePlace;
