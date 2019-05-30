/**
 *作者: 任贸华
 *功能描述: 头部入口文件
 *参数说明:
 *时间: 2018/4/16 11:02
 */
import React from 'react'
import './layout.css';
import {Menu, Dropdown, Icon, Form, Modal, message, Button, Breadcrumb, Tag} from 'antd';
import {getUrlParams, getLoginmsg, setCookie} from 'util/baseTool';
import menuobj from 'util/menuConfig';
import {Link} from 'react-router-dom'
import {api_url} from "util/connectConfig";
import { toLoginNormal } from 'util/AuthUtil'
import axios from 'util/axios';
import EffectFrom from './EffectFrom';

import {Redirect, withRouter} from 'react-router'

const SubMenu = Menu.SubMenu;

export default @withRouter

class TopTab extends React.Component {
    state = {
        visible: false
    }

    handleCancel = () => {
        this.setState({visible: false});
    }

    handleSubmit = () => {
        this.setState({visible: false});
    }

    preUpdatePwd = () => {
        this.setState({visible: true});
    }

    stop = (e) => {
        message.error('此功能暂未开放');
        e.preventDefault();
    }

    /**
     *作者: 任贸华
     *功能描述: 退出登录
     *参数说明:
     *时间: 2018/4/17 9:45
     */
    loginout = () => {
        axios.post(`${api_url}/urc/motan/service/api/IUrcService/logout`)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        this.props.menudataaction({funcVersion: ''})
                        toLoginNormal();
                    } else {
                        message.error(response.data.msg)
                    }

                }
            }).catch(e => {
            console.log(e);
        })
    }
    /**
     *作者: 任贸华
     *功能描述: 获取面包屑
     *参数说明:
     *时间: 2018/4/17 9:44
     */
    itemRender = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumb}</span> : <Link to={route.path}>{route.breadcrumb}</Link>;
    }

    tabsclose = (o, i) => (e) => {
        e.preventDefault();
        const tabcrumbs = this.props.menuInfos.tabcrumbs
        tabcrumbs.splice(i, 1)
        this.props.menudataaction({tabcrumbs})

    }

    fun = (url) => () => {
        console.log(url)
    }

    render() {
        const crumbs = this.props.menuInfos.crumbs
        const crumbscontent = crumbs.length ?
            <Breadcrumb itemRender={this.itemRender} separator={'>'} routes={crumbs}/> : null;

        const tabcrumbs = this.props.menuInfos.tabcrumbs
        const tabcrumbsarr = tabcrumbs.map((o, i) => <Tag closable={o.active ? false : true}
                                                          onClose={this.tabsclose(o, i)}
                                                          className={o.active ? 'active' : ''}
                                                          key={i}><Link to={o.url}>{o.name}</Link></Tag>)
        const tabcrumbscontent = tabcrumbsarr.length ? <div className={'tabcrumbs'}>{tabcrumbsarr}
            <div className={'btboder'}></div>
        </div> : null;
        const menu = (
            <Menu>
                <Menu.Item key='permissionlist'>
                    <a href={"/index/personalcenter/permissionlist/"}>我的权限</a>
                </Menu.Item>
                <Menu.Item key='loginout'>
                    <a onClick={this.loginout}>退出</a>
                </Menu.Item>
            </Menu>
        );
        const topmenudata = this.props.menuInfos.topmenudata;
        const WrappedEffectFrom = Form.create()(EffectFrom);
        const {visible} = this.state;
        const loginAcct = this.props.data;
        const icontype = this.props.menuInfos.shrinkage ? 'menu-fold' : 'menu-unfold'
        const personName = getLoginmsg().personName;
        const userName = getLoginmsg().userName;
        const realName = personName ? personName : userName ? userName : '默认用户';
        const menucontent = topmenudata.map(v => {
            if (v.url) {
                return <Menu.Item key={v.key}>
                    <a href={v.defaultUrl}>{v.name}</a>
                </Menu.Item>
            }
            // } else {
            //     return <SubMenu className='topmenufixed' key={v.key} title={<span>{v.name} <Icon className={'topicon'} type="down" /></span>}>
            //         {v.module.map(k => {
            //             return <Menu.Item key={k.key}>
            //                 <Link to={k.url}>{k.name}</Link>
            //             </Menu.Item>
            //         })}
            //     </SubMenu>
            // }

        })
        return (
            <div className='top-tool'>
                <div className="topwidget">
                    <div className="toptaball">
                        <Menu
                            selectedKeys={[this.props.menuInfos.topmenukey]}
                            mode="horizontal"
                        >
                            {
                                menucontent
                            }
                        </Menu>
                    </div>

                    <div className="topgt">
                        <div className="erp-flrt pd-r20 top_user welcom-info">
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="javascript:;">
                                    您好，{realName} ！ <Icon type="down"/>
                                </a>
                            </Dropdown>
                        </div>
                        <div className="erp-flrt pd-r15 top_user">
                            <img src={require('./img/user.png')} height="34" width="34" className={'imgbr50'}/>
                        </div>
                        <div className="curs"></div>
                    </div>
                    <Modal className='topwidget-modal' title='修改密码' visible={visible} onCancel={this.handleCancel}
                           footer={null}>
                        <WrappedEffectFrom onSubmit={this.handleSubmit}/>
                    </Modal>
                </div>
                {/*<div className='crumbs'>{crumbscontent}</div>*/}
                {/*{tabcrumbscontent}*/}
            </div>
        );
    }
}
