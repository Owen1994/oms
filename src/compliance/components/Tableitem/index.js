import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { getStateName } from '../../utils';
import { getSinsitiveReason } from '../../data';
import './index.css';

class App extends Component {
    render () {
        const {title, content, left, right, float, separator} = this.props;
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
                <span key={index}>{item.label || getStateName(item, getSinsitiveReason)}{index === contents.length - 1? '': separators}</span>
            ));
            allChildren =content.map((item, index) => (
                <span key={index}>{item.label || getStateName(item, getSinsitiveReason)}{index === content.length - 1? '': separators}</span>
            ));
        }else{
            children = content
        }
        return (
            <div className="table-item" style={{float: float ? float : 'none'}}>
                <div className="label" style={{width: left ? left : 60}}>
                    <span>{title}</span>
                </div>
                <div className="items" style={{width: right ? right : 120}}>
                    { children ? children : '--' }
                    { expand ? (
                        <Tooltip placement="bottomLeft" title={allChildren}>
                            <a>更多</a>
                        </Tooltip>
                    ): '' }
                </div>
            </div>
        )
    }
}
export default App;


