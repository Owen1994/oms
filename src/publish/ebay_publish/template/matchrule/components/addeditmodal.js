/**
 * 作者: 陈林
 * 描述: 付款弹窗
 * 时间: 2018/8/3 0003 下午 7:07
 * @param
 **/
import React from 'react'
import {Form, Modal,Input,Button, Table,message} from "antd";
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../../../common/constants/actionTypes";
import {ORUPDATE_TEMPL_MATCH} from '../constants/MatchList'
import { fetchPost } from '../../../../../util/fetch'
import { parseTempMatchDetailData } from '../selectors'
const FormItem = Form.Item;
// let uuid = 1; // 动态新增表单域的key值
class modal extends React.Component{
    // titleMap = new Map()
    templateMap = new Map()
    state = {
        loading:false,
        dataSource: [{key: Date.now()}],
        site: '',
        saleAccount: '',
        modalHeight:false,
    }

    columns = [
        {
            title: '专线前缀',
            dataIndex: 'specialPrefix',
            width: 120,
            render: (text, record, index) => {
                return (<Input maxLength="5" onChange={(e) => {
                        let   reg = /^[a-zA-Z]+$/;
                        let value
                        if(reg.test(e.target.value) || (e.target.value === "" || e.target.value === null || e.target.value === undefined)){
                            value = e.target.value;
                            record.specialPrefix = value
                        }else{
                            message.warning("请输入字母")
                            return false;
                        }
                    }
                }  defaultValue={record.specialPrefix}/>)
            }
        },
        {
            title: '对应刊登模板',
            dataIndex: 'publishTemplId',
            render: (text, record, index) => {
                return (
                    <ItemSelect
                        name="name"
                        code="id"
                        defaultValue={record.publishTemplId}
                        dName={this.state.dataSource[index].publishTemplName}
                        dValue={this.state.dataSource[index].publishTemplId}
                        url={types.PUBLISH_TEMPLATES}
                        apiListType={2}
                        params={{site: this.state.site, saleAccount: this.state.saleAccount,pageNumber:1,pageData: 20}}
                        onChange={(value) => {
                            record.publishTemplId = value
                            // this.templateMap.set(record.key, value)
                            }
                        }
                        // onFilters={this.handleTemplateFilters}
                    />
                )
            }
        },
        {
            title: '操作',
            width: 70,
            className:"publish-matchrule-active",
            render: (text, record, index) => {
                return index === 0 ? (<span onClick={this.add}>{'新增'}</span>):(<span onClick={() => this.remove(index)}>{'删除'}</span>)
            }
        }
    ]

    handleTemplateFilters = (list) => {
        return list.filter(item => {
            let flag = true;
            for(const value of this.templateMap.values()) {
                if(value===item.id) {
                    flag = false;
                    break;
                }
            }
            return flag;
        })
    }

    remove = (index) => {
        this.setState(prevState => {
            const dataSource = prevState.dataSource;
            dataSource.splice(index, 1);
            return {
                dataSource: [...dataSource]
            }
        })
        if(this.state.dataSource.length === 2){
            this.setState({
                modalHeight:false
            })
        }
    }

    add = () => {
        if(this.state.dataSource.length>19){
            message.warning("最多增加20条信息")
            return false
        }
        this.setState({
            modalHeight:true
        })
        this.setState(prevState => {
            const dataSource = prevState.dataSource;
            dataSource.push({key: Date.now()})
            return {
                dataSource: [...dataSource]
            }
        })
    }

    //弹窗提交
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err){
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                }catch(error){
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            if (!err) {
                this.setState({
                    loading:true
                })
                this.setState({})
                const params = {...values};
                if(this.props.item){
                    params.matchId = this.props.item.matchId;
                    params.siteId = this.state.siteid;
                }
                params.rulesArr = this.state.dataSource;
                //判断专线前缀不能重复
                let clArr=[]
                this.state.dataSource.map(it => {
                    clArr.push(it.specialPrefix)
                } )
                if((new Set(clArr)).size != clArr.length){
                    message.warning("专线前缀不能重复")
                    this.setState({
                        loading:false
                    });
                    return false
                }
                let flag = false;
                //判断专线前缀不能为空，对应刊登模板不能为空
                this.state.dataSource.forEach((item,index) => {
                    if((!item.specialPrefix && !item.publishTemplId && index === 0) || !item.specialPrefix && item.publishTemplId){
                        message.warning("专线前缀不能为空")
                        flag = true
                        return false
                    }
                    if(item.specialPrefix && !item.publishTemplId){
                        message.warning("对应刊登模板不能为空")
                        flag = true
                        return false
                    }
                });
                if(flag){
                    this.setState({
                        loading:false
                    });
                    return ;
                }
                fetchPost(ORUPDATE_TEMPL_MATCH, params,1).then(res=>{
                    if(res && res.state === "000001"){
                        this.props.form.resetFields();
                        this.templateMap.clear();
                        this.props.onCancel();
                        this.props.onSearch();
                        this.setState({
                            loading:false
                        });
                    }else{
                        this.setState({
                            loading:false
                        });
                    }
                });
            }
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible&&!this.props.visible){
            this.props.form.resetFields();
            this.templateMap.clear();
            this.setState({
                dataSource: [{key: Date.now()}],
                site: '',
                saleAccount: '',
            });
            if(nextProps.item){
                this.setState({
                    siteCode: nextProps.item.siteCode,
                    saleAccount: nextProps.item.sellerId,
                })
                fetchPost(types.GET_TEMPLATE_MATCH_DETAIL_API, {matchId: nextProps.item.matchId}, 2)
                    .then(result => {
                        if(result.state === '000001'){
                            if(result.data&&result.data.rulesArr){
                                const rulesArr = parseTempMatchDetailData(result.data.rulesArr)
                                this.setState({
                                    dataSource: rulesArr,
                                    siteid:result.data.siteId,
                                    site: result.data.siteId,
                                    saleAccount:result.data.sellerId,
                                })
                            }
                        }
                    })
            }
        }
    }

    //站点
    handSite = (value) =>{
        this.setState({
            dataSource: [{key: Date.now()}],
            site: value
        });
    }
    //销售账号
    handSaleAccount = (value) =>{
        this.setState({
            dataSource: [{key: Date.now()}],
            saleAccount: value
        });
    }



    render(){
        const {visible,onCancel,item} = this.props;
        const { getFieldDecorator } = this.props.form;
        const {loading, dataSource, site, saleAccount,siteCode,modalHeight} = this.state;
        let title;
        if(this.props.item){
            title="编辑"
        }else{
            title="新增"
        }
        return(
            <div>
                <Modal {...this.props}
                       destroyOnClose={true}
                       title={title}
                       visible={visible}
                       className="publish-matchrule-modal"
                       footer={[
                           <Button key="cancel" onClick={onCancel}>取消</Button>,
                           <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                       ]}
                >
                    <Form>
                              <div className="product-description">
                                    <div className="list-filter-item">
                                        <div className="list-filter-item-title list-filter-item-title_required">站点:</div>
                                        <div className="list-filter-input">
                                            <FormItem>
                                                <ItemSelect
                                                    getFieldDecorator={getFieldDecorator}
                                                    formName='siteId'
                                                    name="name"
                                                    code="id"
                                                    dName={siteCode}
                                                    dValue={site}
                                                    searchColumn="siteId"
                                                    onChange={(value) => this.handSite(value) }
                                                    params={{'pageData': 20, 'pageNumber': 1}}
                                                    url={types.PUBLISH_EBAYSITE}
                                                    disabled={item ? true :false}
                                                    placeholder={"请选择站点"}
                                                    rules={{
                                                        initialValue:item ? siteCode : undefined,
                                                        rules: [{
                                                            required: true, message: '请选择站点',
                                                        }],
                                                    }}
                                                    apiListType={2}
                                                />
                                            </FormItem>
                                        </div>
                                    </div>
                                    <div className="list-filter-item margin-sm-top">
                                        <div className="list-filter-item-title list-filter-item-title_required">销售账号:</div>
                                        <div className="list-filter-input">
                                            <FormItem>
                                                <ItemSelect
                                                    getFieldDecorator={getFieldDecorator}
                                                    formName='sellerId'
                                                    onChange={(value) => this.handSaleAccount(value)  }
                                                    name="id"
                                                    code="id"
                                                    dName={saleAccount}
                                                    dValue={saleAccount}
                                                    searchColumn="sellerId"
                                                    params={{'pageData': 20, 'pageNumber': 1}}
                                                    url={types.PUBLISH_EBAYACCOUNT}
                                                    disabled={item ? true :false}
                                                    placeholder={"请选择销售账号"}
                                                    rules={{
                                                        initialValue:item ? saleAccount:undefined,
                                                        rules: [{
                                                            required: true, message: '请选择销售账号',
                                                        }],
                                                    }}
                                                    apiListType={2}
                                                />
                                            </FormItem>
                                        </div>
                                    </div>
                                  <div className="publich-matchrule-tab margin-ms-top">
                                      <Table
                                          columns={this.columns}
                                          dataSource={dataSource}
                                          bordered
                                          pagination={false}
                                      />
                                  </div>
                              </div>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(modal)
