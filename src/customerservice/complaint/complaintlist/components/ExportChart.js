import React from 'react';
import {
    Radio, Form, DatePicker, Input, message, Row, Col,
} from 'antd';
import moment from 'moment';
import CSelect from '../../../../components/cselect';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

const accoutType = [
    {
        id: '0',
        name: '全部账号',
    },
    {
        id: '1',
        name: '部分账号',
    },
];

class ExportChart extends React.Component {
    state = {
        isPartAccount: true,
    }

    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
    };

    // 禁用日期范围
    disabledDate = current => current && current > moment().endOf('day');

    onDateChange = (value) => {
        const { form } = this.props;
        const preDate = form.getFieldValue('date');
        setTimeout(() => {
            const values = JSON.parse(JSON.stringify(value));
            const start = moment(values[0]);
            const end = moment(values[1]);
            if (end - start >= 31 * 24 * 60 * 60 * 1000) {
                message.warning('时间跨度不能超过31天');
                form.setFieldsValue({ date: preDate });
            }
        }, 100);
    }

    accountChange = (e) => {
        const value = e.target.value;
        if (value === '1') {
            this.setState({ isPartAccount: false });
        } else if (value === '0') {
            this.setState({ isPartAccount: true });
        }
    }

    render() {
        const { isPartAccount } = this.state;
        const { platformId } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Row>
                    <Col span={12}>
                        <FormItem
                            {...this.formItemLayout}
                            label="导出账号"
                        >
                            {getFieldDecorator('type', {
                                initialValue: '0',
                                rules: [{ required: true, message: '请选择导出账号' }],
                            })(
                                <RadioGroup size="small" onChange={this.accountChange}>
                                    {
                                        accoutType.map(v => <Radio key={v.id} value={v.id}>{v.name}</Radio>)
                                    }
                                </RadioGroup>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem>
                            {getFieldDecorator('accountList', {
                                rules: [{ required: !isPartAccount, message: '请选择账号' }],
                            })(
                                <CSelect
                                    disabled={isPartAccount}
                                    // list={LIST_CSELECT} // 默认值列表
                                    placeholder="请选择账号"
                                    code="label" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url="/customerServiceSystem/index/api/Pub/autoReplySellerAccount"
                                    mode="multiple" // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ platformId }} // 搜索参数
                                    // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    // 其它字段同 Select组件配置
                                    // handleFilter={this.handleFilter} // 搜索结果过滤
                                    localSearch={1} // 是否开启本地过滤检索，默认为 0 不开启，1为 开启
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="margin-sm-top">
                    <Col span={12}>
                        <FormItem
                            {...this.formItemLayout}
                            label="时间范围"
                        >
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: '请填写时间范围' }],
                            })(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                    onChange={this.onDateChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    {getFieldDecorator('platformId', {
                        initialValue: platformId,
                    })(
                        <Input type="hidden" />,
                    )}
                </FormItem>
            </Form>
        );
    }
}
export default Form.create()(ExportChart);
