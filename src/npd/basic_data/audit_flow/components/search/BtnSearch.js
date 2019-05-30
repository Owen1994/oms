import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';

class BtnSearch extends Component {
    render() {
        return (
            <div className="npd-audit-btn-search">
                <Button type="primary" htmlType="submit" size="small">搜索</Button>
                <Tooltip placement="bottom" title={"清空已选的搜索条件"}>
                    <Button onClick={this.props.onReset} size="small">重置</Button>
                </Tooltip>
            </div>
        );
    }
}

export default BtnSearch;