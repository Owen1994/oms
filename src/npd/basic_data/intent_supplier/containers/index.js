import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterParams } from '../../../../util/baseTool';    //表单过滤方法
import { Form } from 'antd';

import Search from '../components/Search';     //搜索组件
import Tablelist from '../components/Tablelist';  //表格组件
import actions from '../actions';
import TableOption from '../components/TableOpiton';    //表格上方新增按钮组件
import '../css/index.css';

class App extends React.Component {

  // 请求列表
  listFetch = (pageNumber=1, pageData=20) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //过滤搜索列表内容
        const filter = filterParams(values)
        filter['pageNumber'] = pageNumber;
        filter['pageData'] = pageData;
        if(values.searchType && values.searchContent){
          switch(Number.parseInt(values.searchType, 10)){
            case 0 :
            filter['vendorsName'] = values.searchContent;
              break;
            case 1 :
            filter['vendorsCode'] = values.searchContent;
              break;
            case 2 :
            filter['supplierCode'] = values.searchContent;
              break;
            default: 
              
          }
        }
        // if(values.upTime){
        //   filter['createTime'] = values.upTime;
        // }
        delete filter.searchContent
        this.props.list_fetch({ name: 'data', value: filter });
      }
    });
  }

  dataFetch = (name, data) => {
    this.props.data_fetch({ name: name, value: data });
  }


  render() {
    return (
      <div>
        <Search {...this.props} listFetch={this.listFetch} />
        <div className="npd-supplier-tablelist">
          <TableOption listFetch={this.listFetch} {...this.props} dataFetch={this.dataFetch} />
          <Tablelist {...this.props} listFetch={this.listFetch} dataFetch={this.dataFetch} />
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
