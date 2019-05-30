import * as types from "../constants/reducerTypes";

export const vrelationship = (state = {
    data: [{ key: 0 }],
    specificName: "",
    checkedIndex: 0,
    upcOrEan: null,
    spu: ""
}
    // {[{key: 0, propsName: color}], specificName: color,upcOrEan: "upc"}
    , action) => {
    switch (action.type) {
        case types.ADD_VPROPSNAME:
            state.data.push({ key: Date.now() })
            state.data = [...state.data]
            return { ...state };
        case types.DEL_VPROPSNAME: // index
            state.data.splice(action.index, 1);
            state.data = [...state.data];
            if (state.checkedIndex === action.delKey) {
                state.checkedIndex = state.data[0].key
                state.specificName = state.data[0].propsName
            }
            return { ...state };
        case types.EDIT_VPROPSNAME: // index key value
            if (action.index >= 0) {
                if (action.item.key === state.checkedIndex) {
                    state["specificName"] = action.value;
                }
                state.data[action.index]['propsName'] = action.value;
                state.data = [...state.data];
            } else {
                state["specificName"] = action.specificName;
                state["checkedIndex"] = action.checkedIndex;
            }
            return { ...state };
        case types.SWITCH_SITE:
            // 切换站点时  加入upcOrEan
            state.upcOrEan = action.upcOrEan
            return { ...state }
        case types.INIT_UPCOREAN:
            // 编辑初始化时  加入upcOrEan
            state.upcOrEan = action.upcOrEan
            return { ...state }
        case types.LOADING_SKUINFO:
            const { data } = action.data;
            const { variationInfo } = data;
            state = getVrelationship(state, variationInfo)
            return { ...state };
        case types.LISTING_DETAIL_DATA_FETCH:
            let skuInfo = action.data.skuInfo;
            state = getVrelationship(state, skuInfo.variationInfo);
            return { ...state };
        case types.RESET_DETAIL_DATA:
            return { data: [{ key: 0 }], specificName: "", checkedIndex: 0, upcOrEan: null }
        default:
            return state
    }
};

const getVrelationship = (state, variationInfo) => {
    if (variationInfo) {
        let propsNameArr = [];
        let checkedIndex = 0;
        let specificName = variationInfo.specificName;
        let variationDetail = variationInfo.variationDetail && variationInfo.variationDetail[0];
        let propsNameObj = JSON.parse(variationInfo.specificSetJson);
        for (let key in propsNameObj) {
            propsNameArr.push({
                propsName: key
            })
        }
        propsNameArr = propsNameArr.map((item, index) => {
            if (!item.key) {
                item.key = index
            }
            if (item.propsName === specificName) {
                checkedIndex = index
            }
            return item
        })
        if (variationDetail && variationDetail.upc) {
            state.upcOrEan = "upc"
        }
        if (variationDetail && variationDetail.ean) {
            state.upcOrEan = "ean"
        }
        if (propsNameArr.length) {
            state.data = propsNameArr;
        } else {
            state.data = [{ key: 0 }]
        }
        state.specificName = specificName;
        state.checkedIndex = checkedIndex;
    }
    return { ...state }
}
