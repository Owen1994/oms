import React from 'react';
import Treelist from './index';

export default class App extends React.Component {
    handleTreeSelect = () => {
        // to do sth
    }

    render() {
        return (
            <Treelist
                {...this.props}
                treeData={treeData} // 树节点的数据
                name="tempClassId" // 请求列表时需要传的关于该树节点的字段名称
                handleListFetch={this.listFetch} // 处理点击后的列表重新拉取的方法
                onSelect={this.handleTreeSelect} // 可选项，可按需求添加树节点点击后的回调
            />
        );
    }
}
