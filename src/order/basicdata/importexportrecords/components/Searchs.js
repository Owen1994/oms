import React from 'react';
import {
    Form,
    Input,
    DatePicker,
    Button,
    Row,
    Col,
} from 'antd';
import CTags from '../../../../components/ctags';
import {
    TASKSTATUS,
    TASKTYPE
} from '../constants';
import '../css/newSearch.css';
/**
 *作者: chenlin
 *功能描述: PR搜索
 *时间: 2018/10/27 11:55
 */
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Search = Input.Search;

export default class SearchComponent extends React.Component {


    handleChange = () => {
        this.props.onSearch();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };

        const ctageSearch = (
            <div className="search_tag">
            <Row>
                  <Col span={8}>
                    <FormItem
                        label="类型：">
                        {getFieldDecorator('taskType', {
                            initialValue: [-1],
                        })(
                            <CTags
                                list={TASKTYPE}
                                handleChange={this.handleChange}
                            />,
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        label="处理状态：">
                        {getFieldDecorator('taskStatus', {
                            initialValue: [-1],
                        })(
                            <CTags
                                list={TASKSTATUS}
                                handleChange={this.handleChange}
                            />,
                        )}
                    </FormItem>
                </Col>
            </Row>
            </div>
        );


        const selectSearch = (
            <div className="search_select">
               <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="操作时间"
                        >
                            {getFieldDecorator('createdTime', rangeConfig)(
                                <RangePicker
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{width: "270px"}}
                                />,
                            )}
                        </FormItem>
                    </Col>
                   <Col span={8}>
                       <FormItem
                           label="操作人"
                           className="content_right"
                       >
                           {getFieldDecorator('creator', {
                               rules: [{
                                   required: false,
                                   message: `请输入`
                               }],
                           })(
                               <Search
                                   placeholder="双击可批量查询"
                                   enterButton="搜索"
                                   onDoubleClick={() => this.props.toggleModal()}
                                   onSearch={() => this.props.onSearch()}
                                   allowClear
                               />
                           )}
                           <Button type="default" onClick={() => this.props.onReset()}>
                               重置
                           </Button>
                       </FormItem>
                   </Col>

                </Row>
            </div>
        );
        return (
            <div className="erp-search">
                {selectSearch}
                {ctageSearch}
            </div>
        );
    }
}
