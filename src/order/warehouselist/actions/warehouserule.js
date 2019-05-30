/**
*作者: 任贸华
*功能描述: 指定发货仓规则分发事件
*参数说明:
*时间: 2018/4/16 11:29
*/
import {Paginationmodelaction, tablemodelaction} from "./index";
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";

export const warehouseruleInfo = 'warehouseruleInfo'

const warehouseruleaction = value=> ({
    type: warehouseruleInfo,
    payload: value
})



const actions = {
    warehouseruleaction,
}

export default actions




