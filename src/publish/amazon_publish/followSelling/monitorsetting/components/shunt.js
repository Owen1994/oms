import React from 'react';

class Shunt extends React.PureComponent {
    render() {
        const {
            title,
            content,
            left = 1,
            right = 1,
            className = '',
        } = this.props;
        return (
            <div className={`wj-shunt ${className}`}>
                <div style={{ flex: left }} className="wj-shunt-left">{title}<span>：</span></div>
                <div style={{ flex: right }} className="wj-shunt-right breakwrod">{content}</div>
            </div>
        );
    }
}

export default Shunt;
