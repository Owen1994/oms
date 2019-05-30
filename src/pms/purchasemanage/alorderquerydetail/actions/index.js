import { fetchPost } from '../../../../util/fetch';
import { list_main_data } from '../constants';
import { Main_List_Api } from '../constants/Api';

export const getMainDataList = params => (dispatch) => {
    fetchPost(Main_List_Api, params)
        .then((request) => {
            if (request.state === '000001') {
                dispatch({
                    type: list_main_data,
                    data: request.data,
                });
            }
        });
};
export default getMainDataList;