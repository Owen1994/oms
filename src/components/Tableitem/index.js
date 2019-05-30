import React, { Component } from 'react';
import { Tooltip } from 'antd';
import './index.css';

class App extends Component {
    render () {
        const {title, content, left, right, float, separator,label="label"} = this.props;
        let expand = false;
        let children;
        let allChildren;
        if(Array.isArray(content) === true){
            if(content.length > 3){
                expand =  true
            }else{
                expand =  false
            }
            let contents = content.slice(0, 3);
            const separators = separator? separator: '；'
            children = contents.map((item, index) => (
                <span key={index}>{item[label] }{index === contents.length - 1? '': separators}</span>
            ));
            allChildren =content.map((item, index) => (
                <span key={index}>{item[label] }{index === content.length - 1? '': separators}</span>
            ));
        }else{
            children = content
        }
        const more = this.props.onClick? <a onClick={this.props.onClick}>更多</a>:
            <Tooltip placement="bottomLeft" title={allChildren}>
                <a>更多</a>
            </Tooltip>
        return (
            <div className="table-item" style={{float: float ? float : 'none'}}>
                <div className="label" style={{width: left ? left : 60}}>
                    <span>{title}</span>
                </div>
                <div className="items" style={{width: right ? right : 120}}>
                    { children ? children : '--' }
                    { expand ? more: '' }
                </div>
            </div>
        )
    }
}
export default App;


