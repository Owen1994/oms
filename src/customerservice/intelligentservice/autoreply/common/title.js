import React from 'react';

class Title extends React.PureComponent {
    render() {
        const { title, isImportant, className } = this.props;
        return (
            <div className={className}>
                <div className="autoreply-set-add-title">
                    {
                        isImportant ? <span className="red">*</span> : null
                    }
                    {title}
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default Title;
