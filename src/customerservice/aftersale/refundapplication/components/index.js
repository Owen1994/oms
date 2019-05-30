import React from 'react';
import { Form } from 'antd';
import PlatformTabsSearch from './PlatformTabsSearch';
import Tablelist from './Tablelist';

import { filterSeachData } from '../selector';
import { fetchPost } from '../../../../util/fetch';
import { GET_MODE_PLATFORM } from '../../../common/constants';

class RefundApplication extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        platform: [], // 平台列表数据
    }

    componentDidMount() {
        this.getPlatform();
    }

    // 请求列表
    refundReasonFetch = (pageNumber = 1, pageData = 20) => {
        const values = this.props.form.getFieldsValue();
        const filter = filterSeachData(values);
        if (!filter) return; 
        this.setState({
            pageData,
            pageNumber,
        });
        filter.pageData = pageData;
        filter.pageNumber = pageNumber;
        filter.group = '1';
        this.props.refundFetch({ ...filter });
    }

    // 获取平台
    getPlatform = () => {
        fetchPost(GET_MODE_PLATFORM, { modeUse: 'refund' }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    const result = data.data.data;
                    if (result && result.length > 0) {
                        this.setState({
                            platform: result,
                        });
                        this.refundReasonFetch();
                    }
                } else {
                    this.setState({
                        platform: [],
                    });
                }
            });
    }

    render() {
        const {
            platform,
            pageData,
            pageNumber,
        } = this.state;
        return (
            <div className="refund-application">
                <PlatformTabsSearch
                    {...this.props}
                    platform={platform}
                    listFetch={this.refundReasonFetch}
                />
                <Tablelist
                    {...this.props}
                    pageData={pageData}
                    pageNumber={pageNumber}
                    platform={platform}
                    listFetch={this.refundReasonFetch}
                />
            </div>
        );
    }
}
export default Form.create()(RefundApplication);
