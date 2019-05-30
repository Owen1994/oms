import {
  list,
  params,
  loading,
  changeSearchOptionData
} from '../constants/ActionTypes'

const defaultParams = {
  modelName:"shopeeLogistic",
  platformCode:"SHOPEE",
  // pageNumber:1,
  // pageData:20
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
const paramsData = (state = defaultParams, action) => {
  switch (action.type) {
    case params:
      return action.payload
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
