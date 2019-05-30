import React from 'react';
import {
    Form, Row, Col,
} from 'antd';
import '../../../common/css/index.css';
import ScanInput from '../../../common/components/ScanInput';

const FormItem = Form.Item;
export default class Search extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const { onSearchListener } = this.props;
        const typeSearch = (
            <div className="padding-sm border-bottom-line padding-sm">
                <Row type="flex" align="middle">
                    <Col span={6}>
                        <FormItem
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            label="卡板号"
                        >
                            {getFieldDecorator('cardBoardSn', {
                                rules: [{ required: true, message: '请输入卡板号' }],
                            })(
                                <ScanInput
                                    placeholder="请扫描或输入卡板"
                                    style={{ width: 280 }}
                                    onSearch={onSearchListener}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="wms-search breadcrumb overflow-hidden ">
                <Form layout="horizontal">
                    {typeSearch}
                </Form>
            </div>
        );
    }
}
