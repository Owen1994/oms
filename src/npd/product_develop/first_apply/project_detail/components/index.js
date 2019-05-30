import React from 'react';
import {
    Button
} from 'antd'
import DeliverDetail from "../../common/component/deliverDetail"
import ProductInfo from "../../common/component/productInfo"
import Review from "../../common/component/review"
import Btnwrap from "../../../../common/components/btnwrap/index"
import { getUrlParams} from '../../../../../util/baseTool';
class App extends React.Component {
    componentWillMount(){
        var {getDetailAsync,classifyInfoActionAsync} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        getDetailAsync({id})
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    render(){
        return (
            <div className={"npd-fapply-create mb52"}>
                <DeliverDetail {...this.props} />
                <ProductInfo {...this.props} />
                <Review {...this.props} />
                <Btnwrap>
                    <Button onClick={this.goback} type="primary" className="margin-ms-right">返回</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default App