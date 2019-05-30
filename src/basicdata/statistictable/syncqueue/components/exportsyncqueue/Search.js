import React from 'react';
import {
    Form,
    Row,
    Col,
} from 'antd';
import CTags from '../../../../../components/ctags';
import {
    DOWNLOAD_STATE,
} from '../../constants';


const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
};


export default class Search extends React.Component {
    // 导出
    handleDownloadStateChange = () => {
        this.props.onSearch();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ctageSearch search bgcfff">
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="状态"
                        >
                            {getFieldDecorator('downloadState', {
                                initialValue: [-1],
                            })(
                                <CTags
                                    list={DOWNLOAD_STATE}
                                    handleChange={this.handleDownloadStateChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}
