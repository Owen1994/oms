import { connect } from 'react-redux'
import ProductInfoComponent from '../components/productDesc'
import {
    editComponentDataAction,getTemplatiesAction
} from '../actions'
import {parseProductInfo} from '../selector/productinfoparse'

const mapStateToProps = (state, props) => {
    const productinfoData = parseProductInfo(state);
    const basicData = state.basicData;
    const templatiesData = state.templatiesData;
    return { ...props,productinfoData,basicData,templatiesData }
};

export default connect(
    mapStateToProps,{
        editComponentDataAction,getTemplatiesAction
    }
)(ProductInfoComponent)
