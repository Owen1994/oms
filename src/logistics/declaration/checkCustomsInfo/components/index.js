/**
 *作者: 黄建峰
 *功能描述: SKU税率
 *参数说明:
 *时间: 2018/4/28
 */
import React, { Component } from 'react'
import '../css/css.css'
import {
    Tabs,
    Button,
    Icon,
    Modal,
    Row,
    Checkbox,
    Col,
    message,
} from 'antd';
import CustomsDeclaration from './CustomsDeclaration'
import PackingList from './PackingList'
import Invoice from './Invoice'
import SalesContract from './SalesContract'
import ManifestFba from './ManifestFba'
import ManifestOverseasWarehouse from './ManifestOverseasWarehouse'
import { getUrlParams } from "../../../../util/baseTool";
import {post} from "../../../../util/axios";
import Functions from '../../../../components/functions'
export default class App extends Component {
    state = {
        visible: false,
        checkedValuesArray:[],
        id: getUrlParams('').id,
        type:getUrlParams('').depotDataType,
    }
    componentDidMount(){
        if(this.state.type==1){
            this.setState({
                checkedValuesArray:["1","2","3","4","5"]
            });
        }else{
            this.setState({
                checkedValuesArray:["1","2","3","4","6"]
            });
        }
        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function(mql) {
                if (mql.matches) {
                    location.reload()
                }
            });
        }
    }
    /**
     * 作者: 陈林
     * 描述: 显示导出弹窗
     * 时间: 2018/6/23 0023 下午 5:05
     **/
    showExportModal = () => {
        this.setState({
            visible: true,
        });
    }
    /**
     * 作者: 陈林
     * 描述: 导出数据接口
     * 时间: 2018/6/23 0023 下午 5:06
     **/
    showExportDataModal = () => {
        let exportdata = this.state.checkedValuesArray;
        let id = this.state.id;
        let typeArray = exportdata;
        if(exportdata.length > 0){
            message.info('请求已发出，请等待下载')
            this.setState({export: true})
            post(`/customs/api/print/Exportfile/exportfile`, {id: id,typeArray:typeArray}).then(data => {
                    if ( data && data.state === '000001'){
                        location.href = data.url
                    }
                }
            );
        }


    }
    /**
     * 作者: 陈林
     * 描述: 隐藏导出弹窗
     * 时间: 2018/6/23 0023 下午 5:06
     **/
    hideExportModal = () => {
        this.setState({
            visible: false,
        });
    }
    /**
     * 作者: 陈林
     * 描述: 打印
     * 时间: 2018/6/19 0019 下午 5:31
     * @param
     **/
    Printing = () =>{
        // var oldcontainer= document.body.innerHTML
        let newcontainer = document.querySelector(".ant-tabs-tabpane-active");
        document.body.innerHTML = newcontainer.innerHTML;
        window.print();
        // document.body.innerHTML = oldcontainer;
        // return false;
    }

    /**
     * 作者: 陈林
     * 描述:导出界面(导出onChange事件)
     * 时间: 2018/6/19 0019 下午 6:01
     * @param
     **/
    onChange = (checkedValues) =>{
         this.setState({
            checkedValuesArray: checkedValues
        });
    }
    //返回按钮
    returnprev = () => {
        this.props.history.goBack();
    }
  render() {
      const TabPane = Tabs.TabPane;
      const CheckboxGroup = Checkbox.Group;
      const visible = this.state.visible;
      const { id,type } = this.state;
      let options,defaultValue;
      if(type == 1){
          options = [
              { label: '报关草单', value: '1' },
              { label: '发票', value: '2' },
              { label: '装箱单', value: '3' },
              { label: '合同', value: '4' },
              { label: '载货清单(FBA)', value: '5' },
          ];
          defaultValue = ["1","2","3","4","5"]
      }else{
          options = [
              { label: '报关草单', value: '1' },
              { label: '发票', value: '2' },
              { label: '装箱单', value: '3' },
              { label: '合同', value: '4' },
              { label: '载货清单(海外仓)', value: '6' }
          ];
          defaultValue = ["1","2","3","4","6"]
      }
      const operations =(
          <div style={{"marginTop":"2px"}}>
              <Functions {...this.props} functionkey="002-000001-000001-000003-007">
                   <Button className="margin-ms-right" onClick={this.showExportModal}>导出</Button>
              </Functions>
              <Button className="margin-ms-right" onClick={this.Printing}>打印</Button>
              <Button className="margin-ss-right" onClick={this.returnprev}>返回</Button>
          </div>
      );
    return (
              <div className="lgt-dlt-cd_container">
                  <div className="tweb-tabs tweb-tabs-cl">
                      <div>
                          <Tabs tabBarExtraContent={operations} onChange={this.callback} type="card" >
                              <TabPane tab="报关草单" key="1">
                                  <Functions {...this.props} functionkey="002-000001-000001-000003-001">
                                      <CustomsDeclaration id={id}/>
                                  </Functions>
                              </TabPane>
                              <TabPane tab="发票" key="2">
                                  <Functions {...this.props} functionkey="002-000001-000001-000003-002">
                                      <Invoice id={id}/>
                                  </Functions>
                              </TabPane>
                              <TabPane tab="装箱单" key="3">
                                  <Functions {...this.props} functionkey="002-000001-000001-000003-003">
                                      <PackingList id={id}/>
                                  </Functions>
                              </TabPane>
                              <TabPane tab="合同" key="4">
                                  <Functions {...this.props} functionkey="002-000001-000001-000003-004">
                                      <SalesContract id={id}/>
                                  </Functions>
                              </TabPane>
                              {type == 1 ? (
                                  <TabPane tab={<span className="tweb-tabs_word_break"><Icon>载货清单</Icon><strong>(FBA)</strong></span>} key="5">
                                      <Functions {...this.props} functionkey="002-000001-000001-000003-005">
                                          <ManifestFba id={id}/>
                                      </Functions>
                                  </TabPane>
                              ):(
                                  <TabPane tab={<span className="tweb-tabs_word_break"><Icon>载货清单</Icon><strong className="tweb-tabs_word_break_left">(海外仓)</strong></span>} key="6">
                                      <Functions {...this.props} functionkey="002-000001-000001-000003-006">
                                          <ManifestOverseasWarehouse id={id}/>
                                      </Functions>
                                  </TabPane>
                              )}
                          </Tabs>
                      </div>
                  </div>
          <Modal
              title="导出"
              visible={this.state.visible}
              onOk={this.showExportDataModal}
              onCancel={this.hideExportModal}
              okText="确认"
              cancelText="取消">
              <Row>
                  <p>请勾选需要导出的报关文件：</p>
              </Row>
              <Row className="margin-ms-top">
                  <CheckboxGroup options={options} defaultValue={defaultValue} onChange={this.onChange} />
              </Row>
          </Modal>
      </div>
    )
  }
}
