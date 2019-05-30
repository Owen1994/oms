export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const tablemodelInfo2 = 'tablemodelInfo2'
export const tablemodelInfo3 = 'tablemodelInfo3'
export const tablemodelInfo4 = 'tablemodelInfo4'
export const tablemodelInfo5 = 'tablemodelInfo5'
import axios from '../../../util/axios'
import * as config  from '../../../util/connectConfig'
import {
    message,
} from 'antd'

export const baseInfoForm = value=> ({
    type: baseInfo,
    payload: value
})

export const modalmodelaction = value=> ({
    type: modalmodelInfo,
    payload: value
})

export const tablemodelaction = value=> ({
    type: tablemodelInfo,
    payload: value
})

export const tablemodelaction2 = value=> ({
    type: tablemodelInfo2,
    payload: value
})

export const tablemodelaction3 = value=> ({
    type: tablemodelInfo3,
    payload: value
})

export const tablemodelaction4 = value=> ({
    type: tablemodelInfo4,
    payload: value
})

export const tablemodelaction5 = value=> ({
    type: tablemodelInfo5,
    payload: value
})

export const fetchPosts = value => (dispatch, getState) => {
    dispatch(baseInfoForm({[value]: []}))
    return axios.post(`${config.api_url}/queryCategoryList.do`)
        .then(response => {
            if (response.status == 200) {
                if(response.data.state == "000001"){
                    dispatch(baseInfoForm({[value]: response.data.data,}))
                }else{
                    message.error(response.data.msg);
                }
            }
        }).catch(e=> {
            console.log(e);
        })
}

export const fetchzonesPosts = ({url, name, value, returnName}) => (dispatch, getState) => {
    return axios.post(`${url}?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                if(response.data.state == "000001") {
                    dispatch(baseInfoForm({[returnName]: response.data.data,}))
                }else{
                    message.error(response.data.msg);
                }
            }
        }).catch(e=> {
            console.log(e);
        })
}


const actions = {
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    tablemodelaction2,
    tablemodelaction3,
    tablemodelaction4,
    tablemodelaction5,
    fetchPosts,
    fetchzonesPosts,
}

export default actions