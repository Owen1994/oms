import React from 'react'
import { Link } from 'react-router-dom';

import {
    Button,
    Modal,
    Icon,
    Popover,
    message,
    Table,
    Menu,
    Dropdown,
    Spin,
    Pagination,
    Form,
} from 'antd'
const confirm = Modal.confirm;
const FormItem = Form.Item;
// import Export from './export'
import ExportModal from '../../../../common/components/export/export'
import EditTableCell from  './editTableCell'   // 可编辑单元格组件
import FbaLogisticsPlan from './fbaLogisticsPlan' //获取FBA物流计划单弹窗内容
import {datasaddkey, filterParams, timestampFromat} from "../../../../util/baseTool"
import {
    post
} from "../../../../util/axios"
import * as types from "../constants/ActionTypes"
import Functions from '../../../../components/functions'

export default class Tablelist extends React.Component {

    state = {
        visible: false,                     // 控制合并报关单窗口显示
        visible1: false,                    // 控制导入报关单窗口显示
        visible2: false,                    // 控制获取FBA物流计划单窗口显示
        visible3: false,                    // 导入源数据窗口显示
        confirmLoading: false,              // 确定合并报关单时的loading
        ids: null,                          // 合并报关单的请求参数
        generatedArray: [],
        unGeneratedArray: [],
        selectedRowKeys: [],
        clrowSelection1: [],
        clrowSelection2: [],
        rowSelectedKeys: [],
        fbaOreder: {},
        fbaLoading: true,
        isCancel: false,
        isCancel1: false,
    }

    getFbaId = (params, id, selectedRowKeys) => {
        this.setState({
            [params]: id,
            [selectedRowKeys]: id,
        })
    }
    // 导入报关单号配置
    uploadConfig = {
        downloadUrl: `http://erp.youkeshu.com/download/logtic/decration.xlsx`,   // 模板下载地址
        uploadUrl: types.IMPORT_FILE_API,  // 文件导入网关接口
        uploadCheckUrl: types.IMPORT_RESOURCE_API,  // 文件校验接口
        confirmUrl: types.IMPORT_CONFIRM_API, // 文件数据入库接口
        params: {
            uploadType: 2,  // 导入接口类型 2 为报关单号源数据导入， 1 为 FBA海外仓数据
            stepInfo: ["数据准备", "数据验证", "导入结果"],
        },         // 下载模板的请求参数
        onStepChange: () => {
            this.props.customsListFetch()
        }   // 文件导入操作完成以后的回调函数
    }
    // 导入源数据配置
    exportConfig = {
        downloadUrl: `http://erp.youkeshu.com/download/logtic/overseas.xlsx`,   // 模板下载地址
        uploadUrl: types.IMPORT_FILE_API,  // 文件导入网关接口
        uploadCheckUrl: types.IMPORT_RESOURCE_API,  // 文件校验接口
        confirmUrl: types.IMPORT_CONFIRM_API, // 文件数据入库接口
        params: {
            uploadType: 1,  // 导入接口类型 2 为源数据导入， 1 为 FBA海外仓数据
            stepInfo: ["数据准备", "数据验证", "导入结果"],
        },         // 下载模板的请求参数
        onStepChange: () => {
            this.props.customsListFetch()
        }
    }

    columns = [
        {
            title: '合同号',
            dataIndex: 'contractNumber',
            render: (text, record) => text,
        }, {
            title: '申报主体',
            dataIndex: 'campany',
            render: text => {
                return <p title={text.fullName}>{text.shortName}</p>
            },
        }, {
            title: '物流信息',
            dataIndex: 'logisticsInfo',
            width: 200,
            // sorter: (a, b) => a.age - b.age,
            render: (text, record, index) => {
                const planNumber = (record.planNumber).split(',');
                return (
                    <div className="logistics_info text-left">
                        <div className="overflow-hidden">
                            <span className="name pull-left">计划单号：</span>
                            <div className="pull-left">
                                {planNumber.map((v, i) => {
                                    return <p key={i}>{v}</p>
                                })}
                            </div>
                        </div>
                        <div>
                            <span className="name">物流状态：</span>
                            <span >{record.logisticsState}</span>
                        </div>
                        <div>
                            <span className="name">目的国：</span>
                            <span >{record.destCountry}</span>
                        </div>
                    </div>
                )
            }
        }, {
            title: '流程信息',
            dataIndex: 'processInfo',
            width: 352,
            filters: [{
                text: '按制单时间排序',
                value: 'createOrderTime',
            }, {
                text: '按审核时间排序',
                value: 'auditTime',
            }],
            filteredValue:["createOrderTime"],
            defaultSortOrder: 'descend',
            filterMultiple: false,
            // onFilter: (value, record) => {
            //     console.log("");
            // },
            sorter: true,
            render: (text, record, index) => {
                return (
                    <div className="overflow-hidden text-left process-info">
                        <div className="pull-left margin-ss-right" style={{width: 150}}>
                            <div>
                                <span className="name">创建人：</span>
                                <span >{record.creator}</span>
                                {/*<span >zhangzhangzhang</span>*/}
                            </div>
                            <div>
                                <span className="name">制单人：</span>
                                <span >{record.singles}</span>
                            </div>
                            <div>
                                <span className="name">审核人：</span>
                                <span >{record.audits}</span>
                            </div>
                        </div>
                        <div className="pull-left">
                            <div>
                                <span className="name1">创建时间：</span>
                                <span >{timestampFromat(record.createTime,2)}</span>
                            </div>
                            <div>
                                <span className="name1">制单时间：</span>
                                <span >{timestampFromat(record.createOrderTime,2)}</span>
                            </div>
                            <div>
                                <span className="name1">审核时间：</span>
                                <span >{timestampFromat(record.auditTime,2)}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        }, {
            title: '报关单号',
            dataIndex: 'customsNumber',
            maxWidth: 178,
            render: (text, record, index) => {
                const element = (record.auditStatus === "待申报" || record.auditStatus === "已申报")
                    ?
                    <EditTableCell
                        {...this.props}
                        value={text}
                        fkey="002-000001-000001-008"
                        onChange={this.onCellChange(record.id, 'customsNumber')}
                    /> :
                    <span>{text}</span>

                return element;
            }
        }, {
            title: '状态',
            dataIndex: 'auditStatus',
            width: 60,
            render: (text, record, index) => {
                if(record.auditStatus === "待修改"){
                    return <span style={{color: "red"}}>{text}</span>
                }else{
                    return text
                }
            }
        }, {
            title: '总金额(USD)',
            dataIndex: 'sum',
            width: 120,
            sorter: true,
            render: (text, record, index) => text,
        },
        {
            title: '操作',
            dataIndex: 'opreation',
            width: 100,
            render: (text, record) => {
                const c_url = `/lgtconfig/declaration/order/create/?id=${record.id}`;
                const v_url = `/lgtconfig/declaration/order/view/?id=${record.id}`;
                const check_url = `/lgtconfig/declaration/check_customs_info/?id=${record.id}&depotDataType=${record.depotDataType}`;
                // const planNumber = (record.planNumber).split(',');
                if ((record.auditStatus === "待制单" || record.auditStatus === "待修改") && record.is_merge === false) {
                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <Functions {...this.props} functionkey="002-000001-000001-001">
                                    <Link to={check_url}>查看报关资料</Link>
                                </Functions>
                            </Menu.Item>
                            <Menu.Item>
                                <Functions {...this.props} functionkey="002-000001-000001-004">
                                    <span
                                        className="lgt-dlt-common_btn"
                                        onClick={()=>this.tableBtnAction(record.id, 3)}
                                    >
                                        删除
                                    </span>
                                </Functions>
                            </Menu.Item>
                        </Menu>);
                    return (
                        <div>
                            <Functions {...this.props} functionkey="002-000001-000001-011">
                                <span className="margin-ss-right"><Link to={c_url}>制单</Link></span>
                                {/*<span className="margin-ss-left margin-ss-right v-line">|</span>*/}
                            </Functions>
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link">
                                    更多
                                    <Icon type="down"/>
                                </a>
                            </Dropdown>
                        </div>
                    )
                }
                if ((record.auditStatus === "待制单" || record.auditStatus === "待修改") && record.is_merge === true) {
                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <Functions {...this.props} functionkey="002-000001-000001-001">
                                    <Link to={check_url}>查看报关资料</Link>
                                </Functions>
                            </Menu.Item>
                            <Menu.Item>
                                <Functions {...this.props} functionkey="002-000001-000001-003">
                                    <a id={'tb-orderclick'}
                                       onClick={()=>this.tableBtnAction(record.id, 1)}
                                    >
                                        撤销合并报关单
                                    </a>
                                </Functions>
                            </Menu.Item>
                            <Menu.Item>
                                <Functions {...this.props} functionkey="002-000001-000001-004">
                                    <span
                                        className="lgt-dlt-common_btn display-block"
                                        onClick={()=>this.tableBtnAction(record.id, 3)}
                                    >
                                        删除
                                    </span>
                                </Functions>
                            </Menu.Item>
                        </Menu>);
                    return (
                        <div>
                            <Functions {...this.props} functionkey="002-000001-000001-011">
                                <span className="margin-ss-right"><Link to={c_url}>制单</Link></span>
                            </Functions>
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link">
                                    更多
                                    <Icon type="down"/>
                                </a>
                            </Dropdown>
                        </div>
                    )
                }
                if (record.auditStatus === "待审核") {
                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <Functions {...this.props} functionkey="002-000001-000001-012">
                                    <Link to={v_url}>查看制单数据</Link>
                                </Functions>
                            </Menu.Item>
                            <Menu.Item>
                                <Functions {...this.props} functionkey="002-000001-000001-001">
                                    <Link to={check_url}>查看报关资料</Link>
                                </Functions>
                            </Menu.Item>
                        </Menu>);
                    return (
                        <div>
                            <Functions {...this.props} functionkey="002-000001-000001-006">
                                <span
                                    className="lgt-dlt-common_btn margin-ss-right"
                                    onClick={()=>this.aduitBtnAction(record.id)}
                                >审核</span>
                            </Functions>
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link">
                                    更多
                                    <Icon type="down"/>
                                </a>
                            </Dropdown>
                        </div>
                    )
                }
                if (record.auditStatus === "待申报") {
                    return (
                        <div>
                            <Functions {...this.props} functionkey="002-000001-000001-001">
                                <span className="margin-ss-right"><Link to={check_url}>查看</Link></span>
                            </Functions>
                            <Functions {...this.props} functionkey="002-000001-000001-002">
                                <span className="lgt-dlt-common_btn"
                                      onClick={()=>this.tableBtnAction(record.id, 2)}
                                >
                                    驳回
                                </span>
                            </Functions>
                        </div>
                    )
                }
                if (record.auditStatus === "已申报") {
                    return (
                        <div>
                            <Functions {...this.props} functionkey="002-000001-000001-001">
                                <span className="margin-ss-right"><Link to={check_url}>查看</Link></span>
                            </Functions>
                            <Functions {...this.props} functionkey="002-000001-000001-005">
                                <span
                                    className="lgt-dlt-common_btn"
                                    onClick={()=>this.tableBtnAction(record.id, 4)}
                                >归档
                                </span>
                            </Functions>
                        </div>
                    )
                }
                if (record.auditStatus === "归档") {
                    return (
                        <Functions {...this.props} functionkey="002-000001-000001-001">
                            <Link to={check_url}>查看</Link>
                        </Functions>
                    )
                }
            }
        }]

    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: toggleModal 控制模态框显示隐藏
     *@param: <> 无参数
     **/
    toggleModal = (setStateObj, type) => {
        this.setState(setStateObj);
        if(!this.state.visible2){
            this.setState({
                clrowSelection2: this.state.rowSelectedKeys
            })
        }
        if (type === "mergeDeclaration") {  // 合并报关单
            const {selectedRowKeys} = this.state;
            if (selectedRowKeys) {
                if (selectedRowKeys.length < 2) {
                    this.setState({visible: false});
                    message.error("合并项不能少于2项！")
                }
            } else {
                this.setState({visible: false});
                message.error("请先选择要合并的报关单！")
            }
        }
        if(type === "close-x"){  // 文件导入关闭模态窗清除上传状态
            this.setState({
                isCancel: true
            })
        }
    }
    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: mergerDeclaration 合并报关单
     *@param: <ids>  arr  合同单号
     **/
    mergeDeclaration = () => {
        const {ids,selectedRowKeys} = this.state;
        // console.log(selectedRowKeys)
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1500);

        post(types.COMBINEORDER_API, {"ids": selectedRowKeys}).then(data => {
            if (data && data.state === "000001") {
                message.success(data.msg);
                this.setState({
                    selectedRowKeys: []
                });
                this.props.customsListFetch()
            }
        })
    }
    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: importDeclaration 展示导入报关单窗口
     *@param: <>  无
     **/
    importDeclaration = () => {
        this.setState({
            isCancel: true,
        });
    }
    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: getState 获取子组件state
     *@param: <obj> object
     **/
    getState = (obj) => {
        this.setState(obj)
    }
    getFbaList = () =>{
        this.setState({
            fbaOrderLoading: false
        })
        post(types.FBA_ORDERS_API, {}).then(data => {
            if(data && data.state === "000001"){
                this.setState({
                    fbaOreder: data.data,
                    fbaLoading: false,
                });
                const rowSelecteKeys = data.data.unGeneratedArray.map(v=>{
                    return v.key;
                })
                this.setState({
                    clrowSelection2: rowSelecteKeys,
                    rowSelectedKeys: rowSelecteKeys,
                    generatedArray: rowSelecteKeys,
                })
            }
        })
    }
    /**
     *作者: pzt
     *时间: 2018/6/9
     *描述: getFbaPlan 获取FBA物流计划单
     *@param: <>
     **/
    getFbaPlan = () => {
        const cldata = {}
        cldata.unGeneratedArray = this.state.generatedArray;
        cldata.generatedArray = this.state.unGeneratedArray;
        if (cldata.unGeneratedArray.length > 0 || cldata.generatedArray.length > 0) {
            post(types.CREATEORDERS_API, cldata).then(data => {
                if(data && data.state==="000001"){
                    message.success(data.msg);
                    this.getFbaList()
                    this.props.customsListFetch();
                    this.setState({
                        visible2: false,
                        clrowSelection1: [],
                    });
                }
            })
        }else{
            message.warning("请选择要生成的报关单数据！")
        }
    }

    // 表格排序
    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    }

    /**
     *作者: pzt
     *时间: 2018/6/11
     *描述: 编辑表格单元格内容
     *@param: <key> Number  数据第key项
     *@param: <dataIndex> dataIndex  字段名
     **/
    onCellChange = (id, dataIndex) => {

        return (value) => {
            // const {data} = this.props.decalarationListModel;
            // const target = data.find(item => item.id === id); // find查询到第一个符合条件的结果会返回一个对象，而filter方法会将所有符合条件的结果作为一个数组返回
            if(value && value.length === 18 && !isNaN(value)){
                const params = {};
                params["id"] = id;
                params["orderNumber"] = value;
                post(types.EDITNUMBER_API, params).then(data => {
                    if (data && data.state === "000001") {
                        message.success(data.msg);
                        // return (value) => {
                        //     const dataSource = [...this.state.dataSource];
                        //     const target = dataSource.find(item => item.id === id);
                        //     if (target) {
                        //         target[name] = value;
                        //         this.setState({ dataSource });
                        //     }
                        // };
                        this.props.customsListFetch();
                    }
                })
            }else{
                message.error(`请输入长度为18位的纯数字！`);
                return false;
            }

        };
    }

    /**
     * 作者: pzt
     * 描述: 表格按钮相关操作
     * 时间: 2018/6/28 10:27
     * @params <id> 报关ID
     * @params <type> 1.撤销报关单 2.驳回 3.删除报关单 4.归档
     **/
    tableBtnAction = (id, type) => {
        let title, content, params={};
        params['id'] = id;
        params['type'] = type;
        const that = this;
        switch (type){
            case 1:
                title = "确定要撤销合并报关单？";
                content = "（撤销后将恢复到上一次合并操作前的状态）";
                break;
            case 2:
                title = "确定要将该单驳回到待修改状态吗？";
                content = null;
                break;
            case 3:
                title = "确定要删除吗？";
                content = null;
                break;
            case 4:
                title = "是否要将该报关单归档？";
                content = "（归档后，数据将无法修改）";
                break;
            default:
                break;
        }
        confirm({
            title: title,
            content: content,
            onOk () {
                post(types.TABLELIST_DOACTION_API, params).then(data=>{
                    if(data && data.state === "000001"){
                        message.success(data.msg);
                        that.props.customsListFetch()
                    }else{
                        message.error("服务器响应失败！");
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    /**
     * 作者: pzt
     * 描述: 报关单审核操作
     * 时间: 2018/6/28 18:02
     * @params <number> id 报关单id
     * @params <number> type 审核类型 1.通过 2.不通过
     **/
    aduitBtnAction = (id)=>{
        const { getFieldDecorator } = this.props.form;
        const content = (
            <FormItem>
                {getFieldDecorator('content', {
                    rules: [{ required: false, message: '' }],
                })(
                    <textarea style={{'width': '100%'}}></textarea>
                )}
            </FormItem>
        );
        Modal.confirm({
            className: "audit-confirm",
            title: '审核意见',
            content: content,
            okText: '审核通过',
            cancelText: '审核不通过',
            maskClosable: true,
            onOk: ()=>{
                this.aduitConfirm(id, 1)
            },
            onCancel: (e)=>{
                if(typeof e === "object" && e.triggerCancel === true){
                    return
                }
                if(typeof e === "function"){
                    let closeX = document.querySelector(".audit-confirm .ant-modal-content .ant-modal-close");
                    this.aduitConfirm(id, 2);
                    closeX.click();
                }
            }
        });
    }
    /**
     * 作者: pzt
     * 描述: 审核确认操作
     * 时间: 2018/6/29 15:35
     * @params <id> 报关单id
     * @params <type> 审核类型 1通过 2不通过
     **/
    aduitConfirm = (id,type)=>{
        const content = this.props.form.getFieldValue("content");
        const params = {};
        params["id"] = id;
        params["type"] = type;
        content ? params["content"] = content : null;
        post(types.TABLELIST_AUDIT_API, params).then(data=>{
            if(data && data.state === "000001") {
                message.success(data.msg);
                this.props.customsListFetch();
            }
        })
    }

    render() {
        const {
            visible,
            visible1,
            visible2,
            visible3,
            confirmLoading,
            selectedRowKeys,
            clrowSelection1,
            clrowSelection2,
            fbaOreder,
            fbaLoading,
            isCancel,
            isCancel1,
        } = this.state;
        // 新建报关单 start
        const popoverContent = (
            <div className="lgt-dlt-list_popoverContent">
                <p onClick={() => this.toggleModal({
                    visible2: true,
                })}>获取FBA物流计划单</p>
                <p onClick={() => this.toggleModal({isCancel1: true})}>导入海外仓源数据</p>
            </div>
        );
        // 新建报关单 end

        // 表格数据列表相关 start
        const columns = this.columns;
        let {data, loading, total} = this.props.decalarationListModel;
        const paginationHandle = this.props.paginationHandle;
        const {pageNumber, pageSize} = this.props.paginationData;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys)
                this.setState({
                    selectedRowKeys: selectedRowKeys
                })
                // const arr = [];
                // if (selectedRows.length > 0) {
                //     selectedRows.map(v => {
                //         arr.push(v.id)
                //     })
                //     this.setState({
                //         ids: arr,
                //         selectedRowKeys,
                //     })
                // }
            },
            getCheckboxProps: record => ({
                disabled: (() => { // 只有待修改及待制单状态时才能合并报关单
                    if (record.auditStatus === "待修改" || record.auditStatus === "待制单") {
                        return false
                    } else {
                        return true
                    }
                })(), // Column configuration not to be checked
                name: record.name,
            }),
        };

        // 表格数据列表相关 end
        return (
            <div className="padding-sm lgt-dlt-list_tablelist">
                <div className="overflow-hidden">
                    <div className="pull-left">
                        <Functions {...this.props} functionkey="002-000001-000001-007">
                            <Button onClick={() => this.toggleModal(
                                {
                                    visible: true,
                                },
                                "mergeDeclaration"
                            )}>
                                合并报关单
                            </Button>
                        </Functions>
                    </div>
                    <div className="pull-right">
                        <Functions {...this.props} functionkey={"002-000001-000001-009"}>
                            <Button
                                className="margin-md-left"
                                onClick={() => this.toggleModal({isCancel: true})}>
                                导入报关单号
                            </Button>
                        </Functions>
                        <Functions {...this.props} functionkey={"002-000001-000001-010"}>
                            <Popover
                                placement="bottomRight"
                                content={popoverContent}
                                trigger="hover"
                                className="lgt-dlt-list_popover"
                            >
                                <Button className={'margin-md-left'}>新建报关单<Icon type="down" /></Button>
                            </Popover>
                        </Functions>
                    </div>
                </div>
                <div className="lgt-dlt-list_table margin-ss-top">
                    <Spin spinning={loading} delay={500} tip="loading...">
                        <Table
                            columns={columns}
                            dataSource={data}
                            onChange={this.props.sorter}
                            pagination={false}
                            rowSelection={rowSelection}
                            bordered={true}
                            size="small"
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={paginationHandle}
                        total={total}
                        pageSize={pageSize}
                        onChange={paginationHandle}/>
                </div>
                <div className="lgt-dlt-list_modals">
                    <Modal title="合并报关单"
                           visible={visible}
                           onOk={this.mergeDeclaration}
                           confirmLoading={confirmLoading}
                           onCancel={() => this.toggleModal({visible: false})}
                    >
                        <p className="text-center merge_dec_text">
                            <Icon type="info-circle"/>
                            <span className="margin-ss-left">确定要合并勾选的数据吗？</span>
                        </p>
                    </Modal>

                    <ExportModal
                        title="导入报关单号"
                        uploadConfig={this.uploadConfig}
                        onCancel = {() => this.setState({isCancel: false})}
                        visible={isCancel}
                    />
                    <Modal title="获取FBA物流计划单"
                           visible={visible2}
                           onOk={this.getFbaPlan}
                           okText="生成报关单"
                           confirmLoading={confirmLoading}
                           onCancel={() => this.toggleModal({
                               visible2: false,
                           })}
                           width={780}
                    >
                        <FbaLogisticsPlan
                            visible={visible2}
                            getFbaId={this.getFbaId}
                            clrowSelection1={clrowSelection1}
                            clrowSelection2={clrowSelection2}
                            getFbaList = {this.getFbaList}
                            fbaLoading = {fbaLoading}
                            fbaOrder = {fbaOreder}
                        />
                    </Modal>

                    <ExportModal
                        title="导入源数据"
                        uploadConfig={this.exportConfig}
                        onCancel = {() => this.setState({isCancel1: false})}
                        visible={isCancel1}
                    />
                </div>
            </div>
        )
    }
}
