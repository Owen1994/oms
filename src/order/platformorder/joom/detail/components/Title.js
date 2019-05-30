import React from 'react';

export default class Title extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <div className="joom-detail-warp">
                {
                    title ? <div className="joom-detail-title">{title}</div> : null
                }
                {
                    this.props.children ?
                        this.props.children
                        : null
                }
            </div>
        )
    }
}