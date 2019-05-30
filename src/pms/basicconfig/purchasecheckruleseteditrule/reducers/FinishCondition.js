import {
    RECEIVE_FINISHCONDITION,
    ADD_FINISH_CONDITION_RIGHT,
} from '../constants/ActionTypes';

const finishConditionData = (state = {}, action) => {
    switch (action.type) {
    case RECEIVE_FINISHCONDITION:
        return action.data;
    case ADD_FINISH_CONDITION_RIGHT: {
        const data = action.data;
        const { key, children, value } = data;
        if (key === 1) {
            state.supplier = children;
        }
        if (key === 2) {
            state.sku = children;
        }
        if (key === 3) {
            state.paymentMethod = children;
        }
        if (key === 4) {
            state.total = value;
        }
        if (key === 5) {
            state.quantityInterval = value;
        }
        return { ...state };
    }
    default:
        return state;
    }
};


export default finishConditionData;
