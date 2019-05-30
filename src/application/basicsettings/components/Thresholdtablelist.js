//金额阈值列表
import React, {Component} from 'react'
import Modalmodel from '../components/Modalmodel'
import {
    Button,
    Table,
    Pagination,
    Spin,
    Row,
    message
} from 'antd'
import '../css/css.css'
import * as types from "../constants/ActionTypes"
import axios from "../../../util/axios";
import {datasaddkey, dataPack, getLoginmsg} from '../../../util/baseTool';
import Editthreshold from "./Editthreshold";        //编辑站点弹窗 内容组件
import Functions from "../../../components/functions"

class Thresholdtablelist extends Component {

    constructor(props) {
        super(props);
    }


    state = {
        pagenum: 0,
        visibles: {
            visible: false,
            title: '',
            type: 0
        },
    }

    componentDidMount() {
        this.getList();
    }

    componentWillUnmount() {
        this.props.EditthresholdAction({siteData: []});
    }

    //----常量定义----

    //表头
    columns = [
        {
            title: '站点',
            dataIndex: 'siteCode',
            width: 40,
        },
        {
            title: '币种',
            dataIndex: 'siteCurrency',
            width: 40
        },
        {
            title: '阈值',
            dataIndex: 'lstSiteThresholdDetail',
            width: 100,
            render: (text, record, index) => {
                return (
                    <div>
                        {
                            record.lstSiteThresholdDetail && record.lstSiteThresholdDetail.map((v, i) => {
                                return <div
                                    key={i}>{`${v.thresholdValue} ( ${v.unitPriceStart} - ${v.unitPriceEnd} )`}</div>
                            })
                        }
                    </div>
                );
            }
        },
        {
            title: '创建人员',
            dataIndex: 'createBy',
            width: 60
        },
        {
            title: '创建时间',
            dataIndex: 'createTimeStr',
            width: 60
        },
        {
            title: '最新修改人员',
            dataIndex: 'modifiedBy',
            width: 60
        },
        {
            title: '最新修改时间',
            dataIndex: 'modifiedTimeStr',
            width: 60
        },
        {
            title: '操作',
            width: 60,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                let records = record;
                return (
                    <div className="actions-btns">
                        <Functions {...this.props} functionkey={'006-000001-000003-006'}>
                            <a className={'viewbtn'} onClick={(e, type, title, record) => {
                                this.showModule(e, 1, '编辑', records)
                            }}>编辑</a>
                        </Functions>
                    </div>
                );
            },
        }
    ];

    //----自定义方法----

    //获取金额阈值列表数据
    getList = (value) => {
        this.props.fetchPosts({
            key:'data',
            value:value||{
                pageNumber: 1,
                pageData: 20,
            },
            url: types.GET_THRESHOLDTABLELIST_API,
            tableAction: 'ThresholdtablelistAction'
        })
    }

    //金额-添加或编辑阈值
    updateThreshold = (obj) => {
        axios.post(types.UPDATESITETHRESHOLDDETAIL_API, obj)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        this.getList();                 //重新拉取数据
                        this.ModalhandleCancel();       //关闭弹窗
                    }
                }
            })
            .catch(
                e => console.log(e)
            )
    }

    //分页方法
    currentChange = (current, pageSize) => {
        this.setState({
            pagenum: Number(current)
        })
        this.Paginatihandle(current, pageSize)
    }
    //分页方法  
    Paginatihandle = (current, pageSize=20) => {     
        let newobj = {pageNumber: current, pageData: pageSize}  
        this.getList(newobj);       //获取列表数据
        this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}});
    }

    //showModule 编辑/添加弹窗
    showModule = (e, type, title, record) => {
        if (record) {
            let oldIndex = record.lstSiteThresholdDetail.length;
            let data = record.lstSiteThresholdDetail.map((v, i) => {
                return (
                    {
                        key: `_` + i,
                        No: ++i + '',
                        retailPriceRange: {
                            name1: `unitPriceStart` + i,
                            name2: `unitPriceEnd` + i,
                            initialValue1: v.unitPriceStart,
                            initialValue2: v.unitPriceEnd,
                            placeholder: '请填写'
                        },
                        thresholdValue: {
                            name: `thresholdValue` + i,
                            initialValue: v.thresholdValue,
                            placeholder: '请填写'
                        }
                    }
                );
            })
            this.props.EditthresholdAction({data: data, record: record, count: oldIndex + 1});
        } else {
            let siteData = [];
            let data = [{
                key: `_0`,
                No: '1 ',
                retailPriceRange: {
                    name1: `unitPriceStart0`,
                    name2: `unitPriceEnd0`,
                    initialValue1: '',
                    initialValue2: '',
                    placeholder: '请填写'
                },
                thresholdValue: {
                    name: `thresholdValue0`,
                    initialValue: '',
                    placeholder: '请填写'
                }
            }]

            if (this.props.Editthreshold.siteData.length == 0) {
                axios.post(types.GETSITECURRENCYLIST_API)
                    .then(response => {
                        if (response.status == 200) {
                            if (response.data.state == "000001") {
                                let arr = response.data.data;
                                siteData = [...arr];
                                this.props.EditthresholdAction({siteData: siteData}); //站点数据
                            }
                        }
                    })
                    .catch(
                        e => console.log(e)
                    )
            }
            this.props.EditthresholdAction({data: data, count: 1});
        }
        this.setState({
            visibles: {
                visible: true,
                title: title,
                type: type
            }
        });
    }


    //弹窗上确定按钮
    ModalhandleOk = () => {
        let type = this.state.visibles.type;                            //弹窗类型 1 == 编辑;   2 == 添加
        let {addSite, addCurrency} = this.props.Editthreshold;           //获取到添加时 选择的站点 币种数据
        if (type == 2 && !addSite) {
            message.error('请选择站点!')
            return false;
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let template = {
                    lstSiteThresholdDetail: [{thresholdValue: '', unitPriceEnd: '', unitPriceStart: ''}]
                }
                let newArr = [], newobj = {}, siteThreshold = {};
                ;
                let data = dataPack(template, values);          //数据格式化
                data.lstSiteThresholdDetail.map((v, i) => {
                    newArr.push({
                        thresholdValue: Number(v.thresholdValue),
                        unitPriceEnd: Number(v.unitPriceEnd),
                        unitPriceStart: Number(v.unitPriceStart)
                    })
                });
                let operator = getLoginmsg().userName;          //获取到当前登录用户
                let {id, createBy, siteCode, siteCurrency, createTimeStr} = this.props.Editthreshold.record;  //拿到行数据相关值
                //------------------start---------------------------
                siteThreshold.siteCode = siteCode || addSite;          //站点
                siteThreshold.siteCurrency = siteCurrency || addCurrency;  //币种
                siteThreshold.lstSiteThresholdDetail = [...newArr];  //阈值明细
                siteThreshold.id = id ? id : '';                //id
                siteThreshold.createBy = createBy ? createBy : operator;    //创建人
                siteThreshold.createTimeStr = createTimeStr ? createTimeStr : '';   //创建时间
                siteThreshold.modifiedTimeStr = '';             //最新修改时间
                siteThreshold.modifiedBy = operator;            //最新修改人员
                newobj.siteThreshold = {...siteThreshold};
                //------------------end---------------------------

                //----站点判重-----
                if (type == 2) {
                    axios.post(types.CHECKSITECODEDUP_API, {siteThreshold: {siteCode: addSite}})
                        .then(response => {
                            if (response.status == 200) {
                                if (response.data.state == "000001") {
                                    if (response.data.data == 1) {
                                        message.error('站点已经存在!');
                                        return false;
                                    } else if (response.data.data == 0) {
                                        this.updateThreshold(newobj);
                                    }
                                }
                            }
                        })
                        .catch(
                            e => console.log(e)
                        )
                } else if (type == 1) {
                    this.updateThreshold(newobj);
                }
            }
        });
    }

    //弹窗上取消按钮
    ModalhandleCancel = () => {
        this.setState({
            visibles: {
                visible: false,
                type: 0
            }
        })
        this.child.clearState();           //调用子组件的方法
        this.props.EditthresholdAction({data: [], record: {}, count: 0, delkey: 100, addSite: '', addCurrency: ''});
    }

    onRef = (ref) => {
        this.child = ref
    }

    render() {
        let {visibles} = this.state;
        let {data, loading, current, total, pageSize} = this.props.Thresholdtablelist;
        if (data) {
            var newdata = datasaddkey(data.lst || []);
        }
        let columns = this.columns;
        let buttons = (
            <Row type="flex" justify="end">
                <div>
                    <Functions {...this.props} functionkey={'006-000001-000003-006'}>
                        <Button onClick={(e, type, title) => {
                            this.showModule(e, 2, '添加')
                        }} type="primary">
                            添加
                        </Button>
                    </Functions>
                </div>
            </Row>
        );
        // ----------------start-------------------
        let content = (
            <Editthreshold
                {...this.props}
                onRef={this.onRef}
            />
        );
        //---------------------end------------------------
        return (
            <div className="newCluenk">
                <div className="btnTitle">
                    {buttons}
                </div>
                <div className="content">
                    <Spin tip="Loading..." spinning={loading} delay={100}>
                        <Table
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}/>
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}  //用于显示数据总量和当前数据顺序
                        pageSizeOptions={['20', '30', '40', '50']} //指定每页可以显示多少条
                        showSizeChanger                         //是否可以改变 pageSize
                        showQuickJumper={{goButton: true}}      //是否可以快速跳转至某页
                        current={current}    //当前页数
                        onShowSizeChange={this.Paginatihandle}      //pageSize 变化的回调
                        total={total}                               //数据总数
                        pageSize={pageSize}                           //每页条数
                        onChange={this.currentChange}              //页码改变的回调，参数是改变后的页码及每页条数
                    />
                </div>
                <Modalmodel className="editThreshold"
                            {...{
                                ...this.props.modalmodel,
                                visible: visibles.visible,
                                ModalText: content,
                                title: visibles.title,
                                isAlign: true,
                            }}
                            width="800px"
                            onOk={this.ModalhandleOk}
                            onCancel={this.ModalhandleCancel}/>
            </div>
        );
    }
}

export default Thresholdtablelist