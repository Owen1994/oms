import React from 'react'

class Head extends React.PureComponent {
    render() {
        const { title = "", className = "", id = "" } = this.props;
        return (
            <div id={id} className={`bgcfff padding-ss ${className}`}>
                <div className="amazon-listing-detail-title">
                    {title}
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Head
