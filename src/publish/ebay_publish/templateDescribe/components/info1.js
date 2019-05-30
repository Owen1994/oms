
// 含关联营销 的 详情页

import React from 'react'
import Text from './text'
import {
    Row,
    Col,
} from 'antd'

const style = {
    smallImg: {
        width: '200px',
        display: 'block',
        marginTop: '15px',
        marginRight: '20px',
    },
    bigImg: {
        width: '100%',
        display: 'block',
        marginTop: '15px',
    },
    defaultBigImg: {
        width: '100%',
        height: '320px',
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '30px',
        color: '#bbbbbb',
        backgroundColor: '#eee',
        lineHeight: '320px',
    },
    defaultSmallImgWrap: {
        width: '33.33333%',
        padding: '15px 20px 0 0'
    },
    defaultSmallImg: {
        height: '260px',
        textAlign: 'center',
        fontSize: '30px',
        color: '#bbbbbb',
        backgroundColor: '#eee',
        lineHeight: '260px',
    },
    imgWrap: {
        display: 'flex',
        // justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: '32px',
        textAlign: 'center'
    }
}

const defaultImgList = new Array(undefined, undefined, undefined, undefined, undefined);

class Info1 extends React.Component {

    state = {
        index: 0,
    }

    defaultMouseEnter = (i) => {
        this.setState({
            index: i
        })
    }
    render() {
        const {
            index
        } = this.state;
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
            imgList.map((v, i) => (<img style={style.smallImg} src={v} alt="" key={v} />))
            :
            defaultImgList.map((v, i) => {
                let defaultSmallImgWrap = style.defaultSmallImgWrap;
                if ((i + 1) % 3 === 0) {
                    defaultSmallImgWrap = {
                        ...defaultSmallImgWrap,
                        padding: '15px 0 0 0',
                    }
                }
                return <div style={defaultSmallImgWrap}>
                    <div onMouseEnter={() => this.defaultMouseEnter(i)} key={i} style={style.defaultSmallImg}>{`默认图片 ${i + 1}`}</div>
                </div>
            })
        const img = imgList && imgList.length ?
            <img style={style.bigImg} src={imgList[index]} alt="" />
            :
            <div style={style.defaultBigImg}>{`默认图片 ${index + 1}`}</div>;
        return (
            <div key="2">
                <p style={style.title}>
                    {title || "默认标题，仅用于展示标题"}
                </p>
                {
                    img
                }
                <div style={style.imgWrap}>
                    {list}
                </div>
                <Text />
            </div>
        )
    }
}

export default Info1
