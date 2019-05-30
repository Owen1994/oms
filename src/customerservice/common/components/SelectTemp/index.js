import React from 'react';
import { Form, message } from 'antd';
import Search from './Search';
import Tabplatform from './TabPlatform';
import Tablelist from './Tablelist';
import { fetchPost } from '../../../../util/fetch';
import { filterRequest } from '../../../../utils';
import { getPlatformList, getTempClassList } from '../../request';
import { GET_MESSAGE_TEMP_LIST } from '../../../message/templatelist/constants';
import { page } from '../../../../constants';

class SelectTemp extends React.Component {
    state = {
        tagList: [],
        platform: [],
        tempList: [],
        total: 0,
        loading: false,
        current: page.defaultCurrent,
        pageSize: page.defaultPageSize,
    }

    componentDidMount() {
        getPlatformList({ commonStatus: 1 }).then((result) => {
            if (result && result.length > 0) {
                const { platformId } = this.props;
                const platformArr = [];
                const target = result.find(item => `${item.key}` === `${platformId}`);
                platformArr[0] = result[0];
                if (target) {
                    platformArr[1] = target;
                }
                this.setState({
                    platform: platformArr,
                });
                this.taglistFetch(platformId);
            } else {
                message.error('暂无平台数据');
            }
            this.listFetch();
        });
    }

    // 模板标签数据请求
    taglistFetch = (platformId) => {
        getTempClassList({ platformId }).then((result) => {
            // 仅供mock联调时注释，需加上
            const data = result.data;
            this.setState({
                tagList: data,
            });
        });
    }

    listFetch = (pageNumber, pageData) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filter = filterRequest(values);
                filter.pageNumber = pageNumber || page.defaultCurrent;
                filter.pageData = pageData || page.defaultPageSize;
                filter.tempClassId = filter.tempClassId ? filter.tempClassId[filter.tempClassId.length - 1] : undefined;
                this.fetchTempList(filter);
            }
        });
    }

    fetchTempList = (value) => {
        this.setState({ loading: true });
        fetchPost(GET_MESSAGE_TEMP_LIST, value, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        tempList: data.data.data,
                        loading: false,
                        current: value.pageNumber || page.defaultCurrent,
                        total: data.data.total,
                        pageSize: value.pageData || page.defaultPageSize,
                    });
                } else {
                    this.setState({
                        tempList: [],
                        loading: false,
                    });
                }
            });
    }

    // 表单提交
    onSubmit = (e) => {
        e.preventDefault();
        this.listFetch();
    }

    // 表单重置
    onReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const {
            tagList, platform, loading, pageSize, total, current, tempList,
        } = this.state;
        return (
            <div className="select-temp">
                { platform.length > 0
                    ? (
                        <Tabplatform
                            {...this.props}
                            listFetch={this.listFetch}
                            taglistFetch={this.taglistFetch}
                            platform={platform}
                            // handleTabChange={this.handleTabChange}
                            activeKey={this.props.platformId}
                            loading={loading}
                        />
                    )
                    : (
                        <div className="mail-detail">
                            <div className="breadcrumb customer-service-tab-platform">
                                <p style={{ lineHeight: '43px', paddingLeft: 15 }}>暂无数据</p>
                            </div>
                        </div>
                    )
                }
                <Search
                    {...this.props}
                    listFetch={this.listFetch}
                    tagList={tagList}
                    onSubmit={this.onSubmit}
                    onReset={this.onReset}
                />
                <Tablelist
                    listFetch={this.listFetch}
                    loading={loading}
                    pageSize={pageSize}
                    total={total}
                    current={current}
                    tempList={tempList}
                    handleSelectTemp={this.props.handleSelectTemp}
                    handleCancel={this.props.handleCancel}
                />
            </div>
        );
    }
}
export default Form.create()(SelectTemp);
