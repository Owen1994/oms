import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Dropdown, Menu } from 'antd';
const MenuItem = Menu.Item;

class App extends Component {
    state = {
        options: {
            left: [],
            right: []
        }
    }

    componentDidMount() {
        // 通过权限过滤按钮
        const { btnOptions } = this.props;
        this.filterBtn(btnOptions);
    }

     //按钮数据过滤
     filterBtn = (options) => {
        const pathname = location.pathname;
        const { menuInfos } = this.props;
        const keys = menuInfos.functions[pathname] || [];

        let btnOptions = {},btnLeft = [],btnRight = [];
        if(options.left.length > 0) {
            for(let key in options.left){
                let { funcId, type, subs } = options.left[key];
                if(type === 'dropdown') {
                    let newSubs = subs.filter(item => keys.includes(item.funcId));
                    btnLeft.push(Object.assign({}, options.left[key], {subs: newSubs}));
                }else {
                    if(keys.includes(funcId)){
                        btnLeft.push(options.left[key])
                    }
                }
            }
        }
        if(options.right.length > 0) {
            for(let key in options.right){
                let { funcId } = options.right[key];
                if(keys.includes(funcId)){
                    btnRight.push(options.right[key])
                }
            }
        }
        btnOptions.left = btnLeft;
        btnOptions.right = btnRight;
        this.setState({
            options: btnOptions
        });
    }

    //监测模板管理操作项变化
    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            const { btnOptions } = nextProps;
            this.filterBtn(btnOptions);
        }
    }
    
    render() {
        const { options } = this.state;
        return (
            <div className="btn-operation-com padding-sm-bottom overflow-hidden">
                <div className="pull-left">
                    {options.left.map((item, index) => {
                        if(item.type === 'link'){
                            return (
                                <Link key={index} to={item.url} className="ant-btn margin-sm-right"><Icon type={item.icon} /> {item.name}</Link>
                            )
                        } else if(item.type === 'button') {
                            return (
                                <Button className="margin-sm-right" key={index} onClick={item.onChange}>{item.icon ? <Icon type={item.icon} /> : null}{item.name}</Button>
                            )
                        } else if(item.type === 'dropdown'){
                            return (
                                <Dropdown
                                    key={index}
                                    overlay={(
                                    <Menu onClick={item.onChange}>
                                        {
                                            item.subs.map((_item, _index) => (
                                                <MenuItem key={_index}>{_item.name}</MenuItem>
                                            ))
                                        }
                                    </Menu>
                                )}>
                                    <Button className="margin-sm-right">
                                        批量操作 <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
                <div className="pull-right">
                    {options.right.map((item, index) => {
                        if(item.type === 'link'){
                            return (
                            <Link key={index} to={item.url} className="ant-btn margin-sm-left">{item.icon ? <Icon type={item.icon} /> : null} {item.name}</Link>
                            )
                        } else if(item.type === 'button') {
                            return (
                                <Button className="margin-sm-left" key={index} onClick={item.onChange}>{item.icon ? <Icon type={item.icon} /> : null}{item.name}</Button>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default App;