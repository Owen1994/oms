import React from 'react'
import Wrap from './wrap'

const style = {
    title: {
        textAlign: 'left',
        paddingLeft: '15px',
        fontWeight: 700,
    }
}
class Chunk extends React.Component {
    onChange = () => {
        const { info, onChange } = this.props;
        const { key } = info;
        onChange(info)
    }

    render() {
        const { info } = this.props;
        const { htmlStr, key, name } = info;
        const innerHtml = { __html: htmlStr }
        return (
            <Wrap
                className="margin-sm-top"
                title={<p style={style.title}>{name}</p>}
                onChange={this.onChange}
                onDelete={this.onDelete}
            >
                <div className="template-describe-footer" dangerouslySetInnerHTML={innerHtml}></div>
            </Wrap>
        )
    }
}

export default Chunk
