import {
    RECEIVE_CONDITION,
    CHECK_CONDTION,
    DEL_CONDTION,
} from '../constants/ActionTypes';

const condtionsData = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_CONDITION: {
        return action.data;
    }
    case CHECK_CONDTION: { // { checked, key }
        return action.data;
    }
    case DEL_CONDTION: {
        // state.splice(action.data - 1, 1);
        // console.log(action.data);
        // console.log(state);
        let index = -1;
        for (let i = 0; i < state.length; i++) {
            if (action.data === state[i]) {
                index = i;
                break;
            }
        }
        state.splice(index, 1);
        return [...state];
    }
    default: {
        return state;
    }
    }
};


export default condtionsData;
