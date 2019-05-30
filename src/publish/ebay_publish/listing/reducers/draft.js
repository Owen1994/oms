import ActionType from '../constants'

export const draftData = (state={
    lst: [],
    total: 0,
}, action) => {
    switch(action.type){
        case ActionType.RECEIVE_DRAFT_LIST:
            return action.data
        default:
            return state
    }
}
