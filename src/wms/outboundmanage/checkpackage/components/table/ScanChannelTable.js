import React from 'react';
import {
    Form,
} from 'antd';
import ScanInput from '../../../../common/components/ScanInput';
import { fetchPost } from '../../../../../util/fetch';
import { SCAN_CHANGE_CHANNEL } from '../../constants/Api';
import { printWpUrl } from '../../../../common/util';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};
/**
 * 扫描换渠道
 */
export default class ScanChannelTable extends React.Component {
    state = {
        channel: '', // 新
        sourceChannel: '', // 旧
    };

    /**
     * 提交
     */
    onSubmit = () => {
        this.props.form.validateFields(['waybillNumber'], (err, value) => {
            if (err) {
                return;
            }
            const params = {
                data: {
                    ...value,
                },
            };
            fetchPost(SCAN_CHANGE_CHANNEL, params, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        this.setState({
                            ...result.data,
                        });
                        const {
                            labelType, labelUrl, height, width, direction,
                        } = result.data.label;
                        printWpUrl(width, height, labelType, labelUrl, direction === '1');
                    }
                });
        });
    };


    render() {
        const { channel, sourceChannel } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="overflow-hidden padding-sm bgcfff">
                <FormItem
                    {...formItemLayout}
                    label="扫描运单"
                >
                    {getFieldDecorator('waybillNumber', {
                        rules: [{ required: true, message: '请扫描或输入运单号' }],
                    })(
                        <ScanInput
                            isReset
                            onSearch={this.onSubmit}
                            placeholder="请扫描或输入运单号"
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="原有渠道:"
                >
                    <div>{sourceChannel}</div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="新渠道:"
                >
                    <div>{channel}</div>
                </FormItem>
            </div>
        );
    }
}
