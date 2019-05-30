/**
 * 排除运输地点组件
 */
import React from 'react'
import {Checkbox,Table,Pagination, Row, Col, Tooltip} from "antd";
import {datasaddkey} from "../../../../../util/baseTool"
import {fetchPost} from "../../../../../util/fetch";
import {GET_SHIP_TO_LOCATION_LIST} from "../../constants/TransportApi";
import {parseListData} from "../../selector/transportAddress";
class outTransportAddress extends React.Component{

    state={
        pageNumber:1,
        pageData:20
    }

    columns = [
        {
        title: '地区',
        dataIndex: 'regionCode',
        render:(text) =>{
            return(
                <div style={{"width":"80px",}}>{text}</div>
            )
        }
    }, {
        title: '国家',
        dataIndex: 'locationCodeArr',
        className: 'locationCountry',
        render: (text, record, index) => {
            return(
                <div style={{"width":"800px",}}>
                <Row>
                    {
                        record.locationCodeArr.map((item,i)=> {
                            return(
                                <Col key={i} span={4} style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: 4}}>
                                {/* <div key={i} style={{"float":"left"}}> */}
                                    <Tooltip title={item.locationDesc} placement={"top"} >
                                    <Checkbox
                                        checked={item.checked}
                                        onChange ={(e)=>this.checkSingle(e,index, i)}
                                    >{item.locationDesc}</Checkbox>
                                    </Tooltip>
                                {/* </div> */}
                                </Col>
                                )
                        })
                    }
                    </Row>
                </div>
            )
        }
    }, {
        title: '操作',
        dataIndex: 'opreation',
        // width: 70,
        render: (text,record, index) => {
            return (
                <div style={{"width":"60px",}}>
                    <Checkbox
                        onChange={(e)=>this.checkAll(e,index)}
                        checked={record.checked}
                    >全选
                    </Checkbox>
                </div>
            )
        }
    }];

    //表格单选
    checkSingle = (e,index, position) =>{
        this.props.checkAddress({index, data: {checked: e.target.checked, position}})
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.site && this.props.site !== nextProps.site){
            this.props.getOutTransportAddress({site:this.props.site,pageNumber:1, pageData:20,})
        }
    }
    componentDidMount(){
        this.props.getOutTransportAddress({site:this.props.site,pageNumber:1, pageData:20,})
    }

    //表格全选
    checkAll = (e,index) =>{
        this.props.checkAllAddress({index, checked: e.target.checked})
    };

    onSearch = (pageNumber, pageData)=> {
        this.setState({
            pageNumber: pageNumber,
            pageData: pageData
        })
        this.props.getOutTransportAddress({site:this.props.site,pageNumber,pageData});
    }

    render(){
        const { outTransportAddressList} = this.props;
        const { total} = this.props.outTransportAddressList;
        const { pageNumber, pageData} = this.state;
        return(
            <div className="oms_inx">
                <div className="list-filter-item margin-sm-top ">
                    <div className="list-filter-item-title">排除运输地点:</div>
                </div>
                <div className="margin-sm-top outTransportAddressList">
                    <Table
                        dataSource={outTransportAddressList.data}
                        columns={this.columns}
                        pagination={false}
                        bordered={true}
                    />
                    <div className="cl_pagination">
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{goButton: true}}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={this.onSearch}
                            total={total}
                            pageSize={pageData}
                            onChange={this.onSearch}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default outTransportAddress