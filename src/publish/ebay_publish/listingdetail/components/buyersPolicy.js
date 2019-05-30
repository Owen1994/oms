import React from 'react'
import {Form,Select,Input,Checkbox,message,Radio  } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'

export default class BuyersPolicy extends React.Component{

    handleCheck = (e, resetObj)=>{
        const {resetFields,} = this.props.form
        if(!e.target.checked){
            resetFields(resetObj)
        }
    }
    handleRadio =(e)=>{
        const {resetFields} = this.props.form
        if(e.target.value === 1){
            resetFields("buyerPolicy[buyers]")
        }
    }
    componentWillReceiveProps(nextProps,nextState){
        const {setFieldsValue} = this.props.form
        if(nextProps.buyerpolicyData !== this.props.buyerpolicyData){
            let privacy = nextProps.buyerpolicyData.privacy;
            if(privacy === 2) {
                setFieldsValue({
                    'buyerPolicy[privacy]' : true
                })
            }
        }
        // buyerpolicyData
    }
    render(){
        const {sellerReq,privacy,buyers} = this.props.buyerpolicyData;
        const {unReachable, pastTimes, isPaypalFlag, minScore} = buyers
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const isChecked = getFieldValue("buyerPolicy[privacy]")
        const site = getFieldValue("basicData[site]")
        
        return(
            <div className="buyers-policy">
                <StandardFormRow title={"对买家的要求："} required={true}>
                    <FormItem>
                        {getFieldDecorator("buyerPolicy[sellerReq]",{
                            initialValue: sellerReq
                        })(
                            <RadioGroup
                                onChange={this.handleRadio}
                            >
                                <Radio value={1}>允许所有买家购买此商品</Radio>
                                <Radio value={2}>阻止买家</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <div
                         className={getFieldValue("buyerPolicy[sellerReq]") === 2 ?
                            "prevent-conditions" : "prevent-conditions display-none"
                         }>
                        <div>
                            <FormItem>
                            {
                                getFieldDecorator(`buyerPolicy[buyers][isPaypalFlag][isSelect]`,{
                                    initialValue: isPaypalFlag.isSelect,
                                })(
                                    <Checkbox
                                        onChange={(e)=>this.handleCheck(e, [
                                            'buyerPolicy[buyers][isPaypalFlag][times]',
                                            'buyerPolicy[buyers][isPaypalFlag][days]'
                                        ])}
                                        checked = {getFieldValue(`buyerPolicy[buyers][isPaypalFlag][isSelect]`)}
                                    >
                                        Have received
                                        <FormItem>
                                            {getFieldDecorator(`buyerPolicy[buyers][isPaypalFlag][times]`,{
                                                initialValue: isPaypalFlag.times,
                                                rules:[{
                                                    required: getFieldValue('buyerPolicy[buyers][isPaypalFlag][isSelect]'),
                                                    message: '请选择'
                                                }]
                                            })(
                                                <Select
                                                    disabled={!getFieldValue(`buyerPolicy[buyers][isPaypalFlag][isSelect]`)}
                                                    style={{width: 50, marginLeft: 8, marginRight: -5}}
                                                >
                                                    <Option value={2} key={2}>2</Option>
                                                    <Option value={3} key={3}>3</Option>
                                                    <Option value={4} key={4}>4</Option>
                                                    <Option value={5} key={5}>5</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                        unpaid item strike(s) within
                                        <FormItem>
                                            {getFieldDecorator(`buyerPolicy[buyers][isPaypalFlag][days]`,{
                                                initialValue: isPaypalFlag.days,
                                                rules:[{
                                                    required: getFieldValue('buyerPolicy[buyers][isPaypalFlag][isSelect]'),
                                                    message: '请选择'
                                                }]
                                            })(
                                                <Select
                                                    disabled={!getFieldValue(`buyerPolicy[buyers][isPaypalFlag][isSelect]`)}
                                                    style={{width: 70, marginLeft: 8, marginRight: -8}}
                                                >
                                                    <Option value={30} key={1}>30</Option>
                                                    <Option value={180} key={2}>180</Option>
                                                    <Option value={360} key={3}>360</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                        days
                                    </Checkbox>
                                )
                            }
                        </FormItem>
                        </div>
                        <div>
                            <FormItem>
                                {
                                    getFieldDecorator("buyerPolicy[buyers][unReachable]",{
                                        initialValue: unReachable
                                    })(
                                        <Checkbox
                                            checked={getFieldValue("buyerPolicy[buyers][unReachable]")}
                                        >
                                            Are registered to countries i don't ship
                                        </Checkbox>
                                    )
                                }
                            </FormItem>
                        </div>
                        <div>
                            <FormItem>
                                {
                                    getFieldDecorator(`buyerPolicy[buyers][pastTimes][isSelect]`,{
                                        initialValue: pastTimes.isSelect
                                    })(
                                        <Checkbox
                                            checked={getFieldValue(`buyerPolicy[buyers][pastTimes][isSelect]`)}
                                            onChange = {(e)=>this.handleCheck(e,[
                                                'buyerPolicy[buyers][minScore][isSelect]',
                                                'buyerPolicy[buyers][minScore][score]',
                                                'buyerPolicy[buyers][pastTimes][times]'
                                            ])}
                                        >
                                            Have bid on or bought my items within the last 10 days and met my limit of
                                            <FormItem>
                                                {getFieldDecorator(`buyerPolicy[buyers][pastTimes][times]`,{
                                                    initialValue: pastTimes.times,
                                                    rules:[{
                                                        required: getFieldValue(`buyerPolicy[buyers][pastTimes][isSelect]`),
                                                        message: '请选择'
                                                    }]
                                                })(
                                                    <Select
                                                        disabled={!getFieldValue(`buyerPolicy[buyers][pastTimes][isSelect]`)}
                                                        style={{width: 70, marginLeft: 8}}
                                                    >
                                                        <Option value={1} key={1}>1</Option>
                                                        <Option value={2} key={2}>2</Option>
                                                        <Option value={3} key={3}>3</Option>
                                                        <Option value={4} key={4}>4</Option>
                                                        <Option value={5} key={5}>5</Option>
                                                        <Option value={6} key={6}>6</Option>
                                                        <Option value={7} key={7}>7</Option>
                                                        <Option value={8} key={8}>8</Option>
                                                        <Option value={9} key={9}>9</Option>
                                                        <Option value={10} key={10}>10</Option>
                                                        <Option value={25} key={11}>25</Option>
                                                        <Option value={50} key={12}>50</Option>
                                                        <Option value={75} key={13}>75</Option>
                                                        <Option value={100} key={14}>100</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Checkbox>
                                    )
                                }
                            </FormItem>
                        </div>
                        <div>
                            <FormItem>
                                {
                                    getFieldDecorator("buyerPolicy[buyers][minScore][isSelect]",{
                                        initialValue: minScore.isSelect
                                    })(
                                        <Checkbox
                                            checked={getFieldValue('buyerPolicy[buyers][minScore][isSelect]')}
                                            disabled={!getFieldValue(`buyerPolicy[buyers][pastTimes][isSelect]`)}
                                            onChange={(e)=>{this.handleCheck(e, 'buyerPolicy[buyers][minScore][score]')}}
                                        >
                                            Only apply to buyers with a feedback score less than or equal to
                                            <FormItem>
                                                {getFieldDecorator("buyerPolicy[buyers][minScore][score]",{
                                                    initialValue: minScore.score,
                                                    rules:[{
                                                        required: getFieldValue('buyerPolicy[buyers][minScore][isSelect]'),
                                                        message: '请选择'
                                                    }]
                                                })(
                                                    <Select
                                                        disabled={!getFieldValue('buyerPolicy[buyers][minScore][isSelect]')}
                                                        style={{width: 70, marginLeft: 8}}
                                                    >
                                                        <Option value={0} key={0}>0</Option>
                                                        <Option value={1} key={1}>1</Option>
                                                        <Option value={2} key={2}>2</Option>
                                                        <Option value={3} key={3}>3</Option>
                                                        <Option value={4} key={4}>4</Option>
                                                        <Option value={5} key={5}>5</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Checkbox>
                                    )
                                }
                            </FormItem>
                        </div>
                    </div>
                </StandardFormRow>
                <StandardFormRow title={"买家隐私："} className={"buyers-privacy"}>
                    <FormItem style={{marginTop:12}}>
                        {
                            getFieldDecorator("buyerPolicy[privacy]",{
                                initialValue: privacy === 1 ? false : true
                            })(
                                <Checkbox
                                    checked = {isChecked}
                                >
                                    不公众展示买方名字
                                </Checkbox>
                            )
                        }
                        {
                            site === "186"?
                            <div className="fsz12 red margin-ss-top">ES站点买家隐私需勾选，否则会刊登失败</div>
                            : null
                        }
                    </FormItem>
                </StandardFormRow>
            </div>
        )
    }
}