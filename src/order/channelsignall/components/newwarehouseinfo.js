/**
 *作者: pzt
 *功能描述: 仓库信息(重构)
 *参数说明:
 *时间: 2018/12/11 11:11
 */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {
    Button,
    Select,
    Table,
    Input,
} from 'antd';
const Option = Select.Option;
import '../css/css.css';
import CSelect from '../../../components/cselect'

class warehouseInfo extends Component {

    // 表头数据(修改/新增)
    columns = [
        {
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
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouseCodeName',
            width: 120,
            render: (text, record, index) => {
                // let list = {};
                const id = record.warehouseCode;
                // list.id = id;
                // list.name = text;
                return (
                    <CSelect
                        list={record.warehouseCodes}
                        value={id}
                        code='id' // 列表编码字段
                        name='name' // 列表名称字段
                        url='/oms/order/manage/motan/IPackageApi/getPackageWarehouse'
                        params={{searchColumn: 'name',pageNumber:1, pageData:20}} // 搜索参数
                        localSearch = {1}
                        formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                        onChange={(value) => this.handleChange([value[0].id, value[0].name], index, ['warehouseCode', 'warehouseCodeName'])}
                    />
                )
            }
        }, {
            title: '仓库的渠道标识',
            dataIndex: 'warehouseChannelSign',
            width: 120,
            render: (text, record, index) => {

                return (
                    <Input
                        onChange={(e) => this.handleChange([e.target.value], index, ['warehouseChannelSign'])}
                        value={text}
                        placeholder={"请输入仓库的渠道标识"}
                    />
                )
            }
        },{
            title: '操作',
            dataIndex: 'Operation',
            width: 80,
            render: (text, record, index) => {
                // let { oldLength } = this.props.warehouseInfoData;
                return (
                    // (Number(index) + 1) > oldLength ?
                        <div>
                            <a onClick={() => this.handleMove(index)} >删除</a>
                        </div>
                    // : null
                )
            }
        }];

    // 新增一条仓库信息
    handleAdd = () => {
        this.props.getAddItemAction(1);
    };
    // 新增一条仓库信息
    handleMove = (index) => {
        this.props.getMoveItemAction(index, 1)
    };

    /**
     * 作者: pzt
     * 描述: 修改表格里面的数据
     * 时间: 2018/12/11 21:02
     * @field <Array> 数组内存放要修改的字段名，与value的值一一对应
     * @value <Array> 数组内存放要修改的值，与field字段名一一对应
     * @index <number> 要修改的某一项表格数据的索引
     **/
    handleChange = (value, index, field) => {
        this.props.getHandleChangeAction(index, field, value, 1);
    };

    render() {
        const columns = this.columns;
        const { data } = this.props.warehouseInfoData;

        return (
            <div className="newCluenk">
                <div className="content channelall">
                    <Button
                        onClick={this.handleAdd}
                        className={'margin-ss-bottom'}
                    >新增
                    </Button>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data}
                        bordered
                    />
                </div>
            </div>
        );
    }
}

export default warehouseInfo
