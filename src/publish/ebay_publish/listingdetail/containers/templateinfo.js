import { connect } from 'react-redux'
import TemplateInfoComponent from '../components/templateInfo'
import {
    editComponentDataAction,getTemplatiesAction,templatiesDataToggleAction
} from '../actions'
import {parseTemplateInfo} from '../selector/templateinfoparse'
const mapStateToProps = (state, props) => {
    const templateinfoData = parseTemplateInfo(state);
    const templatiesData = state.templatiesData;
    const basicData = state.basicData;
    return { ...props,templateinfoData,basicData,templatiesData }
};

export default connect(
    mapStateToProps,{
        editComponentDataAction,getTemplatiesAction,templatiesDataToggleAction
    }
)(TemplateInfoComponent)
