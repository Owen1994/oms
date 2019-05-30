import React from 'react';
import { randNum } from '../../../../util/baseTool';

class TrackingInformation extends React.Component {
    render() {
        const { operateLogs } = this.props;
        return (
            <div className="add-refund-item">
                <div className="add-label">操作信息</div>
                <div className="add-content tracking-container">
                    <div className="flex-box">
                        {operateLogs.map(item => (
                            <div className="refund-progress-item" key={randNum()}>
                                <div className="operate-date">{item.createTime}</div>
                                <div className="refund-progress">{item.operateDesc}</div>
                                <div className="refund-operator">{item.operator}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default TrackingInformation;
