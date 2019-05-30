import React from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Row,
    Col,
} from 'antd';
import CTags from '../../../../../components/ctags';
import {
    ROLETYPE,
} from '../../constants';
/**
 *作者: chenlin
 *功能描述: PR搜索
 *时间: 2018/10/27 11:55
 */
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormItem = Form.Item;

export default class SearchComponent extends React.Component {
    handleRoleTypeChange = () => {
        this.props.onSearch();
    }


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
                                    initialValue: 0,
                                })(
                                    <RadioGroup size="small">
                                         <Radio
                                             value={0}
                                             style={{fontSize: "12px"}}
                                         >
                                             采购员ID
                                         </Radio>
                                         <Radio
                                             value={1}
                                             style={{fontSize: "12px"}}
                                         >
                                             人员名称
                                         </Radio>
                                         <Radio
                                             value={2}
                                             style={{fontSize: "12px"}}
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

        const ctageSearch = (
            <div className="ctageSearch">
              <Row>
                  <Col span={8}>
                    <FormItem
                            label="角色类型"
                        >
                            {getFieldDecorator('roleType', {
                                initialValue: [0],
                            })(
                                <CTags
                                    list={ROLETYPE}
                                    handleChange={this.handleRoleTypeChange}
                                />,
                            )}
                        </FormItem>
                  </Col>
                </Row>
            </div>
        );

        return (
            <div className="search breadcrumb">
                <div className="select-type">
                        {typeSearch}
                </div>
                {ctageSearch}
            </div>
        );
    }
}
