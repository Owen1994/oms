import { 
    SET_PAGE_CACHE,
    CLEAR_PAGE_CACHE,
    CLEAR_ALL_PAGE_CACHE,
} from '../constants'

export const pagecache = (state=new Map(), action) => {
    switch(action.type){
        case SET_PAGE_CACHE:
            const  data = action.data.data
            const res = state.get(action.data.path) || {}
            state.set(action.data.path, {...res, ...data })
            return state;
        case CLEAR_PAGE_CACHE:
            state.delete(action.data.path)
            return state
        case CLEAR_ALL_PAGE_CACHE:
            state.clear()
            return state    
        default:
            return state
    }
}