import React from 'react';
import {
    Checkbox,
} from 'antd';
import defaultData from '../constants/Condtions';
/**
 *作者: huangjianfeng
 *功能描述: 采购角色配置
 *时间: 2018/10/11 15:55
 */
const CheckboxGroup = Checkbox.Group;

export default class CondtionsLeft extends React.Component {
    onChange = (e) => {
        this.props.checkCondtion(e || []);
    }

    render() {
        return (
            <div className="pms-pce-content-left white">
                <div className="pms-pce-content-left-h">
                    可选择条件：
                </div>
                {
                    <CheckboxGroup
                        options={defaultData}
                        onChange={this.onChange}
                        value={this.props.condtionsData}
                    />
                }
            </div>
        );
    }
}
