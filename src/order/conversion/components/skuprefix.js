/**
 *作者: 任贸华
 *功能描述: SKU解析配置渲染组件
 *参数说明:
 *时间: 2018/4/16 11:34
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
} from 'antd'
import '../css/css.css'
import * as config from "../../../util/connectConfig";
import Modalmodel from '../../../components/modalmodel'
import {skuprefixTableaction} from "../actions";
import axios from "../../../util/axios";
import {closehandle, datasaddkey, selectValues, timestampFromat} from "../../../util/baseTool";
import CSelect from '../../../components/cselect';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class WarehouseOrder extends React.Component {

    state = {
        commonLogisticsarr: [],
        commonPositionarr: [],
        commonWarehousearr: [],
        commonSkucharacterarr: [],
        readonly: true,
        formloading: true,
        isShowLog: false,
    };

    /**
     *作者: 任贸华
     *功能描述: SKU解析配置 请求后台接口
     *参数说明:
     *时间: 2018/4/17 9:51
     */
    componentDidMount() {
        const {commonLogistics, commonPosition, commonWarehouse, commonSkucharacter} = this.props.commonSelectData;
        const commonLogisticsarr = commonLogistics ? commonLogistics.map((v, i) => <Option key={i}
                                                                                           value={v.id}>{v.name}</Option>) : [];
        const commonPositionarr = commonPosition ? commonPosition.map((v, i) => <Option key={i}
                                                                                        value={v.id}>{v.name}</Option>) : [];
        const commonWarehousearr = commonWarehouse ? commonWarehouse.map((v, i) => <Option key={i}
                                                                                           value={v.id}>{v.name}</Option>) : [];
        const commonSkucharacterarr = commonSkucharacter ? commonSkucharacter.map((v, i) => <Option key={i}
                                                                                                    value={v.id}>{v.name}</Option>) : [];
        this.setState({
            commonLogisticsarr,
            commonPositionarr,
            commonWarehousearr,
            commonSkucharacterarr,
        });
        axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.state === '000001') {
                        const data = response.data.data;
                        // SKU前后缀规则配置
                        const skuprefix = data.skuprefix;
                        const newskuprefix = datasaddkey(skuprefix);
                        const skuprefixarr = newskuprefix.length ? newskuprefix.map((v, i) => {
                            return ({
                                key: ++i + '',
                                No: i + '',
                                id: v.id,
                                suffix: {
                                    name: `suffix${v.key}`,
                                    initialValue: v.suffix,
                                    message: '请输入',
                                    placeholder: '请输入',
                                    readonly: false,
                                },
                                position: {
                                    name: `position${v.key}`,
                                    initialValue: v.position,
                                    message: '请输入',
                                    placeholder: '请输入',
                                },
                                country: {
                                    name: `country${v.key}`,
                                    initialValue: v.country,
                                    message: '请选择',
                                    placeholder: '请选择',
                                },
                                countryName: {
                                    name: `countryName${v.key}`,
                                    initialValue: v.countryName,
                                    message: '请选择',
                                    placeholder: '请选择',
                                },
                                Warehouse: {
                                    name: `Warehouse${v.key}`,
                                    initialValue: v.Warehouse,
                                    message: '请选择',
                                    placeholder: '请选择',
                                },
                                goodschannel: {
                                    name: `goodschannel${v.key}`,
                                    initialValue: v.goodschannel,
                                    message: '请选择',
                                    placeholder: '请选择',
                                    required: false,

                                },
                                priority: {
                                    name: `priority${v.key}`,
                                    initialValue: v.priority,
                                    message: '请输入',
                                    placeholder: '请输入',
                                    type: 'number'
                                },
                                demo: {
                                    name: `demo${v.key}`,
                                    initialValue: v.demo,
                                    message: '请输入',
                                    placeholder: '请输入',
                                    required: false,

                                },
                                state: {
                                    name: `state${v.key}`,
                                    initialValue: v.state,
                                    message: '请输入',
                                    placeholder: '请输入',

                                }, Operation: '删除',
                            })
                        }) : [];
                        // 字符规则
                        const skuchars = data.skuchars;
                        const newskuchars = datasaddkey(skuchars);
                        const newskucharsarr = newskuchars.length ? newskuchars.map((v, i) => {
                            return ({
                                key: ++i + '',
                                No: i + '',
                                id: v.id,
                                chars: {
                                    name: `chars${v.key}`,
                                    initialValue: v.chars,
                                    message: '请输入包裹单号',
                                    placeholder: '请输入包裹单号',
                                    readonly: false,
                                },
                                charsrule: {
                                    name: `charsrule${v.key}`,
                                    initialValue: v.rule,
                                    message: '请输入发货状态',
                                    placeholder: '请输入发货状态',

                                },
                                charsdemo: {
                                    name: `charsdemo${v.key}`,
                                    initialValue: v.demo,
                                    message: '请输入发货仓',
                                    placeholder: '请输入发货仓',

                                },
                                charsstate: {
                                    name: `charsstate${v.key}`,
                                    initialValue: v.state,
                                    message: '请输入物流渠道',
                                    placeholder: '请输入物流渠道',

                                },
                                Operation: '删除',
                            })
                        }) : [];
                        // 日志
                        const log = data.log;
                        const newlog = datasaddkey(log);

                        this.props.skuprefixTableaction({
                            data: skuprefixarr,
                            count: skuprefixarr.length + 1,
                            characterdata: newskucharsarr,
                            charactercount: newskucharsarr.length + 1,
                            log: newlog,
                        })
                    }
                }
            }).catch(e => {
            console.log(e);
        })
    }

    formItemLayout = {
        wrapperCol: {span: 24}
    };

    /*
    addinputdata2 = ({name, message, placeholder = '', initialValue = '', readonly = true, required = false,}, record, index) => {
        const ID = name;
        const num = name.match(/\d+/g)[0];
        const newname = name.replace(/(.*?)\d+/g, '$1') + 'Name' + num;
        const countryName = record.countryName ? record.countryName.initialValue : ''
        return (
            <FormItem
                className={'wfull'}
                {...{
                    ...this.formItemLayout, ...{
                        wrapperCol: {
                            span: 24,
                        }
                    }}}
            >
                {
                    this.props.form.getFieldDecorator(newname, {
                        rules: [{required: true, message: message},], initialValue: countryName,
                    })(
                        <CSelect
                            // list={details ? [details.platform] : []} // 默认值列表
                            // list={[]}
                            placeholder={placeholder}
                            className={'wfull'}
                            maxLength={30}
                            code='id' // 列表编码字段
                            name='name' // 列表名称字段
                            url={'/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData'}
                            // mode='multiple' // 是否多选
                            // maxCount={5} // 最多选择项数量
                            formType={1}  // 表单数据类型，不填就是默认值，填1返回对象label
                            params={{ searchColumn: 'name', pageData: 30, pageNumber: 1 }} // 搜索参数
                            apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                            style={{ width: 100 }}
                            localSearch={1}
                        />
                    )
                }
            </FormItem>
        )
    };
    */


    addinputdata = ({name, message, placeholder = '', initialValue = '', disabled = false, readonly = false, required = true, type = 'string',}) => (
        <FormItem className={'wfull'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, type: type},], initialValue: initialValue,
            })(
                <Input
                    disabled={disabled}
                    placeholder={placeholder}
                    className={'wfull'}
                    readOnly={readonly}
                    maxLength={30}
                />
            )}
        </FormItem>
    );

    priority = (rule, value, callback) => {
        const numreg = /^\d+$/;
        if (!numreg.test(value)) {
            callback('请输入数字')
        } else {
            callback()
        }
    };

    addinputdata3 = ({name, message, placeholder = '', initialValue = '', disabled = false, readonly = false, required = false, type = 'string',}) => (
        <FormItem className={'wfull'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{validator: this.priority}], initialValue: initialValue,
            })(
                <Input
                    disabled={disabled}
                    placeholder={placeholder}
                    className={'wfull'}
                    readOnly={readonly}
                    maxLength={30}
                />
            )}
        </FormItem>);

    Modalshow = (index) => () => {
        this.props.modalmodelaction({visible: true,});
        this.props.skuprefixTableaction({delkey: index,})
    };

    /*
    characterModalshow = (index) => () => {
        this.props.modalmodelaction({delcharactervisible: true,});
        this.props.skuprefixTableaction({delkey: index,})
    };
    */

    addselectdata = ({name, message, initialValue = undefined, required = true, placeholder = ''}) => {
        const {
            commonLogisticsarr,
            commonPositionarr,
            commonWarehousearr,
            commonSkucharacterarr,
        } = this.state;
        let arr = [];
        if (name.match(/position/)) {
            arr = commonPositionarr
        } else if (name.match(/Warehouse/)) {
            arr = commonWarehousearr
        } else if (name.match(/goodschannel/)) {
            arr = commonLogisticsarr
        } else if (name.match(/charsrule/)) {
            arr = commonSkucharacterarr
        } else if (name.match(/state/)) {
            arr = [{name: '启用', id: 1}, {name: '停用', id: 2}].map((v, i) => <Option key={i}
                                                                                   value={v.id}>{v.name}</Option>)
        }

        return (
            <FormItem
                {...this.formItemLayout}
            >
                {this.props.form.getFieldDecorator(name, {
                    rules: [{required: required, message: message}], initialValue: initialValue
                })(
                    <Select className={'wfullhaha'} placeholder="请选择">
                        {arr}
                    </Select>
                )}
            </FormItem>)
    };

    editshow = (record) => () => {

        const suffix = record.suffix.name;
        const position = record.position.name;
        // const country = record.country.name;
        // const countryName = 'countryName' + record.key;
        const priority = record.priority.name;
        // const demo = record.demo.name;
        const state = record.state.name;
        // const goodschannel = record.goodschannel.name;
        const Warehouse = record.Warehouse.name;
        const arr = [suffix, position, priority, state, Warehouse];

        this.props.form.validateFields(arr, (err, values) => {
            if (!err) {
                this.props.modalmodelaction({skuprefixvisible: true});
                this.props.skuprefixTableaction({record: record})
            }
        })
    };

    /*
    charactereditshow = (record) => () => {
        const chars = record.chars.name;
        const state = record.charsstate.name;
        const demo = record.charsdemo.name;
        const rule = record.charsrule.name;
        const arr = [chars, state, rule, demo];
        this.props.form.validateFields(arr, (err, values) => {
            if (!err) {
                this.props.modalmodelaction({okcharactervisible: true})
                this.props.skuprefixTableaction({record: record})
            }
        })
    };
    */

    /**
     *作者: 任贸华
     *功能描述: SKU前后缀保存请求
     *参数说明:
     *时间: 2018/4/17 9:54
     */
    editOK = () => {
        const {record} = this.props.skuprefixtable;
        const id = record.id;
        const suffix = record.suffix.name;
        const position = record.position.name;
        // const country = record.country.name;
        // const countryName = 'countryName' + record.key;
        const priority = record.priority.name;
        // const demo = record.demo.name;
        const state = record.state.name;
        // const goodschannel = record.goodschannel.name;
        const Warehouse = record.Warehouse.name;
        const obj = this.props.form.getFieldsValue([suffix, position, priority, state, Warehouse]);
        const newobj = {
            id: id,
            suffix: obj[suffix],
            position: obj[position],
            // country: obj[country],
            // countryName: obj[countryName][0].name,  // 使用CSelect组件后需要返回对象拿到name传给接口
            priority: obj[priority],
            // demo: obj[demo],
            state: obj[state],
            // goodschannel: obj[goodschannel],
            Warehouse: obj[Warehouse],
        };


        axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/addOrUpdateRuleSkuConvert`, newobj)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.state === '000001') {
                        message.success(response.data.msg)
                        //this.props.modalmodelaction({skuprefixvisible: false})
                        this.componentDidMount()  //拉取整个弹窗数据
                        this.props.modalmodelaction({ModalText: '保存中···', confirmLoading: true})
                        setTimeout(() => {
                            //this.props.skuprefixTableaction({data: data,});
                            this.props.modalmodelaction({
                                skuprefixvisible: false,
                                confirmLoading: false,
                            });
                        }, 1500);


                    } else {
                        message.error(response.data.msg)
                    }
                }
            }).catch(e => {
            console.log(e)
        })
    }

    /**
     *作者: 任贸华
     *功能描述: 现在SKU字符配置保存请求
     *参数说明:
     *时间: 2018/4/17 9:55
     */
    /*
    charactereditOK = () => {
        const {record} = this.props.skuprefixtable
        const id = record.id;
        const chars = record.chars.name
        const state = record.charsstate.name
        const demo = record.charsdemo.name
        const rule = record.charsrule.name
        const obj = this.props.form.getFieldsValue([chars, state, rule, demo])
        const newobj = {
            id: id,
            chars: obj[chars],
            state: obj[state],
            demo: obj[demo],
            rule: obj[rule],
        }

        axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/addOrUpdateRuleSkuCharacter`, newobj)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.state === '000001') {
                        message.success(response.data.msg);
                        //this.props.modalmodelaction({okcharactervisible: false})
                        this.componentDidMount(); //拉取整个弹窗数据
                        this.props.modalmodelaction({ModalText: '保存中···', confirmLoading: true})
                        setTimeout(() => {
                            this.props.modalmodelaction({
                                okcharactervisible: false,
                                confirmLoading: false,
                            });
                        }, 1500);

                    } else {
                        message.error(response.data.msg)
                    }
                }
            }).catch(e => {
            console.log(e)
        })

    }
    */

    logcolumns = [{
        title: '序号',
        dataIndex: 'No',
        render: (text, record, index) => record.key,
        width: 50,
    }, {
        title: '操作属性',
        className: 'column-order',
        dataIndex: 'operationalAttribute',
        render: text => text,
        width: 120,
    }, {
        title: '描述',
        dataIndex: 'description',
        render: (text) => (
            <div className="breakwrod">
                {text}
            </div>
        ),
        width: 300,
    }, {
        title: '用户名',
        dataIndex: 'userName',
        render: text => text,
        width: 100,
    }, {
        title: '用户ID',
        dataIndex: 'userId',
        render: text => text,
        width: 100,
    },
        {
            title: '操作时间',
            dataIndex: 'operationTime',
            render: text => timestampFromat(text, 2),
            width: 160,

        }];

    columns = [
        {
            title: 'SKU前后缀',
            className: 'column-order',
            dataIndex: 'suffix',
            width: 198,
            render: this.addinputdata,

        },
        {
            title: '位置',
            dataIndex: 'position',
            render: this.addselectdata,
            width: 215,
        },
        // {
        //     title: '国家',
        //     dataIndex: 'country',
        //     render: this.addinputdata2,
        //     width: 120,
        // },
        {
            title: '对应发货仓库',
            dataIndex: 'Warehouse',
            render: this.addselectdata,
            width: 215,
        },
        // {
        //     title: '发货渠道',
        //     dataIndex: 'goodschannel',
        //     render: this.addselectdata,
        //     width: 180,
        // },
        {
            title: '优先级',
            dataIndex: 'priority',
            render: this.addinputdata3,
            width: 198,
        },
        // {
        //     title: '例子',
        //     dataIndex: 'demo',
        //     render: this.addinputdata,
        // },
        {
            title: '状态',
            dataIndex: 'state',
            width: 216,
            render: this.addselectdata,
        },
        {
            title: '操作',
            dataIndex: 'Operation',
            width: 90,
            render: (text, record, index) => {
                return (

                    (
                        <div>
                            <a
                                className={'viewbtn'}
                                onClick={this.editshow(record)}
                            >
                                {'保存'}
                            </a>
                            <a className={'viewbtn ml10'}
                               onClick={this.Modalshow(index)}
                            >
                                {'删除'}
                            </a>
                        </div>)
                );
            }
        }];

    /*
    charactercolumns = [{
        title: '字符',
        className: 'column-order',
        dataIndex: 'chars',
        render: this.addinputdata,
        width: 120,
    }, {
        title: '规则',
        dataIndex: 'charsrule',
        render: this.addselectdata,
        width: 120,
    },
        {
            title: '例子',
            dataIndex: 'charsdemo',
            render: this.addinputdata,

        },
        {
            title: '状态',
            dataIndex: 'charsstate',
            width: 90,
            render: this.addselectdata,
        },
        {
            title: '操作',
            dataIndex: 'Operation',
            width: 130,
            render: (text, record, index) => {
                return (
                    (
                        <div><a className={'viewbtn'} style={{marginRight: '10px'}} onClick={
                            this.charactereditshow(record)
                        }>{'保存'}</a>
                            <a className={'viewbtn'} onClick={this.characterModalshow(index)}>{'删除'}</a>
                        </div>)

                );
            }
        }];
    */

    companyIntroductionHandle = (n, v) => (e) => {
        const {value} = e.target;
        var len = value.length;
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        var color = '';
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            len = v;
            color = "#ff0000";
        }
        this.setState({[n]: {len: len, color: color}})
    };

    /**
     *作者: 任贸华
     *功能描述: 在线SKU前后缀配置删除请求
     *参数说明:
     *时间: 2018/4/17 9:56
     */
    ModalhandleOk = () => {
        const data = [...this.props.skuprefixtable.data];
        const delkey = this.props.skuprefixtable.delkey;
        const obj = {id: data[delkey].id}
        if (data[delkey].id) {
            axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleSkuConvert`, obj)
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.state === '000001') {
                            message.success(response.data.msg)
                            data.splice(delkey, 1);
                            this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,});
                            setTimeout(() => {
                                this.props.skuprefixTableaction({data: data,});
                                this.props.modalmodelaction({
                                    visible: false,
                                    confirmLoading: false,
                                });
                            }, 500);
                        }
                    }
                }).catch(e => {
                console.log(e)
            })
        } else {
            data.splice(delkey, 1);
            this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
            setTimeout(() => {
                this.props.skuprefixTableaction({data: data,});
                this.props.modalmodelaction({
                    visible: false,
                    confirmLoading: false,
                });
            }, 500);
        }
    };

    /**
     *作者: 任贸华
     *功能描述: 在线SKU字符删除请求
     *参数说明:
     *时间: 2018/4/17 10:01
     */
    /*
    characterModalhandleOk = () => {
        const characterdata = [...this.props.skuprefixtable.characterdata];
        const delkey = this.props.skuprefixtable.delkey;
        const obj = {id: characterdata[delkey].id}
        if (characterdata[delkey].id) {
            axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleSkuCharacter`, obj)
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.state === '000001') {
                            message.success(response.data.msg)
                            characterdata.splice(delkey, 1);
                            this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,});
                            setTimeout(() => {
                                this.props.skuprefixTableaction({characterdata: characterdata,});
                                this.props.modalmodelaction({
                                    delcharactervisible: false,
                                    confirmLoading: false,
                                });
                            }, 500);
                        }
                    }
                }).catch(e => {
                console.log(e)
            })
        } else {
            characterdata.splice(delkey, 1);
            this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
            setTimeout(() => {
                this.props.skuprefixTableaction({characterdata: characterdata,});
                this.props.modalmodelaction({
                    delcharactervisible: false,
                    confirmLoading: false,
                });
            }, 500);
        }
    };
    */

    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    };

    /**
     *作者: 任贸华
     *功能描述: 在线SKU前后缀增加配置
     *参数说明:
     *时间: 2018/4/17 10:02
     */

    handleAdd = () => {
        const {count, data} = this.props.skuprefixtable;
        const newData = {
            key: count + '',
            suffix: {name: 'suffix' + count, message: '请输入SKU后缀', placeholder: '请输入SKU后缀'},
            position: {
                name: 'position' + count,
                message: '请选择位置',
                placeholder: '请选择位置',
                readonly: false,
                initialValue: ''
            },
            country: {name: 'country' + count, message: '请选择', placeholder: '请选择',},
            Warehouse: {name: 'Warehouse' + count, message: '请选择对应发货仓库', placeholder: '请选择对应发货仓库', initialValue: ''},
            goodschannel: {
                name: 'goodschannel' + count,
                message: '请选择发货渠道',
                placeholder: '请选择发货渠道',
                initialValue: '',
                required: false
            },
            priority: {name: 'priority' + count, message: '请输入', placeholder: '请输入',},
            demo: {name: 'demo' + count, message: '请输入', placeholder: '请输入', required: false,},
            state: {name: 'state' + count, message: '状态', placeholder: '状态', initialValue: 1,},
            Operation: '删除',
        };

        this.props.skuprefixTableaction({data: [...data, newData], count: count + 1,})
    };


    /**
     *作者: 任贸华
     *功能描述: 在线SKU字符增加配置
     *参数说明:
     *时间: 2018/4/17 10:02
     */
    /*
    characterhandleAdd = () => {
        const characterdata = this.props.skuprefixtable.characterdata;
        const charactercount = this.props.skuprefixtable.charactercount
        const newData = {
            key: charactercount + '',
            chars: {name: 'chars' + charactercount, message: '字符', placeholder: '字符', readonly: false},
            charsrule: {name: 'charsrule' + charactercount, message: '规则', placeholder: '规则',},
            charsdemo: {name: 'charsdemo' + charactercount, message: '例子', placeholder: '例子',},
            charsstate: {name: 'charsstate' + charactercount, message: '状态', placeholder: '状态',},
            Operation: '删除',
        };

        this.props.skuprefixTableaction({
            characterdata: [...characterdata, newData],
            charactercount: charactercount + 1,
        })
    };
    */

    setShowLogButton = () => {
        const value = !this.state.isShowLog;
        this.setState({
            isShowLog: value,
        })
    };


    render() {

        const {data} = this.props.skuprefixtable;

        const columns = this.columns;

        const log = this.props.skuprefixtable.log;
        const newlogdata = datasaddkey(log);
        const logcolumns = this.logcolumns;

        const {
            isShowLog,
        } = this.state;

        return (
            <div>
                <div className="newCluenk">
                    <div className="title">在线SKU前后缀规则配置（旧）</div>
                    <div className="content">

                        <Table
                            columns={columns}
                            pagination={false}
                            dataSource={data} scroll={{y: 217, x: 1133}}
                            bordered
                            footer={() => <div className={'tc'}><Button
                                className="editable-add-btn" onClick={this.handleAdd}>+增加配置</Button>
                            </div>}
                        />


                        <Modalmodel  {...{
                            ...this.props.modalmodel,
                            visible: this.props.modalmodel.visible,
                            ModalText: '确认删除吗?',
                        }}
                                     onOk={this.ModalhandleOk}
                                     confirmLoading={this.props.modalmodel.confirmLoading}
                                     onCancel={this.ModalhandleCancel('visible')}/>

                        <Modalmodel  {...{
                            ...this.props.modalmodel,
                            visible: this.props.modalmodel.skuprefixvisible,
                            ModalText: '确认修改吗?',
                        }}
                                     onOk={this.editOK}
                                     confirmLoading={this.props.modalmodel.confirmLoading}
                                     onCancel={this.ModalhandleCancel('skuprefixvisible')}/>


                    </div>
                </div>


                {/*<div className="newCluenk">*/}
                    {/*<div className="title">在线SKU字符缀规则配置（旧）</div>*/}
                    {/*<div className="content">*/}

                        {/*<Table*/}
                            {/*columns={charactercolumns}*/}
                            {/*pagination={false}*/}
                            {/*dataSource={newcharacterdata}*/}
                            {/*bordered scroll={{y: 217}}*/}
                            {/*footer={() => <div className={'tc'}><Button*/}
                                {/*className="editable-add-btn" onClick={this.characterhandleAdd}>+增加配置</Button>*/}
                            {/*</div>}*/}
                        {/*/>*/}


                        {/*<Modalmodel  {...{*/}
                            {/*...this.props.modalmodel,*/}
                            {/*visible: this.props.modalmodel.delcharactervisible,*/}
                            {/*ModalText: '确认删除吗?',*/}
                        {/*}}*/}
                                     {/*onOk={this.characterModalhandleOk}*/}
                                     {/*confirmLoading={this.props.modalmodel.confirmLoading}*/}
                                     {/*onCancel={this.ModalhandleCancel('delcharactervisible')}/>*/}

                        {/*<Modalmodel  {...{*/}
                            {/*...this.props.modalmodel,*/}
                            {/*visible: this.props.modalmodel.okcharactervisible,*/}
                            {/*ModalText: '确认修改吗?',*/}
                        {/*}}*/}
                                     {/*onOk={this.charactereditOK}*/}
                                     {/*confirmLoading={this.props.modalmodel.confirmLoading}*/}
                                     {/*onCancel={this.ModalhandleCancel('okcharactervisible')}/>*/}


                    {/*</div>*/}
                {/*</div>*/}


                <div className="newCluenk">
                    <div className="title" style={{display: 'flex', alignItems: 'center'}}>
                        <div>
                            操作日志
                        </div>
                        <Button
                            style={{marginLeft: '1008px'}}
                            onClick={this.setShowLogButton}
                            icon={isShowLog ? "down-circle" : "up-circle"}
                        >
                            {isShowLog ? '隐藏' : '展开'}
                        </Button>
                    </div>
                    {
                        isShowLog ? (
                            <div className="content">
                                <Table
                                    columns={logcolumns}
                                    pagination={false} scroll={{y: 255}}
                                    dataSource={newlogdata}
                                    bordered
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

export default WarehouseOrder
