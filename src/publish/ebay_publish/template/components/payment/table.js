/**
 * 作者: 陈林
 * 描述: 库存价格队列列表组件
 * 时间: 2018/7/30 0030 下午 3:14
 * @param
 **/
import React,{ Component } from 'react'
import { Button,Table,Pagination,Spin,Modal,Icon, Menu, Dropdown, message, } from 'antd';
import Functions from '../../../../../components/functions/index'
import { fetchPost } from '../../../../../util/fetch'
import PopConfirm from '../../../../../common/components/confirm';
import { DELETE_PAYMENT_TEMPLATE } from '../../constants/PaymentApi'
const confirm = Modal.confirm
const { SubMenu } = Menu;

class table extends Component{

    state = {
        visible: false,
        selectedRowKeys:[]
    }

    columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
        }, {
            title: '销售账号',
            dataIndex: 'saleAccount',
        }, {
            title: '站点',
            dataIndex: 'siteCode',
        },{
            title: '添加人员',
            dataIndex: 'creator',
        },{
            title: '添加时间',
            dataIndex: 'createdTime',
        },{
            title: '最新修改人员',
            dataIndex: 'modifier',
        },{
            title: '最新修改时间',
            dataIndex: 'modifiedTime',
        },
        {
            title: '操作',
            dataIndex: 'resultInformation',
            key: 'resultInformation',
            render: (text, record) => (
                <div className="lgt-customs_set_btns">
                    <Functions { ...this.props } functionkey="008-000001-000002-020">
                          <span className="modify" onClick={() => this.props.newToggleModal(record.plsProfileId, 'edit')}>编辑</span>
                    </Functions>
                    <Functions { ...this.props } functionkey="008-000001-000002-019">
                          <span className="margin-ss-left modify"
                              onClick={() => PopConfirm('是否确认要删除？', '', () => this.onConfirm(record))}
                              >删除</span>
                    </Functions>
                </div>
            ),
        }
    ];

    componentWillReceiveProps(nextProps) {
        const datas = nextProps.paymentData;
        const prevDatas = this.props.paymentData;
        if(datas !== prevDatas){
            this.setState({
                selectedRowKeys:[]
            })
        }
    }

    onConfirm = (record) => {
        let plsProfileIdArr = this.state.selectedRowKeys;
        if(record.plsProfileId === null || record.plsProfileId === undefined){
            if(plsProfileIdArr.length === 0){
                message.warning("请先选择数据！");
                return false
            }
        }
        plsProfileIdArr = record.plsProfileId ?  [record.plsProfileId] : plsProfileIdArr;
        fetchPost(DELETE_PAYMENT_TEMPLATE, {plsProfileIdArr:plsProfileIdArr}, 1)
            .then(result => {
                if(result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }

    render(){

        const { loadingState,onSearch, } = this.props;
        const {selectedRowKeys} =  this.state;
        const { data,total } = this.props.paymentData;
        const {pageNumber, pageSize} = this.props.paginationData;
        const dataList = data || [];
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys
                })
            },
        };
        const menu = (
            <Menu>
                <Menu.Item>
                    <span  onClick={() => {
                        PopConfirm('是否确认要删除？', '', () => this.onConfirm({plsProfileId:null}))
                    }}>删除</span>
                </Menu.Item>
            </Menu>
        );
        return(
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="008-000001-000002-017">
                            <Button onClick={() => this.props.newToggleModal()}>
                                <Icon type="plus" />
                                新增
                            </Button>
                        </Functions>
                    </div>
                    <div className="pull-left">
                        <Functions {...this.props} functionkey="008-000001-000002-018">
                            <Dropdown overlay={menu}>
                                <Button>批量操作<Icon type="down" /></Button>
                            </Dropdown>
                        </Functions>
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState.transportLoadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={ dataList }
                            onChange={this.props.sorter}
                            pagination={false}
                            bordered={true}
                            size="small"
                            rowSelection={rowSelection}
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{goButton: true}}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={total}
                            pageSize={pageSize}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        )
    }
}

export default table
