/**
*作者: 任贸华
*功能描述: 异步加载组件
*参数说明:
*时间: 2018/4/16 10:47
*/
import React, { Component } from 'react'

export default class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: null
        };
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.load.toString() !== this.props.load.toString())||(nextProps.search!== this.props.search)) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });

        props.load().then((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}