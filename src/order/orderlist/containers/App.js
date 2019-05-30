// /**
//  *作者: 魏洁(唐峰)
//  *功能描述: 订单管理--全部订单--父组件
//  *参数说明:
//  *时间: 2018/5/28 10:14
//  */
// import React, {Component} from 'react'
// import {render} from 'react-dom'
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux';
// import actions from '../actions'
// import {pageCache} from '../../../util/baseTool'

// import {
//     Form, Tabs
// } from 'antd'

// import '../css/css.css'


// import Condition from '../components/Condition';
// import AccurateCondition from '../components/AccurateCondition';
// import Tablelist from '../components/Tablelist';
// import {getrangetime,} from '../../../util/baseTool';
// import Searchplatform from '../../../components/searchOpt/containers/App';
// import SearchValues from '../../../components/searchValues/containers/App';

// const TabPane = Tabs.TabPane;

// class UserForm extends Component {

//     constructor(props) {
//         super(props);
//     }


//     componentWillMount() {
//         const pageCachedata = pageCache(this, `${location.pathname}${location.search}`)
//         this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getType', key: 'orderTypeId'})
//         this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getState', key: 'orderStateId'})
//         this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', key: 'platformId'})
//         this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getCustomer', key: 'customer'})
        
//         const {start, end} = getrangetime()
//         this.props.fetchPosts({
//             key: 'data', value: pageCachedata || {
//                 pageNumber: 1,
//                 pageData: 20,
//                 paymentStartTime:start,
//                 paymentEndTime:end
//             }
//         })

//     }

//     onChange = (key) => {
//         this.props.tablemodelaction({active: key})
//     }

//     render() {
//         return (<div className="newClue order-list">
//             <div className="newCluewk">
//                 <Tabs onChange={this.onChange} type="card" className="tabsCard">
//                     <TabPane tab="检索" key="1"><Condition {...this.props} /></TabPane>
//                     <TabPane tab="精确搜索" key="2"><AccurateCondition {...this.props} /></TabPane>
//                 </Tabs>
//                 <Tablelist {...this.props} />
//                 <SearchValues {...this.props} />
//             </div>
//         </div>);
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
