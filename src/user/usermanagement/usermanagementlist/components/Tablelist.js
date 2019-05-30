import React, { Component } from 'react';
import {
    Button,
    Table,
    Pagination,
    Spin,
    message,
    Row,
    Icon
} from 'antd';
import '../css/css.css';
import { Link } from 'react-router-dom';
// import Modalmodel from './Modalmodel';
import * as config from '../../../../util/connectConfig';
import axios from '../../../../util/axios';
import {
    datasaddkey,
} from '../../../../util/baseTool';
import Functions from '../../../../components/functions';


class Tablelist extends Component {

    state = {
        batchSynchronous: [], // 存储表格选择项
    }

    // ----常量定义----

    // 表头
    columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            width: 60,
        },
        {
            title: '员工',
            dataIndex: 'personName',
            width: 60,
        },
        {
            title: '启用时间',
            dataIndex: 'activeTimeStr',
            width: 60,
        },
        {
            title: '角色',
            dataIndex: 'roles',
            width: 80,
            render: (text, record, index) => {
                if (record.roles) {
                    const roleNameArr = [];
                    record.roles.map((v, i) => {
                        roleNameArr.push(v.roleName);
                    });
                    return (<p>{roleNameArr.join(' , ')}</p>);
                }
            },
        },
        {
            title: '状态',
            dataIndex: 'isActive',
            width: 60,
            render: (text, record, index) => {
                if (text) {
                    return (<p>启用</p>);
                }
                return (<p style={{ color: 'red' }}>禁用</p>);
            },
        },
        {
            title: '操作',
            width: 80,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const urlData = '/user/usermanagementlist/datapauthorization/';
                const urlFunc = '/user/usermanagementlist/functionalpermissionlist/';
                return (
                    <div className="actions-btns">
                        <Functions {...this.props} functionkey="004-000001-000002-005">
                            <Link to={`${urlData}?userName=${record.userName}`} className="viewbtn">数据授权</Link>
                        </Functions>
                        <span className="margin-ss-left margin-ss-right v-line">|</span>
                        <Functions {...this.props} functionkey="004-000001-000002-004">
                            <Link to={`${urlFunc}?userName=${record.userName}`} className="viewbtn">查看操作权限</Link>
                        </Functions>
                    </div>
                );
            },
        }];

    componentWillUnmount() {
        this.setState({
            batchSynchronous: [],
        });
        this.props.tablemodelaction({ selectedRowKeys: [] }); // 清空勾选项数组
    }

    // ----自定义方法----

    // 分页方法
    currentChange = (current, pageSize) => {
        this.setState({
            pagenum: Number(current),
        });
        this.Paginatihandle(current, pageSize);
    }

    // 分页方法
    Paginatihandle = (current, pageSize = 20) => {
        const newobj = { pageNumber: current, pageData: pageSize };
        const user = {};
        user.userName = this.props.form.getFieldsValue().areaValue.replace(/[\n]/g, ',').replace(/[\s]/g, '');
        if (user.userName) {
            newobj.user = user;
        }
        this.props.fetchPosts({
            key: 'data',
            value: newobj,
        });
        this.props.tablemodelaction({ selectedRowKeys: [] });
        this.props.menudataaction({ pageCache: { ...this.props.menuInfos.pageCache, [`${location.pathname}${location.search}`]: newobj } });
    }

    // 同步数据按钮
    synchrodata = () => {
        this.props.organtableaction({ loading: true });
        axios.post(`${config.api_url}/urc/motan/service/api/IUrcService/syncUserInfo`)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        message.success('成功!');
                        this.props.organtableaction({ loading: false });
                    } else {
                        message.error(response.data.msg);
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
    }

    // 批量授权
    batchAuth = () => {
        const arr = [];
        const { batchSynchronous } = this.state;
        if (batchSynchronous.length >= 2) {
            batchSynchronous.map((v, i) => {
                arr.push(v.userName);
            });
        } else {
            message.warn('批量操作数量至少为2个!');
            return false;
        }
        if (arr.length) {
            const userLst = arr.join(',');
            this.props.history.push(`/user/usermanagementlist/datapauthorization/?userName=${userLst}`);
        }
    }

    // 导入用户SKU权限按钮
    importSKU = () => {
        alert('你点击了导入!');
    }

    deletetablelist = (record, index) => () => {

    }

    ModalhandleOk= () => {


    }

    ModalhandleCancel = value => () => {

    }

    // 表格上方按钮
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    // 列表项选择
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({ selectedRowKeys, selectedRows });
    }
    // ---------勿删------------------
    // <Button
    //     className="margin-md-left"
    //     onClick={this.importSKU}
    //     disabled={true}
    //     >
    //     导入用户SKU权限
    // </Button>

    // disabled={!(this.state.batchSynchronous.length>=2)}

    render() {
        const { data } = this.props.tablemodel;
        const newdata = datasaddkey(data.lst || []);
        const columns = this.columns;
        const buttons = (
            <Row type="flex" justify="space-between">
                <div>
                    <Button onClick={this.batchAuth}>
                        批量数据授权
                    </Button>
                </div>
                <div>
                    <Functions {...this.props} functionkey="004-000001-000002-002">
                        <Button
                            className="margin-md-left"
                            onClick={this.synchrodata}
                        >
                            <Icon type="reload" /> 同步数据
                        </Button>
                    </Functions>
                    <Functions {...this.props} functionkey="004-000001-000002-003">
                        <Button className="margin-md-left">
                            <Link to="/user/usermanagementlist/datapermissiontempl/" className="ant-link"><Icon type="setting" /> 管理数据权限模板</Link>
                        </Button>
                    </Functions>
                </div>
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
            <div className="newCluenk userTabelist">
                <div className="title tabTitle">
                    {buttons}
                </div>
                <div className="content">
                    <Spin tip="Loading..." spinning={this.props.organtable.loading} delay={100}>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}
                        />
                    </Spin>
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
                {/*<Modalmodel*/}
                    {/*{...{*/}
                        {/*...this.props.modalmodel,*/}
                        {/*visible: false,*/}
                        {/*ModalText: '确认删除吗?',*/}
                    {/*}}*/}
                    {/*onOk={this.ModalhandleOk}*/}
                    {/*onCancel={this.ModalhandleCancel('visible2')}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default Tablelist;
