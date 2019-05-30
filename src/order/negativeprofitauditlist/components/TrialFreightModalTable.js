/**
 * 作者: 陈林
 * 描述: 表格数据列表组件
 * 时间: 2018/4/18 0018 下午 8:44
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import Modalmodel from '../../../components/modalmodel'
import {Link} from 'react-router-dom'
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    Spin,
    Modal,
    Input,
    message,
    Row,
    Menu,
    Dropdown,
    Icon,
} from 'antd'
import '../../../common/css/css.css'

const FormItem = Form.Item
const Option = Select.Option
import {datasaddkey} from 'util/baseTool';
import {levelOptions} from "../../../util/options";
import {fetchPost} from "util/fetch";


class TrialFreightModalTable extends Component {

    columns = [
        {
            title: '序号',
            dataIndex: 'id',
            width: 15,
        },
        {
            title: '渠道名称',
            dataIndex: 'channelName',
            width: 70,
        },
        {
            title: '渠道编号',
            dataIndex: 'channelCode',
            width: 60,
        },
        {
            title: '包裹类型',
            dataIndex: 'packageType',
            width: 80,
        },
        {
            title: '国家全称',
            dataIndex: 'countryName',
            key: 'platformName',
            width: 60,
        },
        {
            title: '起重/g',
            dataIndex: 'weightStart',
            width: 50,
        },
        {
            title: '渠道折扣',
            dataIndex: 'channelDiscount',
            width: 50,
        },
        {
            title: '重量上限/g',
            dataIndex: 'weightEnd',
            width: 60,
        },
        {
            title: '计算方式',
            dataIndex: 'billType',
            width: 70,
        },
        {
            title: '重量折扣',
            dataIndex: 'weightDiscount',
            width: 60,
        },
        {
            title: '费用',
            width: 120,
            render: (record) => {
                return (
                    <div className="logistics_info text-left">
                        <div className="overflow-hidden">
                            <span className="name ">单价(元/kg)：</span>
                            <span>{record.price}</span>
                        </div>
                        <div>
                            <span className="name">挂号费(元)：</span>
                            <span >{record.regCost}</span>
                        </div>
                        <div>
                            <span className="name">处理操作费(元)：</span>
                            <span >{record.operationCost}</span>
                        </div>
                        <div>
                            <span className="name red">计算运费(元)：</span>
                            <span >{record.freight}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '渠道状态',
            dataIndex: 'channelStatus',
            width: 70,
        },
        {
            title: '操作',
            width: 60,
            render: (text, record) => <a onClick={() => this.handleChannelChange(record)}>修改渠道</a>
        }
    ];

    handleChannelChange = (record) => {
        const { toggleRolloverPackage } = this.props;   // 修改渠道开关
        const listRecord = this.props.record;   // 待审包裹列表传进来的record
        const params = {
            warehouseOrderNumber: listRecord.warehouseOrderNumber,
            warehouseCode: listRecord.warehouseCode,
            channelCode: record.channelCode,    // 试算运费弹窗表格数据中的channelCode
            logisticsChannel: record.channelName,
        }
        toggleRolloverPackage({visible1: true}, params);
    }
  
    render() {
        const data = this.props.dataList || [];
        const onSearch = this.props.onSearch;
        const total = this.props.dataList.total;
        const { 
            pageNumber, 
            pageSize 
        } = this.props.paginationData;
        return (
            <div className="newCluenk margin-ss-top">
                <Spin spinning={this.props.loading} delay={500} tip="Loading...">
                    <Table 
                        columns={this.columns} 
                        dataSource={data.data}
                        bordered
                        pagination={false}
                    />
                </Spin>
                <Pagination showTotal={total => `共 ${total} 条`} 
                            showTitle
                            pageSizeOptions={levelOptions('分页显示条数')}
                            showSizeChanger 
                            showQuickJumper={{goButton: true}}
                            current={pageNumber}
                            defaultCurrent={1} 
                            onShowSizeChange={onSearch}
                            total={total}
                            pageSize={pageSize}
                            onChange={onSearch}
                            hideOnSinglePage
                />
            </div>
        );
    }
}

export default TrialFreightModalTable
