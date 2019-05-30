/**
 *作者: 陈文春
 *功能描述:  系统设置
 *时间: 2018年11月27日19:54:11
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  库容管理
 */
const InventoryCapacityManageBundle = props => (
    <Bundle load={() => import('./inventorycapacitymanage')}>
        {InventoryCapacityManageComponent => <InventoryCapacityManageComponent {...props} />}
    </Bundle>
);

/**
 *  基础资料配置
 */
const BaseDataConfigBundle = props => (
    <Bundle load={() => import('./basedataconfig')}>
        {BaseDataConfigComponent => <BaseDataConfigComponent {...props} />}
    </Bundle>
);
/**
 *  拣货员管理
 */
const PickerManageBundle = props => (
    <Bundle load={() => import('./pickermanage')}>
        {PickerManageComponent => <PickerManageComponent {...props} />}
    </Bundle>
);
/**
 *  交付码管理
 */
const DeliveryCodeManageBundle = props => (
    <Bundle load={() => import('./deliverycodemanage')}>
        {DeliveryCodeManageComponent => <DeliveryCodeManageComponent {...props} />}
    </Bundle>
);
/**
 *  卡板管理
 */
const CardManageBundle = props => (
    <Bundle load={() => import('./cardmanage')}>
        {CardManageComponent => <CardManageComponent {...props} />}
    </Bundle>
);
/**
 *  容器管理
 */
const ContainerManageBundle = props => (
    <Bundle load={() => import('./containermanage')}>
        {ContainerManageComponent => <ContainerManageComponent {...props} />}
    </Bundle>
);
/**
 *  播种墙管理
 */
const SeedWallManageBundle = props => (
    <Bundle load={() => import('./seedwallmanage')}>
        {SeedWallManageComponent => <SeedWallManageComponent {...props} />}
    </Bundle>
);
/**
 *  补打标签
 */
const SupplementPrintBundle = props => (
    <Bundle load={() => import('./supplementprint')}>
        {SupplementPrintComponent => <SupplementPrintComponent {...props} />}
    </Bundle>
);
/**
 *  设置拣货规则
 */
const PickingRuleBundle = props => (
    <Bundle load={() => import('./pickingrule')}>
        {PickingRuleComponent => <PickingRuleComponent {...props} />}
    </Bundle>
);
/**
 *  主仓设置
 */
const MainWarehouseBundle = props => (
    <Bundle load={() => import('./mainwarehouse')}>
        {MainWarehouseComponent => <MainWarehouseComponent {...props} />}
    </Bundle>
);
/**
 *  PDA管理
 */
const PdaManageBundle = props => (
    <Bundle load={() => import('./pdamanage')}>
        {PdaManageComponent => <PdaManageComponent {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/wms/systemsetting/';
    return (
        <div>
            <Switch>
                <Route
                    exact
                    path={`${path}inventorycapacitymanage/`}
                    render={p => <InventoryCapacityManageBundle {...props} {...p} />}
                />
                <Route path={`${path}basedataconfig/`} render={p => <BaseDataConfigBundle {...props} {...p} />} />
                <Route path={`${path}pickermanage/`} render={p => <PickerManageBundle {...props} {...p} />} />
                <Route path={`${path}deliverycodemanage/`} render={p => <DeliveryCodeManageBundle {...props} {...p} />} />
                <Route path={`${path}cardmanage/`} render={p => <CardManageBundle {...props} {...p} />} />
                <Route path={`${path}containermanage/`} render={p => <ContainerManageBundle {...props} {...p} />} />
                <Route path={`${path}seedwallmanage/`} render={p => <SeedWallManageBundle {...props} {...p} />} />
                <Route path={`${path}pickingrule/`} render={p => <PickingRuleBundle {...props} {...p} />} />
                <Route path={`${path}supplementprint/`} render={p => <SupplementPrintBundle {...props} {...p} />} />
                <Route path={`${path}mainwarehouse/`} render={p => <MainWarehouseBundle {...props} {...p} />} />
                <Route path={`${path}pdamanage/`} render={p => <PdaManageBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
