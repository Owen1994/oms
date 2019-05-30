import React from 'react'
import {
    Modal,
    Form,
    Input,
    DatePicker,
} from 'antd'
const FormItem = Form.Item;
import moment from 'moment';

import { fetchPost } from '@/util/fetch';
import {
    Review_Add_Or_Edit_Authorization_Api,
    Review_Get_Country_Api
} from '../constants/Api'
import CSelect from '@/components/cselect';

class AuthorizationModal extends React.Component {
    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
    };

    // 表单提交
    handleSubmitAddOrEditAuthorization = () => {
        const params = [
            'awsAccessKeyId',
            'authorizeDate',
            'countryCode',
            'marketPlaceId',
            'secretKey',
            'sellerId',
            'validity',
            'shopName',
        ];
        this.props.form.validateFields(params, (err, values) => {
            const accountID = this.props.accountID ? this.props.accountID : '';
            const detailData = this.props.detailData ? this.props.detailData : {};
            if (detailData.country) {
                if (detailData.country.label === values.countryCode) {
                    values.countryCode = detailData.country.key;
                }
            }
            const data = {
                data: {
                    key: accountID.length !== 0 ? this.props.accountID : undefined,
                    ...values,
                    authorizeDate: values.authorizeDate.valueOf(),
                    validity: values.validity.valueOf(),
                }
            };
            if (!err) {
                fetchPost(Review_Add_Or_Edit_Authorization_Api, data, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.loadData();
                        }
                    })
            }
        })
    };

    //取消
    handleCancel = () => {
        this.props.showModal(false, false, '');
    };

    render() {
        const { visible, detailData, accountID } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                title={'授权帐号/修改'}
                width={600}
                onCancel={this.handleCancel}
                onOk={this.handleSubmitAddOrEditAuthorization}
                destroyOnClose
            >
                <Form>
                    <div className="amazon-authorization-grab">
                        <FormItem
                            {...this.formItemLayout}
                            label="店铺名称"
                        >
                            {
                                getFieldDecorator('sellerId', {
                                    rules: [
                                        { required: true, message: '店铺名称不能为空' },
                                        { max: 100, message: '店铺名称不能超过100个字符'}
                                    ],
                                    initialValue: detailData.sellerId ? detailData.sellerId : undefined,
                                })(
                                    <Input
                                        style={{ width: 330 }}
                                        // disabled={accountID !== ''}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="国家"
                        >
                            {
                                getFieldDecorator('countryCode', {
                                    rules: [{ required: true, message: '国家不能为空' }],
                                    initialValue: detailData.country ? detailData.country.label : undefined,
                                })(
                                    <CSelect
                                        code='key'
                                        name='label'
                                        url={Review_Get_Country_Api}
                                        apiListType={2}
                                        disabled={accountID !== ''}
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="销售账号(Seller ID)"
                        >
                            {
                                getFieldDecorator('shopName', {
                                    rules: [
                                        { required: true, message: '销售账号(Seller ID)不能为空' },
                                        { max: 50, message: '销售账号(Seller ID)不能超过50个字符'}
                                    ],
                                    initialValue: detailData.shopName ? detailData.shopName : undefined,
                                })(
                                    <Input
                                        disabled={accountID !== ''}
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="AWS Access Key ID"
                        >
                            {
                                getFieldDecorator('awsAccessKeyId', {
                                    rules: [
                                        { required: true, message: 'AWS Access Key ID不能为空' },
                                        { max: 50, message: 'AWS Access Key ID不能超过50个字符'}
                                    ],
                                    initialValue: detailData.awsAccessKeyId ? detailData.awsAccessKeyId : undefined,
                                })(
                                    <Input
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="Secret Key"
                        >
                            {
                                getFieldDecorator('secretKey', {
                                    rules: [
                                        { required: true, message: 'Secret Key不能为空' },
                                        { max: 50, message: 'Secret Key不能超过50个字符'}
                                    ],
                                    initialValue: detailData.secretKey ? detailData.secretKey : undefined,
                                })(
                                    <Input
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="Market Place ID"
                        >
                            {
                                getFieldDecorator('marketPlaceId', {
                                    rules: [
                                        { required: true, message: 'Market Place ID不能为空' },
                                        { max: 50, message: 'Market Place ID不能超过50个字符'},
                                    ],
                                    initialValue: detailData.marketPlaceId ? detailData.marketPlaceId : undefined,
                                })(
                                    <Input
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="授权日期"
                        >
                            {
                                getFieldDecorator('authorizeDate', {
                                    rules: [{ required: true, message: '授权日期不能为空' }],
                                    initialValue: detailData.authorizeDate ? moment(detailData.authorizeDate ) : undefined,
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="请选择授权日期"
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="有效期至"
                        >
                            {
                                getFieldDecorator('validity', {
                                    rules: [{ required: true, message: '有效期不能为空' }],
                                    initialValue: detailData.validity ? moment(detailData.validity ) : undefined,
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="请选择有效期到期时间"
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(AuthorizationModal)
