import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import {
    Button,
    Form,
    Spin,
    Pagination,
    Table,
    message,
    Modal,
} from 'antd'
import '../css/css.css'
import {levelOptions} from "../../../../util/options";
import {datasaddkey} from "../../../../util/baseTool";
import * as config from "../../../../util/connectConfig";
import {post} from "../../../../util/axios";
import {downlodFile} from "../../../../util/fetch";

class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    };
    state = {
        selectedRows: "",
        index: '',          //表格数据序号
        sku: '',            //数据sku
        visible: false,     //弹窗
    };
    columns = [
        {
            title: '系统编码',
            dataIndex: 'batch_num',
            width: 110,
            align: 'center',

        }, {
            title: '刊登账号',
            dataIndex: 'account',
            width: 130,
            align: 'center',
        }, {
            title: '速卖通产品ID',
            dataIndex: 'product_id',
            width: 100,
            align: 'center',
        }, {
            title: 'SKU列表',
            dataIndex: 'sku',
            width: 80,
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div style={{maxWidth: 80, wordBreak: 'break-all', textAlign: 'left'}}>
                        {this.createSkuList(record.sku, index)}
                    </div>
                )
            }
        }, {
            title: '刊登状态',
            dataIndex: 'status',
            width: 80,
            align: 'center',
            render: (text, record, index) => {
                let txt = "";
                if (text == 10) {
                    txt = "刊登中"
                } else if (text == 60) {
                    txt = "刊登成功"
                } else if (text == -1) {
                    txt = "刊登失败"
                }
                return (
                    <div>{txt}</div>
                )
            }
        }, {
            title: '错误原因',
            dataIndex: 'content',
            align: 'center',
            render: (text, record) => {
                return <div style={{wordBreak: 'break-all', textAlign: 'left'}}>{record.content}</div>
            }
        }, {
            title: '刊登时间',
            dataIndex: 'time',
            width: 150,
            align: 'center',
        }, {
            title: '操作人员',
            dataIndex: 'operator',
            align: 'center',
            width: 100,
        },
    ];
    //sku列表超过3条显示更多
    createSkuList = (sku, index) => {
        if(sku){
            let newSku = sku.split(',');
            if(newSku.length <= 3){ //3条以内，原样输出
                return sku;
            }
            if(newSku.length > 3 ){      //3条以上，只显示3条并生成‘更多’按钮
                return (
                    <div>
                        {newSku.splice(0, 3).join(',')}
                        <p style={{textAlign: 'center', marginTop: 4}}><a onClick={()=>this.openModal(sku, index)}>更多>></a></p>
                    </div>
                )
            }
            // if(newSku.length > 3 && index === this.state.index){    //当前点击行数据展示并生成‘隐藏’按钮
            //     return (
            //         <div>
            //             {sku}
            //             <p style={{textAlign: 'center', marginTop: 4}}><a onClick={()=>{this.setState({index: ''})}}>隐藏>></a></p>
            //         </div>
            //     )
            // }
        }
        return sku;
    };
    openModal = (sku, index) => {
        this.setState({
            index,
            sku,
            visible: true,
        });
    };

    //分页
    Paginatihandle = (page, pageSize) => {
        let {params} = this.props.Infos;
        let newobj = {...params, pageNumber: page, pageData: pageSize}
        this
            .props
            .fetchPosts({
                key: 'data',
                value: newobj
            });
    };
    //按当前条件导出
    presentsynchdata = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            let params = this.props.Infos.params;
            post(`${config.api_url}/smtbatchlisting/api/sku/PublishDownload/publishDownload`, params)
                .then(data => {
                    if (data.state === '000001') {
                        let url = data.data;
                        downlodFile(url);
                    } else {
                        message.error(data.msg);
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        })
    };
    //按选中项导出
    Selectedsynchdata = () => {
        if (this.state.selectedRows === "") {
            message.info('请选择选中项');
            return false;
        }
        let id = this.state.selectedRows
        let pramsObj = {
            id
        };
        post(`${config.api_url}/smtbatchlisting/api/sku/PublishDownload/publishDownload`, pramsObj)
            .then(data => {
                if (data.state === '000001') {
                    let url = data.data;
                    downlodFile(url);
                } else {
                    message.error(data.msg);
                }
            })
            .catch(e => {
                console.log(e)
            })
    };

    render() {
        const {data} = this.props.queuetablemodule;
        const newdata = datasaddkey(data);
        const columns = this.columns;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                var value = ''
                for (var i = 0; i < selectedRows.length; i++) {
                    value = value + selectedRows[i].id + ','
                }
                value = value.substring(value.length - 1) == ',' ? value.substring(0, value.length - 1) : value;
                this.setState({selectedRows: value})
            },
        };
        return (
            <div className="newCluenk amazonqueue-table">
                <div className="rightbtn">
                    <Button
                        className={'margin-sm-right'}
                        onClick={() => {
                            this.presentsynchdata()
                        }}>
                        当前条件导出
                    </Button>

                    <Button
                        onClick={() => {
                            this.Selectedsynchdata()
                        }}>
                        选中项导出
                    </Button>
                </div>
                <div className={'queuetablecen'}>
                    <Spin spinning={this.props.queuetablemodule.loading} delay={100} tip="Loading...">
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}
                            size="small"
                        />
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
                    <Modal
                        title="查看全部SKU"
                        visible={this.state.visible}
                        // onOk={this.handleOk}
                        onCancel={()=>{this.setState({visible: false})}}
                        footer={null}
                    >
                        {this.state.sku}
                        <div style={{marginTop: 20, textAlign: 'right'}}><Button onClick={()=>{this.setState({visible: false})}}>关闭</Button></div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Tablelist