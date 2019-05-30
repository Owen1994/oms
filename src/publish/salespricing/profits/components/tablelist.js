import React from 'react';
import { Table,Button,Icon,Pagination,message } from 'antd';
import { Link } from 'react-router-dom';
import EditTableCell from './editablecell'
import {fetchPost} from "../../../../util/fetch";
import {PRICING_SINGLE,PRICING_RESULT_EXPORT} from "../constants/api";
import {editPricingResult} from "../actions";
import Functions from "../../../../components/functions";

export default class Conditions extends React.Component{
    state = {
        export: false,
        selectedResult: [],
    };
    columns = [{
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    }, {
        title: '中文名称',
        dataIndex: 'cname',
        key: 'cname',
    }, {
        title: '运输方式',
        dataIndex: 'transportName',
        key: 'transportName',
    }, {
        title: '参考成本',
        dataIndex: 'referPrice',
        key: 'referPrice',
        render: text => text ? text : '--'
    }, {
        title: '本地派送费',
        dataIndex: 'deliveryExpense',
        key: 'deliveryExpense',
        render: (text,record) => <EditTableCell
            value={text ? text : '--'}
            type={"number"}
            onChange={this.onCellChange(record.pricingId, 'deliveryExpense')}
        />

    }, {
        title: '利润率(%)',
        dataIndex: 'profitRate',
        key: 'profitRate',
        render: (text,record) => <EditTableCell
            value={text ? text : '--'}
            type={"number"}
            onChange={this.onCellChange(record.pricingId, 'profitRate')}
        />
    }, {
        title: '指导价',
        dataIndex: 'guidePrice',
        key: 'guidePrice',
        render: (text,record) => <EditTableCell
            value={text ? text : '--'}
            type={"number"}
            onChange={this.onCellChange(record.pricingId, 'guidePrice')}
        />
    }, {
        title: '市场数据',
        dataIndex: 'marketData',
        key: 'marketData',
        render: text =>{
            let marketFloorLink = null, hotSellLink = null;
            if(text && text.length > 0){
                marketFloorLink = text.marketUrl.map((item, index)=>{
                    return <Link key={index} to={item} style={{marginLeft: 5}}>链接{index}</Link>
                });
                hotSellLink = text.hotSellUrl.map((item, index)=>{
                    return <Link key={index} to={item} style={{marginLeft: 5}}>链接{index}</Link>
                });
            }
            return (
                <div>
                    <p><span className={'span-7'}>市场最低价：</span><span className={"margin-ss-right"}>{text.marketFloorPrice}</span>{marketFloorLink}</p>
                    <p><span className={'span-7'}>热销最低价：</span><span className={"margin-ss-right"}>{text.hotSellFloorPrice}</span>{hotSellLink}</p>
                </div>
            )
        }
    }, {
        title: '费用占比',
        dataIndex: 'expenseRate',
        key: 'expenseRate',
        render: text =>{
            let eleItem;
            if(text && text.length > 0){
                eleItem = text.map((v,i)=>{
                    return <p key={i}><span className={'span-8'}>{v.key}：</span>{ Number(v.label) ? `${v.label}%` : '--'}</p>
                });
            }
            return <div className={'text-left'}>{eleItem}</div>
        }
    }];
    componentWillReceiveProps(nextProps){
        const prevPricingResult = this.props.pricingResultData;
        const nextPricingResult = nextProps.pricingResultData;
        if(prevPricingResult !== nextPricingResult){
            this.columns = this.columns.map(item=>{
                if(item.dataIndex === "deliveryExpense"){
                    item.title = `本地派送费(${nextPricingResult[0].currencyName})`;
                }
                if(item.dataIndex === "referPrice"){
                    item.title = `参考成本(${nextPricingResult[0].currencyName})`;
                }
                if(item.dataIndex === "guidePrice"){
                    item.title = `指导价(${nextPricingResult[0].currencyName})`;
                }
                return item;
            });
        }
    }

    onCellChange = (id, type) => {
        return (value) => {
            if(value.length > 20){
                message.info('不能超出20位字符！');
                return false
            }
            if(value){
                fetchPost(PRICING_SINGLE, {data:{
                        [type]: value,
                        pricingId: id
                    }}, 2).then(data => {
                    if (data && data.state === "000001") {
                        message.success(data.msg);
                        this.props.editPricingResultAction(id, data.data)
                    }
                })
            }
        };
    };
    /**
     * 作者: pzt
     * 描述: 导出定价计算结果
     * 时间: 2018/11/2 11:31
     **/
    downloadResult = () =>{
        const { pricingTaskId } = this.props.pricingStateData;
        const pricingId = this.state.selectedResult;
        this.setState({
            export: true,
        });
        fetchPost(PRICING_RESULT_EXPORT,{data: {
                pricingTaskId,
                pricingId
            }},2).then(res=>{
                if(res && res.state === "000001"){
                    this.setState({
                        export: false,
                    });
                    message.info("正在导出结果, 请等待...");
                    const link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = res.data.url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
        })
    };
    render(){
        const {
            pricingStateData,
            pricingResultData,
            paginationHandle,
            total,
            pageNumber,
            pageData,
            handlePricingState
        } = this.props;
        const {pricingFinish , pricingTaskId} = pricingStateData;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedResult: selectedRowKeys
                });
            }};

        return (
            <div className={"pricing-system-pricing_result"}>
                {!pricingFinish && pricingTaskId ?
                    <div style={{marginLeft: -20}}>
                        <Button type={"default"} onClick={()=>handlePricingState(1)}>查询结果</Button>
                        <p className={"text-center margin-ms-top text-danger"}>正在计算中...</p>
                    </div>
                : null}
                {pricingFinish ?
                    <Functions {...this.props} functionkey={'008-000005-000001-002'}>
                        <div className={"text-right margin-ss-bottom"}>
                            <Button
                                type={"default"}
                                onClick={this.downloadResult}
                                disabled={this.state.export}
                                loading={this.state.export}
                            >
                                <Icon type="download" />
                                导出结果
                            </Button>
                        </div>
                    </Functions>
                : null}
                {pricingFinish || !pricingTaskId ?
                    <div>
                        <Table
                            rowSelection={rowSelection}
                            columns={this.columns}
                            // dataSource={this.dataSource}
                            dataSource={pricingResultData}
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
                : null}
            </div>
        )
    }
}