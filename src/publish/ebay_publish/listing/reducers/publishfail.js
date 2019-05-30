import ActionType from '../constants'

export const publishFailData = (state={
    lst: [],
    total: 0,
}, action) => {
    switch(action.type){
        case ActionType.RECEIVE_PUBLISHFAIL_LIST:
            return action.data
        default:
            return state
    }
}
