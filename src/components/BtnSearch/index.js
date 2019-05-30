import React, { Component } from 'react';
import { Button } from 'antd';
import './index.css';

class BtnSearch extends Component {
    render() {
        const {btn} = this.props;
        return (
            <div className="btn-search">
                {btn.map((item, index) => (
                    <Button key={index} type={item.type} htmlType={item.htmlType} onClick={item.onClick}>
                        {item.name}
                    </Button>
                ))}
            </div>
        );
    }
}

export default BtnSearch;