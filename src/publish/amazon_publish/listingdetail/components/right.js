import React from 'react'
import {
    Icon
} from 'antd'

class Right extends React.PureComponent {

    state = {
        main: null,
        index: 0,
        list: [
            { name: '基本信息', key: "basicInfo" },
            { name: 'SKU信息', key: "skuInfo" },
            { name: '详情信息', key: "detailInfo" },
            { name: '图片信息', key: "imgInfo" },
        ]
    }

    componentDidMount() {
        const main = document.querySelector("#main");
        window._weijie = { main }
        this.setState({
            main
        })
    }

    goTo = (id) => {
        const { main } = this.state;
        if (!main) return;
        var element = document.getElementById(id);
        window._weijie.element = element
        window._weijie.offsetTop = element.offsetTop
        main.scrollTo({
            top: element.offsetTop,
            behavior: "smooth"
        })
    }

    skip = (v, i) => {
        window._weijie.v = v
        window._weijie.i = i
        this.goTo(v)
        this.setState({
            index: i
        })
    }

    next = () => {
        const { index, list } = this.state
        if (index >= list.length - 1) return;
        const nextIndex = index + 1;
        const v = list[nextIndex].key;
        this.skip(v, nextIndex)
    }

    prev = () => {
        const { index, list } = this.state
        if (index <= 0) return;
        const nextIndex = index - 1;
        const v = list[nextIndex].key;
        this.skip(v, nextIndex)
    }

    render() {
        const { list, index } = this.state;
        return (
            <div className="amazon-listing-detail-right">
                <span onClick={this.prev} className="pointer"><Icon type="up-circle" /></span>
                <ul >
                    {
                        list.map((v, i) => {
                            const className = i === index ? "active" : "";
                            return (
                                <li className={className} key={v.key} >
                                    <div className="pointer" onClick={() => this.skip(v.key, i)}>{v.name}</div>
                                    <span></span>
                                </li>
                            )
                        })
                    }
                </ul>
                <span onClick={this.next} className="pointer" style={{ top: "200px" }}><Icon type="down-circle" /></span>
            </div>
        )
    }
}

export default Right
