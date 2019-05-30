import React from 'react';
import {
    Icon,
} from 'antd';

// 可切换到编辑状态的组件
export default (value, callback) => (
    <div>
        <span>{value}</span>
        <span
            className="margin-ss-left pointer"
            onClick={callback}
        >
            <Icon type="edit" />
        </span>
    </div>
)