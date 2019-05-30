
// 含关联营销 的 详情页

import React from 'react'
import Table from './table'
import Footer from './footer'
import Footer1 from './footer1'
import Info from './info'
import Info1 from './info1'
import {
    Row,
    Col,
} from 'antd'

const style = {
    main: {
        // width: '80%',
        padding:'0 40px',
        // margin: '0 auto',
    },
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
}

class Detail extends React.Component {

    onChange = (type) => {
        const { has, changeState } = this.props;
        has[type] = false
        changeState({
            has
        })
    }

    render() {
        const {
            module,
            changeState,
            imgList = [],
            describe,
            footer,
            layout,
        } = this.props;
        const {
            relevancyType,  // 关联类型
            describeType, // 描述类型类型
            footerType, // 底部类型
        } = layout;
        const {
            specifics
        } = module
        return (
            <div style={style.main}>
                {
                    describeType === 1 ?
                        <Info />
                        :
                        <Info1 />
                }
                {
                    specifics.has ?
                    <Table layout={layout} type='specifics' module={module} changeState={changeState} />
                    : null
                }
                {
                    footerType === 1 ?
                        <Footer footer={footer} layout={layout}/>
                        :
                        <Footer1 footer={footer} layout={layout} />

                }
            </div>
        )
    }
}

export default Detail
