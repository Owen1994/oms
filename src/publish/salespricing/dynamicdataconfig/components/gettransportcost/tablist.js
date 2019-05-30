import React from 'react';
import {
    Table,
    Button,
    Icon,
    Pagination,
    Menu,
    Dropdown,
} from 'antd';
import EditModal from './editmodal';
import PopConfirm from "../../../../../common/components/confirm";
import ExportAndImport from '../exportandimport'
import {timestampFromat, downloadUrl} from "../../../../../util/baseTool";
import {message} from "antd/lib/index";
import {DEL_TRANSPORT_COST, EDIT_TRANSPORT_EXPENSE} from "../../constants/Api";
import {fetchPost} from "../../../../../util/fetch";
import Functions from '../../../../../components/functions'

export default class Tablist extends React.Component{
    state={
        editModalVisible: false,
        airTransportData: [],
        railTransportData: [],
        seaTransportData: [],
    }
    columns = [{
        title: '起运港',
        dataIndex: 'shipmentPortName',
        key: 'shipmentPortName',
    }, {
        title: '目的仓',
        dataIndex: 'depotName',
        key: 'depotName',
    }, {
        title: '海运（RMB/CBM)',
        dataIndex: 'seaTransport',
        key: 'seaTransport',
        render: text=>{
            let elemItems;
            if(text && text.length > 0){
                elemItems = text.map((item, index) => <p key={index}><span className={'span-7'}>{item.fieldDesc} :</span> {item.expense ? item.expense : '--'}{item.unit ? `(${item.unit})` : null}</p>)
            }
            return <div className={'text-left'}>{elemItems}</div>
        }
    }, {
        title: '空运(RMB/KG)',
        dataIndex: 'airTransport',
        key: 'airTransport',
        render: text=>{
            let elemItems;
            if(text && text.length > 0){
                elemItems = text.map((item, index) => <p key={index}><span className={'span-7'}>{item.fieldDesc} :</span> {item.expense ? item.expense : '--'}</p>)
            }
            return <div className={'text-left'}>{elemItems}</div>
        }
    }, {
        title: '铁运',
        dataIndex: 'railTransport',
        key: 'railTransport',
        render: text=>{
            let elemItems;
            if(text && text.length > 0){
                elemItems = text.map((item, index) => <p key={index}>
                    <span className={'span-7'}>{item.fieldDesc} :</span> {item.expense ? item.expense : '--'}{item.unit ? `(${item.unit})` : null}</p>)
            }
            return <div className={'text-left'}>{elemItems}</div>
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
                        <Functions {...this.props} functionkey={'008-000005-000002-020'}>
                            <span onClick={() => PopConfirm('是否确认要删除？', '', () => this.handleConfirmSingle(record.transportId))}>
                                删除
                            </span>
                        </Functions>
                    </Menu.Item>
                    <Menu.Item>
                        <Functions {...this.props} functionkey={'008-000005-000002-019'}>
                            <span onClick={() => this.props.showLogModal(record.transportId)}>日志</span>
                        </Functions>
                    </Menu.Item>
                </Menu>);
            return(
                <div className="table-list_btns">
                    <Functions {...this.props} functionkey={'008-000005-000002-018'}>
                        <span className="margin-ss-right">
                            <span onClick={()=>this.showModal(record)}>编辑</span>
                        </span>
                    </Functions>
                    {/*<Functions {...this.props} functionkey={['008-000005-000002-019','008-000005-000002-020']}>*/}
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
            airTransportData: record.airTransport,
            railTransportData: record.railTransport,
            seaTransportData: record.seaTransport,
        });
        setFieldsValue({
            'params[transportId]': record.transportId,
            'editData[shipmentPortName]': record.shipmentPortName,
            'editData[depotName]': record.depotName,
        })
    };
    editOk = ()=>{
        const { validateFields } = this.props.form;
        validateFields((errors, values)=>{
            if(!errors){
                const params = {};
                params.data = values.params;
                fetchPost(EDIT_TRANSPORT_EXPENSE, params, 2).then(res=>{
                    this.setState({
                        editModalVisible: false,
                        airTransportData: [],
                        railTransportData: [],
                        seaTransportData: [],
                    });
                    if(res && res.state === "000001"){
                        message.success(res.msg);
                        this.props.getTransportCostList()
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
        const params = {data: {transportId: item}};
        fetchPost(DEL_TRANSPORT_COST, params, 1).then(result => {
            if(result.state === '000001'){
                this.props.getTransportCostList()
            }
        })
    }

    render(){
        const {
            paginationHandle,
            total,
            pageNumber,
            pageData,
            transportCostData,
        } = this.props;

        return (
            <div className={"pricing-system-pricing_result"}>
                <Functions {...this.props} functionkey={'008-000005-000002-017'}>
                    <div className={"text-right margin-ss-bottom"}>
                        <ExportAndImport
                            importType = {2}
                            refreshList = {this.props.getTransportCostList}
                            downLoadUrl = {downloadUrl('/download/publish/transport_cost.xlsx')}
                        />
                    </div>
                </Functions>
                <div>
                    <Table
                        columns={this.columns}
                        dataSource={transportCostData}
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
                                airTransportData: [],
                                railTransportData: [],
                                seaTransportData: [],
                            })
                        }
                        onOk = {this.editOk}
                        airTransportData={this.state.airTransportData}
                        railTransportData={this.state.railTransportData}
                        seaTransportData={this.state.seaTransportData}
                    />
                </div>
            </div>
        )
    }
}