import React from 'react';
import {
    Button
} from 'antd'
import DeliverDetail from "../../common/component/deliverDetail"
import BasicInfo from "../../common/component/basicInfo"
import LogisticsInfo from "../../common/component/logisticsInfo"
import IPRInof from "../../common/component/IPRInof"
import Review from "../../common/component/review"
import Btnwrap from "../../../../common/components/btnwrap/index"
import { getUrlParams} from '../../../../../util/baseTool';
class App extends React.Component {
    componentWillMount(){
        var {getDetailAsync} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        getDetailAsync({id})
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    componentWillUnmount(){
        var { clearDetialAction } = this.props
        clearDetialAction()
    }
    render(){
        return (
            <div className={"npd-handover-create mb52"}>
                <DeliverDetail {...this.props} />
                <BasicInfo {...this.props}></BasicInfo>
                <LogisticsInfo {...this.props}></LogisticsInfo>
                <IPRInof {...this.props}></IPRInof>
                <Review {...this.props}></Review>
                <Btnwrap>
                    <Button onClick={this.goback} type="primary" className="margin-ms-right">返回</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default App