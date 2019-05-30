import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './index.css';

let dropdownFirstArr = []
class App extends Component {
    state = {
        options: [],
        visibleOptionsLength: 2   //包括'更多'选项，所有可见操作项的个数，默认为2
    }

    componentDidMount() {
        // 通过权限过滤按钮
        const { options } = this.props;
        this.filterBtn(options);
        if(this.props.visibleOptionsLength) {
            this.setState({visibleOptionsLength: this.props.visibleOptionsLength})
        }
    }

    //监测模板管理操作项变化
    componentWillReceiveProps(nextProps) {
        if(this.props.isRender && nextProps !== this.props) {
            const { options } = nextProps;
            this.filterBtn(options);
        }
    }

    //数据过滤
    filterBtn = (options) => {
        const pathname = location.pathname;
        const { menuInfos, noAccessManage } = this.props;
        if (noAccessManage) {
            this.setState({ options });
            return false;
        }
        const keys = menuInfos.functions[pathname] || [];
        let btnOptions = [];
        for(let key in options){
            if(keys.includes(options[key].funcId)){
                btnOptions.push(options[key])
            }
        }
        this.setState({
            options: btnOptions
        });
    }

    menuMore = (options) => {
        let { visibleOptionsLength } = this.state;
        return (
            <Menu>
                {
                    options.map((item, index) => {
                        if (index >= visibleOptionsLength-1) {
                            return (
                                <Menu.Item key={index}><span className="table-list-option-menu" onClick={item.onChange}>{item.name}</span></Menu.Item>
                            )
                        }
                    })
                }
            </Menu>
        )
    };

    menuFirst = (options) => {
        return (
            <Menu>
                {
                    options.map((item, index) => {
                        return (
                            <Menu.Item key={index}><span className="table-list-option-menu" onClick={item.onChange}>{item.name}</span></Menu.Item>
                        )
                    })
                }
            </Menu>
        )
    }

    dropdownMore = (options) => {
        let { visibleOptionsLength } = this.state;
        if(options.length > visibleOptionsLength) {
            return (
                <Dropdown
                    overlay={this.menuMore(options)}
                    // trigger={['click']}
                >
                    <span className="option-span">更多 <Icon type="down" /></span>
                </Dropdown>
            )
        } else if (options.length === visibleOptionsLength) {
            return (
                <span className="option-span" onClick={options[visibleOptionsLength-1].onChange}>{options[visibleOptionsLength-1].name}</span>
            )
        } else {
            return null
        }
    }

    dropdownFirst = (options) => {
        dropdownFirstArr = [];
        let { visibleOptionsLength } = this.state;
        if(options.length === 0){
            return null
        } else if(options.length === 1) {
            dropdownFirstArr.push(
                <span key={0} className="option-span" onClick={options[0].onChange}>{options[0].name}</span>
            )
            return dropdownFirstArr;
        } else if(options.length > 1) {
            for(var i=0;i < visibleOptionsLength-1;i++) {
                if(options[i].subs.length > 0){
                    dropdownFirstArr.push(
                        <Dropdown      
                            overlay={this.menuFirst(options[i].subs)}
                            trigger={['click']}
                            key={i}
                        >
                            <span className="option-span">{options[i].name}</span>
                        </Dropdown>
                    )
                } else {
                    dropdownFirstArr.push(
                        <span key={i} className="option-span" onClick={options[i].onChange}>{options[i].name}</span>
                    )
                }
            }
            return dropdownFirstArr;
        }
    };

    render() {
        const { options } = this.state;
        return (
            <div className="table-list-option">
                { this.dropdownFirst(options) }
                { this.dropdownMore(options) }
            </div>
        );
    }
}

export default App;