import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel from '../../../components/modalmodel'
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    Spin,
    message,
    Divider,
    Modal,
    Menu,
    Icon,
    Dropdown,
} from 'antd'
import '../css/css.css'
import {Link} from 'react-router-dom';

const FormItem = Form.Item
const Option = Select.Option
import {timestampFromat, datasaddkey, functions} from '../../../util/baseTool';

import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import {levelOptions} from "../../../util/options";
import Functions from "../../../components/functions"

class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    columns = [
        {
            title: '销售账号',
            dataIndex: 'shopAccount',
        },
        {
            title: '币种',
            dataIndex: 'currency',
        },
        {
            title: '预估索赔金额',
            dataIndex: 'estimatedAmount',
        },
        {
            title: 'ASIN数量',
            dataIndex: 'asinCount',
        },
        {
            title: '分析时间',
            dataIndex: 'createTimeStr',
        }, {
            title: '操作',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                var urledit = `/application/claimreport/claimreportdetail/?reimReportId=${record.reimReportId}`
                return (
                    <Functions {...this.props} functionkey={'006-000001-000001-002'}>
                        {record.isReportDetal == 1 ? <Link to={urledit}>明细</Link> : null}
                    </Functions>
                )
            }
        }
    ];


    componentDidMount() {

    }

    /**
     *作者: 唐勇
     *功能描述: 分页功能
     *参数说明:1.page 当前页码 2.pageSize：多少条数据
     *时间: 2018/6/26 9:00
     */
    Paginatihandle = (page, pageSize) => {
        const lstShopAccount = this.props.Infos.shopname || [];
        var newobj = {
            pageNumber: page,
            pageData: pageSize,
            lstShopAccount: lstShopAccount
        }
        this
            .props
            .fetchPosts({
                key: 'data',
                value: newobj
            });
    }

    render() {
        const {data} = this.props.claimreportmodule
        const newdata = datasaddkey(data)
        const columns = this.columns;
        return (
            <div className="newCluenk">

                <div className="content">
                    <Spin spinning={this.props.claimreportmodule.loading} delay={500} tip="Loading...">
                        <Table key={'data'} columns={columns} dataSource={newdata} bordered
                               pagination={false}/>
                    </Spin>

                    <Pagination
                        showTotal={total => `共 ${total} 条`} showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger showQuickJumper={{goButton: true}}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle}/>

                </div>
            </div>
        );
    }
}

export default Tablelist