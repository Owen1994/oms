import React, {Component} from 'react' 
import {
    Form,
    Icon,
    Button,
    Input,
    Radio,
    Tooltip
} from 'antd'
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import StandardFormRow from '../../../common/searchModel/StandardFormRow';
import * as types from '../constants/ActionTypes'
import {closehandle, selectValues,} from '../../../../util/baseTool';
class Condition extends Component {
    constructor(props) {
        super(props);
    }

    //搜索按钮
    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        const newobj = {};
        //ant表格校验方法
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let {shopAccount} = values;
                let searchKey = {};
                if(shopAccount){
                    searchKey['shopAccount'] = shopAccount;
                }
                if(this.props.Infos.areaValue.value){
                    searchKey[this.props.Infos.searchType.value] = this.props.Infos.areaValue.value.replace(/[\n]/g,',').replace(/[\s]/g,'');
                }
                newobj.searchKey = {...searchKey};
                newobj.pageNumber = 1;
                newobj.pageData = this.props.tablemodel.pageSize || 20; //获取存放在redux中当前 每页显示的最大条数
                or && this.props.fetchPosts({key: 'data', value: newobj});
                this.props.baseInfoForm({perValue:{searchKey:{...searchKey}}});         //perValue 记录请求参数用于分页
                this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}});
            }
        });
    }
    
    //重置按钮
    handleReset = () => {
        this.props.form.resetFields();
        this.props.baseInfoForm({searchType:{value:'asin'},perValue:{}});
        this.props.fetchPosts({
            key: 'data', value:{
                pageNumber: 1,
                pageData: 20,
            }
        });
    }

    render() {
        const {getFieldDecorator } = this.props.form;
        const defaultSearch = (
            <div>
                <StandardFormRow title="销售账号：">
                    <FormItem>
                        <Tooltip
                            trigger={['hover']}
                            title={this.props.Infos.shopAccount?this.props.Infos.shopAccount.value:''}
                            placement="bottomLeft"
                            mouseEnterDelay={0.3}       //延迟显示 单位(秒)
                            overlayClassName="tipBox"
                        >
                            {getFieldDecorator('shopAccount')(
                                <Input  
                                    readOnly 
                                    placeholder={`请选择销售账号`}
                                    onClick={selectValues({
                                        obj: this,
                                        url: '/arm/motan/service/api/IArmService/searchMyShopAccount',
                                        title: '销售账号',
                                        name: 'shopAccount',
                                        id: 'shopAccountId',
                                        type:'multiple',
                                        num:10
                                    })}
                                    
                                />    
                            )}
                            {getFieldDecorator('shopAccountId')(
                                <Input readOnly type="hidden"/>
                            )}
                            <Icon type="close-circle" className="commonClose" onClick={(e) => {
                                closehandle(e, this)
                            }}/>
                        </Tooltip>
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="搜索类型：">
                    <FormItem>
                        {getFieldDecorator('searchType', {
                            rules: [{ required: false, message: '请选择' }],
                            initialValue: 'asin',
                        })(
                            <RadioGroup size="small">
                                {types.SEARCH_TYPES.map((v,i)=>{
                                  return  <RadioButton value={`${v.key}`} key={i}>{v.value}</RadioButton>
                                })}
                            </RadioGroup>
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="搜索内容：">
                    <FormItem>
                        {getFieldDecorator('areaValue', {
                            initialValue: '',
                        })(
                            <TextArea rows={2} placeholder={`支持多个搜索条件换行精确搜索`} autosize={{ minRows: 2, maxRows: 15 }}/>
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );

        const btnSearch = (
            <FormItem className="searchBtn">
                <Button type="primary" htmlType="submit" >
                    搜索
                </Button>
                <Button type="default" onClick={this.handleReset}>
                    重置
                </Button>
            </FormItem>
        );

        return (
            <div className="IndemnifiedSearch">
                    <div>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                                {defaultSearch}
                                {btnSearch}
                        </Form>
                    </div>
            </div>
        );
    }
}

export default Condition