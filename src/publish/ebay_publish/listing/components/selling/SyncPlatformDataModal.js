import React from 'react';
import { 
    Form, 
    Modal, 
    Row, 
    Col, 
    DatePicker,
    Input,
    message,
} from 'antd';
import { fetchPost } from 'util/fetch';
import CSelect from '@/components/cselect';
import { SYNC_PLATFORM_TYPE } from '../../constants/Selling';
import apis from '../../constants/Api';
import { parseStrToArray } from 'util/StrUtil';

const FormItem = Form.Item;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
};

const maxItemIdCount = 2000;
const timeDay = 119;
class SyncPlatformDataModal extends React.Component {
    state = {
        submitState: false,
    };


    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            nextProps.form.setFieldsValue({'type': 1});
        }
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // const item = this.props.item;
                const params = {...values};
                if (typeof params.accounts === 'string') {
                    params.accounts = [params.accounts];
                }
                if (params.type === 1) {
                    params.itemids = parseStrToArray(params.itemids);
                    if (params.itemids.length < 1) {
                        message.warning('itemId数量不能为空');
                        return ;
                    }
                    if(params.itemids.length > maxItemIdCount) {
                        message.warning(`itemId数量不能大于${maxItemIdCount}`);
                        return ;
                    }
                    delete params.publishtimes;
                }

                if (params.type === 2) {
                    if (!params.publishtimes || params.publishtimes.length < 2) {
                        message.warning('首次刊登时间区间必填');
                        return;
                    }
                    params.publishtimes = params.publishtimes.map(moment => moment.valueOf());
                    if (params.publishtimes[1] - params.publishtimes[0] > timeDay*24*60*60*1000) {
                        message.warning(`首次刊登时间区间不能大于${timeDay}天`);
                        return ;
                    }
                    delete params.itemids;
                }
                this.setState({submitState: true});
                // params.key = item.key;
                fetchPost(apis.SYNC_PLATFORM, {data:params}, 1)
                .then((result) => {
                    this.setState({submitState: false});
                    if (result.state === '000001') {
                        this.props.onCancel();
                    }
                });
            }
        });
    };

    render(){
        const { onCancel, visible } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const type = getFieldValue('type');
        const { submitState } = this.state;
        return (
            <Modal
                width={600}
                title="同步平台数据"
                visible={visible}
                onCancel={onCancel}
                onOk={this.handleOk}
                confirmLoading={submitState}
                destroyOnClose={true}
                maskClosable={false}
            >
                <FormItem
                    {...formItemLayout}
                    label="销售账号"
                >
                    {getFieldDecorator('accounts', {
                        rules: [{
                            required: true, message: '请选择销售账号',
                        }],
                    })(
                        <CSelect
                            url={apis.EBAY_ACCOUNT_API}
                            name='id'
                            code='id'
                            apiListType={2}
                            params={{
                                searchColumn: 'searchContent'
                            }}
                        />
                    )}
                </FormItem>
                <Row gutter={8} className="margin-ss-top" style={{align: "middle", justify: "center"}}>
                    <Col span={6}>
                    <FormItem>
                            {getFieldDecorator('type', {
                                initialValue: 1,
                                rules: [
                                    {
                                        required: true, message: '请输入类型',
                                    }]
                            })(
                                <CSelect
                                    style={{width: '100%'}}
                                    list={SYNC_PLATFORM_TYPE}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={18}>
                        <FormItem>
                            {
                                type === 1 ? 
                                getFieldDecorator('itemids')(
                                    <TextArea
                                        placeholder="支持多个输入，最多支持2000个" 
                                        // style={{ width: 330 }}
                                        autosize={{ minRows: 6, maxRows: 6 }} 
                                    />
                                )
                                :
                                getFieldDecorator('publishtimes')(
                                    <RangePicker
                                        format="YYYY-MM-DD"
                                        placeholder={['开始日期', '结束日期']}
                                        // style={{width: 330}}
                                    />
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default Form.create()(SyncPlatformDataModal);
