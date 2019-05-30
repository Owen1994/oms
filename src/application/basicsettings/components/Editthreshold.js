import React, {Component} from 'react'
import {
    Form,
    Table,
    Modal,
    Row,
    Col,
    Select,
    Input
} from 'antd'
const Option = Select.Option;
const FormItem = Form.Item;
const confirm = Modal.confirm;
import '../css/css.css'


import StandardFormRow from '../../common/searchModel/StandardFormRow';
class Editthreshold extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        siteCurrency:'',    //币种
        siteCode:'',         //站点
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    //----自定义方法----

    //小数位长度验证
    checkNumber = (rule, value, callback) => {
        const numreg = /^(\d|[1-9]\d+)(\.\d{1,2})?$/;
        if (value && !numreg.test(value)) {
            callback('请输入正确数值,小数点最多为2位!');
        } else if (value == 0) {
            callback('请输入正确数值,小数点最多为2位!');
        } else if (value > 9999999.99) {
            callback('最大数值为9999999.99');
        }else {
            callback();
        }
    }

    addinputdata = ({name,  placeholder = '', initialValue = '', required = true, }) => (
        <FormItem className="ant-xs-row" {...{
            ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, validator: this.checkNumber,}], initialValue: initialValue,
            })(
                <Input  placeholder={placeholder} className="ant-xs-row" />
            )}
        </FormItem>)
    

    addtwoinput = ({name1,name2,  placeholder = '', initialValue1 = '',initialValue2 = '', required = true, }) => (
        <Row type="flex" justify="space-between">
            <Col span={10}>
                <FormItem>
                    {this.props.form.getFieldDecorator(name1, {
                        rules: [{required: required, validator: this.checkNumber,}], initialValue: initialValue1,
                    })(
                        <Input  placeholder={placeholder} />
                    )}
                </FormItem>
            </Col>
            <Col span={4}>
                <div className="mgT10"> ─ </div>
            </Col>
            <Col span={10}>
                <FormItem >
                    {this.props.form.getFieldDecorator(name2, {
                        rules: [{required: required, validator: this.checkNumber,}], initialValue: initialValue2,
                    })(
                        <Input  placeholder={placeholder} />
                    )}
                </FormItem>  
            </Col>
        </Row>
    )    
    
    //handleChange 站点选择
    handleChange = (e) => {
        let arr = e.split('_');
        this.setState({
            siteCurrency:arr[1]
        });
        this.props.EditthresholdAction({addSite:arr[0],addCurrency:arr[1]});
    }


    //clearState 清除state
    clearState = () => {
        this.props.form.resetFields();
        this.setState({
            siteCurrency:'',
        });
    }   

    //添加行
    addRow = () => {
        let count = this.props.Editthreshold.count;
        const {data} = this.props.Editthreshold;
        const newData = {
            key: `_`+count,
            No: ++count + '',
            retailPriceRange: {
                name1: `unitPriceStart` + count,
                name2: `unitPriceEnd` + count,
                placeholder: '请填写'
            },
            thresholdValue: {
                name: `thresholdValue` + count,
                placeholder: '请填写'
            }
        };
        this.props.EditthresholdAction({data: [...data, newData], count: count+1});


    }

    //删除行
    delRow = (e,index) => {
        this.showDeleteConfirm(index);
        this.props.EditthresholdAction({delkey:index});
    }
    //删除确认
    showDeleteConfirm = () => {
        let _this = this;
        confirm({
            maskClosable: true,
            title: '确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                const data = [..._this.props.Editthreshold.data];
                const delkey = _this.props.Editthreshold.delkey;
                data.splice(delkey, 1);
                _this.props.EditthresholdAction({data:data});
            }
        });
    }

    render() {
        let {getFieldDecorator} = this.props.form;              //表单
        let {record,data,siteData} = this.props.Editthreshold;          //弹窗reducer
        let siteCode =  Object.keys(record).length>0 ? record.siteCode : '';          //站点
        let siteCurrency = Object.keys(record).length>0 ? record.siteCurrency : this.state.siteCurrency;  //币种
        let newdata = data;             //弹窗上表格数据
        let isCurrency = siteCurrency?'/':'';     //是否有币种
        //表头
        let columns = [
            {
                title: `*零售价区间${isCurrency}${siteCurrency}`,
                dataIndex: 'retailPriceRange',
                width: 70,
                render:this.addtwoinput,
            },
            {
                title: `*阈值${isCurrency}${siteCurrency}`,
                dataIndex: 'thresholdValue',
                width: 40,
                render:this.addinputdata,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: 40,
                render:(text, record, index) => {
                    let _index = index;
                    return (
                        _index == 0 ?
                            (<div>
                                <a  onClick={this.addRow}>{'添加'}</a>
                            </div>) :
                            (<div>
                                <a  onClick={(e,index)=>{this.delRow(e,_index)}}>{'删除'}</a>
                            </div>)  
                    )
                }
            }];
        let children = [];
        siteData.length>0 &&  siteData.map((v,i)=>{
            children.push(<Option key={i} value={`${v.siteCode}_${v.siteCurrency}`}>{v.siteCode}</Option>);
        })
        return (
                <div className="newCluenk">
                    <div className="content">
                        <StandardFormRow title="站点：">
                            <FormItem>
                                {getFieldDecorator('siteCode',{initialValue:siteCode||'请选择'})(
                                    siteCode?(<Input className="antInput"  disabled={true}/>):
                                    (<Select
                                        style={{ width: '100%' }}
                                        onChange={(e)=>{this.handleChange(e)}}
                                    >
                                        {children}
                                    </Select>)
                                )}
                            </FormItem>
                        </StandardFormRow>
                        
                        <Table 
                        columns={columns} 
                        dataSource={newdata} 
                        bordered 
                        pagination={false} />
                       
                    </div>
                </div>
        );
    }
}

export default Editthreshold