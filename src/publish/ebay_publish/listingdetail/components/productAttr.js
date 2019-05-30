import React from 'react'
import {Form,Select,Button,Icon,Input,message} from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'
import ItemSelect from '../../../../common/components/itemSelect'
import * as types from "../constants/reducerTypes";
// import {GET_TRANSPORT_TEMP} from "../constants/api";
import {GET_AUTOPARTS_BY_CATEGORY} from "../../../common/constants/actionTypes";
import qs from "qs";
let uuid = 0; // 动态新增表单域的key值

export default class ProductAttr extends React.Component{

    remove = (k, idArr) => {   // 移除新增表单
        const { form } = this.props;
        const keys = form.getFieldValue(idArr);
        // 至少保留一项时
        // if (keys.length === 1) {
        //     return;
        // }

        // can use data-binding to set
        form.setFieldsValue({
            [idArr]: keys.filter(key => key !== k),
        });
    }
    add = () => {  // 动态添加表单
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        let newProductAttr = form.getFieldValue("newProductAttr");
        // let newProductAttr1 = form.getFieldValue("newProductAttr1");
        newProductAttr = newProductAttr ? newProductAttr : [];
        const nextKeys = keys.concat(uuid);
        const productAttrLen = newProductAttr.length + nextKeys.length;
        // console.log(keys,nextKeys)
        // if(productAttrLen > 25){
        //     message.warning("产品属性总数不能超过25项！");
        //     return
        // }
        uuid++;
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    removeCustom = (i) => {   // 移除新增表单
        const {productattrData} = this.props;
        // const { getFieldValue,setFieldsValue } = this.props.form;
        // let keys = getFieldValue(idArr);
        let keys = [...productattrData];
        // console.log("i", i)
        // console.log("keys", keys)
        keys = keys.filter(key => {
            return key !== keys[i]
        })

        this.props.editProductAttrAction(types.ADD_PRODUCTATTR, keys)
        // console.log("keys1", keys)
        return
    }
    inputLength = (e,len)=>{
        let val = e.target.value
        if(val.length > len){
            e.target.value = val.slice(0, len);
            if(len === 40){
                message.info(`属性名不能超过${len}个字符`)
            }
            if(len === 47){
                message.info(`属性值不能超过${len}个字符`)
            }
        }
    }
    /**
     * 作者: pzt
     * 描述:
     * 时间: 2018/8/31 8:56
     * @param <value> select 的值
     * @param <id> 表单id
     * @param <type> 产品属性类型
     **/
    handleTypeVal = (value,id, type)=>{
        const {setFieldsValue} = this.props.form;
        if(type === 2){
            setFieldsValue({
                [id]: value
            })
        }
    }
    // 下拉框同步reducer/state的值
    handleReduxVal =(value, option, type, key)=>{
        if(type === -2){
            this.props.editComponentDataAction(types.ADD_BASICDATA, key, {
                autoPartsId: option.value,
                autoPartsName: option.children
            })
        }
    }
    /**
     * 作者:
     * 描述: 下拉框异步加载数据前的校验函数
     * 时间: 2018/9/3 11:08
     * @param <number> fields 要拦截的字段名集合 "no" 代表不做拦截
     **/
    handleFocusBefore = (fields)=>{
        const {site} = this.props.basicData;
        const {getFieldValue} = this.props.form;
        let categoryId = getFieldValue("ebayCategoryId1")
        if(fields === "no"){
            return true
        }
        if(fields instanceof Array && fields.length > 0){
            for(let i =0; i < fields.length; i++){
                if(fields[i] === "site"){
                    if(!site){
                        message.info("请先选择站点")
                        return false
                    }
                }
                if(fields[i] === "categoryId"){
                    if(!categoryId){
                        message.info("请选择eBay分类1！")
                        return false
                    }
                }
            }
        }else{
            message.warning("校验字段传入格式有误")
        }
        return true
    }
    // 操作父级改变子级的数据
    handleParentSelected = (i,value,childrenValue,id)=>{
        const locationArr = window.location.href.split('?');
        let paramsObj = locationArr.length > 1 ? qs.parse(locationArr[1]) : '';
        const pageType = paramsObj['type'] ? paramsObj['type'] : '';
        if(pageType){
            this.props.form.setFieldsValue({
                [id]: ""
            })
        }else{
            this.props.form.resetFields(id); // 清除子集已选项
        }
        let array = [];
        for(let i = 0; i < childrenValue.length; i++){
            const v = childrenValue[i];
            if(v.parentValue === value){
                v.childrenValues.forEach(item => {
                    array = item.childValue;
                });
                break;
            }
        }
        this.props.productSelectAction({key: i, value: array});
    }

    // componentWillReceiveProps(nextProps){
    //     const newProductAttr = nextProps.form.getFieldValue('newProductAttr');
    //     const preProductAttr = this.props.form.getFieldValue('newProductAttr');
    //     if(preProductAttr!==newProductAttr){
    //         console.log("newProductAttr :", newProductAttr);
    //         for(let key in newProductAttr){
    //             if(newProductAttr[key])
    //         }
    //     }
    // }
    render(){
        const {productattrData} = this.props;
        const {autoPartsObj,site} = this.props.basicData;
        const {isItemCompatibilityEnabled,isItemSpecificsEnabled} = this.props.anotherData;
        const {getFieldDecorator,getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <div key={k} className={"dynamic-content margin-sm-bottom"}>
                    <FormItem>
                        {getFieldDecorator(`newProductAttr1[${k}][name]`)(
                            <Input
                                onChange={(e)=>this.inputLength(e,40)}
                                placeholder="属性名" className="input1"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator(`newProductAttr1[${k}]value[0]`)(
                            <Input
                                onChange={(e)=>this.inputLength(e,47)}
                                placeholder="属性值"  className="input2" />
                        )}
                    </FormItem>
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k, "keys")}
                    />
                    <FormItem>
                        {getFieldDecorator(`newProductAttr1[${k}][isCustom]`,{
                            initialValue: true
                        })(
                            <Input type={"hidden"}/>
                        )}
                    </FormItem>
                </div>
            );
        });
        let productAttrs = [];
        if(productattrData.length > 0 && productattrData[0]){
            productAttrs = productattrData.map((v, i)=>{
                let required = v.isRequired ? v.isRequired :false;
                let option = null;
                if(v.isCustom){   // 自定义结构
                    option =
                        <StandardFormRow>
                            <div className="margin-sm-left">
                                <FormItem>
                                    {getFieldDecorator(`newProductAttr[${i}]name`,{
                                        initialValue: v.name
                                    })(
                                        <Input
                                            onChange={(e)=>this.inputLength(e,40)}
                                            type={"text"} className="input1" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator(`newProductAttr[${i}]value[0]`,{
                                        initialValue: v.matchVal ? v.matchVal[0] : v.value[0]
                                    })(
                                        <Input
                                            onChange={(e)=>this.inputLength(e,47)}
                                            type={"text"} className="input2" />
                                    )}
                                </FormItem>
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    onClick={() => this.removeCustom(i, "newProductAttr")}
                                />
                                <FormItem>
                                    {getFieldDecorator(`newProductAttr[${i}]isCustom`,{
                                        initialValue: v.isCustom
                                    })(
                                        <Input type={"hidden"} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator(`newProductAttr[${i}]isRequired`,{
                                        initialValue: required
                                    })(
                                        <Input type={"hidden"} />
                                    )}
                                </FormItem>
                            </div>
                        </StandardFormRow>
                }else{
                    if(!v.children){  // 无子级结构
                        option =
                            <StandardFormRow title={v.name}  required={required}>
                            <FormItem>
                                {getFieldDecorator(`newProductAttr[${i}]name`,{
                                    initialValue: v.name
                                })(
                                    <Input type={"hidden"} />
                                )}
                            </FormItem>
                            {v.type === 1
                                ? <FormItem>
                                    {getFieldDecorator(`newProductAttr[${i}]value[0]`,{
                                        rules: [{
                                            required: required,
                                            message: '请输入属性值',
                                        }],
                                        initialValue: v.matchVal ? v.matchVal[0] : ''
                                    })(
                                        <Input type="text" placeholder="请输入属性值"  />
                                    )}
                                    {
                                        v.winfo === 1 ? 
                                        <span style={{marginLeft: 10, color: '#f00'}}>
                                            必填
                                        </span>
                                        :
                                        null
                                    }
                                </FormItem>
                                : null
                            }
                            {v.type === 2 || v.type === 3 ?
                                <FormItem>
                                    {getFieldDecorator(`newProductAttr[${i}]value[0]`,{
                                        rules: [{
                                            required: required,
                                            message: '请选择属性值',
                                        }],
                                        initialValue: v.matchVal ? v.matchVal[0] : ''
                                    })(
                                        <Select
                                            showSearch={v.type === 2 ? true : false}
                                            onSearch={(value)=>this.handleTypeVal(value,`newProductAttr[${i}]value[0]`, v.type)}
                                            style={{ width: 330 }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {v.value.map((v,i)=>{
                                                return <Option value={`${v}`} key={i} >{v}</Option>
                                            })}
                                        </Select>
                                    )}
                                    {
                                        v.winfo === 1 ? 
                                        <span style={{marginLeft: 10, color: '#f00'}}>
                                            必填
                                        </span>
                                        :
                                        null
                                    }
                                </FormItem>
                                : null
                            }
                            {v.type === 4 || v.type === 5 ?
                                <FormItem>
                                    {getFieldDecorator(`newProductAttr[${i}]value`,{
                                        rules: [{
                                            required: required,
                                            message: '请选择属性值',
                                        }],
                                        initialValue: v.matchVal ? v.matchVal : []
                                    })(
                                        <Select
                                            mode={(()=>{
                                                if(v.type === 4){
                                                    return 'tags'
                                                }
                                                if(v.type === 5){
                                                    return 'multiple'
                                                }
                                            })()}
                                            style={{ width: 330 }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {v.value.map((v,i)=>{
                                                return <Option value={`${v}`} key={i} >{v}</Option>
                                            })}
                                        </Select>
                                    )}
                                    {
                                        v.winfo === 1 ? 
                                        <span style={{marginLeft: 10, color: '#f00'}}>
                                            必填
                                        </span>
                                        :
                                        null
                                    }
                                </FormItem>
                                : null
                            }
                            <FormItem>
                                {getFieldDecorator(`newProductAttr[${i}]isCustom`,{
                                    initialValue: v.isCustom
                                })(
                                    <Input type={"hidden"} />
                                )}
                            </FormItem>
                                <FormItem>
                                    {getFieldDecorator(`newProductAttr[${i}]isRequired`,{
                                        initialValue: required
                                    })(
                                        <Input type={"hidden"} />
                                    )}
                                </FormItem>
                        </StandardFormRow>
                    }else{    // 父子关联结构
                        option =
                            <div>
                                <StandardFormRow title={v.name}  required={required}>
                                    <FormItem>
                                        {getFieldDecorator(`newProductAttr[${i}]name`,{
                                            initialValue: v.name
                                        })(
                                            <Input type={"hidden"} />
                                        )}
                                    </FormItem>
                                    {v.type === 2 || v.type === 3 ?
                                        <FormItem>
                                            {getFieldDecorator(`newProductAttr[${i}]value[0]`,{
                                                rules: [{
                                                    required: required,
                                                    message: '请选择属性值',
                                                }],
                                                initialValue: v.matchVal ? v.matchVal[0] : ''
                                            })(
                                                <Select
                                                    showSearch={v.type === 2 ? true : false}
                                                    onSearch={(value)=>this.handleTypeVal(value,`newProductAttr[${i}]value[0]`, v.type)}
                                                    style={{ width: 330 }}
                                                    placeholder="请选择"
                                                    onChange={(value)=>this.handleParentSelected(i,value, v.valueRef, `newProductAttr[${i}][children][0]value[0]`)}
                                                >
                                                    {v.value.map((v,i)=>{
                                                        return <Option value={`${v}`} key={i} >{v}</Option>
                                                    })}
                                                </Select>
                                            )}
                                            {
                                                v.winfo === 1 ? 
                                                <span style={{marginLeft: 10, color: '#f00'}}>
                                                    必填
                                                </span>
                                                :
                                                null
                                            }
                                        </FormItem>
                                        : null
                                    }
                                    {v.type === 4 || v.type === 5 ?
                                        <FormItem>
                                            {getFieldDecorator(`newProductAttr[${i}]value`,{
                                                rules: [{
                                                    required: required,
                                                    message: '请选择属性值',
                                                }],
                                                initialValue: v.matchVal ? v.matchVal : []
                                            })(
                                                <Select
                                                    mode={(()=>{
                                                        if(v.type === 4){
                                                            return 'tags'
                                                        }
                                                        if(v.type === 5){
                                                            return 'multiple'
                                                        }
                                                    })()}
                                                    style={{ width: 330 }}
                                                    placeholder="请选择"
                                                    onChange={(value)=>this.handleParentSelected(i,value, v.valueRef,`newProductAttr[${i}][children][0]value`)}
                                                >
                                                    {v.value.map((v,i)=>{
                                                        return <Option value={`${v}`} key={i} >{v}</Option>
                                                    })}
                                                </Select>
                                            )}
                                            {
                                                v.winfo === 1 ? 
                                                <span style={{marginLeft: 10, color: '#f00'}}>
                                                    必填
                                                </span>
                                                :
                                                null
                                            }
                                        </FormItem>
                                        : null
                                    }
                                    <FormItem>
                                        {getFieldDecorator(`newProductAttr[${i}]isCustom`,{
                                            initialValue: v.isCustom
                                        })(
                                            <Input type={"hidden"} />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator(`newProductAttr[${i}]isRequired`,{
                                            initialValue: required
                                        })(
                                            <Input type={"hidden"} />
                                        )}
                                    </FormItem>
                                </StandardFormRow>
                                {v.children.map((cItem,cIndex)=>{  // 子级内容
                                    // const parentContent = getFieldValue(`newProductAttr[${i}]value`);
                                   return <StandardFormRow title={cItem.name}  required={cItem.isRequired} key={cIndex}>
                                       <FormItem>
                                           {getFieldDecorator(`newProductAttr[${i}][children][${cIndex}]name`,{
                                               initialValue: cItem.name
                                           })(
                                               <Input type={"hidden"} />
                                           )}
                                       </FormItem>
                                       {cItem.type === 1
                                           ? <FormItem>
                                               {getFieldDecorator(`newProductAttr[${i}][children][${cIndex}]value[0]`,{
                                                   rules: [{
                                                       required: cItem.isRequired,
                                                       message: '请输入属性值',
                                                   }],
                                                   initialValue: cItem.matchVal ? cItem.matchVal[0] : ''
                                               })(
                                                   <Input
                                                       type="text"
                                                       placeholder="请输入属性值"
                                                   />
                                               )}
                                           </FormItem>
                                           : null
                                       }
                                       {cItem.type === 2 || cItem.type === 3 ?
                                           <FormItem>
                                               {getFieldDecorator(`newProductAttr[${i}][children][${cIndex}]value[0]`,{
                                                   rules: [{
                                                       required: cItem.isRequired,
                                                       message: '请选择属性值',
                                                   }],
                                                   initialValue: cItem.matchVal ? cItem.matchVal[0] : ''
                                               })(
                                                   <Select
                                                       showSearch={cItem.type === 2 ? true : false}
                                                       onSearch={(value)=>this.handleTypeVal(value,`newProductAttr[${i}][children]value[0]`, cItem.type)}
                                                       style={{ width: 330 }}
                                                       placeholder="请选择"
                                                   >
                                                       {cItem.value.map((cV,cI)=>{
                                                           return <Option value={`${cV}`} key={cI} >{cV}</Option>
                                                       })}
                                                   </Select>
                                               )}
                                           </FormItem>
                                           : null
                                       }
                                       {cItem.type === 4 || cItem.type === 5 ?
                                           <FormItem>
                                               {getFieldDecorator(`newProductAttr[${i}][children][${cIndex}]value`,{
                                                   rules: [{
                                                       required: cItem.isRequired,
                                                       message: '请选择属性值',
                                                   }],
                                                   initialValue: cItem.matchVal ? cItem.matchVal : []
                                               })(
                                                   <Select
                                                       mode={(()=>{
                                                           if(cItem.type === 4){
                                                               return 'tags'
                                                           }
                                                           if(cItem.type === 5){
                                                               return 'multiple'
                                                           }
                                                       })()}
                                                       style={{ width: 330 }}
                                                       placeholder="请选择"
                                                   >
                                                       {cItem.value.map((cV,cI)=>{
                                                           return <Option value={`${cV}`} key={cI} >{cV}</Option>
                                                       })}
                                                   </Select>
                                               )}
                                           </FormItem>
                                           : null
                                       }
                                       <FormItem>
                                           {getFieldDecorator(`newProductAttr[${i}][children][${cIndex}]isCustom`,{
                                               initialValue: cItem.isCustom
                                           })(
                                               <Input type={"hidden"} />
                                           )}
                                       </FormItem>
                                   </StandardFormRow>
                                })}
                            </div>
                    }
                }
                return(
                    <div key={i} className={" margin-sm-bottom"}>
                        {option}
                    </div>
                )
            });
        }
        return(
            <div className="product-attr">
                {isItemCompatibilityEnabled
                    ? <StandardFormRow title={"汽配档案："} className="padding-ss-left">
                        <FormItem>
                            <ItemSelect
                                dName={autoPartsObj ? autoPartsObj.name:""}
                                dValue={autoPartsObj ? `${autoPartsObj.id}`:""}
                                formName="basicData[autoPartsId]"   // 表单提交的key
                                disabled={false}
                                getFieldDecorator={getFieldDecorator} // form双向绑定
                                name="name"
                                code="id"
                                url={GET_AUTOPARTS_BY_CATEGORY}
                                params={{categoryId: getFieldValue("ebayCategoryId1"), siteId: site}}
                                rules={{
                                    initialValue: autoPartsObj ?`${autoPartsObj.id}`:"",
                                }}
                                className={'item-select'}
                                apiListType={2}
                               // onChange={(value, option)=>this.handleReduxVal(value,option, -2, 'autoPartsObj')}
                                onFocusBefore={()=>this.handleFocusBefore(["site","categoryId" ])}
                            />
                        </FormItem>
                    </StandardFormRow>
                    : null }
                {productAttrs}
                <StandardFormRow>
                    {formItems}
                    <div className="dynamic-btn">
                        {isItemSpecificsEnabled ?
                        <FormItem>
                            <Button type="dashed" onClick={this.add}>
                                <Icon type="plus" /> 新增属性
                            </Button>
                        </FormItem>
                        : null}
                    </div>
                </StandardFormRow>
            </div>
        )
    }
}
