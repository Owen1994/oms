import React from 'react';
import {
    Menu,
    Dropdown,
    Table,
    Icon,
    Pagination,
    Tooltip
} from 'antd';
import PropTypes from 'prop-types';
import states from "../../../constants/state"
import { LOCK_SUPPLIER, UNLOCK_SUPPLIER } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';
import { timestampFromat } from '../../../../util/baseTool'
import { pageSize } from '../../constants'
import { parseSample, parseCurrency } from '../../../selector'


export default class App extends React.Component {
    state = {
        selectedRowKeys: []
    }
    columns = [{
        title: '序号',
        render: (text, record, index) => index + 1 ,
        width: 35,
    }, {
        title: '单号',
        width: 85,
        render: (text, record) =>
            <div style={{textAlign:"left"}}>
                <p><span>立项单号：</span>{record.projectCode}</p>
                <p><span>样品单号：</span>{record.sampleCode}</p>
            </div>
    }, {
        title: '意向供应商信息',
        width: 80,
        render: (text, record) =>
        <div style={{textAlign:"left"}}>
                <p><span>编码：</span>{record.supplierCode}</p>
                <p><span>名称：</span>{record.supplierName}</p>
            </div>
    }, {
        title: '物流信息',
        width: 100,
        render: (text, record) =>
        <div style={{textAlign:"left"}}>
                <p><span>物流方式：</span>{record.logisticsType}</p>
                <p><span>物流单号：</span>{record.logisticsCode}</p>
            </div>,
    }, {
        title: '收件信息',
        width: 100,
        render: (text, record) =>{
            return (
                <div style={{textAlign:"left"}}>
                    <p><span>收件人：</span>{record.consignee}</p>
                    <p><span>收件地址：</span> <i className="nowarp">{record.shippingAddress}</i> </p>
                </div>
            )
        }
    }, {
        title: '成本信息',
        width: 80,
        render: (text, record) =>
            <div style={{textAlign:"left"}}>
                <p><span>产品价格：</span>{record.unitPrice}</p>
                <p><span>币种：</span>{parseCurrency(record.currency  )}</p>
                <p><span>样品类型：</span>{parseSample(record.sampleType)}</p>
                <p><span>物流费用：</span>{record.logisticsPrice}</p>
                <p><span>样品成本：</span>{record.samplePrice}</p>
            </div>,
    }, 
    // {
    //     title: '销售',
    //     width: 100,
    //     dataIndex: 'salesman',
    //     render: (text, record) =>
    //         <div style={{textAlign:"left"}}>
    //             <p><span>销售员：</span>{text}</p>
    //             <p><span>生成时间：</span>{timestampFromat(record.createTime)}</p>
    //         </div>
    // },
     {
        title: '附件',
        width: 60,
        dataIndex: 'accessories',
        render: (accessories, record) =>
            <div>
                {
                    (accessories&&accessories.length>0)?accessories.map((item, index) =>
                        <p key={index+'_p'}><a href={item.url} key={index} target='_blank'>{item.name}</a></p>
                    ):null
                }
            </div>,
    }, {
        title: '项目流信息',
        width: 60,
        render: (text, record) =>{
            return record.projectflowInfo + "("+ record.projectflowCode +")"       
        }
    }, {
        title: '状态',
        width: 50,
        dataIndex: 'state',
        render: (text, record) =>{
            return states[text]       
        }
    }, {
        title: '添加信息',
        width: 105,
        render: (text, record) =>
            <div style={{textAlign:"left"}}>
                <p><span>添加人：</span>{record.createName}</p>
                <p><span>添加时间：</span>{timestampFromat(record.createTime)}</p>
            </div>
    }, {
        title: '操作',
        width: 45,
        dataIndex: 'permissions',
        render: (items = [], record) => {
            const menuArr = items.map(item => {
                if (item.code === 'audit') {
                    return <a onClick={() => this.props.showModel(record, 'reviewModalVisible')}
                            style={{ marginLeft: '10px' }}
                            key='audit-a'
                            >
                            审核
                                </a>
                } else if (item.code === 'view') {
                    return <Tooltip placement="left" title={"查看当前数据的审核记录"}  key='view-tip'>
                            <a onClick={() => this.props.showModel(record, 'reviewLogModalVisible')}
                                style={{ marginLeft: '10px' }}
                                key='view-a'
                                >
                                审核日志
                                </a>
                        </Tooltip>
                } else if (item.code === 'lock') {
                    return <Tooltip placement="left" title={"锁定要首次购买新品的供应商"}  key='lock-tip'>
                            <a onClick={() => this.lockSupplier(LOCK_SUPPLIER, record.id)}
                                style={{ marginLeft: '10px' }}
                                key='lock-a'
                                >
                                锁定供应商
                                </a>
                        </Tooltip>
                } else if (item.code === 'unlock') {
                    return <Tooltip placement="left" title={"针对已锁定的样品进行解锁操作，可重新锁定其他样品单"} key='unlock-tip'>
                            <a onClick={() => this.lockSupplier(UNLOCK_SUPPLIER, record.id)}
                                style={{ marginLeft: '10px' }}
                                key='unlock-a'
                                >
                                解锁
                                </a>
                        </Tooltip>
                } else if (item.code === 'update') {
                    return <Tooltip placement="left" title={"手动修改当前数据"} key='update-tip'>
                            <a onClick={() => this.props.showModel(record, 'editModalVisible')}
                                style={{ marginLeft: '10px' }}
                                key='update-a'
                                >
                                编辑
                                </a>
                        </Tooltip>
                } else if (item.code === 'submit') {
                    return <Tooltip placement="left" title={"提交前，允许修改当前数据；提交后，当前数据进入待开发经理审核，不允许再次修改"} key='submit-tip'>
                            <a onClick={() => this.props.reviewSubmit(record)}
                                style={{ marginLeft: '10px' }}
                                key='submit-a'
                                >
                                提交
                                </a>
                        </Tooltip>
                }
            })
            const menuItems = menuArr.filter(v=>v)
            if(menuItems.length === 0){
                return null
            }else if(menuItems.length === 1) {
                return menuItems[0]
            }
            const menu = (
                <Menu key='menu'>
                    {menuItems.map((v,k)=>{
                        return  <Menu.Item key={k}>
                                    {v}
                                </Menu.Item>
                    })}
                </Menu>);
            return (
                <div>
                    {
                        items.length > 0 ?
                            <Dropdown overlay={menu} key='Dropdown'>
                                <a className="ant-dropdown-link">
                                    更多
                            <Icon type="down" />
                                </a>
                            </Dropdown>
                            : null
                    }
                </div>
            )
        }
    }
    ];

    render() {
        const { data, pageData, pageNumber, handleSubmit } = this.props;
        const total = data ? data.total : 0;
        // const rowSelection = {
        //     selectedRowKeys: this.state.selectedRowKeys,
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         this.setState({
        //             selectedRowKeys
        //         })
        //     }
        // };
        return (
            <div>
                <div className='margin-sm-top white padding-sm'>
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        // rowSelection={rowSelection}
                        dataSource={data.list}
                        pagination={false}
                    />
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={pageSize}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1} onShowSizeChange={handleSubmit}
                        total={total}
                        pageSize={pageData}
                        onChange={handleSubmit} />
                </div>
            </div>
        )
    }

    lockSupplier = (url, id) => {
        fetchPost(url, { id }, 1).then(result => {
            if (result.state === '000001') {
                this.props.handleSubmit();
            }
        });
    }
}

App.propTypes = {
    data: PropTypes.object.isRequired,
    pageData: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired
}