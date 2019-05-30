import React from 'react';

class Shunt extends React.PureComponent {
    render() {
        const {
            title,
            content,
            left = 1,
            right = 1,
            leftMinWidth,
            className = '',
        } = this.props;
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
}

export default Shunt;
