/**
 * 作者: pzt
 * 描述: 详情页右侧导航组件
 * 时间: 2018/4/18 20:27
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'

class AsideRight extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        cur: 0,
    }


    // 获取元素距离顶部的距离
    getElemTop = (id) => {
        return document.getElementById(id).offsetTop
    }

    /**
     * 作者: pzt
     * 描述: 滚动导航
     * 时间: 2018/4/3 19:37
     * @param <Object> event 事件对象
     * @param <Array> arr  楼层id集合
     **/
    handleScroll = (event, arr) => {
        var topScr = event.target.scrollTop;
        for (let i = 0; i < arr.length; i++) {
            let elemtop = this.getElemTop(arr[i]) - this.getElemTop(arr[i]) / 5;
            if (topScr > elemtop) {
                this.setState({
                    cur: i,
                })
            }
        }

    }

    /**
     * 作者: pzt
     * 描述: 楼层导航
     * 时间: 2018/4/3 19:42
     * @param <String> id 楼层id
     * @param <Number> index 序号
     **/
    scrollToAnchor = (item, index) => {
        this.setState({
            cur: index
        })
        let anchorElement = document.getElementById(item.id);
        // let anchorElement = this.refs[item.ref];
        if (anchorElement) {
            anchorElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }


    scrollfun = () => {
        const navTopArr = [
            'order-info',
            'logistic-info',
            'order-detail',
            'capital-detail',
            'time-record',
            'product-info',
            'client-msg',
            'operation-log'
        ]
        this.handleScroll(event, navTopArr)
    }

    componentDidMount() {

        // 电梯导航
        document.querySelector('.main').addEventListener("scroll", this.scrollfun);
    }

    /**
     *作者: 任贸华
     *功能描述: 组件卸载前去掉scroll绑定事件，避免切换到其他页面ID不存在，该事件引起引起的报错
     *参数说明:
     *时间: 2018/4/9 15:18
     */
    componentWillUnmount() {
        // 移除事件
        document.querySelector('.main').removeEventListener("scroll", this.scrollfun);
    }

    render() {
        const navArr = [
            {id: 'order-info', val: "订单信息", ref: 'orderInfo'},
            {id: 'logistic-info', val: "物流信息", ref: 'logisticInfo'},
            {id: 'order-detail', val: "订单详情", ref: 'orderDetail'},
            {id: 'capital-detail', val: "订单总额", ref: 'capitalDetail'},
            {id: 'time-record', val: "时间记录", ref: 'timeRecord'},
            {id: 'product-info', val: "产品信息", ref: 'productInfo'},
            {id: 'client-msg', val: "客户留言", ref: 'clientMsg'},
            {id: 'operation-log', val: "操作日志", ref: 'operationLog'},
        ]
        const li = navArr.map((item, index) => {
            return (<li
                key={index}
                className={this.state.cur == index ? "cur" : ''}
                onClick={() => {
                    this.scrollToAnchor(item, index)
                }}><i></i>{item.val}</li>)
        });
        return (
            <div className="newCluenk aside-right">
                <ul>
                    {li}
                </ul>
            </div>
        );
    }
}

export default AsideRight
