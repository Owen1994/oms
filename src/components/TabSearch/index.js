import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import './index.css'

class App extends Component {
    render() {
        const { onChangeSearch } = this.props;
        return (
            <div className="search-tab">
                <RadioGroup
                    defaultValue="select"
                    onChange={onChangeSearch}
                >
                    <RadioButton value="select">筛选</RadioButton>
                    <RadioButton value="search">搜索</RadioButton>
                </RadioGroup>
            </div>
        );
    }
}

export default App;