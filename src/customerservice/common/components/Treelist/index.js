import React from 'react';
import './index.css';
import Tree from './tree';

class App extends React.Component {
    render() {
        return (
            <div className="breadcrumb customer-service-tree-class">
                <div className="tree-main" style={{ padding: '15px 10px 15px 15px' }}>
                    {this.props.treeData.length === 0 ? <p>暂无数据</p> : <Tree {...this.props} />}
                </div>
            </div>
        );
    }
}

export default App;
