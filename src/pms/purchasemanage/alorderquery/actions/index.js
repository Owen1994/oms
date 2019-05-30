import { fetchPost } from '../../../../util/fetch';
import { list_main_data, list_loading_state } from '../constants';
import { Main_List_Api } from '../constants/Api';

export const getMainDataList = params => (dispatch) => {
    dispatch({
        type: list_loading_state,
        data: true,
    });
    fetchPost(Main_List_Api, params)
        .then((request) => {
            dispatch({
                type: list_loading_state,
                data: false,
            });
            if (request.state === '000001') {
                dispatch({
                    type: list_main_data,
                    data: request.data,
                });
            }
        });
};
export default getMainDataList;