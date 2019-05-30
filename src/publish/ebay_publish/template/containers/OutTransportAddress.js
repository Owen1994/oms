/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import OutTransportAddressComponent from '../components/transport/OutTransportAddress'
import { parseOutTransportAddress } from '../selector/OutTransportAddress'
import {
    checkAddress,
    checkAllAddress
} from '../actions/OutTransportAddress'
import {getOutTransportAddress} from '../actions/OutTransportAddress'
import {resetServiveItem} from '../actions/service'



const mapStateToProps = (state, props) => {
    const outTransportAddressList = parseOutTransportAddress(state);
    return {outTransportAddressList, ...props}
};

export default connect(
    mapStateToProps,
    {checkAddress, checkAllAddress,getOutTransportAddress,resetServiveItem}
)(OutTransportAddressComponent)
