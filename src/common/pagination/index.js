import { PAGEINATION, page } from "../../constants";

export const paginationAction = value => ({
    type: PAGEINATION,
    payload: value
})

export const paginationReducer = (
    state = {
        current: page.defaultCurrent,
        total: 0,
        pageSize: page.defaultPageSize,
    }
    , action) => {
    switch (action.type) {
        case PAGEINATION:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}