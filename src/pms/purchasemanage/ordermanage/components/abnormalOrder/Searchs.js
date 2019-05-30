import React from 'react';
import {
    Form,
    Input,
    DatePicker,
    Button,
    Radio,
    Row,
    Col,
} from 'antd';

/**
 *作者: chenlin
 *功能描述: 搜索
 *时间: 2018/10/27 11:55
 */
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormItem = Form.Item;

export default  class SearchComponent extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索类型"
                            >
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup
                                        size="small"
                                    >
                                         <Radio
                                             value={1}
                                             style={{fontSize : '12px'}}
                                         >
                                             PR单号
                                         </Radio>
                                         <Radio
                                             value={2}
                                             style={{fontSize : '12px'}}
                                         >
                                             SKU
                                         </Radio>
                                    </RadioGroup>
                                    )}
                            </FormItem>
                            <div>
                                {getFieldDecorator('searchContents', {
                                        rules: [{
                                            required: false,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Input
                                            placeholder="双击可批量查询"
                                            size="large"
                                            style={{ width: 280 }}
                                            onDoubleClick={() => this.props.toggleModal()}
                                        />
                                    )}
                                     <Button type="primary" onClick={() => this.props.onSearch()}>
                                        搜索
                                    </Button>
                                    <Button type="default" onClick={this.props.onReset}>
                                        重置
                                    </Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="breadcrumb search">
                <div className="select-type">
                        {typeSearch}
                </div>
            </div>
        );
    }
}
