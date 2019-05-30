/**
 *作者: 黄建峰
 *功能描述:  基础设置
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import '../common/css/style.css';
import Bundle from '../../common/components/bundle/bundle';
/**
 *  图库设置
 * @param props
 * @returns {*}
 * @constructor
 */
const BasicSetImgSetBundle = (props) => (
    <Bundle load={() => import('./basicsetimgset')}>
        {(BasicSetImgSetComponent) => <BasicSetImgSetComponent {...props} />}
    </Bundle>
);
/**
 *  SKU前后缀设置
 * @param props
 * @returns {*}
 * @constructor
 */
const BasicSetSkuSetBundle = (props) => (
    <Bundle load={() => import('./basicsetskuset')}>
        {(BasicSetSkuSetComponent) => <BasicSetSkuSetComponent {...props} />}
    </Bundle>
);
/**
 *  标题前后缀设置
 * @param props
 * @returns {*}
 * @constructor
 */
const BasicSetTitleSetBundle = (props) => (
    <Bundle load={() => import('./basicsettitleset')}>
        {(BasicSetTitleSetComponent) => <BasicSetTitleSetComponent {...props} />}
    </Bundle>
);
/**
 *  自动补数规则
 * @param props
 * @returns {*}
 * @constructor
 */
const EbayautoruleBundle = (props) => (
    <Bundle load={() => import('./ebayautorule')}>
        {(EbayautoruleComponent) => <EbayautoruleComponent {...props} />}
    </Bundle>
);
/**
 *  listing资料更新
 * @param props
 * @returns {*}
 * @constructor
 */
const EbaylistupdateBundle = (props) => (
    <Bundle load={() => import('./ebaylistupdate')}>
        {(EbaylistupdateComponent) => <EbaylistupdateComponent {...props} />}
    </Bundle>
);

/**
 *  Lazada账号配置
 * @param props
 * @returns {*}
 * @constructor
 */
const LazadaaccountconfBundle = (props) => (
    <Bundle load={() => import('./lazadaaccountconf')}>
        {(LazadaaccountconfComponent) => <LazadaaccountconfComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/publish/setting/';
    return (
        <div>
            <Switch>
                <Route path={`${path}basicsetimgset/`} render={(p) => <BasicSetImgSetBundle {...props} {...p}/> } />
                <Route path={`${path}basicsetskuset/`} render={(p) => <BasicSetSkuSetBundle {...props} {...p}/> } />
                <Route path={`${path}basicsettitleset/`} render={(p) => <BasicSetTitleSetBundle {...props} {...p}/> } />
                <Route path={`${path}ebayautorule/`} render={(p) => <EbayautoruleBundle {...props} {...p}/> } />
                <Route path={`${path}ebaylistupdate/`} render={(p) => <EbaylistupdateBundle {...props} {...p}/> } />
                <Route path={`${path}lazadaaccountconf/`} render={(p) => <LazadaaccountconfBundle {...props} {...p}/> } />
                <Redirect from={path} to={`${path}basicsetimgset/`} />
            </Switch>
        </div>
    )
};


export default App;
