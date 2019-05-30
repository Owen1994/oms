/**
 *作者: 任贸华
 *功能描述: 左侧菜单组件
 *参数说明:
 *时间: 2018/4/16 11:03
 */
import React from 'react'
import './layout.css';
import '../../common/css/css.css';
import { Menu, Popover, Icon } from 'antd';
import menuobj from '../../util/menuConfig';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const SubMenu = Menu.SubMenu;

export default @withRouter

class LeftWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     *作者: 任贸华
     *功能描述: 根据当前路径自动激活菜单项
     *参数说明:
     *时间: 2018/4/17 9:43
     */
    eacharr = (tabcrumbs, obj) => {
        const pathname = location.pathname;
        const search = location.search;
        let tabcrumbsabled = false;
        if (obj.url == pathname) {
            tabcrumbs.forEach((v, i, array) => {
                if (v.url === obj.url + search) {
                    v.active = true
                    tabcrumbsabled = true
                } else {
                    v.active = false
                }
            })

            if (!tabcrumbsabled) {
                tabcrumbs.push({url: obj.url + search, name: obj.name, active: true})
            }
        }
    }
    functionsarr = (obj, funcs) => {
        var funcs = funcs || {};
        const pathname = location.pathname
        for (let i in obj) {
            const module = obj[i].module
            if (module && module.length) {
                for (let j in module) {
                    if (module[j].url === pathname) {
                        funcs[module[j].url] = module[j].function.map(v => v.key)
                        return funcs;
                    }
                }
                this.functionsarr(module, funcs);
            }
        }
        return funcs;
    }

    toparrs = (obj) => {
        const pathname = location.pathname
        for (let i in obj) {
            const o = obj[i]
            let pattern = undefined;
            if (o.url !== '/') {
                pattern = new RegExp(`^${o.url}`, 'i');
            }
            if (o.url === pathname || (menuobj[pathname] && menuobj[pathname].includes(o.url)) || (pattern && pattern.test(pathname))) {
                return o.key
            }
            if (o.module) {
                return this.toparrs(o.module)
            }
        }
    }

    funcrumbs = (obj, crumbs, tabcrumbs) => {
        var crumbs = crumbs || []
        var tabcrumbs = tabcrumbs || [];
        const pathname = location.pathname;
        for (let i in obj) {
            if (obj[i].url == pathname || (menuobj[pathname] && menuobj[pathname].includes(obj[i].url)) || new RegExp(`^${obj[i].url}`, 'i').test(pathname)) {
                crumbs.push({path: obj[i].url, breadcrumbName: obj[i].name})
                this.eacharr(tabcrumbs, obj[i])
            }
            const module = obj[i].module
            if (module && module.length) {
                this.funcrumbs(module, crumbs, tabcrumbs);
            }
        }

    }
    menudatahandle = (nextprops) => {
        const pathname = location.pathname;
        const topmenudata = nextprops.menuInfos.topmenudata;
        const topmenukey = this.toparrs(topmenudata);
        const leftmenudataarr = nextprops.menuInfos.data.leftmenudata;
        const leftmenudata = leftmenudataarr.filter(v => {
            let pattern = undefined;
            if (v.url !== '/') {
                pattern = new RegExp(`^${v.url}`, 'i');
            }
            return (v.url === pathname) || (menuobj[pathname] && menuobj[pathname].includes(v.url)) || (pattern && pattern.test(pathname));
        });
        let openKeys = [];
        let selectedKeys = [];
        let or = false;
        const crumbs = []
        const functions = this.functionsarr(leftmenudata)
        const tabcrumbs = this.props.menuInfos.tabcrumbs;

        // 面包屑获取一级菜单
        for (let key in topmenudata){
            if(topmenudata[key].url.split('/')[1] === pathname.split('/')[1]){
                crumbs.push({
                    path: topmenudata[key].url,
                    breadcrumbName: topmenudata[key].name
                })
            }
        }

        for (const o of leftmenudata) {
            for (let i = o.module.length - 1; i >= 0; i--) {
                const p = o.module[i]
                if (p.url == pathname || (menuobj[pathname] && menuobj[pathname].includes(p.url)) || new RegExp(`^${p.url}`, 'i').test(pathname)) {
                    selectedKeys = [p.key];
                    or = true;
                    crumbs.push({path: p.url, breadcrumbName: p.name})
                    this.eacharr(tabcrumbs, p)
                    this.funcrumbs(p.module, crumbs, tabcrumbs)
                    break;
                }
            }
            if (or) {
                openKeys = [o.key];
                crumbs.splice(1, 0, {path: o.url, breadcrumbName: o.name})
                break
            }

        }

        nextprops.menuInfos.leftmenudata = leftmenudata;
        nextprops.menuInfos.topmenudata = topmenudata;
        nextprops.menuInfos.functions = functions;
        nextprops.menuInfos.topmenukey = topmenukey;
        if (nextprops.menuInfos.selectedKeys[0] == this.props.menuInfos.selectedKeys[0]) {
            nextprops.menuInfos.selectedKeys = selectedKeys
        } else {
            nextprops.menuInfos.selectedKeys = nextprops.menuInfos.selectedKeys
        }
        if (nextprops.menuInfos.openKeys[0] == this.props.menuInfos.openKeys[0]) {
            nextprops.menuInfos.openKeys = openKeys
        } else {
            nextprops.menuInfos.openKeys = nextprops.menuInfos.openKeys
        }
        nextprops.menuInfos.crumbs = crumbs;
        nextprops.menuInfos.tabcrumbs = tabcrumbs

    };

    componentWillUpdate(nextprops) {
        this.menudatahandle(nextprops)
    }


    componentDidMount() {
        this.props.getMenuData(this.props.history)
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.props.menuInfos.openKeys.indexOf(key) === -1);
        this.props.menudataaction({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    }
    onSelect = (item, key, selectedKeys) => {
        this.props.menudataaction({selectedKeys: item.selectedKeys});
    }


    renderChildMenu = (data) => {
        var addChild = (o) => {
            var r = o.module.map((p) => {
                return <Menu.Item key={p.key}><Link to={p.url}>{p.name}</Link></Menu.Item>
            })
            return r;
        }

        var result = data.map((o) => {
            if (o.module.length == 0) {
                return <Menu.Item key={o.key}><Link to={o.url} className="pdl5">{o.name}</Link></Menu.Item>
            } else {
                const iconclass = `anticon keybac key${o.key}`
                return <SubMenu key={o.key} title={<span><i className={iconclass}></i><span
                    className={'vAlignmiddle'}>{o.name}</span></span>}>
                    {addChild(o)}
                </SubMenu>
            }
        })
        return result;
    }
    contentslist = (data) => {
        var data = data;
        var content = data.module.map((o, i) => {
            return <div className="popoverli" key={i + '_'}><Link to={o.url}>{o.name}</Link></div>
        })
        return content
    }

    shrinkagehandle = () => {
        this.props.menudataaction({shrinkage: !this.props.menuInfos.shrinkage})
    }

    render() {
        const data = this.props.menuInfos.leftmenudata;
        const shrinkage = this.props.menuInfos.shrinkage;
        return (
            <div className="leftwidget">
                {shrinkage ? <div className="leftall">
                    <div className="leftlogo">
                        <div className="leftimg"><img src={require('./img/logo2.png')}/></div>
                        <div className="lefttxt"><span className="sp1">T</span><span className="sp2">Cloud</span></div>
                    </div>
                    <div style={{height: '60px'}}></div>
                    <div style={{overflowY: 'auto', height: '100%', paddingBottom: 90}}>
                        <Menu
                            mode="inline"
                            openKeys={this.props.menuInfos.openKeys}
                            onOpenChange={this.onOpenChange}
                            onSelect={this.onSelect}
                            selectedKeys={this.props.menuInfos.selectedKeys}

                        >
                            {this.renderChildMenu(data)}
                        </Menu>
                    </div>
                    <div className="left-icon" onClick={this.shrinkagehandle}>
                        <Icon type="menu-fold" theme="outlined" />
                    </div>
                </div> : <div className="leftall-sm">
                    <div className="leftlogo-sm">
                        <div className="leftimg-sm"><img src={require('./img/logo-ms.png')}/></div>
                    </div>
                    <div className="leftswitch-sm">
                        <ul>
                            {
                                data.map((o, index) => {
                                    return <Popover placement="rightTop" key={index} content={this.contentslist(o)}
                                                    arrowPointAtCenter>
                                        <li title={o.name}>
                                            <i className={`anticon keybac key${o.key}`}></i>
                                        </li>
                                    </Popover>
                                })
                            }
                        </ul>
                    </div>
                    <div className="left-icon" onClick={this.shrinkagehandle}>
                        <Icon type="menu-unfold" theme="outlined" />
                    </div>
                </div>}

            </div>
        )
    }
}