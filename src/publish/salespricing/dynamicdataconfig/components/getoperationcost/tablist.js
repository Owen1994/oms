import React from 'react';
import {
    Table,
    Button,
    Icon,
    Pagination,
    Menu,
    Dropdown,
    Row,
    Col,
    Form,
    InputNumber,
    Input,
    Modal,
} from 'antd';
const FormItem = Form.Item;
import PopConfirm from "../../../../../common/components/confirm";
import ExportAndImport from '../exportandimport';
import EditModal from './editmodal';
import {timestampFromat, downloadUrl} from "../../../../../util/baseTool";
import {DEL_OPERATION_COST, EDIT_OPERATION_EXPENSE} from "../../constants/Api";
import {message} from "antd/lib/index";
import {fetchPost} from "../../../../../util/fetch";
import Functions from '../../../../../components/functions'

export default class Tablist extends React.Component{
    state = {
        editModalVisible: false,
    };

    columns = [{
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    }, {
        title: '平台',
        dataIndex: 'platformName',
        key: 'platformName',
    }, {
        title: '退款率（%)',
        dataIndex: 'refundRate',
        key: 'refundRate',
        render: text => {
            if(text === 0){
                return '--';
            }else{
                return text
            }
        }
    }, {
        title: '推广费率（%）',
        dataIndex: 'promotionRate',
        key: 'promotionRate',
        render: text => {
            if(text === 0){
                return '--';
            }else{
                return text
            }
        }
    }, {
        title: '推广费（USD）',
        dataIndex: 'promotionExpense',
        key: 'promotionExpense',
        render: text => {
            if(text === 0){
                return '--';
            }else{
                return text
            }
        }
    }, {
        title: '最新修改人员/最新修改时间',
        dataIndex: 'editInfo',
        key: 'editInfo',
        render: (text,record)=>{
            const modifier = record.modifier;
            const modifiedTime = timestampFromat(record.modifiedTime, 2);
            return <div className={'text-left'}>
                <p><span className={'span-7'}>最新修改人员：</span> {modifier}</p>
                <p><span className={'span-7'}>最新修改时间：</span> {modifiedTime}</p>
            </div>
        }
    }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
            const menu = (
                <Menu>
                    <Menu.Item>
                        <Functions {...this.props} functionkey={'008-000005-000002-010'}>
                            <span onClick={() => PopConfirm('是否确认要删除？', '', () => this.handleConfirmSingle(record.operationId))}>
                                删除
                            </span>
                        </Functions>
                    </Menu.Item>
                    <Menu.Item>
                        <Functions {...this.props} functionkey={'008-000005-000002-009'}>
                            <span onClick={() => this.props.showLogModal(record.operationId)}>日志</span>
                        </Functions>
                    </Menu.Item>
                </Menu>);
            return(
                <div className="table-list_btns">
                    <Functions {...this.props} functionkey={'008-000005-000002-008'}>
                        <span className="margin-ss-right">
                            <span onClick={()=>this.showModal(record)}>编辑</span>
                        </span>
                    </Functions>
                    {/*<Functions {...this.props} functionkey={['008-000005-000002-009','008-000005-000002-010']}>*/}
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                更多
                                <Icon type="down"/>
                            </a>
                        </Dropdown>
                    {/*</Functions>*/}
                </div>)
        },
    }];
    componentWillReceiveProps(nextProps){}
    //页面事件相关
    showModal = (record) => {
        const { setFieldsValue } = this.props.form;
        this.setState({
            editModalVisible: true,
        });
        setFieldsValue({
            'params[operationId]': record.operationId,
            'editData[platformCode]': record.platformName,
            'editData[sku]': record.sku,
            'params[promotionExpense]': record.promotionExpense,
            'params[promotionRate]': record.promotionRate,
            'params[refundRate]': record.refundRate,
        })
    };
    editOk = ()=>{
        const { validateFields } = this.props.form;
        validateFields((errors, values)=>{
            if(!errors){
                const params = {};
                params.data = values.params;
                fetchPost(EDIT_OPERATION_EXPENSE, params, 2).then(res=>{
                    this.setState({
                        editModalVisible: false,
                    });
                    if(res && res.state === "000001"){
                        message.success(res.msg);
                        this.props.getOperationCostList()
                    }
                })
            }
        })
    };
    /**
     * 描述: 删除单条数据
     * 时间: 2018/10/31 16:45
     **/
    handleConfirmSingle = (item) => {
        const params = {data: {operationId: item}};
        fetchPost(DEL_OPERATION_COST, params, 1).then(result => {
            if(result.state === '000001'){
                this.props.getOperationCostList()
            }
        })
    }

    render(){
        const {
            paginationHandle,
            total,
            pageNumber,
            pageData,
            operationCostData,
        } = this.props;
        return (
            <div className={"pricing-system-pricing_result"}>
                <Functions {...this.props} functionkey={'008-000005-000002-007'}>
                    <div className={"text-right margin-ss-bottom"}>
                        <ExportAndImport
                            importType = {1}
                            refreshList = {this.props.getOperationCostList}
                            downLoadUrl = {downloadUrl('/download/publish/operation_cost.xlsx')}
                        />
                    </div>
                </Functions>
                <div>
                    <Table
                        columns={this.columns}
                        dataSource={operationCostData}
                        pagination={false}
                        bordered={true}
                    />
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={paginationHandle}
                        total={total}
                        pageSize={pageData}
                        onChange={paginationHandle}
                    />
                    <EditModal
                        {...this.props}
                        visible = {this.state.editModalVisible}
                        onCancel = {()=>
                            this.setState({
                                editModalVisible: false,
                            })
                        }
                        onOk = {this.editOk}
                    />
                </div>
            </div>
        )
    }
}