import React from 'react';
import { Radio, DatePicker, Input, Button, Form, Row, Col, Tooltip } from 'antd';
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow';
import TagSelect from '../../../../common/components/advancedSearchModel/TagSelect';
import { status } from '../constants';
import moment from 'moment';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const TextArea = Input.TextArea;


export default class Search extends React.Component {
    state = {
        showSearch: 1,
        isHightSearch: false,
        placeholder: '请输入意向供应商名称',
    }
    // 高级搜索
    onChangeHightSearch = () => {
        if (this.state.isHightSearch === false) {
            this.setState({ isHightSearch: true })
        } else {
            this.setState({ isHightSearch: false })
        }
    }
    onRadioChange = (e) => {
        switch (e.target.value){
            case '0' : this.setState({placeholder: '请输入意向供应商名称'});break;
            case '1' : this.setState({placeholder: '请输入意向供应商编码'});break;
            case '2' : this.setState({placeholder: '请输入正式供应商编码'});break;
        }
    }
    handleSubmit = () => {
        this.props.listFetch()
    }
    resetFields = () => {
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const textSearch = this.state.showSearch >= 1 ? (
            <div className="npd-supplier-defaultSearch">
                <StandardFormRow title="搜索类型：">
                    <FormItem>
                        {getFieldDecorator('searchType', {
                            rules: [{ required: false, message: '请选择' }],
                            initialValue: '0',
                        })(
                            <RadioGroup size="small" onChange={this.onRadioChange}>
                                <RadioButton value="0">意向供应商名称</RadioButton>
                                <RadioButton value="1">意向供应商编码</RadioButton>
                                <RadioButton value="2">正式供应商编码</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="搜索内容：">
                    <FormItem>
                        {getFieldDecorator('searchContent')(
                            <TextArea placeholder={this.state.placeholder} style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        ) : null;

        const btnSearch = (
            <div className="npd-supplier-btnSearch">
                <Button type="primary" onClick={() => this.handleSubmit()}>搜索</Button>
                <Tooltip placement="bottom" title={"清空已选的搜索条件"}>
                    <Button onClick={this.resetFields}>重置</Button>
                </Tooltip>
                <Button onClick={() => this.onChangeHightSearch()}>
                    {
                        this.state.isHightSearch ? '取消高级搜索' : '高级搜索'
                    }
                </Button>
            </div>
        )

        const heighSearch = (
            <div className="npd-supplier-heightSearch">
                <StandardFormRow title="提交时间：">
                    <FormItem>
                        {getFieldDecorator('createTime')(
                            <RangePicker
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['开始时间', '结束时间']}
                                style={{ width: 344 }}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
        return (
            <div className="search breadcrumb padding-sm overflow-hidden">
                <Form layout="inline">
                    {textSearch}
                    {this.state.isHightSearch ? heighSearch : null}
                    {btnSearch}
                </Form>
            </div>
        )
    }
}