//授权详情模块
import React, {Component} from 'react' 

import Modalmodel from '../components/Modalmodel'
import axios from '../../../../util/axios'
import {
    Tabs,
    message
} from 'antd'
import PlatformDetail from '@/user/common/components/PlatformDetail';
import CommonDetail from './CommonDetail';
import StatisticsDetail from '@/user/common/components/StatisticsDetail';
import WareDetail from '@/user/common/components/WareDetail';
import LogisticsDetail from '@/user/common/components/LogisticsDetail';
const TabPane = Tabs.TabPane;

class Authorizationdetail extends Component {

    state={
        organitag:'templName',
        switch:true,
        targetKeys: [],
        leftArr: [],
        keys:[],
    }
    
    //弹窗取消按钮
    ModalhandleCancel = () => {
        // this.props.modalmodelaction({[value]: false});
        this.props.onCancel();
        this.setState({
            targetKeys: [],
            leftArr: [],
            keys:[],
        })
    }

    //弹窗确认按钮
    ModalhandleOk = () => {
        this.props.onCancel();
        let targetKeys = this.state.targetKeys;
        let newobj = {};
        let templId = this.props.templId
        newobj.lstUserName = targetKeys;
        newobj.templId = templId || '';
        if(targetKeys.length && templId){
            axios.post(`/urc/motan/service/api/IUrcService/assignDataRuleTempl2User`, newobj) 
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        message.success('成功!');
                        this.setState({targetKeys:[],leftArr:[],keys:[]});
                    }
                }
            })
            .catch(e => {
                console.log(e);
            })     
        }else{
            message.error('数据为空!');
        }
    }

    timer = null;
    //搜索
    onSearchChange = (direction,event) => {
        clearTimeout(this.timer);
        let value = event.target.value;
        this.timer=setTimeout(()=>{this.searchValue(value)},900);
        return false
    }

    //搜索axios
    searchValue = (value)=>{
        let leftArr = this.state.leftArr;
        let keys = this.state.keys;
        let newobj = {};
        let user = {};
        let arr = [];
        user.userName = value;
        newobj.user = user
        if(value){
            axios.post(`/urc/motan/service/api/IUrcService/getUserByUserName`, newobj)  //getUserByUserInfo(模糊)  getUserByUserName(精确)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        if(!response.data.data){
                            message.error(response.data.msg)
                            return false;
                        }
                        let res = response.data.data;   //精确
                        res.map((v,i)=>{
                            v.key = v.userName || i
                            if(!keys.includes(v.key)){
                                keys.push(v.key);
                                arr = leftArr.concat(res);
                            }else{
                                arr = leftArr;
                            }
                        })
                        this.setState({leftArr:arr,keys:keys});
                    }
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    changeUser = (targetKeys) => {
        this.setState({ targetKeys });
    }

    //当 option 符合筛选条件时，应返回 true，反之 则返回 false
    filterOption = (inputValue, option) => {
        return true
    }

    createComponent = (v) => {
        if (v.entityCode === 'E_CsOrg') {
            return <CommonDetail
                        operValuesArr={v.operValuesArr}
                    />
        } else if (v.entityCode === 'E_StatisticsSystem') {
            return <StatisticsDetail
                        operValuesArr={v.operValuesArr}
                        {...this.props}        
                    />
        } else if (v.entityCode === 'E_WarehouseAuthorized') {
            return <WareDetail
                        operValuesArr={v.operValuesArr}
                    />
        } else if (v.entityCode === 'E_Logistics') {
            return  <LogisticsDetail 
                        operValuesArr={v.operValuesArr}
                    />
        } else {
            return <PlatformDetail
                        operValuesArr={v.operValuesArr}
                    />
        }
    }

    createRuleElement = (ruleObj) => {
        if(!ruleObj.row||!ruleObj.row.subWhereClause){
            return null;
        }
        const subWhereClause = ruleObj.row.subWhereClause;
        return subWhereClause.map((v, i) => {
            return (
                <div className="maxBox padding-sm" key={i}>
                    <div className="topName" >
                        <a>{v.entityName}</a>查看范围为 :
                    </div>
                    <div className="bottomText">
                        {
                            this.createComponent(v)
                        }
                    </div>
                </div>
            )
        })
    }

    render() {
        let sysArr = this.props.templData.lstDataRuleSys;     //系统数组
        const visible = this.props.visible;
        return (
            <div className="newCluenk scopeCluenk">
                <div className="tabTop">
                    <div className="toplf"></div>
                    <div className="toprt"> 已授权详情</div>
                </div>
                <Tabs type="card" className='typeCard' onChange={this.checkTab}>
                    {sysArr.map((val,ind)=>{
                        return(
                            <TabPane tab={val.sysName} key={ind}>
                                {this.createRuleElement(val)}
                            </TabPane>
                        )
                    })}
                </Tabs>
                <Modalmodel
                    onChange={this.changeUser}
                    visible={visible}
                    handleOK={this.ModalhandleOk}
                    handleCancel={this.ModalhandleCancel}/>
            </div>
    );
    }
}

export default Authorizationdetail
