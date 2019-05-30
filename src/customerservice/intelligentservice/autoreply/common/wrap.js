import React from 'react';

class Wrap extends React.PureComponent {
    render() {
        const { title, className } = this.props;
        return (
            <div className={className ? `autoreply-set-add-wrap ${className}` : 'autoreply-set-add-wrap'}>
                <span className="autoreply-set-add-wrap-title">{title}</span>
                {this.props.children}
            </div>
        );
    }
}

export default Wrap;
