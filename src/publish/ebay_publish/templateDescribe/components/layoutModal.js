import React from 'react';
import {
    Modal,
    Radio,
    Row,
    Col,
    Form,
    Input,
    Button
} from 'antd'

import '../common/colorpicker/js/colorpicker'
import '../common/colorpicker/css/colorpicker.css'
import '../common/colorpicker/css/layout.css'

import image1 from '../image/1.png'
import image2 from '../image/2.png'
import image3 from '../image/3.png'
import image4 from '../image/4.png'
import image5 from '../image/5.png'
import image6 from '../image/6.png'
import image7 from '../image/7.png'
import image8 from '../image/8.png'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const style = {
    div: {
        height: '600px'
    },
    mb15: {
        marginBottom: '15px'
    },
    tal: {
        textAlign: 'left'
    },
    btn: {
        marginTop: '20px',
        textAlign: 'right',
    }
}

class LayoutModal extends React.Component {

    state = {
        selectcolor: null,
    }
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    }
    componentDidMount() {
        const selectcolor = $('#selectcolor')
        const selectcolorTitle = $('#selectcolorTitle')
        
        selectcolor.ColorPicker({
            onSubmit: (hsb, hex, rgb, el) => {
                const { setFieldsValue } = this.props.form;
                setFieldsValue({
                    color: hex
                })
                $(el).ColorPickerHide();
            }
        })
        selectcolorTitle.ColorPicker({
            onSubmit: (hsb, hex, rgb, el) => {
                const { setFieldsValue } = this.props.form;
                setFieldsValue({
                    fscolor: hex
                })
                $(el).ColorPickerHide();
            }
        })
        this.setState({
            selectcolor,
            selectcolorTitle
        })
    }

    selectColor = (e) => {
        const { getFieldValue } = this.props.form;
        const color = getFieldValue('color');
        const { selectcolor } = this.state;
        selectcolor.ColorPickerSetColor(color);
        selectcolor.ColorPickerShow();

    }

    selectTitleColor = (e) => {
        const { getFieldValue } = this.props.form;
        const color = getFieldValue('fscolor');
        const { selectcolorTitle } = this.state;
        selectcolorTitle.ColorPickerSetColor(color);
        selectcolorTitle.ColorPickerShow();
    }

    onOk = () => {
        const { onCancel, onOk } = this.props;
        const { getFieldsValue } = this.props.form;
        onOk(getFieldsValue())
        onCancel()
    }

    render() {
        const { onCancel, onOk, layout } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const color = getFieldValue('color') || layout.color ;
        const fscolor = getFieldValue('fscolor') || layout.fscolor ;

        // relevancyType,  // 关联类型
        // describeType, // 描述类型类型
        // footerType, // 底部类型
        return (
            <div style={{ textAlign: 'left' }}>
                <FormItem
                    style={style.mb15}
                    label="主题色彩"  {...this.formItemLayout}
                >
                    {getFieldDecorator('color', {
                        initialValue: (layout.color && layout.color.slice(1))
                    })(
                        <Input style={{ width: 200, backgroundColor: `#${color}` }} disabled />
                    )}
                    <span className="margin-sm-left pointer padding-xm" onClick={this.selectColor} title="选择主题颜色"><img src={image8} alt=""/></span>
                </FormItem>
                <div id="selectcolor"></div>
                <FormItem
                    style={style.mb15}
                    label="表头字体色彩"  {...this.formItemLayout}
                >
                    {getFieldDecorator('fscolor', {
                        initialValue: (layout.fscolor && layout.fscolor.slice(1))
                    })(
                        <Input style={{ width: 200, backgroundColor: `#${fscolor}` }} disabled />
                    )}
                    <span className="margin-sm-left pointer padding-xm" onClick={this.selectTitleColor} title="选择字体颜色"><img src={image7} alt=""/></span>
                </FormItem>
                <div id="selectcolorTitle"></div>
                <Row type="flex" justify="space-between">
                    <Col span={11} className="text-center">
                        <img src={image1} alt="" />
                        <FormItem>
                            {getFieldDecorator('relevancyType', {
                                initialValue: layout.relevancyType || 1
                            })(
                                <RadioGroup>
                                    <Radio value={1}>含关联营销</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={11} className="text-center">
                        <img src={image2} alt="" />
                        <FormItem>
                            {getFieldDecorator('relevancyType')(
                                <RadioGroup>
                                    <Radio value={2}>无关联营销</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span={11} className="text-center">
                        <img src={image3} alt="" />
                        <FormItem>
                            {getFieldDecorator('describeType', {
                                initialValue: layout.describeType || 1
                            })(
                                <RadioGroup>
                                    <Radio value={1}>平铺大图</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={11} className="text-center">
                        <img src={image4} alt="" />
                        <FormItem>
                            {getFieldDecorator('describeType')(
                                <RadioGroup>
                                    <Radio value={2}>置下小图</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                </Row><Row type="flex" justify="space-between">
                    <Col span={11} className="text-center">
                        <img src={image5} alt="" />
                        <FormItem>
                            {getFieldDecorator('footerType', {
                                initialValue: layout.footerType || 1
                            })(
                                <RadioGroup>
                                    <Radio value={1}>底部平铺</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={11} className="text-center">
                        <img src={image6} alt="" />
                        <FormItem>
                            {getFieldDecorator('footerType')(
                                <RadioGroup>
                                    <Radio value={2}>底部切换</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={style.btn}>
                    <Button onClick={onCancel}>取消</Button>
                    <Button onClick={this.onOk} className="margin-sm-left" type="primary">确认</Button>
                </div>
            </div>
        )
    }
}

export default Form.create()(LayoutModal)
