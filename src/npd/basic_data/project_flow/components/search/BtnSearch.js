import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';

class BtnSearch extends Component {
    render() {
        return (
            <div className="npd-project-btn-search">
                <Button type="primary" htmlType="submit">搜索</Button>
                <Tooltip placement="bottom" title={"清空已选的搜索条件"}>
                    <Button onClick={this.props.onReset}>重置</Button>
                </Tooltip>
            </div>
        );
    }
}

export default BtnSearch;