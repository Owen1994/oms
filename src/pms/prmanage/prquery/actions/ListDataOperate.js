import {
    SORT_FIELDS_LIST,
} from '../constants';

const sortFieldsList = params => ({
    type: SORT_FIELDS_LIST,
    data: params,
});

export default sortFieldsList;
