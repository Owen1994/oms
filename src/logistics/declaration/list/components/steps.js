/**
 *作者: pzt
 *时间: 2018/5/21
 *描述: steps步骤条二次封装
 **/

import React from 'react'
import PropTypes from 'prop-types';

import { Steps } from 'antd'
import TempUpload from "./tempUpload";

export default class StepsComponent extends React.Component{

    render(){
        let Step = Steps.Step;
        const {  current, data } = this.props;
        const stepData = data.map((v,i)=>{
            return <Step title={v} key={i} ></Step>
        })
        return(
            <div>
                <Steps size="small" current={current}>
                    {stepData}
                </Steps>
            </div>
        )
    }
}

TempUpload.propTypes = {
    current: PropTypes.number
}