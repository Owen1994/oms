import React from 'react';
import { Icon } from 'antd';

class Wrap extends React.PureComponent {
    click = (type, key) => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(type, key);
        }
    }

    render() {
        const { content, type, showIcon, isDelieverTime } = this.props;
        let comp = null;
        // console.log(content);
        if (content && Array.isArray(content)) {
            if (isDelieverTime) {
                if (content.length >= 2) {
                    comp = (
                        <div key='delieverTime' className="autoreply-set-add-chunk">{`${content[0].key}~${content[1].key}天`}</div>
                    )
                }
            } else {
                comp = (
                    <div>
                        {
                            content.map((v) => {
                                const { label, key } = v;
                                return (
                                    <div key={key} className="autoreply-set-add-chunk">
                                        {label}
                                        {
                                            showIcon !== false ? <span onClick={() => this.click(type, key)} className="padding-sm-left"><Icon type="close-circle" /></span> : null
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }
        }
        return comp;
    }
}

export default Wrap;
