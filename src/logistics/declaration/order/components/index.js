import React, { Component } from 'react'
import { Tabs, message } from 'antd';
import '../css/css.css';
import CompanyProfile from './CompanyProfile';
import CustomsInfoContainer from '../containers/CustomsInfoContainer';
import ContractInfo from './ContractInfo';
import CheckList from '../containers/CheckListContainer';
import PropTypes from 'prop-types';
import CountryModal from '../../../common/selectListModal/containers';
import { getUrlParams } from "../../../../util/baseTool";
import Functions from '../../../../components/functions'
const TabPane = Tabs.TabPane;

export default class App extends Component {

  state = {
      id: getUrlParams('').id,
      campanyInfo: {},
      customsInfo: {},
      contractInfo: {}
  };
  componentWillReceiveProps(nextProps) {
    const { campanyInfo,contractInfo, customsInfo } = nextProps.customsDocument;
    const editColumnsState = nextProps.editColumnsState;
    const preEditColumnsState = this.props.editColumnsState;
    if(editColumnsState && preEditColumnsState) {
        if (editColumnsState.name!==preEditColumnsState.name || editColumnsState.value!==preEditColumnsState.value) {
            message.success(editColumnsState.msg);
        }
    }else if (editColumnsState) {
        message.success(editColumnsState.msg);
    }
    this.setState({
        campanyInfo,
        contractInfo,
        customsInfo
    });
  }

  componentDidMount(){
      console.log("index componentDidMount this.props:", this.props);
      const { id } = this.state;
      this.props.getCustomsDocument({ id:id })
    //   this.props.getCustomsDocument()
  }
  render() {
    const { match } = this.props;
    const type = match.params.type;
    const { id, campanyInfo, contractInfo, customsInfo } = this.state;
    return (
      <div className={"lgt-dlt-order_cotainer"}>
          <div className="tweb-tabs">
              <Tabs defaultActiveKey="1" type="card">
                      <TabPane tab="公司资料" key="1">
                              <CompanyProfile
                                campanyInfo={campanyInfo}
                                {...this.props}
                                id={id}
                                type={type}
                                />
                      </TabPane>
                      <TabPane tab="海关资料" key="2">
                          <CustomsInfoContainer
                              customsInfo={customsInfo}
                              id={id}
                              type={type}
                              {...this.props}
                          />
                      </TabPane>
                      <TabPane tab="合同资料" key="3">
                          <ContractInfo
                              contractInfo={contractInfo}
                              {...this.props}
                              id={id}
                              type={type}
                          />
                      </TabPane>
                      <TabPane tab="核对清单" key="4">
                              <CheckList
                                  id={id}
                                  type={type}
                                  {...this.props}
                              />
                      </TabPane>
              </Tabs>
          </div>
          <CountryModal></CountryModal>
      </div>
    )
  }
}

App.propTypes = {
    loadState: PropTypes.object.isRequired,
    getCustomsDocument: PropTypes.func.isRequired,
    editCustomsDocumentColumn: PropTypes.func.isRequired,
};
