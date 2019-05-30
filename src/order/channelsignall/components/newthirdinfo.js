/**
 *作者: pzt
 *功能描述: 第三方信息组件(重构)
 *参数说明:
 *时间: 2018/12/12 9:11
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
import {levelOptions} from '../../../util/options';

class ThirdInfo extends Component {

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
        title: '系统名称',
        dataIndex: 'systemCodeName',
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
        title: '渠道简称（第三方）',
        width: 100,
        dataIndex: 'systemChannelCode',
        render: (text, record, index) => {
            return (
                <Input
                    onChange={(e) => this.handleChange([e.target.value], index, ['systemChannelCode'])}
                    value={text}
                    placeholder={"请输入渠道简称（第三方）"}
                />
            )
        }
    },{
        title: '渠道中文名称（第三方）',
        width: 100,
        dataIndex: 'systemCnName',
        render: (text, record, index) => {
            return (
                <Input
                    onChange={(e) => this.handleChange([e.target.value], index, ['systemCnName'])}
                    value={text}
                    placeholder={"请输入渠道中文名称（第三方）"}
                />
            )
        }
    },{
        title: '渠道英文名称（第三方）',
        width: 100,
        dataIndex: 'systemEnName',
        render: (text, record, index) => {
            return (
                <Input
                    onChange={(e) => this.handleChange([e.target.value], index, ['systemEnName'])}
                    value={text}
                    placeholder={"请输入渠道英文名称（第三方）"}
                />
            )
        }
    },{
        title: '渠道扩展信息',
        width: 100,
        dataIndex: 'channelInfo',
        render: (text, record, index) => {
            return (
                <Input
                    onChange={(e) => this.handleChange([e.target.value], index, ['channelInfo'])}
                    value={text}
                    placeholder={"请输入渠道扩展信息"}
                />
            )
        }
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


    // 新增一条第三方信息
    handleAdd = () => {
        this.props.getAddItemAction(3);
    };
    // 新增一条第三方信息
    handleMove = (index) => {
        this.props.getMoveItemAction(index, 3)
    };
    /**
     * 作者: pzt
     * 描述: 修改第三方信息表格里面的数据
     * 时间: 2018/12/11 21:02
     * @field <Array> 数组内存放要修改的字段名，与value的值一一对应
     * @value <Array> 数组内存放要修改的值，与field字段名一一对应
     * @index <number> 要修改的某一项表格数据的索引
     **/
    handleChange = (value, index, field) => {
        this.props.getHandleChangeAction(index, field, value, 3);
    };

    render() {
       const { data } = this.props.thirdInfoData;

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
export default ThirdInfo;