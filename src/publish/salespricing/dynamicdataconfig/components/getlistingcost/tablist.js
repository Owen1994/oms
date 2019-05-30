import React from 'react';
import {
    Table,
    Button,
    Pagination,
    Menu,
    Dropdown,
    Icon,
    message
} from 'antd';
import PopConfirm from "../../../../../common/components/confirm";
import EditModal from './editmodal'
import {timestampFromat} from "../../../../../util/baseTool";
import {DEL_LISTING_COST, EDIT_LISTING_EXPENSE,GET_SITE,ADD_LISTING_EXPENSE} from "../../constants/Api";
import {fetchPost} from "../../../../../util/fetch";
import Functions from '../../../../../components/functions'

export default class Tablist extends React.Component{
    state = {
        editModalVisible: false,
        listingExpenseData: [],
        editAbled: true,
        platForm: [{key: null, label: null}]
    }
    formItemLayout = {
        labelCol: {
            sm: { span: 6 },
        },
        wrapperCol: {
            sm: { span: 16 },
        },
    };
    columns = [{
        title: '平台',
        dataIndex: 'platformName',
        key: 'platformName',
    }, {
        title: 'listing刊登费（USD）',
        dataIndex: 'listingExpense',
        key: 'listingExpense',
        render: text=>{
            let elemItems;
            if(text && text.length > 0){
                elemItems = text.map((item, index)=> <p key={index}><span className={'span-4'}>{item.key} :</span> {item.expense ? item.expense : '--'}</p>)
            }
            return <div className={'text-left'}>{elemItems}</div>
        }
    }, {
        title: 'listing刊登费率（%）',
        dataIndex: 'listingExpenseRate',
        key: 'listingExpenseRate',
        render: (text, record)=>{
            let elemItems;
            const listingExpense = record.listingExpense;
            if(listingExpense && listingExpense.length > 0){
                elemItems = listingExpense.map((item, index)=> <p key={index}><span className={'span-4'}>{item.key} :</span> {item.expenseRate ? item.expenseRate : '--'}</p>)
            }
            return <div className={'text-left'}>{elemItems}</div>
        }
    }, {
        title: '平台费率（%）',
        dataIndex: 'platformExpenseRate',
        key: 'platformExpenseRate',
        render: text => text ? text : '--'
    }, {
        title: 'Paypal费率（%）',
        dataIndex: 'paypalRate',
        key: 'paypalRate',
        render: text => text ? text : '--'
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
                        <Functions {...this.props} functionkey={'008-000005-000002-015'}>
                            <span onClick={() => PopConfirm('是否确认要删除？', '', () => this.handleConfirmSingle(record.listingId))}>
                                删除
                            </span>
                        </Functions>
                    </Menu.Item>
                    <Menu.Item>
                        <Functions {...this.props} functionkey={'008-000005-000002-014'}>
                            <span onClick={() => this.props.showLogModal(record.listingId)}>日志</span>
                        </Functions>
                    </Menu.Item>
                </Menu>);
            return(
                <div className="table-list_btns">
                    <Functions {...this.props} functionkey={'008-000005-000002-013'}>
                        <span className="margin-ss-right">
                            <span onClick={()=>this.showModal(record)}>编辑</span>
                        </span>
                    </Functions>
                    {/*<Functions {...this.props} functionkey={['008-000005-000002-014','008-000005-000002-015']}>*/}
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
        if(record){
            this.setState({
                editModalVisible: true,
                listingExpenseData: record.listingExpense,
                editAbled: true,
                platForm: [{key: record.platformName, label: record.platformName}]
            });
            setFieldsValue({
                'params[listingId]': record.listingId,
                'editData[platformCode]': record.platformName,
                'params[platformExpenseRate]': record.platformExpenseRate,
                'params[paypalRate]': record.paypalRate,
            })
        }else{
            this.setState({
                editModalVisible: true,
                editAbled: false,
            });
            setFieldsValue({
                'params[listingId]': null,
            })
        }
    };
    editCancel = ()=>{
        this.setState({
            editModalVisible: false,
            listingExpenseData: []
        });
        this.props.form.resetFields([
            'params[listingId]',
            'editData[platformCode]',
            'params[platformExpenseRate]',
            'params[paypalRate]'
        ]);
    }
    editOk = ()=>{
        const { validateFields } = this.props.form;
        validateFields((errors, values)=>{
            if(!errors){
                const params = {};
                let url;
                params.data = values.params;
                if(!values.params.listingId){
                    url = ADD_LISTING_EXPENSE;
                    params.data.platformCode = values.editData.platformCode;
                }else{
                    url = EDIT_LISTING_EXPENSE;
                }
                fetchPost(url, params, 2).then(res=>{
                    this.setState({
                        editModalVisible: false,
                        listingExpenseData: [],
                    });
                    this.props.form.resetFields([
                        'params[listingId]',
                        'editData[platformCode]',
                        'params[platformExpenseRate]',
                        'params[paypalRate]'
                    ]);
                    if(res && res.state === "000001"){
                        message.success(res.msg);
                        this.props.getListingCostList()
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
        const params = {data: {listingId: item}};
        fetchPost(DEL_LISTING_COST, params, 1).then(result => {
            if(result.state === '000001'){
                this.props.getListingCostList()
            }
        })
    }
    /**
     * 描述: 选择平台下拉框获取站点信息
     * 时间: 2018/10/31 16:45
     **/
    getSite = (value)=>{
        fetchPost(GET_SITE, {data: {platformCode: value}}).then(res=>{
            if(res && res.state === "000001"){
                const data = res.data.list;
                const listingExpenseData = data.map(item=>{
                    item.siteCode = item.key;
                    return item
                });
                this.setState({
                    listingExpenseData
                })
            }
        })
    };
    render(){
        const {
            paginationHandle,
            total,
            pageNumber,
            pageData,
            listingCostData,
        } = this.props;
        const {
            editModalVisible,
            platForm,
            editAbled,
            listingExpenseData
        } = this.state;
        return (
            <div className={"pricing-system-pricing_result"}>
                <Functions {...this.props} functionkey={'008-000005-000002-021'}>
                    <div className={"text-right margin-ss-bottom"}>
                        <Button type={"default"} onClick={()=>this.showModal(null)}>新增</Button>
                    </div>
                </Functions>
                <div>
                    <Table
                        columns={this.columns}
                        dataSource={listingCostData}
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
                </div>
                <EditModal
                    {...this.props}
                    visible = {editModalVisible}
                    onCancel = {this.editCancel}
                    onOk = {this.editOk}
                    editAbled = {editAbled}
                    getSite={this.getSite}
                    listingExpenseData = {listingExpenseData}
                    platForm = {platForm}
                />
            </div>
        )
    }
}