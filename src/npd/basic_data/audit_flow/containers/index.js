import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterParams } from '../../../../util/baseTool'; 
import actions from '../actions';
import { Form } from 'antd';
import Search from '../components/search/index'
import Tablelist from '../components/list/Tablelist';    //表格组件   
import TableOption from '../components/list/TableOpiton';    //新增按钮组件

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
        filter['state'] = filter['state'] === undefined ? -1 : filter['state']; 
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
    this.props.form.resetFields();
    this.props.form.setFieldsValue({
        state: -1
      })
    this.listFetch();
}

  // 重置
  onReset = () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue({
      state: -1
    });
    this.setState({ isChange: false })
  }

  componentDidMount(){
    this.props.form.setFieldsValue({
      state: -1
    })
    this.listFetch();
  }

  render() {
    return (
      <div>
        <Search {...this.props} 
                listFetch={this.listFetch} 
                onReset={this.onReset} 
                isChange={this.state.isChange} 
                handleRadioChange={this.handleRadioChange} 
                />
        <div className="npd-audit-tablelist">
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
