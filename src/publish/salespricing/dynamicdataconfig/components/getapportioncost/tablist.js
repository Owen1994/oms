import React from 'react';
import {
    Table,
    Pagination,
    Dropdown,
    Menu,
    Icon,
    message,
} from 'antd';
import PopConfirm from "../../../../../common/components/confirm";
import ExportAndImport from '../exportandimport';
import EditModal from './editmodal';
import {timestampFromat, downloadUrl} from "../../../../../util/baseTool";
import {fetchPost} from "../../../../../util/fetch";
import {DEL_APPORTION_COST, EDIT_APPORTION_EXPENSE} from "../../constants/Api";
import Functions from '../../../../../components/functions'

export default class Tablist extends React.Component{
    state = {
        editModalVisible: false,
    }
    columns = [{
        title: '平台',
        dataIndex: 'platformName',
        key: 'platformName',
    }, {
        title: '仓库',
        dataIndex: 'depotName',
        key: 'depotName',
    }, {
        title: '销售人工变动单位订单分摊（RMB）',
        dataIndex: 'sellerOrderApportion',
        key: 'sellerOrderApportion',
        render: text => {
            if(text === 0){
                return '--';
            }else{
                return text
            }
        }
    }, {
        title: '销售人工变动单位料本分摊（RMB）',
        dataIndex: 'sellerMaterialsApportion',
        key: 'sellerMaterialsApportion',
        render: text => {
            if(text === 0){
                return '--';
            }else{
                return text
            }
        }
    }, {
        title: '仓储人工变动订单分摊（RMB）',
        dataIndex: 'storekerOrderApportion',
        key: 'storekerOrderApportion',
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
                <p><span className={"span-7"}>最新修改人员：</span> {modifier}</p>
                <p><span className={"span-7"}>最新修改时间：</span> {modifiedTime}</p>
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
                        <Functions {...this.props} functionkey={"008-000005-000002-005"}>
                            <span onClick={() => PopConfirm('是否确认要删除？', '', () => this.handleConfirmSingle(record.apportionId))}>
                                删除
                            </span>
                        </Functions>
                    </Menu.Item>
                    <Menu.Item>
                        <Functions {...this.props} functionkey={"008-000005-000002-004"}>
                            <span onClick={() => this.props.showLogModal(record.apportionId)}>日志</span>
                        </Functions>
                    </Menu.Item>
                </Menu>);
            return(
                <div className="table-list_btns">
                    <Functions {...this.props} functionkey={"008-000005-000002-003"}>
                        <span className="margin-ss-right">
                            <span onClick={()=>this.showModal(record)}>编辑</span>
                        </span>
                    </Functions>
                    {/*<Functions {...this.props} functionkey={["008-000005-000002-004", "008-000005-000002-005"]}>*/}
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
            'editData[apportionId]': record.apportionId,
            'editData[platformCode]': record.platformName,
            'editData[depotName]': record.depotName,
            'editData[sellerOrderApportion]': record.sellerOrderApportion,
            'editData[sellerMaterialsApportion]': record.sellerMaterialsApportion,
            'editData[storekerOrderApportion]': record.storekerOrderApportion,
        })
    };
    /**
     * 描述: 修改单条数据
     * 时间: 2018/10/31 16:45
     **/
    editOk = ()=>{
        const { validateFields } = this.props.form;
        validateFields((errors, values)=>{
            if(!errors){
                const editData = values.editData;
                const params = {};
                params.data = {};
                params.data.apportionId = editData.apportionId;
                params.data.sellerOrderApportion = editData.sellerOrderApportion;
                params.data.sellerMaterialsApportion = editData.sellerMaterialsApportion;
                params.data.storekerOrderApportion = editData.storekerOrderApportion;
                fetchPost(EDIT_APPORTION_EXPENSE, params, 2).then(res=>{
                    this.setState({
                        editModalVisible: false,
                    });
                    if(res && res.state === "000001"){
                        message.success(res.msg);
                        this.props.getApportionCostList()
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
        const params = {data: {apportionId: item}};
        fetchPost(DEL_APPORTION_COST, params, 1).then(result => {
            if(result.state === '000001'){
                this.props.getApportionCostList()
            }
        })
    };
    render(){
        const {
            paginationHandle,
            total,
            pageNumber,
            pageData,
            apportionCostData,
        } = this.props;
        return (
            <div className={"pricing-system-pricing_result"}>
                <Functions {...this.props} functionkey={"008-000005-000002-002"}>
                    <div className={"text-right margin-ss-bottom"}>
                        <ExportAndImport
                            importType = {0}
                            refreshList = {this.props.getApportionCostList}
                            downLoadUrl = {downloadUrl('/download/publish/apportion_cost.xlsx')}
                        />
                    </div>
                </Functions>
                <div>
                    <Table
                        columns={this.columns}
                        dataSource={apportionCostData}
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