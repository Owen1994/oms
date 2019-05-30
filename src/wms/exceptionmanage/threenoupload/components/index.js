import React from 'react';
import {
    Button,
    Form, Input, message,
} from 'antd';
import '../css/index.css';
import PhotoUpload from '../../../../compliance/common/components/PhotoUpload';
import { UPLOAD_URL } from '../../../../constants';
import ScanInput from '../../../common/components/ScanInput';
import { fetchPost } from '../../../../util/fetch';
import { UPLOAD } from '../constants/Api';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

/**
 * 三无产品登记
 */
class App extends React.Component {
    submit = () => {
        const values = this.props.form.getFieldsValue();
        const { imageList } = values;
        if (!imageList || imageList.length <= 0) {
            message.error('请至少上传1张图片');
            return;
        }
        const params = {
            data: {
                ...values,
                imgList: imageList,
            },
        };
        fetchPost(UPLOAD, params, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.form.setFieldsValue({
                        imageList: undefined, // 清空图片
                    });
                }
            });
    };

    upload = getFieldDecorator => (
        <div className="search_select padding-ss-bottom">
            <FormItem
                wrapperCol={{ span: 6 }}
                label="扫描运单"
            >
                {getFieldDecorator('expressNo')(
                    <ScanInput
                        placeholder="请扫描或输入运单编号"
                    />,
                )}
            </FormItem>
            <FormItem
                wrapperCol={{ span: 6 }}
                label="采购员"
            >
                {getFieldDecorator('buyer')(
                    <Input
                        placeholder="请输入采购员名称"
                    />,
                )}
            </FormItem>
            <div style={{ paddingLeft: 95 }} className="margin-sm-top">
                <div style={{ display: 'flex' }}>
                    {getFieldDecorator('imageList', {
                        initialValue: [],
                    })(
                        <PhotoUpload
                            action={UPLOAD_URL}
                            maxLength={5}
                            onChange={this.onChange}
                            beforeUpload={(file) => {
                                const isRightType = file.type === 'image/jpeg' || file.type === 'image/jpg';
                                if (!isRightType) {
                                    message.error('文件格式必须为Jpg/Jpeg格式');
                                    return false;
                                }
                                const isSizeOk = file.size / 1024 / 1024 < 1;
                                if (!isSizeOk) {
                                    message.error('上传文件不能大于1M');
                                    return false;
                                }
                                return true;
                            }}
                        />,
                    )}
                </div>
                <div className="red">注：最多只能上传5张图片，仅限JPG/JPEG,在800*800以内，单张大小不能超过1M</div>
                <div
                    className="margin-ms-top margin-ts-bottom"
                >
                    备注
                    <FormItem
                        className="margin-ts-top"
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('remark')(
                            <TextArea
                                placeholder="如无送货单，请在此写明原因"
                                autosize={{ minRows: 2, maxRows: 5 }}
                            />,
                        )}
                    </FormItem>
                </div>
                <Button
                    onClick={this.submit}
                    className="margin-ss-top"
                    type="primary"
                >
                    确认上传
                </Button>
            </div>
        </div>
    );

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="wms-threenoproductmanage white erp-search ">
                {this.upload(getFieldDecorator)}
            </div>
        );
    }
}

export default Form.create()(App);
