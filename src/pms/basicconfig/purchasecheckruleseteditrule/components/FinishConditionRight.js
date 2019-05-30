import React from 'react';
import { Icon } from 'antd';
/**
 *作者: huangjianfeng
 *功能描述: 采购角色配置
 *时间: 2018/10/11 15:55
 */

export default class FinishConditionRight extends React.Component {
    handleDel = (key) => {
        this.props.delCondtion(key);
    };

    render() {

        return (
            <div className="pms-pce-content-right">
                <div className="pms-pce-content-right-h">
                    已选择条件(多个条件之间的关系为“或者”)：
                </div>
                {
                    this.props.list.map(item => (
                        <div key={item.key}>
                            <p>
                                <span>{item.title}</span>
                                <span className="colorBlue ml5" onClick={() => this.props.showModal(item.key, item.children, item.value)}>{item.subTitle}</span>
                                <span className="colorBlue pms-position" onClick={() => this.handleDel(item.key)}><Icon type="delete" />&nbsp;&nbsp;删除</span>
                            </p>
                            <p>
                                {
                                    item.children ? item.children.map(it => (
                                        <span key={it.label}>({it.label});</span>
                                    )) : <span key={item.key}>(&gt;{item.value})</span>
                                }
                            </p>
                        </div>
                    ))
                }
            </div>
        );
    }
}
