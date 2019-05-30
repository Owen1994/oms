import React, { Component } from 'react';
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    message,
    DatePicker,
    Menu,
    Icon,
    Dropdown,
    Row,
    Col,
} from 'antd';
import { Link } from 'react-router-dom';
import Modalmodel from './Modalmodel';
import '../css/css.css';
import * as config from '../../../../util/connectConfig';
import axios from '../../../../util/axios';
import {
    datasaddkey,
} from '../../../../util/baseTool';
import Functions from '../../../../components/functions';


const FormItem = Form.Item;

class Tablelist extends Component {

    state = {
        batchSynchronous: [], // 存储表格选择项
        templId: '',
        delIndex: null,
    }

    // ----常量定义----

    // 表头
    columns = [
        {
            title: '方案名称',
            dataIndex: 'templName',
            width: 100,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            width: 60,
        },
        {
            title: '创建人',
            dataIndex: 'createBy',
            width: 60,
        },
        {
            title: '创建时间',
            dataIndex: 'createTimeStr',
            width: 60,
        },
        {
            title: '最后修改时间',
            dataIndex: 'modifiedTimeStr',
            width: 60,
        },
        {
            title: '操作',
            width: 80,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const url = '/user/usermanagementlist/datapermissiontempl/compileplan/';
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="004-000001-000002-000001-004">
                                <Link
                                    to={`${url}?buttontype=2&templId=${record.templId}`}
                                    className="viewbtn"
                                >编辑
                                </Link>
                            </Functions>
                        </Menu.Item>

                        <Menu.Item>
                            <Functions {...this.props} functionkey="004-000001-000002-000001-005">
                                <a className="viewbtn" onClick={this.deletetablelist(record, index)}>删除</a>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div className="actions-btns">
                        <Functions {...this.props} functionkey="004-000001-000002-000001-002">
                            <Link
                                to={`/user/usermanagementlist/datapermissiontempl/viewplan/?templId=${record.templId}`}
                                className="viewbtn"
                            >查看
                            </Link>
                        </Functions>
                        <span className="margin-ss-left margin-ss-right v-line">|</span>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                更多 <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                );
            },
        }];

    componentDidMount() {

    }

    // ----自定义方法----

    currentChange = (current, pageSize) => {
        this.setState({
            pagenum: Number(current),
        });
        this.Paginatihandle(current, pageSize);
    }

    Paginatihandle = (current, pageSize = 20) => {
        const newobj = { pageNumber: current, pageData: pageSize };
        const templ = {};
        templ.templName = this.props.form.getFieldsValue().areaValue;
        if (templ.templName) {
            newobj.templ = templ;
        }
        this.props.fetchPosts({
            key: 'data',
            value: newobj,
        });
        this.props.tablemodelaction({ selectedRowKeys: [] });
        this.props.menudataaction({
            pageCache: {
                ...this.props.menuInfos.pageCache,
                [`${location.pathname}${location.search}`]: newobj,
            },
        });
    }

    // 删除按钮
    deletetablelist = (record, index) => () => {
        this.props.modalmodelaction({ visible2: true });
        this.setState({
            templId: record.templId || '',
            delIndex: index,
        });
    }


    // 弹窗上确定按钮
    ModalhandleOk = () => {
        const lstTemplId = [];
        lstTemplId.push(String(this.state.templId));
        const newobj = {};
        newobj.lstTemplId = lstTemplId;
        axios.post(`${config.api_url}/urc/motan/service/api/IUrcService/deleteDataRuleTempl`, newobj)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        message.success(response.data.msg || '成功!');
                        this.props.modalmodelaction({
                            visible2: false,
                        });
                        this.props.fetchPosts({
                            key: 'data',
                            value: {
                                pageNumber: 1,
                                pageData: 20,
                            },
                        });
                    } else {
                        message.error(response.data.msg);
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
    }

    ModalhandleCancel = value => () => {
        this.props.modalmodelaction({ [value]: false });
    }

    handleSubmit = () => {
        alert('点击了我');
    }

    // 列表项选择
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({ selectedRowKeys, selectedRows });
    }

    render() {
        const columns = this.columns;
        const { data } = this.props.tablemodel;
        const newdata = datasaddkey(data.lst || []);
        const buttons = (
            <Row type="flex" justify="end">
                <FormItem>
                    <Col span={6}>
                        <Functions {...this.props} functionkey="004-000001-000002-000001-003">
                            <Button className="margin-md-left">
                                <Link
                                    to="/user/usermanagementlist/datapermissiontempl/compileplan/?buttontype=1"
                                >新增方案
                                </Link>
                            </Button>
                        </Functions>
                    </Col>
                </FormItem>
            </Row>
        );

        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            fixed: false,
            getCheckboxProps: record => ({
                disabled: false,
            }),
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    batchSynchronous: selectedRows,
                });
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                this.setState({
                    batchSynchronous: selectedRows,
                });
            },
        };

        return (
            <div className="newCluenk">
                <div className="title tabTitle">
                    {buttons}
                </div>
                <div className="content">
                    {/* <Spin tip="Loading...">
                            <Table columns={columns} dataSource={[1,2]} bordered
                                pagination={false} />
                        </Spin> */}
                    <Table
                        // rowSelection={rowSelection}
                        columns={columns}
                        dataSource={newdata}
                        bordered
                        pagination={false}
                    />
                    <Pagination
                        showTotal={total => `共 ${total} 条`} // 用于显示数据总量和当前数据顺序
                        pageSizeOptions={['20', '30', '40', '50']} // 指定每页可以显示多少条
                        showSizeChanger // 是否可以改变 pageSize
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        current={this.props.Paginationmodel.current} // 当前页数
                        onShowSizeChange={this.Paginatihandle} // pageSize 变化的回调
                        total={this.props.Paginationmodel.total} // 数据总数
                        pageSize={this.props.Paginationmodel.pageSize} // 每页条数
                        onChange={this.currentChange} // 页码改变的回调，参数是改变后的页码及每页条数
                    />
                </div>
                <Modalmodel
                    {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.visible2,
                        ModalText: '确认删除吗?',
                    }}
                    onOk={this.ModalhandleOk}
                    onCancel={this.ModalhandleCancel('visible2')}
                />
            </div>
        );
    }
}

export default Tablelist;
