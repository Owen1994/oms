import ActionType from '../constants'

export const alerdayDeleteData = (state={
    lst: [],
    total: 0,
}, action) => {
    switch(action.type){
        case ActionType.RECEIVE_ALERDAY_DELETE_LIST:
            return action.data
        default:
            return state
    }
}
