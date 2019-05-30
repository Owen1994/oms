import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterParams } from '../../../../util/baseTool';    //表单过滤方法
import { Form, } from 'antd';

import Search from '../components/Search';     //搜索组件
import Tablelist from '../components/Tablelist';    //表格组件   
import TableOption from '../components/TableOpiton';    //新增按钮组件
import actions from '../actions';
import '../css/index.css';



// const mapStateToProps = state => {
//   const datas = state.datas;
//   return { datas }
// };


class App extends React.Component {


  // 请求列表
  listFetch = (pageNumber = 1, pageData = 20) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //过滤搜索列表内容
        // const filter = filterParams(values);
        values['pageNumber'] = pageNumber;
        values['pageData'] = pageData;
        const filters = filterParams(values);
        this.props.list_fetch({ name: 'data', value: filters });
      }
    });
  }


  componentDidMount() {
    this.props.form.setFieldsValue({
      state: -1
    })
    this.listFetch();
  }

  onReset = () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue({
      state: -1
    });
  }

  render() {
    return (
      <div>
        <Search
          {...this.props}
          listFetch={this.listFetch}
          onReset={this.onReset}
        />
        <div className="npd-depot-tablelist">
          <TableOption {...this.props} listFetch={this.listFetch} />
          <Tablelist {...this.props} listFetch={this.listFetch} />
        </div>
      </div>
    );
  }
}

// const getDepotList = actions.getDepotList;
// export default connect(
//   mapStateToProps,
//   { getDepotList }
// )(
//   Form.create()(App)
// );

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators(actions, dispatch)
)(
  Form.create()(App)
);
