import React from 'react';
import {
    Button,
    Menu,
    Dropdown,
    Table,
    Icon,
    Row,
    Col,
    Pagination,
    message,
    Tooltip,
} from 'antd';
import PropTypes from 'prop-types';
import { parseNetErrorToMsg, timestampFromat,popUpImage } from '../../../../util/baseTool';
import { downlodFile } from '../../../../util/fetch';
import { post } from '../../../../util/axios';
import { fetchPost } from '../../../../util/fetch'
import { EXPORT_SPU } from '../constants/Api';
import Functions from '../../../../components/functions';
import { pageSize } from '../../constants';
import { AUDIT_API } from '../../../constants/Api'
import { parseProjectState } from '../../../selector'
import states from "../../../constants/state"


export default class App extends React.Component {
    state = {
        selectedRowKeys: [],
        selectedRows: [],
        
    }
    columns = [{
        title: '产品信息',
        width: 100,
        render:(text,record)=>{
            return (
                <div className="bisection bisection-product">
                    <p><span>SPU：</span>{record.spu}</p>
                    <p><span>SKU：</span>{record.sku}</p>
                    <p><span>名称：</span>{record.chineseName}</p>
                </div>)
        }
    }, {
        title: '产品缩略图',
        width: 80,
        render: (text, record) =>
            <div onClick={()=>popUpImage(record.imageUrl && record.imageUrl.path)} className="npd-img-wrap">
                <img src={record.imageUrl.path} />
            </div>,
    }, {
        title: '项目流信息',
        width: 80,
        dataIndex: 'projectFlowName',
        render: (text, record) => `${text}(${record.projectFlowCode})`
    }, {
        title: '立项编码',
        width: 90,
        dataIndex: 'projectCode'
    },{
        title: '分类',
        width: 100,
        render: (text, record) =>
            <div className="bisection bisection-classify">
                <p><span>一级：</span>{record.classify1}</p>
                <p><span>二级：</span>{record.classify2}</p>
                <p><span>三级：</span>{record.classify3}</p>
            </div>
    }, {
        title: '是否建档',
        dataIndex: 'isNtsRecord',
        width: 60,
        render: (text) => (text===1?'是':'否')
    }, {
        title: 'SKU分辨属性',
        width: 160,
        render: (text, record, index) =>
            <div className="text-left">
                <Row>
                    <Col span={12}>
                        尺寸：{record.dimensionHeight?`${record.dimensionHeight}*${record.dimensionLength}*${record.dimensionWidth}  ${record.dimensionUnitValue}`:null}
                    </Col>
                    <Col span={12}>
                        图案：{record.graphic}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        颜色：{record.color}
                    </Col>
                    <Col span={12}>
                        形状：{record.shape}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        序号：{record.serial}
                    </Col>
                    <Col span={12}>
                        数量：{record.count}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        规格：{record.specification}
                    </Col>
                </Row>
            </div>
        ,
    }, {
        title: '开发时间',
        width: 100,
        render: (text, record) =>
            <div className="text-left">
                <p><span>开发员：</span>{record.developer}</p>
                <p><span>生成时间：</span>{timestampFromat(record.createTime)}</p>
            </div>
    }, {
        title: '确认状态',
        dataIndex: 'type',
        width: 60,
        render: (text) =>states[text]
    }, {
        title: '操作',
        width: 50,
        dataIndex: 'permissions',
        render: (items = [], record) => {
            let menuItems = items.map(item => {
                if (item.code === 'view') {
                    return <a onClick={() => this.props.showModel(record, 'reviewLogModalVisible')}
                            style={{ marginLeft: '10px' }}>
                            查看记录
                                </a>
                } else if (item.code === 'batch_confirm') {
                    return <a onClick={() => this.props.showModel(record, 'reviewModalVisible')}
                            style={{ marginLeft: '10px' }}>
                            确认
                        </a>
                }
            })
            menuItems = menuItems.filter(v=>v)
            if(menuItems.length === 0){
                return null
            }else if(menuItems.length === 1){
                return menuItems[0]
            }
            const menu = (
                <Menu>
                    {menuItems.map((v,k)=>{
                        return <Menu.Item key={k}>
                                    {v}
                                </Menu.Item>
                    })}
                </Menu>);
            return (
                <div>
                    {
                        items.length > 0 ?
                            <Dropdown overlay={menu}>
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

    handleExportSpu = () => {
        var {selectedRows} = this.state

        if(selectedRows.length<1) {
            return message.warning('请选择导出项')
        }
        var ids = Array.from(new Set(selectedRows.map(v=>v.spuId))) 
        post(EXPORT_SPU, { ids }).then(data => {
            if (data.state === '000001') {
                downlodFile(data.data.path)
            } else {
                parseNetErrorToMsg(data)
            }
        })
    }

    handleConfirm = () => {
        if (this.state.selectedRowKeys.length < 1) {
            return message.warning("请选择确认项");
        }
        const params = {
            bizId: this.state.selectedRowKeys,
            auditResult: 1,
            formId: 'skuAuditWorkflow'
        }
        fetchPost(AUDIT_API, params, 1).then(data => {
            if (data.state === '000001') {
                this.props.handleSubmit();
            }
        })
    }
    render() {
        const { data, pageData, pageNumber, handleSubmit } = this.props;
        const total = data ? data.total : 0;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            selectedRows: this.state.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            },
            columnWidth:30,
            // getCheckboxProps: record => ({
            //     disabled: !record.key,
            // }),
        };
        return (
            <div className="white margin-sm-top ">
                <div className='margin-ss-top clear white padding-sm '>
                    <Functions {...this.props} functionkey="005-000002-000005-003">
                        <Button onClick={this.handleConfirm}>
                            批量确认
                        </Button>
                    </Functions>
                    <Functions {...this.props} functionkey="005-000002-000005-001">
                        <Tooltip placement="bottom" title={"勾选基础库未建档的数据，导出对应SPU"}>
                            <Button onClick={this.handleExportSpu} className='pull-right margin-ss-left'>
                                <Icon type="download" /> 导出SPU
                        </Button>
                        </Tooltip>
                    </Functions>
                    <Functions {...this.props} functionkey="005-000002-000005-002">
                        <Tooltip placement="bottom" title={"导入SPU与SKU的对应关系"}>
                            <Button onClick={() => this.props.showModel(null, 'exportVisible')} className='pull-right'>
                                <Icon type="upload" /> 导入SKU
                        </Button>
                        </Tooltip>
                    </Functions>
                </div>
                <div className='padding-notop-10'>
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        rowSelection={rowSelection}
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
}

App.propTypes = {
    data: PropTypes.object.isRequired,
    pageData: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired
}