import React, {Component} from 'react' //在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {render} from 'react-dom' //ReactDOM 可以帮助我们把 React 组件渲染到页面上去
import {connect} from 'react-redux'
import Modalmodel from '../components/Modalmodel'
import {
    Form,
    Radio,
    Input,
    Button,
    DatePicker,
    Col
} from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button;
const RangePicker = DatePicker.RangePicker;
const {TextArea} = Input;
import {platformsearchaction} from "../actions";
import StandardFormRow from '../../../../components/StandardFormRow';
import TagSelect from '../../../../components/TagSelect';
import {
    AMAZON_TYPE, AMAZON_SEARCH
} from '../../../common/searchModel/constants';
import {levelOptions} from "../../../../util/options";
import moment from "moment/moment";
import {filterParams} from '../../../../util/baseTool';    //表单过滤方法

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        Searchqueue: false,
        advancedSearch: false,
        searchType: '1',
    };
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    };
    // 条件筛选
    handleFormSubmit = (param, name) => {
        this.props.form.setFieldsValue({
            [name]: param
        });
        this.customsListFetch()
    };
    //时间转换
    timestampToTime = (timestamp) => {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let HH = date.getHours() + ':';
        let mm = date.getMinutes() + ':';
        let ss = date.getSeconds();
        return Y + M + D + HH + mm + ss;
    };
    //类型搜索
    changeSearchType = () => {
        let searchType = this.state.searchType === '1' ? '2' : '1';
        this.setState({searchType});
    };
    //表单提交
    customsListFetch = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('values', values);
            if (!err) {
                const filter = filterParams(values);
                if (filter.publishState) {    //刊登状态
                    filter.publishState = values.publishState.toString();
                }
                if (filter.searchType) {      //搜索类型
                    filter.searchType = values.searchType.toString();
                }
                if (filter.publishTime) {     //刊登时间
                    filter.startTime = this.timestampToTime(values.publishTime[0].valueOf())
                    filter.endTime = this.timestampToTime(values.publishTime[1].valueOf())
                    delete filter.publishTime
                }
                filter.pageNumber = 1;
                filter.pageData = 20;
                this.props.fetchPosts({
                    key: 'data',
                    value: filter
                });
                const filters = {...this.props.Infos.params, ...filter};
                this.props.baseInfoForm({params: filters});
            }
        })
    };
    //筛选搜索切换
    onChangeSearch = (event) => {
        if (event.target.value === 'select') {
            const {params} = this.props.Infos;
            let filters = {
                publishState: params.publishState,
                searchType: '1',
                searchContent: '',
                startTime: '',
                endTime: '',
            };

            this.props.baseInfoForm({params: filters});
            this.setState({Searchqueue: false});
        } else {
            const {params} = this.props.Infos;
            let filters = {
                publishState: params.publishState,
                searchType: '1',
                searchContent: '',
                startTime: '',
                endTime: '',
            };
            this.props.baseInfoForm({params: filters});
            this.setState({Searchqueue: true});
        }
    };
    //高级搜索
    advancedbtn = () => {
        const {advancedSearch} = this.state;
        advancedSearch ? this.setState({advancedSearch: false}) : this.setState({advancedSearch: true});
    };
    //表单提交
    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        this.customsListFetch();
    };
    //重置
    resetFields = () => {
        let paramss = {
            publishState: '0',
            searchType:'1',
            searchContent: '',
            // publishTime: [0,0]
            startTime: '',
            endTime: '',
        };
        this.props.form.setFieldsValue({publishState: "0", searchType: '1', searchContent: '', publishTime: []});
        this.props.baseInfoForm({params: paramss});
        this.setState({searchType: '1'});
    };

    //数据初始化
    componentDidMount() {
        this.props.form.setFieldsValue({    //重置搜索条件
            publishState: '0',
            searchType: '1',
            searchContent: '',
            publishTime: []
        });
        this.customsListFetch();            //初始化数据
        let paramss = {                     //存入redux
            publishState: '0',
            searchType:'1',
            searchContent: '',
            // publishTime: [0,0]
            startTime: '',
            endTime: '',
        };
        this.props.baseInfoForm({params: paramss});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {params} = this.props.Infos;
        const textSearch = (
            <div className="amazonqueue-textSearch">
                <StandardFormRow title="搜索类型 ：">
                    <FormItem>
                        {getFieldDecorator('searchType', {
                            initialValue: [this.state.searchType]
                        })(
                            <TagSelect
                                isMulti={false}
                                onChange={this.changeSearchType}
                                values={[this.state.searchType]}
                                datas={AMAZON_SEARCH}
                                name='searchType'
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <div className="margin-ss-top"></div>
                <StandardFormRow title="搜索内容：">
                    <FormItem>
                        {getFieldDecorator('searchContent')(
                            <TextArea placeholder="请输入搜索内容" style={{width: 344}} autosize={{minRows: 2, maxRows: 6}}/>
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
        const heightSearch = (
            <div className="margin-15-top amazonqueue-heightSearch">
                <StandardFormRow title="刊登时间：">
                    <FormItem>
                        {getFieldDecorator('publishTime')(
                            <RangePicker
                                className={'ant-xs-row'}
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                }}
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{width: 344}}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
        return (
            <div className="newCluenk amazonqueue">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="amazonqueue-defaultSearch">
                        <StandardFormRow title="刊登状态 ：">
                            <FormItem>
                                {getFieldDecorator('publishState', {
                                    initialValue: '0'
                                })(
                                    <TagSelect
                                        isMulti={false}
                                        onChange={this.handleFormSubmit}
                                        values={params.publishState}
                                        datas={AMAZON_TYPE}
                                        name='publishState'
                                    />
                                )}
                            </FormItem>
                        </StandardFormRow>
                        <div className="search-tab">
                            <RadioGroup
                                defaultValue="select"
                                onChange={this.onChangeSearch}
                            >
                                <RadioButton value="select">筛选</RadioButton>
                                <RadioButton value="search">搜索</RadioButton>
                            </RadioGroup>
                        </div>
                    </div>
                    {this.state.Searchqueue ? (textSearch) : null}
                    {this.state.advancedSearch ? (heightSearch) : null}
                    {this.state.Searchqueue ?
                        <div className="amazonqueue-searchBtn">
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button onClick={this.resetFields} className="margin-md-left">重置</Button>
                            <Button onClick={this.advancedbtn} className="margin-md-left">
                                {
                                    this.state.advancedSearch ? '取消高级搜索' : '高级搜索'
                                }</Button>
                        </div> : null}
                </Form>
            </div>
        );
    }
}

export default Condition