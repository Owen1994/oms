import React, {Component} from 'react';
import Leftwidget from '../../components/leftwidget';
import TopTab from '../../components/toptab';
import '../../common/css/layout.css';
import '../../common/css/search.css';
import '../../common/css/tweb.css';
import '../../common/css/table.css';
import '../../common/css/tabs.css';
import {getCookie} from '../../util/baseTool';
import {LocaleProvider,} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {routes} from '../routers/routers'
import AuthorizationRoute from '../components/authorizationRoute/authorizationRoute'
import Entrance from '../../login/normal'
import ForgetComponent from '../../login/forget';
import OvertimeComponent from '../../login/overtime';
import ContradictionComponent from '../../login/contradiction';
import { setCookie } from '../../util/baseTool';
import Breadcrumbs from '../../components/breadcrumb';
import FuncChangeModal from './funcChangeModal';

export default class App extends Component {
    state = {
        funcChangeModalVisible: false,
    }
    componentWillMount() {
        var domain = document.domain.replace(/.*\.(.*\..*)/g, '$1');
        if(!/localhost/g.test(domain)){
            setCookie("session", 1, -1, domain);
            setCookie("funcVersion", 1, -1, domain);
        }
    }

    componentDidMount() {
        var orignalSetItem = localStorage.setItem;
        localStorage.setItem = function(key,newValue){
            // localStorage数据内容变化监听
            var setItemEvent = new Event("localStorageEvent");
            setItemEvent.key = key;
            setItemEvent.newValue = newValue;
            window.dispatchEvent(setItemEvent);
            orignalSetItem.apply(this,arguments);
        }
        window.addEventListener('localStorageEvent', this.storageChangeCallback, false);
    }

    storageChangeCallback = (e) => {
        if (e.key === 'funcChangeModalVisible'){
            this.setState({funcChangeModalVisible: e.newValue});
            localStorage.removeItem('funcChangeModalVisible');
        }
    }

    handleFunctionVersionLogin = () => {  // 重新登录：清空cookie跳转到登录页
        localStorage.removeItem('funcChangeMsg');    
        setCookie('session', '', -1);
        setCookie('funcVersion', '', -1);
        location.href = '/'
    }

    handleFunctionVersionContinue = () => {   // 继续操作：把新的funcVersion放入cookies
        const funcVersion = localStorage.getItem('funcVersion');      
        localStorage.removeItem('funcVersion');
        setCookie('funcVersion', funcVersion, new Date());
        localStorage.setItem('funcChangeModalVisible', false);
    }

    render() {
        const {shrinkage,} = this.props.menuInfos;
        const mainClassName = shrinkage ? 'oms_inx' : 'oms_inx collapse2';
        const loginabled = getCookie('session') ? true : false
        const { funcChangeModalVisible } = this.state;
        if (!loginabled) {

            sessionStorage.setItem('lastHref', `${location.pathname}${location.search}`);
            // 登录页时清除localStorage数据内容及监听事件
            localStorage.removeItem('funcChangeModalVisible');
            window.removeEventListener('localStorageEvent', this.storageChangeCallback, false);
            history.pushState({}, null, '/');
        }
        let content;
        if(sessionStorage.getItem('fpwd') === '1'){
            history.pushState({}, null, '/login/forget/');
            content = <ForgetComponent />
        } else if(sessionStorage.getItem('overTime') === '1'){
            history.pushState({}, null, '/login/overtime/');
            content = <OvertimeComponent />
        } else if(sessionStorage.getItem('loginContradiction') === '1'){
            history.pushState({}, null, '/login/contradiction/');
            content = <ContradictionComponent />
        }else{
            content = loginabled ? (<Router>
                <LocaleProvider locale={zhCN}>
                    <div className={mainClassName}>
                        <div className="g-fl lf"><Leftwidget {...this.props}/></div>
                        <div className="g-fl rg">
                            <div className={'commondiv'}>
                                <div className={'wfull'}><TopTab {...this.props}/></div>
                                <div className="main" id="main">
                                    <div className="main-padding">
                                        <Breadcrumbs
                                            {...this.props}
                                        />
                                        <Switch  {...this.props}>
                                            {routes.map((route, i) => <AuthorizationRoute
                                                key={i} {...route} {...this.props} />)}
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FuncChangeModal
                                visible={Boolean(funcChangeModalVisible)}
                                handleLogin={this.handleFunctionVersionLogin}
                                handleContinue={this.handleFunctionVersionContinue}
                            />
                        </div>
                    </div>
                </LocaleProvider>
            </Router>) : <Entrance/>;
        }
        return (
            content
        );
    }
}
