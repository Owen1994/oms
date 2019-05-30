
// 含关联营销 的 详情页

import React from 'react'
import Text from './text'
import {
    Row,
    Col,
} from 'antd'

const style = {
    img: {
        display: 'block',
        marginTop: '15px',
    },
    defaultImg: {
        height: '320px',
        textAlign: 'center',
        fontSize: '30px',
        color: '#bbbbbb',
        backgroundColor: '#eee',
        lineHeight: '320px',
        marginTop: '15px',
    },
    title: {
        fontSize: '32px',
        textAlign: 'center'
    }
}

const defaultImgList = new Array(undefined, undefined, undefined, undefined, undefined);

class Info extends React.Component {

    render() {
        const {
            title,
            imgList = [],
            describe,
            relevancyType,  // 关联类型
            describeType, // 描述类型类型
            footerType, // 底部类型
            footer,
        } = this.props;
        const list = imgList && imgList.length ?
            imgList.map((v, i) => (<img style={style.img} src={v} alt="" key={v} />))
            :
            defaultImgList.map((v, i) => {
                return <div key={i} style={style.defaultImg}>{`默认图片 ${i + 1}`}</div>;
            })
        if (relevancyType == 2) {
            list.push(<Text />)
        } else {
            list.splice(1, 0, <Text />)
        }
        return (
            <div key="1">
                <p style={style.title}>
                    {title || "默认标题，仅用于展示标题"}
                </p>
                {list}
            </div>
        )
    }
}

export default Info
