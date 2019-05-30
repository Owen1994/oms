import React from 'react';
import { InputNumber, Form } from 'antd';

const FormItem = Form.Item;

export default class DelieverTime extends React.Component {
    handleBlur = (e, indexs) => {
        const { condition_code, delieverTime, form } = this.props;
        const delieverTimeStart = form.getFieldValue('delieverTimeStart');
        const delieverTimeEnd = form.getFieldValue('delieverTimeEnd');
        delieverTime[0] = delieverTimeStart;
        delieverTime[1] = delieverTimeEnd;
        if (delieverTimeStart > delieverTimeEnd) {
            if (indexs) {
                form.setFieldsValue({ delieverTimeEnd: delieverTimeStart });
                delieverTime[indexs] = delieverTimeStart;
            } else {
                form.setFieldsValue({ delieverTimeStart: delieverTimeEnd });
                delieverTime[indexs] = delieverTimeEnd;
            }
        }
        this.props.selectChange(condition_code, delieverTime);
    }

    render() {
        const { isChecked } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='auto-deliever-time'>
                <div style={{ paddingRight: 10 }}>近</div>
                <FormItem>
                    {
                        getFieldDecorator('delieverTimeStart', {
                            initialValue: undefined,
                        })(
                            <InputNumber
                                min={1}
                                max={30}
                                precision={0}
                                placeholder="请输入"
                                style={{ width: 103 }}
                                disabled={!isChecked}
                                onBlur={(e) => this.handleBlur(e, 0)}
                            />
                        )
                    }
                </FormItem>
                <div style={{ padding: '0 10px' }}>到</div>
                <FormItem>
                    {
                        getFieldDecorator('delieverTimeEnd', {
                            initialValue: undefined,
                        })(
                            <InputNumber
                                min={1}
                                max={30}
                                placeholder="请输入"
                                style={{ width: 104 }}
                                disabled={!isChecked}
                                onBlur={(e) => this.handleBlur(e, 1)}
                            />
                        )
                    }
                </FormItem>
            </div>
        )
    }
}