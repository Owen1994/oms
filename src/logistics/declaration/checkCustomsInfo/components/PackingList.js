/**
 * 作者: 陈林
 * 描述: 装箱单
 * 时间: 2018/6/15 0015 上午 10:49
 * @param
 **/
import React, { Component } from 'react'
import { post } from "../../../../util/axios";
import logo from './customsLogo.png'
import { Table,Row,Col,Spin } from 'antd';
import { datasaddkey } from '../../../../util/baseTool'
const columns = [
    {
        title: 'Item',
        dataIndex: 'sid',
        width:75,

    },
    {
        title: 'SKU#',
        dataIndex: 'sku',
        width:100,
    },
    {
        title: '报关品名',
        dataIndex: 'customsName',
        width:140,
    },
    {
        title: 'Total Quantity',
        dataIndex: 'totalQuantity',
        width:140,
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            }
            obj.props.rowSpan = row.rows;
            return obj;
        },
    },
    {
        title: 'Unit',
        dataIndex: 'unit',
        width:80,
    },
    {
        title: 'Total Cartons',
        dataIndex: 'totalCartons',
        width:140,
    },
    {
        title: 'Net.Weight(KGS)',
        dataIndex: 'netWeight',
        width:140,
    },
    {
        title: 'Gross Weight(kgs)',
        dataIndex: 'grossWeight',
        width:140,
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            }
            obj.props.rowSpan = row.rows;
            return obj;
        },
    },
    {
        title: 'Volume(CBM)',
        dataIndex: 'volume',
        width:140,
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            }
            obj.props.rowSpan = row.rows;
            return obj;
        },
    }
];
export default class App extends Component{

      state = {
          PackingList:{
              items:[]
          },
          loading: true,
      }

    componentDidMount(){
        const id = this.props.id;
        post(`/customs/api/print/Packing/packing`,{id:id}).then(response => {
            this.setState({
                PackingList: response.data,
                loading: false,
            });
        })
    }

      render(){
          const PackingList = this.state.PackingList;
          const dataItem = PackingList.items || [];
          let twebContentW = {
              marginTop:"20px",
              color:"#555",
          }
          let tableLogo = {
              width:"43.8%",
              textAlign:"right"
          }
          let tableLogoImg = {
              width:"51px",
              height:"45px"
          }
          let tableTitile = {
              width:"56.2%",
              textAlign:"left"
          }
          let tableTitleSpan = {
              fontSize: "21px",
              color:"#333",
              fontWeight:"bold",
              paddingLeft:"7px"
          }
          let marginsmTop = {
              marginTop:"10px"
          }
          let paddingdm = {
              padding:"0 10px"
          }
          let paddinglm = {
              height:"24px",
              padding:"0 10px"
          }
          let  paddingsm  = {
              padding:"3px 0 3px"
          }
          let paddingmB = {
              borderTop:"1px #fff solid",
              height:"34px"
          }
          return(
              <div className="container padding-sm">
                  <Spin spinning={this.state.loading}>
                        <Row>
                      <Col span={24} style={ twebContentW }>
                          <table width="100%">
                              <tbody>
                                  <tr>
                                      <td className="table-title-logo" style={ tableLogo }>
                                              <span className="title-logo">
                                                  <img src={ logo }  style={ tableLogoImg }/>
                                              </span>
                                      </td>
                                      <td className="table-title-span" style={ tableTitile }>
                                          <span className="text-center yks-w333" style={ tableTitleSpan }>Picking list(装箱单)</span>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <div className="col-md-12 column tab-conter table-md-top" style={ marginsmTop }>
                              <table className="table table-borderred table-condensed" border="1" width="100%" bordercolor="#777">
                                  <tbody>
                                      <tr>
                                          <td colSpan="3" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Invoice from 开票方：</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.invocingParty }</p>
                                          </td>
                                          <td width="180" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Date of</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.billingDate }</p>
                                          </td>
                                          <td width="100" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Page</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.page }</p>
                                          </td>
                                          <td width="210" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Invoice Number发票号：</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.invoiceNumber }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td colSpan="3" style = { paddingdm }>
                                              <p className="yks-w333">{ PackingList.invocingPartyAddress }</p>
                                          </td>
                                          <td colSpan="2" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Invoice From</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.invoiceFrom }</p>
                                          </td>
                                          <td style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Extra Information 备注:</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.extraInformation }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td width="67" height="27" style = { paddingdm }>
                                              <span>TEL</span>
                                          </td>
                                          <td colSpan="2" style = { paddingdm }>
                                              <p className="yks-w333">{ PackingList.invoiceTel }</p>
                                          </td>
                                          <td colSpan="2" rowSpan="2" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Tax Number税务登记号：</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.taxNumber }</p>
                                          </td>
                                          <td rowSpan="2" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Contract Number 合同号：</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.contractNumber }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style = { paddingdm }>
                                              <span >Email</span>
                                          </td>
                                          <td colSpan="2" style = { paddingdm }>
                                              <p className="yks-w333">{ PackingList.invoiceEmail }</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td colSpan="3" rowSpan="3" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Terms of   Delivery 贸易条款：</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.termsDelivery }</p>
                                          </td>
                                          <td colSpan="3" className="yks-w666 font-lg-size" style = { paddingdm }>Invoice To 付款方</td>
                                      </tr>

                                      <tr>
                                          <td colSpan="3" className="yks-w333" style = { paddinglm }>{ PackingList.invoiceTo}</td>
                                      </tr>
                                      <tr>
                                          <td colSpan="3" className="yks-w333" style = { paddinglm }>{ PackingList.invoiceToAddress }</td>
                                      </tr>
                                      <tr>
                                          <td colSpan="3" style = { paddingdm }>
                                              <p className="yks-w666 font-lg-size" style={ paddingsm }>Mode of Transport 运输方式：</p>
                                              <p className="yks-w333" style={ paddingsm }>{ PackingList.transportMode }</p>
                                          </td>
                                          <td colSpan="3" style = { paddingdm }>
                                              <p>
                                                  <span className="yks-w333">Tel：</span>
                                                  <span className="yks-w666 font-lg-size">  { PackingList.payerTel }</span>
                                              </p>
                                              <p>
                                                  <span className="yks-w333">Email：</span>
                                                  <span className="yks-w666 font-lg-size">  { PackingList.payerEmail }</span>
                                              </p>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                            <div className="lgt-dlt-packingList">
                              <Table   columns={columns} dataSource={datasaddkey(dataItem)} bordered  pagination={false}/>
                            </div>
                              <table  className="table table-borderred table-condensed" border="1" width="100%">
                                  <tbody>
                                      <tr style={ paddingmB } className="yks-w333">
                                          <td width="299"  style={ paddingdm }>GRAND TOTAL</td>
                                          <td width="130" style={ paddingdm }>{ PackingList.grandtotalQuantity }</td>
                                          <td width="78">&nbsp;</td>
                                          <td width="133" style={ paddingdm }>{ PackingList.grandtotalCartons }</td>
                                          <td width="133" style={ paddingdm }>{ PackingList.grandnetWeight }</td>
                                          <td width="133" style={ paddingdm }>{ PackingList.grandgrossWeight }</td>
                                          <td width="133" style={ paddingdm }>{ PackingList.grandvolume }</td>
                                      </tr>
                                      <tr>
                                          <td  colSpan="5">
                                              <span className="yks-w333" style={ paddingdm }>柜号:</span>
                                              <span className="yks-w666 font-lg-size">  { PackingList.cabinetNumber }</span>
                                          </td>
                                          <td  colSpan="4">
                                              <span className="yks-w333" style={ paddingdm }>封号:</span>
                                              <span className="yks-w666 font-lg-size">  { PackingList.titleNumber }</span>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </Col>
                  </Row>
                  </Spin>
              </div>
          )
      }
}