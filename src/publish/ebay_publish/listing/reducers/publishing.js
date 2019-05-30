import ActionType from '../constants'

export const publishingData = (state={
    lst: [],
    total: 0,
}, action) => {
    switch(action.type){
        case ActionType.RECEIVE_PUBLISHING_LIST:
            return action.data
        default:
            return state
    }
}
