/**
 *作者: chenwenchun
 *功能描述: 跟踪号配置
 *时间: 2019年4月12日14:52:12
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Input,
    Button,
    Select,
    Table,
} from 'antd'
const Option = Select.Option;
import '../css/css.css'
import {levelOptions} from 'util/options';
import { fetchPost } from 'util/fetch';

class TruckingConfig extends Component {

    state = {
        platform: [],
    }

    componentDidMount(){
        const params = {
            data: {
                pageData: 20,
                pageNumber: 1,
            },
        };
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', params, 2)
            .then(res => {
                this.setState({ platform: res.data });
            })
    }

    //表头数据(修改 新增)
    columns = [{
        title: '状态',
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
    },{
        title: '平台',
        dataIndex: 'platformCode',
        render: (text, record, index) => {
            const { platform } = this.state;
            return (
                <Select
                    className={'ant-xs-row'}
                    placeholder="请选择"
                    value={record.platformCode}
                    onChange={(value) => this.handleChange([`${value}`], index, ['platformCode'])}
                >
                    {
                        platform.map(v => <Option value={v.id}>{v.name}</Option>)
                    }
                </Select>
            )
        },
        width: 80,
    },{
        title: '系统名称',
        dataIndex: 'systemCode',
        render: (text, record, index) => {
            return (
                <Select
                    className={'ant-xs-row'}
                    placeholder="请选择"
                    value={record.systemCode}
                    onChange={(value) => this.handleChange([value], index, ['systemCode'])}
                >
                    {levelOptions('系统名称').map(item => {
                        return (
                            <Option key={item.value} value={item.value}>
                                {item.label}
                            </Option>
                        )
                    })}
                </Select>
            )
        },
        width: 80,
    },{
        title: '使用跟踪号',
        dataIndex: 'truckingNumber',
        render: (text, record, index) => {
            return (
                <Select
                    className={'ant-xs-row'}
                    placeholder="请选择"
                    value={Number(record.truckingNumber)}
                    onChange={(value) => this.handleChange([value], index, ['truckingNumber'])}
                >
                    {levelOptions('使用跟踪号').map(item => {
                        return (
                            <Option key={item.value} value={item.value}>
                                {item.label}
                            </Option>
                        )
                    })}
                </Select>
            )
        },
        width: 80,
    },{

        title: '操作',
        width: 80,
        dataIndex: 'Operation',
        render: (text, record, index) => {
            return (
                <div>
                    <a onClick={() => this.handleMove(index)} >删除</a>
                </div>
            )
        }
    }];


    // 新增一条跟踪号配置信息
    handleAdd = () => {
        this.props.getAddItemAction(4);
    };
    // 删除一条跟踪号配置信息
    handleMove = (index) => {
        this.props.getMoveItemAction(index, 4);
    };
    /**
     * 作者: pzt
     * 描述: 修改跟踪号信息表格里面的数据
     * 时间: 2018/12/11 21:02
     * @field <Array> 数组内存放要修改的字段名，与value的值一一对应
     * @value <Array> 数组内存放要修改的值，与field字段名一一对应
     * @index <number> 要修改的某一项表格数据的索引
     **/
    handleChange = (value, index, field) => {
        this.props.getHandleChangeAction(index, field, value, 4);
    };

    render() {
       const { data } = this.props.truckingInfoData;

        return (
            <div className="newCluenk">
                <div className="content channelall">
                    <Button
                        onClick={this.handleAdd}
                        className={'margin-ss-bottom'}
                    >
                        新增
                    </Button>
                    <Table
                        columns={this.columns}
                        pagination={false}
                        dataSource={data}
                        bordered
                    />
                </div>
            </div>
        );
    }
}
export default TruckingConfig;