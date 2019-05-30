import React from 'react';
import CondtionsContainerLeft from '../containers/CondtionsLeft';
import FinishConditionContainerRight from '../containers/FinishConditionRight';
/**
 *作者: huangjianfeng
 *功能描述: 采购角色配置
 *时间: 2018/10/11 15:55
 */

export default class Condtions extends React.Component {
    render() {
        return (
            <div className="white pms-pce-content clear margin-ms-top">
                <CondtionsContainerLeft {...this.props} />
                <FinishConditionContainerRight {...this.props} />
            </div>
        );
    }
}
