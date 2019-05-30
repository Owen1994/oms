/**
 * isPage  页面权限控制   默认为false或null表示按钮权限控制, isPage=true表示页面权限控制
 * functionkey  权限ID,   默认String,   多个['123', '234']
 */

import React, { Component } from 'react';
import Functions from './index.js';

class App extends Component {
    render() {
        return (
            <div>
                {/*页面权限控制*/}
                <Functions { ...this.props } isPage={true} functionkey="007-000001-000001-001">
                    text
                </Functions>

                {/*单个权限控制*/}
                <Functions { ...this.props } functionkey="007-000001-000001-001">
                    text
                </Functions>

                {/*多个权限组合控制*/}
                <Functions { ...this.props } functionkey={["007-000001-000001-001", "007-000001-000001-002"]}>
                    <Functions { ...this.props } functionkey="007-000001-000001-001">
                        <span>text1</span>
                    </Functions>
                    <Functions { ...this.props } functionkey="007-000001-000001-002">
                        <span>text2</span>
                    </Functions>
                </Functions>
            </div>
        )
    }
}

export default App;