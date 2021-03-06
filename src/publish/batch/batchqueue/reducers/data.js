import {
  list,
  params,
  loading,
  resetparams,
  changeSearchOptionData
} from '../constants/ActionTypes'

const defaultParams = ()=>{
  return {
    pageData:20,
    pageNumber:1,
    modelName:"listingQueue",
    // state:0
  }
}
const listData = (state ={
  list:[],
  total:0
}, action) => {
  switch (action.type) {
    case list:
      return action.payload
    default:
      return state
  }
}
const paramsData = (state = defaultParams(), action) => {
  switch (action.type) {
    case params:
      return action.payload
    case resetparams:
      return defaultParams()
    default:
      return state
  }
}
const loadingData = (state = false, action) => {
  switch (action.type) {
    case loading:
      return action.payload
    default:
      return state
  }
}

// this.platformOption,
// this.siteOption,
// this.accountsOption
const searchOptionData = (state = {
  platform:[],
  site:[],
  accounts:[],
}, action) => {
  switch (action.type) {
    case changeSearchOptionData:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
export default {
  paramsData,
  listData,
  loadingData,
  searchOptionData
}
