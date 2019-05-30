import React from 'react'
import Head from './head'
import RichTextEditor from '@/common/components/RichTextEditor'
import {
    Form,
    Input,
    InputNumber,
    Select,
    Row,
    Col,
    Icon,
} from 'antd'
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option
const style = {
    width288: {
        width: '288px'
    },
    inputsmallWidth: {
        width: '80px'
    },
    inputWidth: {
        width: '288px'
    },
    icon: {
        display: 'inline-block',
        fontSize: '14px',
        padding: '0 5px',
        marginTop: '10px',
        verticalAlign: 'middle',
        color: '#999999',
    },
    icon1: {
        padding: 3,
        marginLeft: 10,
    },
    tip: {
        lineHeight: '20px',
        fontSize: '12px'
    }
}

const length = [
    "CM",
    "MM",
    "M",
    "IN",
    "FT"
]

const weight = [
    "KG",
    "GR",
    "OZ",
    "LB",
    "MG"
]

class SkuInfo extends React.PureComponent {

    state = {
        sellPoint: [{
            id: 0,
            value: undefined
        }],
        descriptionLength: 0
    }

    uid = 1

    componentDidMount() {
        this.setSellpoint(this.props)
    }
    componentWillReceiveProps(next) {
        if (next.detailInfo !== this.props.detailInfo) {
            this.setSellpoint(next)
        }
    }

    setSellpoint = (props) => {
        const { detailInfo = {} } = props;
        let {
            sellPoint
        } = detailInfo;

        if (!sellPoint || !sellPoint.length) return;

        sellPoint = sellPoint.map(v => ({
            id: this.uid++,
            value: v
        }))

        this.setState({ sellPoint: [...sellPoint] })
    }


    formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
    };

    add = () => {
        const { sellPoint } = this.state;
        if (sellPoint.length >= 5) return;
        sellPoint.push({
            id: this.uid++,
            value: undefined
        })
        this.setState({ sellPoint: [...sellPoint] })
    }

    remove = (id) => {
        const { sellPoint } = this.state;
        const index = sellPoint.findIndex(v => v.id === id);
        if (index === -1) return;
        sellPoint.splice(index, 1)
        this.setState({ sellPoint: [...sellPoint] })
    }

    onChange = (text) => {
        const { setFieldsValue } = this.props.form;
        // 长度不计算 标签
        // let str = "";
        // try {
        //     str = text.replace(/<\/?.+?>/g, "").replace(/&nbsp;/g, " ");
        // } catch (err) { }
        this.setState({
            descriptionLength: text.length
        })
        setFieldsValue({
            'detailInfo[description]': text
        })
    }

    render() {
        const { detailInfo = {}, form } = this.props;
        const {
            sellPoint,
            descriptionLength
        } = this.state;
        const { getFieldDecorator, getFieldValue } = form;
        const searchTerm = getFieldValue("detailInfo[searchTerm]");
        const limitSearchTermLength = searchTerm ? 250 - searchTerm.length : 250

        getFieldDecorator('detailInfo[description]', {
            initialValue: detailInfo.description || "",
            rules: [
                { required: true, message: "描述内容为必填项" },
                { max: 2000, message: "描述内容最大字符数为2000，请酌情删减" }
            ]
        })
        return (
            <Head id="detailInfo" title="详情信息" className="margin-ms-top">
                <Row>
                    <Col className="ant-form-item-label" span={3}>
                        <label className="ant-form-item-required">描述内容</label>
                    </Col>
                    <Col span={21}>
                        <RichTextEditor onChange={this.onChange} value={detailInfo.description || ""}></RichTextEditor>
                        <p className="text-right" style={style.tip}>
                            {
                                2000 - descriptionLength >= 0 ?
                                    <span>（您还可以输入<span className="red">{2000 - descriptionLength}</span>个字符）</span>
                                    :
                                    <span className="red">当前字符数超出2000，请酌情删减</span>
                            }
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="ant-form-item-label" span={3}>
                        <label>产品尺寸</label>
                    </Col>
                    <Col span={21}>
                        <FormItem className="display-inline-block">
                            {getFieldDecorator('detailInfo[productLength]', {
                                initialValue: detailInfo.productLength,
                            })(
                                <InputNumber min={0} precision={2} placeholder="长" style={style.inputsmallWidth} />
                            )}
                        </FormItem>
                        <span style={style.icon}><Icon type="close" /></span>
                        <FormItem className="display-inline-block">
                            {getFieldDecorator('detailInfo[productWidth]', {
                                initialValue: detailInfo.productWidth,
                            })(
                                <InputNumber min={0} precision={2} placeholder="宽" style={style.inputsmallWidth} />
                            )}
                        </FormItem>
                        <span style={style.icon}><Icon type="close" /></span>
                        <FormItem className="display-inline-block">
                            {getFieldDecorator('detailInfo[productHeight]', {
                                initialValue: detailInfo.productHeight,
                            })(
                                <InputNumber min={0} precision={2} placeholder="高" style={style.inputsmallWidth} />
                            )}
                        </FormItem>
                        <FormItem className="display-inline-block margin-sm-left">
                            {getFieldDecorator('detailInfo[productSizeUnit]', {
                                initialValue: detailInfo.productSizeUnit || "CM",
                            })(
                                <Select
                                    placeholder="单位"
                                    style={style.inputsmallWidth}
                                >
                                    {
                                        length.map(v => <Option key={v} value={v}>{v}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row className="mt8">
                    <Col className="ant-form-item-label" span={3}>
                        <label>产品重量</label>
                    </Col>
                    <Col span={21}>
                        <FormItem className="display-inline-block">
                            {getFieldDecorator('detailInfo[productWeight]', {
                                initialValue: detailInfo.productWeight,
                            })(
                                <InputNumber min={0} precision={2} placeholder="重量" style={style.width288} />
                            )}
                        </FormItem>
                        <FormItem className="display-inline-block margin-sm-left">
                            {getFieldDecorator('detailInfo[productWeightUnit]', {
                                initialValue: detailInfo.productWeightUnit || "KG",
                            })(
                                <Select
                                    placeholder="单位"
                                    style={style.inputsmallWidth}
                                >
                                    {
                                        weight.map(v => <Option key={v} value={v}>{v}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="mt8">
                    <Col className="ant-form-item-label" span={3}>
                        <label>包裹尺寸</label>
                    </Col>
                    <Col span={21}>
                        <FormItem className="display-inline-block">
                            {getFieldDecorator('detailInfo[packLength]', {
                                initialValue: detailInfo.packLength,
                            })(
                                <InputNumber min={0} precision={2} placeholder="长" style={style.inputsmallWidth} />
                            )}
                        </FormItem>
                        <span style={style.icon}><Icon type="close" /></span>
                        <FormItem className="display-inline-block">
                            {getFieldDecorator('detailInfo[packWidth]', {
                                initialValue: detailInfo.packWidth,
                            })(
                                <InputNumber min={0} precision={2} placeholder="宽" style={style.inputsmallWidth} />
                            )}
                        </FormItem>
                        <span style={style.icon}><Icon type="close" /></span>
                        <FormItem className="display-inline-block">
                            {getFieldDecorator('detailInfo[packHeight]', {
                                initialValue: detailInfo.packHeight,
                            })(
                                <InputNumber min={0} precision={2} placeholder="高" style={style.inputsmallWidth} />
                            )}
                        </FormItem>
                        <FormItem className="display-inline-block margin-sm-left">
                            {getFieldDecorator('detailInfo[packSizeUnit]', {
                                initialValue: detailInfo.packSizeUnit || "CM",
                            })(
                                <Select
                                    placeholder="单位"
                                    style={style.inputsmallWidth}
                                >
                                    {
                                        length.map(v => <Option key={v} value={v}>{v}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="mt8">
                    <Col className="ant-form-item-label" span={3}>
                        <label>包裹重量</label>
                    </Col>
                    <Col span={21}>
                        <FormItem className="display-inline-block">
                            {getFieldDecorator('detailInfo[packWeight]', {
                                initialValue: detailInfo.packWeight,
                            })(
                                <InputNumber min={0} precision={2} placeholder="重量" style={style.width288} />
                            )}
                        </FormItem>
                        <FormItem className="display-inline-block margin-sm-left">
                            {getFieldDecorator('detailInfo[packWeightUnit]', {
                                initialValue: detailInfo.packWeightUnit || "KG",
                            })(
                                <Select
                                    placeholder="单位"
                                    style={style.inputsmallWidth}
                                >
                                    {
                                        weight.map(v => <Option key={v} value={v}>{v}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row className="margin-ss-top">
                    <Col className="ant-form-item-label" span={3}>
                        <label>卖点</label>
                    </Col>
                    <Col span={21}>
                        {
                            sellPoint.map((v, i) => {
                                const str = `detailInfo[sellPoint][${v.id}]`
                                const isFirst = i === 0;
                                const value = getFieldValue(str)
                                const l = 200 - ((value && value.length) || 0)
                                const pTag = l >= 0 ? <p style={style.tip}>（您还可以输入<span className="red">{l}</span>个字符）</p> : null
                                return (<FormItem className={isFirst ? "" : "margin-ss-top"} key={v.id}>
                                    {getFieldDecorator(str, {
                                        initialValue: v.value,
                                        rules: [
                                            { max: 200, message: "当前卖点字符数超出200，请酌情删减" }
                                        ]
                                    })(
                                        <TextArea placeholder="请输入（可输入200个字符）" style={style.width288} />
                                    )}
                                    {
                                        isFirst ?
                                            <span>
                                                <span onClick={this.add} className="pointer" style={style.icon1}><Icon type="plus" /></span>
                                                {
                                                    sellPoint.length > 1 ? <span onClick={() => this.remove(v.id)} className="pointer" style={style.icon1}><Icon type="minus" /></span> : null
                                                }

                                            </span>
                                            :
                                            <span onClick={() => this.remove(v.id)} className="pointer" style={style.icon1}><Icon type="minus" /></span>
                                    }
                                    {pTag}
                                </FormItem>)
                            })

                        }
                    </Col>
                </Row>
                <FormItem
                    {...this.formItemLayout}
                    label="Search Term"
                    className="margin-ss-top"
                >
                    {getFieldDecorator('detailInfo[searchTerm]', {
                        initialValue: detailInfo.searchTerm,
                        rules: [
                            { max: 250, message: "当前Search Term字符数超出250，请酌情删减" }
                        ]
                    })(
                        <TextArea placeholder="请输入（可输入250个字符）" style={style.width288} />
                    )}
                    {
                        limitSearchTermLength >= 0 ?
                            <p style={style.tip}>（您还可以输入<span className="red">{limitSearchTermLength}</span>个字符）</p>
                            : null
                    }

                </FormItem>

            </Head>
        )
    }
}

export default SkuInfo
