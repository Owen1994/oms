import React from 'react'
import {
    Table,
    InputNumber,
    Select,
    message
} from 'antd'
import { ADD_IMG_LIST, DELETE_IMG_LIST, RESET_IMG_LIST } from '../constants'
const Option = Select.Option;

/**
 *作者: huangjianfeng
 *功能描述:  增加条目图片类型列表
 *时间: 2018/8/27 15:55
 */
export default class ImgTypeTables extends React.Component {
    imgTypeSelectMap = {}   // 选中的图片类型map集合
    levelTypeSelectMap = {} // 选中的优先级map集合
    imgTypeArray = []    // 图片类型列表
    levelTypeArray = [] //  优先级类型列表

    state = {
        data: []
    }
    columns = [
        {
            title: '图片类型',
            dataIndex: 'imgType',
            width: 100,
            render: (text, record, index) => {
                return (
                    <Select placeholder="请选择"
                        defaultValue={text}
                        onChange={(value) => {
                            delete this.imgTypeSelectMap[record.imgType]
                            this.imgTypeSelectMap[value] = index;
                            record.imgType = value;
                            this.setState({})
                        }}
                    >
                        {
                            this.imgTypeArray.map(item => {
                                return (<Option disabled={this.disabledImgTypeOption(item, index)} value={item.code} key={item.code}>{item.code}</Option>)
                            })
                        }
                    </Select>
                )
            }
        },
        {
            title: '取图数量',
            dataIndex: 'count',
            width: 100,
            render: (text, record, index) => {
                console.log(text)
                return <InputNumber
                    defaultValue={text || 0}
                    min={0}
                    onChange={(value) => record.count = value} />
            }
        },
        {
            title: '优先级',
            dataIndex: 'level',
            width: 100,
            render: (text, record, index) => {
                return (
                    <Select placeholder="请选择"
                        defaultValue={text}
                        onChange={(value) => {
                            delete this.levelTypeSelectMap[record.level]
                            this.levelTypeSelectMap[value] = index;
                            record.level = value;
                            this.setState({})
                        }}>
                        {
                            this.levelTypeArray.map(item =>
                                <Option disabled={this.disabledLevelOption(item, index)} value={item} key={item}>{item}</Option>
                            )
                        }
                    </Select>
                )
            }
        },
        {
            title: '操作',
            width: 100,
            render: (text, record, index) => {
                if (index === 0) {
                    return <a style={{ "display": "block", "textAlign": "center" }} onClick={this.addTableItem}>添加</a>
                }
                return <a style={{ "display": "block", "textAlign": "center" }} onClick={() => {
                    delete this.imgTypeSelectMap[record.imgType]
                    delete this.levelTypeSelectMap[record.level]
                    this.props.updateImgTypeList(DELETE_IMG_LIST, { index })
                }}>删除</a>
            }
        }
    ]

    disabledLevelOption = (item, index) => {
        if (this.levelTypeSelectMap[item] === undefined) return false;
        if (this.levelTypeSelectMap[item] === index) return false;
        return true
    }
    disabledImgTypeOption = (item, index) => {
        // debugger;
        if (this.imgTypeSelectMap[item.code] === undefined) return false;
        if (this.imgTypeSelectMap[item.code] === index) return false;
        return true
    }

    addTableItem = () => {
        const data = this.props.imgTypeList
        if (data.length >= this.imgTypeArray.length) {
            return message.warning("添加的条目数量不能大于图片类型数量")
        }
        this.props.updateImgTypeList(ADD_IMG_LIST, { key: Date.now() })
    }

    componentWillReceiveProps(nextProps) {
        const imgTypes = nextProps.imgTypes
        const item = nextProps.item
        const visible = nextProps.visible
        const preVisible = this.props.visible
        if (visible && !preVisible) {
            this.imgTypeSelectMap = {}
            this.levelTypeSelectMap = {}
            this.updateImgTypes(imgTypes, item && item.imgTypes)
        }
        if (!visible && preVisible) {
            this.props.updateImgTypeList(RESET_IMG_LIST, [{ key: Date.now() }])
        }
    }
    componentWillMount() {
        const imgTypes = this.props.imgTypes
        const item = this.props.item

        if (imgTypes) {
            this.updateImgTypes(imgTypes, item && item.imgTypes)
        }
    }

    render() {
        return (
            <div>
                <Table
                    bordered
                    size="small"
                    dataSource={this.props.imgTypeList}
                    columns={this.columns}
                    rowClassName="editable-row"
                    pagination={false}
                />
            </div>
        )
    }


    updateImgTypes = (imgTypes = [], data = [{ key: Date.now() }]) => {
        this.levelTypeArray.splice(0, this.levelTypeArray.length)
        imgTypes.forEach((item, index) => {
            this.levelTypeArray.push(index + 1)
        })
        this.imgTypeArray = imgTypes

        this.props.updateImgTypeList(RESET_IMG_LIST, data)
        data.forEach((it, index) => {
            if (it.level !== undefined) {
                this.levelTypeSelectMap[it.level] = index;
            }
            if (it.imgType !== undefined) {
                this.imgTypeSelectMap[it.imgType] = index;
            }
        })
    }

    componentWillUnmount() {
        this.imgTypeSelectMap = {}
        this.levelTypeSelectMap = {}
        this.imgTypeArray = []
        this.levelTypeArray = []
        this.state.data = []
    }
}