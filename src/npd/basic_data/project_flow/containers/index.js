import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterRequest } from '../../../../util/filter_request';    //表单过滤方法
import actions from '../actions';
import { Form } from 'antd';

import Search from '../components/search/index'
import Tablelist from '../components/list/Tablelist';    //表格组件   
import TableOption from '../components/list/TableOpiton';    //新增按钮组件
import { filterParams } from '../../../../util/baseTool';    //表单过滤方法

import {
  // platformCode, 
  projectName
} from '../constants/index'

class App extends React.Component {

  state = {
    isChange: false     //是否切换搜索类型
  }
  // 请求列表
  listFetch = (pageNumber = 1, pageData = 20) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //过滤搜索列表内容
        const filter = filterParams(values)
        filter['pageNumber'] = pageNumber;
        filter['pageData'] = pageData;
        filter['businessCode'] = filter['businessCode'] === -1 ? undefined : filter['businessCode'];
        this.props.list_fetch({ name: 'data', value: filter });
      }
    });
  }

  handleRadioChange = (e) => {
    if (e.target.value === "1") {
        this.setState({ isChange: false })
    } else {
        this.setState({ isChange: true })
    }
    // this.props.form.resetFields();
    // this.props.listFetch();
}

  // 重置
  onReset = () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue({
      state: -1,
      businessCode: -1,
    })
    this.setState({ isChange: false })
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      state: -1,
      businessCode: -1,
    })
    this.listFetch();
  }

  onSetField = (e) => {
    // this.props.form.setFieldsValue({
    //   platformCode: e,
    // })
    this.listFetch();
  }

  render() {
    return (
      <div>
        <Search {...this.props} 
                listFetch={this.listFetch} 
                onReset={this.onReset} 
                onSetField={this.onSetField} 
                isChange={this.state.isChange}
                handleRadioChange={this.handleRadioChange}
                />
        <div className="npd-project-tablelist">
          <TableOption {...this.props} listFetch={this.listFetch} />
          <Tablelist {...this.props} listFetch={this.listFetch} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators(actions, dispatch)
)(
  Form.create()(App)
);
