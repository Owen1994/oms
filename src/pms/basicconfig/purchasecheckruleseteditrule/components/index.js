import React from 'react';
import {
    Form,
} from 'antd';
import Header from './Header';
import CondtionContainer from '../containers/Condtions';
import FooterContainer from '../containers/Footer';
import Footerbutton from './Footerbutton';
import Addeditmodal from '../containers/AddeditModal';
import { getUrlParams } from '../../../../util/baseTool';
import '../css/css.css';

/**
 *作者: huangjianfeng
 *功能描述: 采购角色配置
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        visible: false,
        index: '',
        item: undefined,
        itemValue: null,
    }

    componentDidMount() {
        const parames = { data: { key: getUrlParams('').id } };
        this.props.getRulesList(parames);
    }

    render() {
        const {
            visible,
            index,
            item,
            itemValue,
        } = this.state;
        return (
            <div className="pms-editrule">
                <Header {...this.props} />
                <CondtionContainer
                    {...this.props}
                    showModal={(indexs, items, itemVal) => this.setState({
                        index: indexs,
                        item: items,
                        itemValue: itemVal,
                        visible: true,
                    })}
                />
                <FooterContainer {...this.props} />
                <Footerbutton {...this.props} />
                <Addeditmodal
                    {...this.props}
                    visible={visible}
                    index={index}
                    item={item}
                    itemValue={itemValue}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                />
            </div>
        );
    }
}
export default Form.create()(App);
