import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions'
import { filterParams } from '../../../../util/baseTool';    //表单过滤方法

import {
  Form,
  Tabs,
} from 'antd';
const TabPane = Tabs.TabPane;

import '../css/index.css'

import SearchTab from '../components/search/SearchTab';


class App extends React.Component {

  constructor(props) {
    super(props);
  }

  // 请求列表
  listFetch1 = (pageNumber, pageData) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //过滤搜索列表内容
        const filter = filterParams(values)
        filter['pageNumber'] = pageNumber || 1;
        filter['pageData'] = pageData || 20;
        filter['state'] = -1;
        this.props.list_fetch1({ name: 'data', value: filter });
      }
    });
  }
  listFetch2 = (pageNumber, pageData) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //过滤搜索列表内容
        const filter = filterParams(values)
        filter['pageNumber'] = pageNumber || 1;
        filter['pageData'] = pageData || 20;
        this.props.list_fetch2({ name: 'data', value: filter });
      }
    });
  }

  listFetch3 = (pageNumber = 1, pageData = 20) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //过滤搜索列表内容
        const filters = filterParams(values);
        filters.businessLineCode = filters.businessLineCode === -1 ? undefined : filters.businessLineCode;
        filters.pageNumber = pageNumber;
        filters.pageData = pageData;
        this.props.list_fetch3({ name: 'data', value: filters });
      }
    });
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      businessLineCode: -1
    })
    this.listFetch1();
    this.listFetch2();
    this.listFetch3();
  }

  onReset = () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue({
      businessLineCode: -1
    })
  }
  
  render() {
    return (
        <SearchTab
          {...this.props}
          onReset={this.onReset}
          listFetch1={this.listFetch1}
          listFetch2={this.listFetch2}
          listFetch3={this.listFetch3}
        />
    );
  }
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators(actions, dispatch)
)(
  Form.create()(App)
);
