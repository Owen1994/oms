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
import CTags from '../../../components/ctags';
import CSelect from '../../../components/cselect';
import {
    MAIN_WAREHOUSES,
    SKU_CURRENT_STATES,
    SEARCH_TYPES,
} from '../constants';
import {
    GET_CATEGORY_LIST,
} from '../constants/Api';
/**
 *作者: 黄建峰
 *功能描述: PR搜索
 *时间: 2018/10/27 11:55
 */
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            isHightSearch: false,
            searchType: 1,
        };
    }

    onChangeSearch = (event) => {
        if (event.target.value === 'search') {
            this.setState({ isSearch: true });
            this.setState({ isHightSearch: false });
        } else {
            this.setState({
                isSearch: false,
                isHightSearch: false,
            });
        }
    }

    onChangeHightSearch = () => {
        if (this.state.isHightSearch === false) {
            this.setState({ isHightSearch: true });
        } else {
            this.setState({ isHightSearch: false });
        }
    }

    // 全局搜索
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSearch();
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { searchType } = this.state;
        const { onSearch, warehouseType = 1 } = this.props;
        const { getFieldDecorator } = this.props.form;
        const btnSearch = this.state.isSearch ? (
            <Row type="flex" align="middle">
                <Col span={2} />
                <Col>
                    <div className="btn-search">
                        <Button type="primary" onClick={this.onSubmit}>搜索</Button>
                        <Button onClick={this.handleReset}>重置</Button>
                        <Button type="default" onClick={this.onChangeHightSearch}>
                            {
                                this.state.isHightSearch ? '取消高级搜索' : '高级搜索'
                            }
                        </Button>
                    </div>
                </Col>
            </Row>
        ) : null;
        const searchTop = (
            <div className="search-top">
                <FormItem
                    {...formItemLayout}
                    label="主仓库"
                >
                    {getFieldDecorator('mainWarehouse', {
                        initialValue: [0],
                    })(
                        <CTags
                            list={MAIN_WAREHOUSES}
                            handleChange={onSearch}
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="SKU今日状态"
                >
                    {getFieldDecorator('todayState', {
                        initialValue: [0],
                    })(
                        <CTags
                            list={SKU_CURRENT_STATES}
                            handleChange={onSearch}
                        />,
                    )}
                </FormItem>
            </div>
        );
        const textSearch = this.state.isSearch ? (
            <div className="search-middle">
                <FormItem
                    {...formItemLayout}
                    label="搜索类型"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: searchType,
                    })(
                        <RadioGroup size="small">
                            { SEARCH_TYPES.map(item => <RadioButton key={item.key} value={item.key}>{item.label}</RadioButton>) }
                        </RadioGroup>,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="搜索内容"
                >
                    {getFieldDecorator('searchContent')(
                        <TextArea placeholder="请输入搜索条件" autosize={{ minRows: 2, maxRows: 6 }} />,
                    )}
                </FormItem>
            </div>
        ) : null;
        const textTime = this.state.isHightSearch ? (
            <div className="search-bottom">
                <FormItem
                    {...formItemLayout}
                    label="一级分类"
                >
                    {getFieldDecorator('categoryOneName')(
                        <CSelect
                            code="id"
                            name="categoryName"
                            url={GET_CATEGORY_LIST}
                            params={{ data: { warehouseType } }}
                            handleChange={onSearch}
                            formType={1}
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="初次上架时间"
                >
                    {getFieldDecorator('shelfDates', {
                        initialValue: [],
                    })(
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={['开始日期', '结束日期']}
                        />,
                    )}
                </FormItem>
            </div>
        ) : null;
        return (
            <div className="yks-erp-search">
                <div className="search-tab">
                    <RadioGroup
                        defaultValue="select"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div>
                <Form>
                    {searchTop}
                    {textSearch}
                    {textTime}
                </Form>
                {btnSearch}
            </div>
        );
    }
}
