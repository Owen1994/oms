import React, { Component } from 'react';
import {
    Table, Pagination, Spin, Dropdown, Menu,
} from 'antd';
import Modal2 from '../../../../components/Modal2';
import TempDetail from './TempDetail';
import { GET_LANGUAGES_LIST, GET_MESSAGE_TEMPDETAIL, getTempState } from '../../../message/templatelist/constants';
import { page } from '../../../../constants';
import { getStateName } from '../../../../utils';
import { fetchPost } from '../../../../util/fetch';

const MenuItem = Menu.Item;

class App extends Component {
    state = {
        languagesList: [],
        tempDetail: {},
        tempDetailVisible: false,
    }

    columns = [
        {
            title: '模板名称',
            dataIndex: 'tempName',
            width: '284',
            render: (text, record) => (
                <div className="select-temp-name" onClick={() => this.handleViewTempDetail(record.tempId)}>{text}</div>
            ),
        }, {
            title: '模板所属',
            dataIndex: 'tempType',
            width: '93',
            render: text => (
                <div>{text === 1 ? '公有' : '私有'}</div>
            ),
        }, {
            title: '模板状态',
            dataIndex: 'tempState',
            width: '93',
            render: text => (
                <div>{getStateName(text, getTempState, 'code')}</div>
            ),
        }, {
            title: '分类',
            dataIndex: 'tempClass',
            width: '181',
        }, {
            title: '操作',
            dataIndex: 'option',
            align: 'center',
            width: '145',
            render: (text, record) => {
                if (record.tempState !== 1) {
                    return null;
                }
                const { languagesList } = this.state;
                const menu = (
                    <Menu>
                        {
                            languagesList.map(item => (
                                <MenuItem key={item.languagesId} onClick={() => this.handleLanguageClick(item.languagesId, record)}>
                                    {item.languagesName}
                                </MenuItem>
                            ))
                        }
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu} trigger={['click']}>
                        <span style={{ color: '#4D7BFE', cursor: 'pointer' }}>
                            选择
                        </span>
                    </Dropdown>
                );
            },
        },
    ]

    componentDidMount() {
        fetchPost(GET_LANGUAGES_LIST, {}, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        languagesList: data.data,
                    });
                }
            });
    }

    getTempDetail = (tempId, callback) => {
        fetchPost(GET_MESSAGE_TEMPDETAIL, { tempId, type: 2 }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        tempDetail: data.data,
                    });
                    if (callback) {
                        callback(data.data);
                    }
                }
            });
    }

    handleLanguageClick = (languagesId, record) => {
        const { tempId } = record;
        this.getTempDetail(tempId, (data) => {
            const { handleSelectTemp, handleCancel } = this.props;
            const targetLanguageContent = data.data.languagesContent.find(item => +item.languagesId === languagesId);
            if (handleSelectTemp) {
                handleSelectTemp(targetLanguageContent, record);
            }
            if (handleCancel) {
                handleCancel('selectTempVisible');
            }
        });
    }

    handleViewTempDetail = (tempId) => {
        this.setState({
            tempDetailVisible: true,
        });
        this.getTempDetail(tempId);
    }

    handleCancel = () => {
        this.setState({
            tempDetailVisible: false,
        });
    }

    render() {
        const {
            listFetch, total, current, pageSize, loading, tempList,
        } = this.props;
        const { tempDetailVisible, tempDetail } = this.state;
        return (
            <div className="breadcrumb padding-sm overflow-hidden" style={{ marginTop: 15 }}>
                <Spin spinning={loading} delay={500}>
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={tempList}
                        rowKey={(record, index) => (index)}
                        pagination={false}
                    />
                    <Pagination
                        className="pull-right"
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定每页可以显示多少条
                        showSizeChanger // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={+total} // 数据总数
                        pageSize={pageSize} // 每页条数
                        onChange={listFetch} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch} // pageSize 变化的回调
                    />
                </Spin>
                {/* 模板详情 */}
                <Modal2
                    component={(<TempDetail tempDetail={tempDetail} />)}
                    title="模板详情"
                    visible={tempDetailVisible}
                    handleCancel={this.handleCancel}
                    footer={null}
                    width={590}
                />
            </div>
        );
    }
}
export default App;
