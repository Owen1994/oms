import React, {Component} from 'react' 
import {
    Form,
    Button,
    Input,
    Icon,
    Tooltip
} from 'antd'
const FormItem = Form.Item;
import StandardFormRow from '../../common/searchModel/StandardFormRow';
import TagSelect from '../../common/searchModel/TagSelect';
import * as types from '../constants/ActionTypes';
import {closehandle, selectValues,} from '../../../util/baseTool';
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
                let isEnabled = this.props.tagSelectParams.isEnabled[0];
                let searchKey = {} ,newobj = {};
                searchKey['shopAccount'] = shopAccount?shopAccount:'';
                searchKey['isEnabled'] = typeof isEnabled == "number" ?isEnabled:'';
                newobj.searchKey = searchKey;
                newobj.pageNumber = 1;
                newobj.pageData = this.props.Storetablelist.pageSize || 20; //获取存放在redux中当前 每页显示的最大条数
                or && this.props.getStoreLsit(newobj);
                this.props.baseInfoForm({preValue:{searchKey:{...searchKey}}});
                this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}});
            }
        });
    }
    

    //重置按钮
    handleReset = () => {
        this.props.form.resetFields();
        this.props.baseInfoForm({preValue:{}});
        this.props.tagSelectParams.isEnabled = [''];
        this.props.getStoreLsit();  //刷新列表 
    }

    render() {
        const {getFieldDecorator } = this.props.form;
        const {tagSelectParams} = this.props;
        const defaultSearch = (
            <div>
                <StandardFormRow title="启用状态：">
                    <FormItem>
                        {getFieldDecorator('isEnabled')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.props.handleFormSubmit}
                                values = {tagSelectParams.isEnabled}    //选中项
                                datas={types.STATUS_OPEN}
                                name='isEnabled'
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
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
            </div>
        );

        return (
            <div className="storeListSearch">
                    <div className="organtop">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                                {defaultSearch}
                                <FormItem className="searchBtn">
                                    <Button type="primary" htmlType="submit" >
                                        搜索
                                    </Button>
                                    <Button type="default" onClick={this.handleReset}>
                                        重置
                                    </Button>
                                </FormItem>
                        </Form>
                    </div>
            </div>
        );
    }
}

export default Condition