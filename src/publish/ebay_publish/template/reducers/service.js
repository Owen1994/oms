import * as ActionType from "../constants"
import {randNum} from '../../../../util/baseTool'
import {message} from "antd";

const defaultData = {
    site:"",
    shipToLocationsType:0,
    domesticShippingType:"",
    intlShippingType:"",
    domesticShippingPolicyInfoServiceArr:[
        {
            key:Date.now(),
            shippingService: {},
            freeShipping: false
        }
    ],
    intlShippingPolicyInfoServiceArr:[
        {
            key:Date.now(),
            shippingService: {},
        }
    ],
    excludeShipToLocationArr:[
        {
            key:Date.now(),
            locationArr:[]
        }
    ]
};
export const serviceData = (state = defaultData, action) => {
    switch (action.type) {
        case ActionType.GET_SERVICE:
            return {
                ...state,
                ...action.data,
            };
        case ActionType.GET_SERVICE_ADD: // key: 'domesticShippingPolicyInfoServiceArr', value :{。。。}
            if(action.key === 'domesticShippingPolicyInfoServiceArr'){  //本地服务最多4项
                if(state[action.key].length < 4){
                    state[action.key].push(action.value);
                }else{
                    message.warning("最多添加三项")
                }
            }else if(action.key === 'intlShippingPolicyInfoServiceArr'){  //全球服务最多5项
                if(state[action.key].length < 5){
                    state[action.key].push(action.value);
                }else{
                    message.warning("最多添加四项")
                }
            }
            state[action.key] = [...state[action.key]];
            return {
                ...state
            };
        case ActionType.GET_SERVICE_DELETE:// key: 'domesticShippingPolicyInfoServiceArr', index :{。。。}
            state[action.key].splice(action.index,1);
            state[action.key] = [...state[action.key]];
            return {
                ...state,
            };
        case ActionType.MODIFY_SERVIVE_ITEM:// {key: 'domesticShippingPolicyInfoServiceArr', index :0, name: '', value: ''}
            state[action.key][action.index][action.name]= action.value;
            state[action.key] = [...state[action.key]];
             return {
                 ...state,
             };
        case  ActionType.RESET_SERVIVE_ITEM:// {key: 'domesticShippingPolicyInfoServiceArr'}
            state[action.key] = [
                {
                    key:Date.now(),
                    shippingService: {},
                    freeShipping: false
                }
            ];
            state[action.key] = [...state[action.key]];
            return {
                ...state,
            };
        case ActionType.INITI_DATALIST://{domesticShippingPolicyInfoServiceArr:[],intlShippingPolicyInfoServiceArr:[]}
            if(action.domesticShippingPolicyInfoServiceArr){
                state.domesticShippingPolicyInfoServiceArr = action.domesticShippingPolicyInfoServiceArr.map((item) => {
                    item.key = randNum();
                    return item;
                })
            }
            if(action.intlShippingPolicyInfoServiceArr){
                state.intlShippingPolicyInfoServiceArr = action.intlShippingPolicyInfoServiceArr.map((item) => {
                    item.key = randNum();
                    return item;
                })
            }
            return {
                ...state,
            };
        case ActionType.RESET_DATALIST:
            return defaultData;
        case ActionType.SET_SITE:
            if(action.key){
                state[action.key] = action.value;
            }else{
                return {
                    ...state,
                    ...action.data
                }
            }
            return {
                ...state
            };
        default:
            return state
    }
};
