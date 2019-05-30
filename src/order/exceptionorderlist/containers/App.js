// import React, {Component} from 'react'
// import {render} from 'react-dom'
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux';
// import actions from '../actions'

// import {
//     Form, Tabs
// } from 'antd'

// import '../css/css.css'


// import Condition from '../components/Condition';
// import AccurateCondition from '../components/AccurateCondition';
// import Tablelist from '../components/Tablelist';
// import SearchValues from '../../../components/searchValues/containers/App';
// import {pageCache, functions} from "../../../util/baseTool";

// const TabPane = Tabs.TabPane;

// class UserForm extends Component {

//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         if (!functions(this, '001-000002-000002-001')) {
//             return false
//         }
//         const pageCachedata = pageCache(this, `${location.pathname}${location.search}`)
//         this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getOrderExceptionType', key: 'exceptionType'})
//         this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getType', key: 'orderTypeId'})
//         this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', key: 'platformId'})
//         this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getCustomer', key: 'customer'})
//         this.props.fetchPosts({
//             key: 'data', value: pageCachedata || {
//                 pageNumber: 1,
//                 pageData: 20
//             }
//         })
//     }

//     onChange = (key) => {
//         this.props.tablemodelaction({active: key})
//     }

//     render() {
//         return (
//             <div className="newClue newClueTitle">
//                 <div className="newCluewk">
//                     <Tabs onChange={this.onChange} type="card" className="tabsCard">
//                         <TabPane tab="检索" key="1"><Condition {...this.props} /></TabPane>
//                         <TabPane tab="精确搜索" key="2"><AccurateCondition {...this.props} /></TabPane>
//                     </Tabs>
//                     <Tablelist {...this.props} />
//                     <SearchValues {...this.props} />
//                 </div>
//             </div>
//         );
//     }
// }

// export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
//     Form.create({
//         mapPropsToFields(props) {
//             const Infos = {}
//             for (let i in props.Infos) {
//                 if (props.Infos[i].name) {
//                     Infos[i] = Form.createFormField(props.Infos[i])
//                 }
//             }
//             return Infos
//         },
//         onFieldsChange(props, fields) {
//             props.baseInfoForm(fields)

//         },
//     })(UserForm));

import { connect } from 'react-redux';
import App from '../components';
import actions from '../actions';

const mapStateToProps = (state, props) => {
    return ({
    ...state,
    ...props,
});
}
export default connect(mapStateToProps, actions)(App);