import React, { Component } from 'react';
import { Form, Radio, Input, Row, Col } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

// import Disableinfo from '../../../common/components/Disableinfo';
import Disableinfo from '../../../common/components/Disableinfo-new'
import renderForm from '../../../common/utils/render-form';

import { fetchPost } from "../../../../util/fetch";
import { path } from '../../../configs';
// import { GET_INTELLECTUALCODE_DETAIL } from '../constants';
import { getInfringementAvoidType } from "../constants";
class Addoredit extends Component {
    state = {
        detail: {},
        getPlatformOrSite: {},
        disableInfo: [],
        data: {},
        sensitiveLayerSelected: [],
        showPrefixContent: false
    }

    componentDidMount() {
        const { intellectualCodeId } = this.props;
        if (intellectualCodeId) {
            fetchPost(path.irp + 'GetintellectualCodeDetail/getintellectualCodeDetail', {
                intellectualCodeId: intellectualCodeId
            })
                .then(data => {
                    if (data && data.state === "000001") {
                        data.data.infringementAvoid += ""
                        this.setState({
                            disableInfo: data.data.disableInfo,
                            data: data.data
                        })
                        if (data.data && data.data.infringementAvoid) {
                            this.handletInfringementAvoidTypeChange(data.data.infringementAvoid)
                            this.props.form.setFieldsValue({ infringementAvoid: data.data.infringementAvoid })
                        }

                        if (data.data.prefixContent) {
                            this.props.form.setFieldsValue({ prefixContent: data.data.prefixContent })
                        }
                    }
                })
        }

    }
    handletInfringementAvoidTypeChange = (value) => {
        if (value == 2) {
            this.setState({ showPrefixContent: true })
        } else {
            this.setState({ showPrefixContent: false })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { disableInfo, data } = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };
        const selectItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };
        const formItems = [
            {
                label: '侵权规避',
                type: 'XSelect',
                key: 'infringementAvoid',
                placeholder: '请选择侵权规避',
                colSpan: 24,
                formItemLayout: selectItemLayout,
                style: { width: '200px' },
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    options: getInfringementAvoidType,
                    onChange: this.handletInfringementAvoidTypeChange,
                    // configKey: 'id',
                    // configValue: 'name',
                }
            },
            {
                label: '前缀内容',
                key: 'prefixContent',
                placeholder: '请输入前缀内容',
                type: 'Input',
                colSpan: 24,
                formItemLayout: selectItemLayout,
                style: { width: '200px' },
                isHidden: !this.state.showPrefixContent,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                        { max: 10, message: '最多输入10个字符' },
                    ],
                },
            },
        ]
        return (
            <div className="data-riskcode-detail">
                <Row gutter={24}>
                    <Col span={24}>
                        <FormItem
                            {...formItemLayout}
                            label="知产代码"
                        >
                            {getFieldDecorator('intellectualCode', {
                                initialValue: data.intellectualCode || '',
                                rules: [
                                    { max: 20, message: '最多输入20个字符' },
                                    { required: true, message: "请输入知产代码名称", }],
                                getValueFromEvent: (e) => {
                                    return e.target.value.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '')
                                }
                            })(
                                <Input style={{ width: '200px' }} />
                            )}
                        </FormItem>
                        <Disableinfo
                            defaultItem={1}
                            getRef={this.props.getRef}
                            form={this.props.form}
                            setValue={disableInfo}
                        />
                     
                        {renderForm(formItems, this.props.form)}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(Addoredit);
// <Disableinfo
// {...this.props}
// disableInfo={disableInfo}
// addSensitiveLayer={this.addSensitiveLayer}
// addPlatformSite={this.addPlatformSite}
// remove={this.remove}
// />