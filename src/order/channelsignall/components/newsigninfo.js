/**
 *作者: pzt
 *功能描述: 标记信息组件(重构)
 *参数说明:
 *时间: 2018/12/11 21:10
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Icon,
    Input,
    Button,
    Select,
    Table,
    Switch,
} from 'antd'
const Option = Select.Option;
import '../css/css.css'
import CSelect from '../../../components/cselect';
import Item from 'antd/lib/list/Item';

class Signinfo extends Component {

    columns = [{
        title: '状态',
        className: '',
        dataIndex: 'isAvailable',
        width: 80,
        render: (text, record, index) => {
            return (
                <Select
                    className={'ant-xs-row'}
                    placeholder="请选择"
                    value={Number(text)}
                    onChange={(value) => this.handleChange([`${value}`], index, ['isAvailable'])}
                >
                    <Option value={0}>启用</Option>
                    <Option value={1}>停用</Option>
                </Select>
            )
        }
    }, {
        title: '平台名称',
        width: 100,
        dataIndex: 'platformName',
        render: (text, record, index) => {
            // let list = {};
            const id = record.platform;
            // list.id = id;
            // list.name = text;
            return (
                <CSelect
                    list={record.platforms}
                    value={id}
                    code='id' // 列表编码字段
                    name='name' // 列表名称字段
                    url='/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform'
                    params={{searchColumn: 'name',pageNumber:1, pageData:20}} // 搜索参数
                    localSearch = {1}
                    formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                    onChange={(value) => this.handleChange([value[0].id, value[0].name], index, ['platform', 'platformName'])}
                />
            )
        }
    }, {
        title: '标记类型',
        width: 80,
        dataIndex: 'signTypeName',
        render: (text, record, index) => {
            return (
                <Select
                    className={'ant-xs-row'}
                    placeholder="请选择类型"
                    value={Number(record.signType)}
                    onChange={(value) => this.handleChange([`${value}`], index, ['signType', 'signTypeName'])}
                >
                    <Option value={0}>真实标记</Option>
                    <Option value={1}>虚拟标记</Option>
                    <Option value={2}>转单号标记（前标后改）</Option>
                    <Option value={3}>转单号标记（前不标后标）</Option>
                    <Option value={6}>云途专线标记</Option>
                </Select>
            )
        }
    }, {
        title: '发货地',
        width: 80,
        dataIndex: 'dispatchCountry',
        render: (text, record, index) => {
            // let list = {};
            const id = record.dispatchCountryCode;
            // list.id = id;
            // list.name = text;
            return (
                <CSelect
                    list={record.dispatchCountrys}
                    value={id}
                    code='id' // 列表编码字段
                    name='name' // 列表名称字段
                    url='/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData'
                    params={{searchColumn: 'name',pageNumber:1, pageData:20}} // 搜索参数
                    localSearch = {1}
                    formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                    onChange={(value) => this.handleChange([value[0].id, value[0].name], index, ['dispatchCountryCode', 'dispatchCountry'])}
                />
            )
        }
    }, {
        title: '目的国',
        width: 80,
        dataIndex: 'toCountryName',
        render: (text, record, index) => {
            // let list = {};
            const id = record.toCountry;
            // list.id = id;
            // list.name = text;
            return (
                <CSelect
                    list={record.toCountrys}
                    value={id}
                    code='id' // 列表编码字段
                    name='name' // 列表名称字段
                    url='/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData'
                    params={{searchColumn: 'name',pageNumber:1, pageData:20}} // 搜索参数
                    localSearch = {1}
                    formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                    onChange={(value) => this.handleChange([value[0].id, value[0].name], index, ['toCountry', 'toCountryName'])}
                />
            )
        }
    }, {
        title: '标记渠道简称',
        width: 110,
        dataIndex: 'signChannelName',
        render: (text, record, index) => {
            return (
                <Input
                    onChange={(e) => this.handleChange([e.target.value], index, ['signChannelName'])}
                    value={text}
                    placeholder={"请输入标记渠道简称"}
                />
            )
        }
    }, {
        title: '标记中文名称',
        width: 110,
        dataIndex: 'signCnName',
        render: (text, record, index) => {
            return (
                <Input
                    onChange={(e) => this.handleChange([e.target.value], index, ['signCnName'])}
                    value={text}
                    placeholder={"请输入标记中文名称"}
                />
            )
        }
    }, {
        title: '标记承运商名称',
        width: 110,
        dataIndex: 'signCarrierName',
        render: (text, record, index) => {
            return (
                <Input
                    onChange={(e) => this.handleChange([e.target.value], index, ['signCarrierName'])}
                    value={text}
                    placeholder={"请输入标记承运商名称"}
                />
            )
        }
    }, {
        title: '标记网址',
        width: 110,
        dataIndex: 'signWebSite',
        render: (text, record, index) => {
            return (
                <Input
                    onChange={(e) => this.handleChange([e.target.value], index, ['signWebSite'])}
                    value={text}
                    placeholder={"请输入标记网址"}
                />
            )
        }
    }, {
        title: '是否回标',
        width: 110,
        dataIndex: 'isNeedChannelCodeTrackNo',
        render: (text, record, index) => {
            return (
                // 是否回标功能暂时只支持ebay平台，真实标记下才显示
                record.platform === 'EB' && Number(record.signType) === 0 ? 
                    <Switch
                        checked={text === '1' ? true : false} 
                        defaultChecked={true} 
                        onChange={
                            (e) => this.handleChange([e ? '1' : '0'], index, ['isNeedChannelCodeTrackNo'])
                        } 
                    />
                : null
            )
        }
    }, {
        title: '操作',
        dataIndex: 'Operation',
        width: 80,
        render: (text, record, index) => {
            return (
                <div>
                    <a onClick={() => this.handleMove(index)} >删除</a>
                </div>
            )
        }
    }];

    // 新增一条标记信息
    handleAdd = () => {
        this.props.getAddItemAction(2);
    };
    // 新增一条标记信息
    handleMove = (index) => {
        this.props.getMoveItemAction(index, 2)
    };
    /**
     * 作者: pzt
     * 描述: 修改标记信息表格里面的数据
     * 时间: 2018/12/11 21:02
     * @field <Array> 数组内存放要修改的字段名，与value的值一一对应
     * @value <Array> 数组内存放要修改的值，与field字段名一一对应
     * @index <number> 要修改的某一项表格数据的索引
     **/
    handleChange = (value, index, field) => {
        this.props.getHandleChangeAction(index, field, value, 2);
    };


    render() {
        const { data } = this.props.signInfoData;
        return (
            <div className="newCluenk">
                <div className="content channelall">
                    <Button
                        onClick={this.handleAdd}
                        className={'margin-ss-bottom'}
                    >新增</Button>
                    <Table
                        columns={this.columns}
                        pagination={false}
                        dataSource={data}
                        bordered
                    />
                </div>
            </div>
        )
    }
}

export default Signinfo