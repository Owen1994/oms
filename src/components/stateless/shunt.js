
import React from 'react'
import './shunt.css'

export default function Shunt(props) {
    const {
        title,
        content,
        left = 1,
        right = 1,
        leftMinWidth,
        className = '',
    } = props;
    const leftStyle = {
        flex: left
    }
    if (leftMinWidth) {
        leftStyle.minWidth = leftMinWidth
    }

    return (
        <div className={`wj-shunt ${className}`}>
            <div style={leftStyle} className="wj-shunt-left">{title}<span>：</span></div>
            <div style={{ flex: right }} className="wj-shunt-right breakwrod">{content}</div>
        </div>
    );

}


// 案例

// <Shunt title='销售账号' content='内容' right={2} />