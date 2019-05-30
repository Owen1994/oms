import React, { Component } from 'react';
import { Form, Select, Row, Col } from 'antd';
import { getPlatformList } from '../../../common/request';

const FormItem = Form.Item;
const Option = Select.Option;

class HightSearch extends Component {
    state = {
        platformLsit: [],
    }

    componentDidMount() {
        getPlatformList().then((result) => {
            result.unshift({
                key: '',
                label: '全部',
            });
            this.setState({ platformLsit: result });
        });
    }

    // 数据改变时重新拉取
    onChange = (item) => {
        this.props.platformChange(item);
    }

    render() {
        const { platformLsit } = this.state;
        return (
            <div className="message-intercept-height-search">
                <div className='yks-erp-search_order'>
                    <div className="select-type pdt-none">
                        <Row type="flex" align="middle">
                            <Col span={24}>
                                <FormItem label="平台">
                                    <Select
                                        showSearch
                                        placeholder="请选择平台"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        style={{ width: '344px' }}
                                        onChange={this.onChange}
                                    >
                                        {
                                            platformLsit.map(v => <Option key={v.key} value={v.key}>{v.label}</Option>)
                                        }
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default HightSearch;
