
### 参数说明

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| component | 组件 | class | - |
| btnName | 按钮名称 | String | - |
| title | 弹窗标题 | String | - |
| iconType | 按钮图标 | String|-|
| btnType | 按钮样式  "button"按钮, "font"文字 | String | button |
| visible | 是否弹出弹窗 | Bool | true |
| showModal | 打开弹窗回调函数 | Function | Function() |
| handleOk | 点击确定回调 | Function | Function(event) |
| handleCancel | 取消触发回调函数 | Function | Function() |
| width | 弹窗宽度 | number | 520 |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 footer={null} | string|ReactNode | 确定取消按钮 |

### 引入

```

import React, { Component } from 'react';
import Modal from '../components/Modal';

```

### 组件

```

class App extends Component {

    state = {
        visible: false
    }

    // 点击确定回调
    handleOk = (e) => {
        console.log(e);
    }

    // 打开弹窗
    showModal = (name) => {
        this.setState({
            [name]: true,
        });
    };

    // 取消
    handleCancel = (name) => {
        this.setState({
            [name]: false,
        });
    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
                component={(<Detail ref="form" />)}
                btnName="新增词库"
                title="新增词库"
                iconType="plus"
                btnType="button"
                visible={visible}
                showModal={() => this.showModal('visible')}
                handleOk={this.handleOk}
                handleCancel={() => this.handleCancel('visible')}
                width={520}
                footer={null}
            />
        );
    }
}

export default App;

```