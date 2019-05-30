import ActionType from '../constants'

export const alerdayDownData = (state={
    lst: [],
    total: 0,
}, action) => {
    switch(action.type){
        case ActionType.RECEIVE_ALERDAY_DOWN_LIST:
            return action.data
        default:
            return state
    }
}
