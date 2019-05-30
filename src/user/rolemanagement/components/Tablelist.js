import React, { Component } from 'react';
import {
    Form,
    Button,
    Table,
    Pagination,
    Spin,
    message,
    Input,
    Menu,
    Icon,
    Dropdown,
    Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import Modalmodel from '../../../components/modalmodel';
import '../css/css.css';
import { datasaddkey, timestampFromat } from '../../../util/baseTool';
import { levelOptions } from '../../../util/options';
import axios from '../../../util/axios';
import * as config from '../../../util/connectConfig';
import Functions from '../../../components/functions';

const FormItem = Form.Item;

class Tablelist extends Component {

    columns = [
        {
            title: '角色名称',
            dataIndex: 'roleName',
            width: 200,
            render: (text) => {
                return (
                    <Tooltip title={text}>
                        <div className="erp-user-cell-wrap">
                            {text}
                        </div>
                    </Tooltip>
                )
            }
        }, {
            title: '是否管理员',
            dataIndex: 'isAuthorizable',
            width: 100,
            render: (text, record, index) => {
                const texts = text ? '是' : '否';
                return (
                    <div>
                        {texts}
                    </div>
                );
            },
        }, {
            title: '有效期',
            dataIndex: 'isForever',
            width: 150,
            render: (text, record, index) => {
                const texts = text ? '永久有效' : (<div><p>{timestampFromat(record.effectiveTimeStr, 2)}</p>至<p>{timestampFromat(record.expireTimeStr, 2)}</p></div>);
                return (
                    <div>
                        {texts}
                    </div>
                );
            },
        }, {
            title: '创建人',
            dataIndex: 'createBy',
            width: 150,
        }, {
            title: '创建时间',
            dataIndex: 'createTimeStr',
            width: 200,
        }, {
            title: '角色Owner',
            dataIndex: 'lstOwner',
            width: 200,
            render: (text) => {
                const array = text || [];
                const content = array.join(',');
                return (
                        <Tooltip title={content}>
                            <div className="erp-user-cell-wrap">
                                {content}
                            </div>
                        </Tooltip>
                    );
            },
            // render: (text, record, index) => {
            //     const array = text || [];
            //     return <div style={{width: 400,wordBreak: 'break-all'}}>{array.join(',')}</div>;
            // },
        }, {
            title: '最后更新时间',
            dataIndex: 'modifiedTimeStr',
            width: 200,
        }, {
            title: '状态',
            dataIndex: 'isActive',
            width: 100,
            render: (text, record, index) => {
                const texts = text ? '启用' : '停用';
                return (
                    <div>
                        {texts}
                    </div>
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'operating',
            width: 200,
            render: (text, record, index) => {
                const operatingAuthorizationurl = `/user/rolemanagement/operatingAuthorization/?roleId=${record.roleId}`;
                const urlallocUser = `/user/rolemanagement/allocUser/?roleId=${record.roleId}`;
                const urledit = `/user/rolemanagement/addupdaterole/?roleId=${record.roleId}`;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="004-000001-000003-004">
                                <Link to={operatingAuthorizationurl}>分配权限</Link>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="004-000001-000003-005">
                                <Link to={urlallocUser}>分配用户</Link>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="004-000001-000003-006">
                                <a onClick={this.copyrole(record)}>复制角色</a>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="004-000001-000003-007">
                                <a href="javascript:;" onClick={this.deletetablelist(record, index)}>删除</a>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div className="actions-btns">
                        <Functions {...this.props} functionkey="004-000001-000003-003">
                            <Link to={urledit}>编辑</Link>
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
        },
    ]

    state={
        selectedRows: '',
        visibleBatch: false,
    }

    componentDidMount() {

    }

    /**
     *作者: 唐勇
     *功能描述: 角色管理删除弹窗
     *参数说明:
     *时间: 2018/7/3 14：00
     */
    deletetablelist = (record, index) => () => {
        this.props.baseInfoForm({ roleid: record.roleId });
        this.props.deletemodalaction({ visible: true });
    }

    /**
     *作者: 唐勇
     *功能描述: 角色管理删除弹窗取消功能
     *参数说明:
     *时间: 2018/7/3 14：00
     */
    ModalhandleCancel = () => {
        this.props.deletemodalaction({ visible: false });
    }

    /**
     *作者: 唐勇
     *功能描述: 角色管理复制角色弹窗取消功能
     *参数说明:
     *时间: 2018/7/3 14：00
     */
    ModalhandlecopyCancel = () => {
        this.props.form.resetFields();
        this.props.copymodalaction({ visible: false });
    }

    /**
     *作者: 唐勇
     *功能描述: 删除框确认功能
     *参数说明:
     *时间: 2018/7/412:00
     */
    ModalhandleOk = () => {
        const { roleid } = this.props.Infos;
        const newobj = {};
        const objvalue = {};
        const lstRoleIdarr = [];
        lstRoleIdarr.push(roleid);
        newobj.lstRoleId = lstRoleIdarr;
        axios
            .post(`${config.api_url}/urc/motan/service/api/IUrcService/deleteRoles`, newobj)
            .then((response) => {
                if (response.status == 200) {
                    objvalue.pageNumber = 1;
                    objvalue.pageData = 20;

                    message.success(response.data.msg);
                    this
                        .props
                        .fetchPosts({ key: 'data', value: objvalue });
                    this.props.deletemodalaction({ visible: false });
                }
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 复制角色确认功能
     *参数说明:
     *时间: 2018/7/412:00
     */
    ModalhandlecopyOk = () => {
        const or = typeof e === 'object';
        or && e.preventDefault();
        const newobj = {};
        const { roleid } = this.props.Infos;
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log(values);
                    newobj.newRoleName = values.newroleName;
                    newobj.sourceRoleId = roleid;

                    axios
                        .post(`${config.api_url}/urc/motan/service/api/IUrcService/copyRole`, newobj)
                        .then((response) => {
                            if (response.status == 200) {
                                const objvalue = {};
                                objvalue.pageNumber = 1;
                                objvalue.pageData = 20;
                                message.success(response.data.msg);
                                this
                                    .props
                                    .fetchPosts({ key: 'data', value: objvalue });
                                this.props.form.setFieldsValue({
                                    newroleName: '',
                                });
                                this.props.form.resetFields();
                                this.props.copymodalaction({ visible: false });
                            }
                        });
                }
            });
    }

    /**
     *作者: 唐勇
     *功能描述: 复制角色弹窗
     *参数说明:
     *时间: 2018/7/412:00
     */
    copyrole = record => () => {
        this.props.baseInfoForm({ roleid: record.roleId });
        this.props.copymodalaction({ visible: true });
    }

    /**
     *作者: 唐勇
     *功能描述: 分页功能
     *参数说明:1.page 当前页码 2.pageSize：多少条数据
     *时间: 2018/6/26 9:00
     */
    Paginatihandle = (page, pageSize) => {
        this.props.Paginationmodelaction({ pageSize, current: page });
        this.props.handleSubmit(0, page, pageSize);
    }

    menuonClick=(item) => {
        const { selectedRows } = this.state;
        if (selectedRows == '') {
            message.error('请选择批量选项');
            return false;
        }
        if (item.key == 1) {
            this.props.history.push(`/user/rolemanagement/operatingAuthorization/?roleId=${selectedRows}`);
        } else {
            this.props.history.push(`/user/rolemanagement/allocUser/?roleId=${selectedRows}`);
        }
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const { data } = this.props.roletable;
        const newdata = datasaddkey(data);
        const columns = this.columns;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let value = '';
                for (let i = 0; i < selectedRows.length; i++) {
                    value = `${value + selectedRows[i].roleId},`;
                }
                value = value.substring(value.length - 1) == ',' ? value.substring(0, value.length - 1) : value;
                this.setState({ selectedRows: value });
            },
        };

        const menu = (
            <Menu onClick={this.menuonClick} className="antdown-mglef">
                <Menu.Item key="1">
                    批量分配权限
                </Menu.Item>
                <Menu.Item key="2">
                    批量分配用户
                </Menu.Item>
            </Menu>
        );

        const copyroledata = (
            <div className="copydataalll">
                <div>
                    <div className="copytopleft"><em>*</em>新角色名称：</div>
                    <div className="copytopright">
                        <FormItem>
                            {getFieldDecorator('newroleName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请命名新角色名称',
                                    },
                                ],
                            })(<Input placeholder="请命名新角色名称" className="copyinputwih" />)}

                        </FormItem>
                    </div>
                </div>
                <div>
                    <div className="copytopleft" />
                    <div className="copytopright copytxt">复制角色将创建一个新的角色，并将原角色的权限自动授予给新角色</div>
                </div>
            </div>
        );
        const urlAdd = '/user/rolemanagement/addupdaterole/';
        return (
            <div className="newCluenk">
                <div className="roletabletop">
                    <div className="leftbtn ">
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Button>批量操作 <Icon type="down" /></Button>
                        </Dropdown>
                    </div>

                    <div className="rightbtn ">
                        {/* <Button */}
                        {/* onClick={() => { */}
                        {/* this.addtableinfo() */}
                        {/* }}> */}
                        {/* 新增角色 */}
                        {/* </Button> */}
                        <Functions {...this.props} functionkey="004-000001-000003-002">
                            <Link to={urlAdd} className="ant-btn ant-link"><Icon type="plus" /> 新增角色</Link>
                        </Functions>
                    </div>
                </div>
                <div className="roletablecen">
                    <Spin spinning={this.props.roletable.loading} delay={100} tip="Loading...">
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle}
                    />
                </div>
                <Modalmodel
                    {...{
                        ...this.props.deletemodel,
                        visible: this.props.deletemodel.visible,
                        ModalText: '确认删除吗?',
                    }}
                    onOk={this.ModalhandleOk}
                    onCancel={this.ModalhandleCancel}
                />

                <Modalmodel
                    {...{
                        ...this.props.copymodel,
                        visible: this.props.copymodel.visible,
                        ModalText: copyroledata,

                    }}
                    destroyOnClose
                    onOk={this.ModalhandlecopyOk}
                    onCancel={this.ModalhandlecopyCancel}
                />

            </div>
        );
    }
}

export default Tablelist;
