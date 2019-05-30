import React from 'react';
import {
    Button
} from 'antd'
import ProjectInfo from "../../common/component/projectInfo"
import NtsMarketplaceInfo from "../../common/component/ntsMarketplaceInfo"
import Supplier from "../../common/component/supplier"
import Review from "../../common/component/review"
import Btnwrap from "../../../../common/components/btnwrap/index"
import { getCookie,getUrlParams} from '../../../../../util/baseTool';
class App extends React.Component {
    componentWillMount(){
        var {getProductDetailAsync} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        getProductDetailAsync({id:id})
    }
    componentWillUnmount(){
        this.props.clearDetailAction()
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    render(){
        return (
            <div className={"npd-project-create mb52"}>
                <ProjectInfo {...this.props} ></ProjectInfo>
                <NtsMarketplaceInfo {...this.props}></NtsMarketplaceInfo>
                <Supplier {...this.props}></Supplier>
                <Review {...this.props}></Review>
                <Btnwrap>
                    <Button onClick={this.goback} type="primary" className="margin-ms-right">返回</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default App