import ActionType from '../constants'

export const sellingData = (state={
    lst: [],
    total: 0,
}, action) => {
    switch(action.type){
        case ActionType.RECEIVE_SELLING_LIST:
            return action.data
        default:
            return state
    }
};