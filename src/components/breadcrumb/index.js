import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb  } from 'antd';
import './index.css';

class App extends Component {

    itemRender = (route, params, routes, paths) => {
        // const last = routes.indexOf(route) === routes.length - 1;
        // return last ? <span>{route.breadcrumb}</span> : <Link to={route.path}>{route.breadcrumb}</Link>;
        return <span>{route.breadcrumb}</span>
    }

    render() {
        const { crumbs } = this.props.menuInfos;
        const breadcrumbs  = crumbs.map((item, index) => {
            item.breadcrumb = item.breadcrumbName
            item.breadcrumbName = item.breadcrumbName + index
            return item
        })
        const breadcrumb = crumbs.length !== 0 ?
            <div className="yks-common-crumb">
                <div className="pull-left">
                    你的位置：
                </div>
                <Breadcrumb itemRender={this.itemRender} separator={'>'} routes={breadcrumbs}/>
            </div> :
            <div style={{ height: '15px'}}></div>

        return (
            <div>{ breadcrumb }</div>
        );
    }
}

export default App;