/**
 * 作者: 陈林
 * 描述: 图库设置添加和修改弹窗
 * 时间: 2018/8/3 0003 下午 7:07
 * @param
 **/
import React from 'react'
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'
import {AutoComplete, Form, Select,Modal} from "antd";
import {post} from "../../../../util/axios";
import {filterParams} from "../../../../util/baseTool";
import {SETTING_IMAGE_DETAIL} from "../constants/index"
import {message} from "antd/lib/index";
import {levelOptions} from "../../../../util/options";
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class modal extends React.Component{
    state = {
        type:2,
    }


    handleSelect = (value, type)=>{
        // console.log(value);
    }

    handleAddItem = () =>{
        const params = {};
        let type,galleryId,saleAccount,settingId;
        params["pageData"] = levelOptions("pageInit").pagedata;
        params["pageNumber"] = levelOptions("pageInit").pagenum;
        this.props.form.validateFields((err, values) => {
            if(!err){
                if(!values.galleryModal){
                    message.success("图库已存在！");
                    galleryId = this.props.galleryId;
                    return false;
                }
                if(this.props.settingId){
                    type = 2;
                    settingId = this.props.settingId;
                    saleAccount = this.props.saleAccount;
                }else{
                    type = 1;
                    saleAccount = values.saleAccountModal;
                }
                galleryId = values.galleryModal;
                type = type;
                post(SETTING_IMAGE_DETAIL, {type:type,galleryId:galleryId,saleAccount:saleAccount,settingId:settingId}).then(res=>{
                    if(res && res.state === "000001"){
                        message.success(res.msg);
                        this.props.getGalleryRateList(params);
                        this.props.handleAddItem({
                            visible:false
                        });
                        this.props.form.resetFields();
                    }
                });
            }
        })


    }

    render(){
        const { ebayAccountData, getGalleryListData,title,visible,type,saleAccount,galleryId,galleryName} = this.props;
        const { getFieldDecorator } = this.props.form;
        const ebayAccountDataList = ebayAccountData || [];
        const getGalleryListDataList = getGalleryListData || [];
        return(
            <div>
                <Modal {...this.props}
                       title={title}
                       visible={visible}
                       okText="保存"
                       cancelText="取消"
                       className="gly-modal"
                       onOk={()=> this.handleAddItem()}
                >
                    {
                        type === 2 ?
                            <div>
                                <StandardFormRow title="销售账号：">
                                    <span className="line-height">{saleAccount}</span>
                                </StandardFormRow>
                                <StandardFormRow title="图库：" className="padding-xm-top">
                                    <FormItem>
                                        {getFieldDecorator('galleryModal',
                                            {
                                                rules: [{ required:false, message: '图库不能为空!' }],
                                            }
                                        )(
                                            <Select
                                                showSearch
                                                onChange={(value)=>this.handleSelect(value, "galleryAccount")}
                                                style={{ width: 300 }}
                                                placeholder={galleryName}
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {getGalleryListDataList.map((v,i)=>{
                                                    return <Option value={v.id} key={i} >{v.name}</Option>
                                                })}
                                            </Select>
                                        )}
                                    </FormItem>
                                </StandardFormRow>
                            </div>
                            :
                            <div>
                                <StandardFormRow title="销售账号：">
                                    <FormItem>
                                        {getFieldDecorator('saleAccountModal',
                                            {
                                                rules: [{ required: true, message: '销售账号不能为空!' }],
                                            }
                                        )(
                                            <Select
                                                showSearch
                                                onChange={(value)=>this.handleSelect(value, "ebayAccount")}
                                                style={{ width: 300 }}
                                                placeholder="请选择"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {ebayAccountDataList.map((v,i)=>{
                                                    return <Option value={v.id} key={i} >{v.id}</Option>
                                                })}
                                            </Select>
                                        )}
                                    </FormItem>
                                </StandardFormRow>
                                <StandardFormRow title="图库：" className="padding-xm-top">
                                    <FormItem>
                                        {getFieldDecorator('galleryModal',
                                            {
                                                rules: [{ required: true, message: '图库不能为空!' }],
                                            }
                                        )(
                                            <Select
                                                showSearch
                                                onChange={(value)=>this.handleSelect(value, "galleryAccount")}
                                                style={{ width: 300 }}
                                                placeholder="请选择"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {getGalleryListDataList.map((v,i)=>{
                                                    return <Option value={v.id} key={i} >{v.name}</Option>
                                                })}
                                            </Select>
                                        )}
                                    </FormItem>
                                </StandardFormRow>
                            </div>
                    }
                </Modal>
            </div>
        )
    }
}
export default Form.create()(modal)