import React from 'react';
import { Form } from 'antd';
import OperateTabs from './OperateTabs';
import TabContent from './TabContent';
import { filterRequest } from '../../../../compliance/utils';
import { fetchPost } from '../../../../util/fetch';
import { GET_MODE_PLATFORM } from '../../../common/constants';

class ReundReason extends React.Component {
    state = {
        operateType: '1',
        reasonPageData: 20,
        reasonPageNumber: 1,
        fieldData: [],
        platform: [],
    }

    componentDidMount() {
        // 权限过滤
        const pathname = window.location.pathname;
        const { menuInfos } = this.props;
        const keys = menuInfos.functions[pathname] || [];
        if (keys.includes('009-000004-000001-001')) {
            this.refundReasonFetch();
        } else if (keys.includes('009-000004-000001-005') && !keys.includes('009-000004-000001-001')) {
            this.setState({
                operateType: '2',
            }, () => this.getPlatform());
        }
    }

    // 请求列表
    refundReasonFetch = (pageNumber = 1, pageData = 20) => {
        setTimeout(() => {
            this.props.form.validateFields((err, values) => {
                const filter = filterRequest(values);
                filter.pageNumber = pageNumber;
                filter.pageData = pageData;
                this.props.reasonListFetch({ ...filter });
            });
        }, 0);
        this.setState({
            reasonPageData: pageData,
            reasonPageNumber: pageNumber,
        });
    }

    getPlatform = () => {
        fetchPost(GET_MODE_PLATFORM, { modeUse: 'refund' }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    const result = data.data.data;
                    this.setState({
                        platform: result,
                    });
                    this.getCustomForm(result[0].key);
                } else {
                    this.setState({
                        platform: [],
                    });
                }
            });
    }

    // 请求自定义表单
    getCustomForm = () => {
        const platformId = this.props.form.getFieldValue('platformId');
        this.props.formListFetch({
            platformId,
            group: '1',
        });
    }

    handleOperateChange = (key) => {
        if (key === '2') {
            this.getPlatform();
        } else {
            this.refundReasonFetch();
        }
        this.setState({
            operateType: key,
        });
    }

    render() {
        const {
            operateType,
            platform,
            reasonPageData,
            reasonPageNumber,
        } = this.state;
        return (
            <div className="refund-reason">
                <OperateTabs
                    {...this.props}
                    handleOperateChange={this.handleOperateChange}
                />
                <TabContent
                    {...this.props}
                    platform={platform}
                    operateType={operateType}
                    reasonPageData={reasonPageData}
                    reasonPageNumber={reasonPageNumber}
                    refundReasonFetch={this.refundReasonFetch}
                    getCustomForm={this.getCustomForm}
                    handleOpenModal={this.handleOpenModal}
                />
            </div>
        );
    }
}
export default Form.create()(ReundReason);
