import React from 'react';
import moment from 'moment';
import {
    Form,
    Col,
    Row,
    DatePicker,
    Radio,
    Button,
    Input,
} from 'antd';
import CSelect from '../../../../components/cselect';
import { HANDLESTATE,DATAHANDLETYPE,DATAHANDLEMODULE } from '../constants/index';
import { Order_Query_People_Name } from '../constants/Api';
import { getLoginmsg,hasPerssion } from '../../../../util/baseTool';


const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;


/**
 * @author huangjianfeng
 * @description 搜索
 */
export default class SearchComponent extends React.Component {

    // componentDidMount () {
    //     this.props.form.setFieldsValue({
    //         searchContents: getLoginmsg().userName,
    //     })
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
        const isShwoOpEmployee = !hasPerssion('010-000007-000001-002', this.props);
        const userName = getLoginmsg().userName;
        const classParams = {
            data: {
                businessLines: '1',
                pageData: 20,
                pageNumber: 1,
                procurementType: '2',
                searchColumn: 'name',
            },
        };
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="处理状态">
                            {getFieldDecorator('handleState')(
                                <CSelect
                                    list={HANDLESTATE} // 默认值列
                                    code='code' // 列表编码字段
                                    name='name' // 列表名称字段
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={0}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="操作时间">
                            {getFieldDecorator('operationTime')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="数据处理类型">
                            {getFieldDecorator('dataHandleType')(
                                <CSelect
                                    list={DATAHANDLETYPE}
                                    code='code'
                                    name='name'
                                    apiListType={0}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="数据处理模块">
                            {getFieldDecorator('dataHandleModule')(
                                <CSelect
                                    list={DATAHANDLEMODULE}
                                    code='code'
                                    name='name'
                                    apiListType={0}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="操作人"
                        >
                            {getFieldDecorator('operator', {
                                initialValue: userName,
                            })(
                                <CSelect
                                    disabled={isShwoOpEmployee}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={Order_Query_People_Name}
                                    list={this.list}
                                    isNotCache
                                    params={classParams} // 搜索参数
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );


        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索类型">
                                {getFieldDecorator('searchType', {
                                    initialValue: 2,
                                })(
                                    <RadioGroup size="small">
                                        {/* <Radio value={2}>操作人</Radio> */}
                                        <Radio value={1}>文件名称</Radio>
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div>
                                {getFieldDecorator('searchContents')(
                                    <Input
                                        placeholder="双击可批量查询"
                                        size="large"
                                        style={{ width: 280 }}
                                        onDoubleClick={() => this.props.toggleModal()}
                                    />,
                                )}
                                <Button type="primary" onClick={() => this.props.onSearch()}>
                                    搜索
                                </Button>
                                <Button type="default" onClick={() => this.props.onReset()}>
                                    重置
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );


        return (
            <div className="breadcrumb">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                        {typeSearch}
                    </div>
                    {/* {ctageSearch} */}
                </Form>
            </div>
        );
    }
}
