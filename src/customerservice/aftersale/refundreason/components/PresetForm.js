import React from 'react';
import { Form, Radio, Input } from 'antd';
import FilterType from './FilterType';

import { GET_REFUNDRESON_LIST } from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { fieldData1, fieldData2 } from '../constants';

const RadioGroup = Radio.Group;

class PresetForm extends React.Component {
    state = {
        options: [],
        ifReturnGoods: false
    }

    componentDidMount() {
        this.getRefundReasons();
    }

    getRefundReasons = () => {
        fetchPost(GET_REFUNDRESON_LIST, {
            group: '1',
            pageNumber: 1,
            pageData: 1000,
        }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        options: data.data.data,
                    });
                }
            });
    }

    handlereturnGoods = (e) => {
        const value = e.target.value;
        this.setState({ ifReturnGoods: value });
    }
    render() {
        const { options, ifReturnGoods } = this.state;
        return (
            <div className="breadcrumb padding-sm refund-no-shadow">
                <div className="refund-form-item">
                    <div className="add-label">预设表单项</div>
                    <div className="add-content preset-add-content">
                        {
                            fieldData1.map(item => (
                                <div className="ant-form-item" key={item.fieldName}>
                                    <div className="ant-form-item-label" style={{ width: 100 }}>
                                        <div className={item.isRequire === 1 ? "ant-form-item-required" : ''}>{item.fieldName}：</div>
                                    </div>
                                    <div className="ant-form-item-control-wrapper">
                                        <FilterType item={item} options={options} />
                                    </div>
                                </div>
                            ))
                        }
                        <div className="ant-form-item">
                            <div className="ant-form-item-label" style={{ width: 100 }}>
                                <div className="ant-form-item-required">是否退货：</div>
                            </div>
                            <div className="ant-form-item-control-wrapper">
                                <RadioGroup defaultValue={0} onChange={this.handlereturnGoods}>
                                    <Radio value={0}>否</Radio>
                                    <Radio value={1}>是</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        {ifReturnGoods
                            ? (
                                <div className="ant-form-item">
                                    <div className="ant-form-item-label" style={{ width: 100 }}>
                                        <div>退货跟踪号：</div>
                                    </div>
                                    <div className="ant-form-item-control-wrapper">
                                        <Input placeholder='请输入退货跟踪号' />
                                    </div>
                                </div>
                            ): null
                        }
                        {
                            fieldData2.map(item => (
                                <div className="ant-form-item" key={item.fieldName}>
                                    <div className="ant-form-item-label" style={{ width: 100 }}>
                                        <div className={item.isRequire === 1 ? "ant-form-item-required" : ''}>{item.fieldName}：</div>
                                    </div>
                                    <div className="ant-form-item-control-wrapper">
                                        <FilterType item={item} options={options} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default Form.create()(PresetForm);
