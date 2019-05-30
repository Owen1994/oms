/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import Payment from '../components/payment'
import { getPaymentTemplate} from '../actions/payment'
import  {parsePaymentData } from '../selector/payment'




const mapStateToProps = (state, props) => {
    const loadingState = state.loadingState;
    const paymentData = parsePaymentData(state)
    return { loadingState,paymentData}
};

export default connect(
    mapStateToProps,
    { getPaymentTemplate }
)(Payment)
