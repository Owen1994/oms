//店铺列表
import React, {Component} from 'react';
import {
    Form,
    Button,
    message,
    Table,
    Pagination,
    Spin,
    Switch,
    Menu,
    Dropdown,
    Icon
} from 'antd'
import '../css/css.css'

const FormItem = Form.Item
import {Link} from 'react-router-dom';
import * as types from "../constants/ActionTypes"
import axios from "../../../util/axios";
import {datasaddkey, functions} from '../../../util/baseTool';
import Functions from "../../../components/functions"

class Storetablelist extends Component {

    constructor(props) {
        super(props);
    }


    state = {
        batchSynchronous: [], //存储表格选择项
        pagenum:0
    }

    //----常量定义----

    //表头
    columns = [
        {
            title: '销售账号',
            dataIndex: 'shopAccount',
            width: 60,
        },
        {
            title: '当前状态',
            dataIndex: 'isEnabled',
            width: 60,
            render: (text, record, index) => {
                let _record = {...record};
                return (
                    <Switch
                        checked={_record.isEnabled == 1 ? true : false}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        onChange={(e, record) => {
                            this.switchChange(e, _record)
                        }}
                    />
                )
            }
        },
        {
            title: '最新分析时间',
            dataIndex: 'lastAnalysisTimeStr',
            width: 80,
        },
        {
            title: '下次分析时间',
            dataIndex: 'nextAnalysisTimeStr',
            width: 60,
        },
        {
            title: '操作',
            width: 80,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                let {isEnabled, analysisStatus, shopAccount} = record;
                return (
                    <div className="actions-btns">
                        <Functions {...this.props} functionkey={'006-000001-000003-003'}>
                            {isEnabled == 1 ? analysisStatus == 1 ?
                                <Icon style={{color: '#4D7BFE', fontSize: '24px'}} type="loading"/> :
                                <a className={'viewbtn'} onClick={(account) => this.analyse(shopAccount)}>分析</a> :
                                 null}
                        </Functions>
                        {isEnabled == 1 ? <span className="margin-ss-left margin-ss-right v-line">|</span> : null}
                        <Functions {...this.props} functionkey={'006-000001-000003-004'}>
                            <Link to={`/application/claimreport/?shopAccount=${record.shopAccount}`}
                                  className={'viewbtn'}>查看报告</Link>
                        </Functions>
                    </div>
                );
            },
        }
    ];

    componentWillUnmount() {
        this.setState({
            batchSynchronous: []
        })
        this.props.StoretablelistAction({selectedRowKeys: [], selectedRows: []});      //清空勾选项数组
    }

    //----自定义方法----

    //分页方法
    currentChange = (current, pageSize) => {
        this.setState({
            pagenum: Number(current)
        })
        this.Paginatihandle(current,pageSize)
     }
    //分页方法  
    Paginatihandle = (current, pageSize=20) => {
        let {preValue} = this.props.Infos;
        let newobj = {...preValue,pageNumber: current, pageData: pageSize};
        this.props.getStoreLsit(newobj);        //获取列表数据
        this.props.StoretablelistAction({selectedRowKeys:[],selectedRows:[]});      //清空勾选项数组
        this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}});
    }

    //列表项选择
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.StoretablelistAction({selectedRowKeys, selectedRows});
    }

    // analyse 分析请求
    analyse = (account) => {
        let lstShopAccount = [];
        if (account instanceof Array) {
            lstShopAccount = [...account];
        } else {
            lstShopAccount.push(account);
        }
        
        axios.post(types.SUBMITSHOPACCOUNTANALYSIS_API, {lstShopAccount})
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        message.warning('如分析过程较长,可手动刷新获取最新状态!');
                        this.props.getStoreLsit();       //刷新列表
                    }
                }
            })
            .catch(
                e => console.log(e)
            )
    }

    //switchChange 开关切换
    switchChange = (e, record) => {
        if (e) {
            record.isEnabled = 1;
        } else {
            record.isEnabled = 0;
        }
        let {isEnabled, shopAccount} = record;
        let newObj = {isEnabled, shopAccount};
        this.changeEnabled(newObj);     //修改状态请求
    }

    //修改状态后请求
    changeEnabled = (obj) => {
        let lstShopAccounSettingVO = [];
        if (obj instanceof Array) {
            lstShopAccounSettingVO = [...obj];
        } else {
            lstShopAccounSettingVO.push(obj);
        }
        axios.post(types.SETSHOPACCOUNTENABLED_API, {lstShopAccounSettingVO})
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        response.data.data == 1 && this.props.getStoreLsit();       //刷新列表
                    }
                }
            })
            .catch(
                e => console.log(e)
            )
    }

    //批量操作 点击事件
    menuClick = (item) => {
        let {selectedRows} = this.props.Storetablelist;
        if (selectedRows.length == 0) {
            message.error('请选择批量选项!');
            return false;
        }
        if (item.key == 1) {      //批量分析
            let newArr = [];
            selectedRows.map((v, i) => {
                if (v.isEnabled == 1 && v.analysisStatus == 0) {
                    newArr.push({...selectedRows[i]});
                }
            });
            if (newArr.length > 0) {
                let accountArr = [];            //账号数组
                newArr.map((v, i) => {
                    accountArr.push(v.shopAccount);
                });
                this.analyse(accountArr);
            } else {
                message.warning('没有可分析的选项!');
                return false;
            }
            ;
        } else if (item.key == 2) {
            this.changeSwitch(selectedRows, 1);
        } else if (item.key == 3) {
            this.changeSwitch(selectedRows, 0);
        }
    }

    //批量开启or关闭  @arr 操作的数组  @type 状态(1== 开启  0 == 关闭)
    changeSwitch = (arr, type) => {
        let newobj = {}, newarr = [];
        arr.map(v => {
            v.isEnabled = type
            newobj = {isEnabled: v.isEnabled, shopAccount: v.shopAccount};
            newarr.push(newobj);
        })
        this.changeEnabled(newarr);     //修改状态请求
    }

    render() {
        const rowSelection = {
            selectedRowKeys: this.props.Storetablelist.selectedRowKeys,
            onChange: this.onSelectChange,
            fixed: false,
            getCheckboxProps: record => ({
                disabled: false,
            }),
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    batchSynchronous: selectedRows,
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                this.setState({
                    batchSynchronous: selectedRows,
                });
            },
        };
        const {data, loading, current, total, pageSize} = this.props.Storetablelist;
        if (data) {
            var newdata = datasaddkey(data.lst || [])
        }
        const columns = this.columns;
        const con1 = functions(this, '006-000001-000003-003') ? <Menu.Item key="1">
            批量分析
        </Menu.Item> : null
        const con2 = functions(this, '006-000001-000003-002') ? <Menu.Item key="2">
            批量开启
        </Menu.Item> : null
        const con3 = functions(this, '006-000001-000003-002') ? <Menu.Item key="3">
            批量关闭
        </Menu.Item> : null
        const menu = (
            <Menu onClick={this.menuClick} className="selectMenu">
                {con1}
                {con2}
                {con3}
            </Menu>
        );
        const buttons = (
            <div className="leftBtn">
                <Dropdown overlay={menu} placement="bottomCenter">
                    <Button type="primary">批量操作<Icon type="caret-down"/></Button>
                </Dropdown>
            </div>
        );
        return (
            <div className="newCluenk">
                <div className="btnTitle">
                    {buttons}
                </div>
                <div className="content">
                    <Spin tip="Loading..." spinning={loading} delay={100}>
                        <Table
                            rowSelection={rowSelection}
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
                        total={total}    //数据总数
                        pageSize={pageSize} //每页条数
                        onChange={this.currentChange}              //页码改变的回调，参数是改变后的页码及每页条数
                    />
                </div>
            </div>
        );
    }
}

export default Storetablelist