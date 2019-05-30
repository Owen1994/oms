/**
     * 作者: 陈林
     * 描述: 图库设置列表组件
     * 时间: 2018/7/27 0027 下午 8:18
     * @param
 **/
import React,{ Component } from 'react'
import { Button,Table,Pagination,Spin,Modal,Form,Select,message,AutoComplete} from 'antd';
import { post } from "../../../../util/axios";
import {datasaddkey, pageCache, timestampFromat} from '../../../../util/baseTool'
import { SETTING_IMAGE_DETAIL } from "../constants/index";
import {levelOptions} from "../../../../util/options";
import ModalModel from '../components/modalModel'
import Functions from '../../../../components/functions'
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class table extends Component{

    state = {
        loading: true,
        visible: false,
        title: '',
        type:2,
        settingId:'',
        saleAccount:'',
        galleryId:'',
        galleryName:""
    }

    componentDidMount(){
        const pageCachedata = pageCache(this,`${location.pathname}${location.search}`);
        this.props.getGalleryRateList(pageCachedata||{pageNumber: 1, pageData: 20});
    }

    //隐藏和显示函数
    toggleModal = (setStateObj) => {
        this.setState(setStateObj);
    }

    handleAddItem = () => {
        this.setState({
            visible:false
        })
    }

    /**
         * 作者: 陈林
         * 描述: 删除提示函数
         * 时间: 2018/7/28 0028 下午 3:10
         * @param
     **/
    deleteItem = (record)=>{
        this.setDelCondition(record);
        this.showDeleteConfirm(record);
    }
    setDelCondition = (record)=>{
        this.setState({
            type: record.type,
            skuNumber: record.skuNumber,
            id: record.id,
        })
    }
    showDeleteConfirm = (obj) => {
        const params = {};
        const that = this;
        params["pageData"] = levelOptions("pageInit").pagedata;
        params["pageNumber"] = levelOptions("pageInit").pagenum;
        let settingId = obj.settingId;
        let saleAccount = obj.saleAccount
        let type = obj.type;
        confirm({
            title: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                post(SETTING_IMAGE_DETAIL, {settingId:settingId,saleAccount:saleAccount,type:type}).then(res=>{
                    if(res && res.state === "000001"){
                        message.success(res.msg);
                        that.props.getGalleryRateList(params);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render(){
        const columns = [
            {
                title: '销售账号',
                dataIndex: 'saleAccount',
                key: 'saleAccount',
            }, {
                title: '图库',
                dataIndex: 'galleryName',
                key: 'galleryName',
            }, {
                title: '添加人员',
                dataIndex: 'additions',
                key: 'additions',
            }, {
                title: '添加时间',
                dataIndex: 'addTime',
                key: 'addTime',
                render: (text) => timestampFromat(text,2)
            },{
                title: '最新修改人员',
                dataIndex: 'editions',
                key: 'editions',
                render: (text, record) => {
                    const  editions = record.editions;
                    return(
                        <div>
                            {editions ?
                                <p>{ editions }</p>
                                :
                                <p> -- </p>
                            }
                        </div>
                    )
                }
            },{
                title: '最新修改时间',
                dataIndex: 'editTime',
                key: 'editTime',
                render: (text, record) => {
                    const  editTime = timestampFromat(record.editTime,2);
                    return(
                        <div>
                            {editTime ?
                                <p>{ editTime }</p>
                                :
                                <p> -- </p>
                            }
                        </div>
                    )
                }
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => (
                    <div className="lgt-customs_set_btns">
                        <Functions {...this.props} functionkey="008-000002-000001-002">
                            <span
                                className="margin-ss-right"
                                onClick={() => this.toggleModal({
                                    visible: true,
                                    settingId: record.settingId,
                                    saleAccount:record.saleAccount,
                                    galleryId:record.galleryId,
                                    galleryName:record.galleryName,
                                    type: 2,
                                    title: "编辑"
                                })}
                            >
                            编辑
                            </span>
                        </Functions>
                        <Functions {...this.props} functionkey="008-000002-000001-003">
                            <span onClick={() => this.deleteItem({
                                type:3,
                                settingId:record.settingId,
                                saleAccount:record.saleAccount,
                            })}>删除</span>
                        </Functions>
                    </div>
                ),
            }
        ];
        const { visible, title,type,saleAccount,settingId,galleryId,galleryName  } = this.state;
        const { ebayAccountData, getGalleryListData,getGalleryRateList,paginationHandle } = this.props;
        const {pageNumber, pageSize} = this.props.paginationData;
        const { data,loading } = this.props.galleryListModel;
        const dataList = data.data || [] ;
        const total = data.total;
        return(
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="table-operations padding-sm-bottom">
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="008-000002-000001-002">
                             <Button onClick={()=>this.toggleModal({
                                 visible: true,
                                 type: 1,
                                 title: "新增",
                             })} >新增<i className="anticon anticon-plus"></i></Button>
                        </Functions>
                    </div>
                    <div className="pull-right"></div>
                </div>
                <div>
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
                            columns={columns}
                            dataSource={ datasaddkey(dataList) }
                            onChange={this.props.sorter}
                            pagination={false}
                            bordered={true}
                            size="small"
                        />
                    </Spin>
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{goButton: true}}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={paginationHandle}
                            total={total}
                            pageSize={pageSize}
                            onChange={paginationHandle}
                        />
                   <ModalModel
                       title={title}
                       visible={visible}
                       type={type}
                       settingId={settingId}
                       saleAccount={saleAccount}
                       galleryId={galleryId}
                       galleryName={galleryName}
                       handleAddItem={this.handleAddItem}
                       onCancel={()=>this.toggleModal({
                           visible: false,
                           settingId: ''
                       })}
                       ebayAccountData={ebayAccountData}
                       getGalleryListData={getGalleryListData}
                       getGalleryRateList={getGalleryRateList}
                   />
                </div>
            </div>
        )
    }
}

export default table