
### 参数说明

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| text | 确认框的描述 | string|ReactNode | - |
| btnName | 按钮文字 | String | - |
| onConfirm | 点击确认的回调 | function(e) | - |

### 引入

```

import React, { Component } from 'react';
import Popconfirm from '../components/Popconfirm';

```

### 组件

```

class App extends Component {

    // 点击确定回调
    onConfirm = (e) => {
        console.log(e);
    }

    render() {
        return (
            <Popconfirm 
                text={text} 
                onConfirm={onConfirm}
                btnName="删除"
            /> 
        );
    }
}

export default App;

```