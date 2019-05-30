import * as config from '../../../../util/connectConfig'
import { post } from "../../../../util/axios";

export const searchValuesInfo = 'lgt-searchValuesInfo';

export const searchVluesaction = value => ({
    type: searchValuesInfo,
    payload: value
});


export const fetchsearchValues = ({url, value = {}}) => (dispatch) => {
    dispatch(searchVluesaction({loading: true}));
    value.pageData = value.pageData ? value.pageData : 20;
    value.pageNumber = value.pageNumber ? value.pageNumber : 1;
    value.name = value.name ? value.name : '';
    return post(`${config.api_url}${url}`, value)
            .then(response => {
                if (response.state == '000001') {
                    // const total = response.total || response.data.length;
                    const data = response.data;
                    // dispatch(searchValuesPaginationaction({
                    //     current: value['pageNumber'] || 1,
                    //     total: total,
                    //     pageSize: value['pageData'] || 20
                    // }));
                    const result = {data, loading: false, total: response.total};
                    dispatch(searchVluesaction(result))
                }
            });
};


