/**
 * 作者: 陈林
 * 描述: 发票
 * 时间: 2018/6/14 0014 下午 7:33
 * @param
 **/
import React,{ Component } from 'react'
import { post } from "../../../../util/axios";
import logo from './customsLogo.png'
import { Row,Col,Spin } from 'antd'

export default class App extends Component{

    state = {
        Invoice:{
            items:[]
        },
        loading: true,
    }
    componentDidMount(){
        const id = this.props.id;
        post(`/customs/api/print/Invoice/invoice`,{id:id}).then(response => {
            this.setState({
                Invoice: response.data,
                loading: false,
            });
        })
    }

    render(){
        const Invoice = this.state.Invoice;
        const ListArray = Invoice.items || [];
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
        let  paddingsm  = {
            padding:"3px 0 3px"
        }
        let heightsm = {
            borderTop:"1px #fff solid",
            height:"34px"
        }
        let heightsmH = {
            height:"34px"
        }
        return(
            <div className="container  padding-sm">
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
                                      <td  style={ tableTitile }>
                                          <span className="text-center " style={ tableTitleSpan }>Commercial Invoice(发票)</span>
                                      </td>
                                  </tr>
                             </tbody>
                         </table>
                         <table style={ marginsmTop } className="table table-borderred table-condensed" border="1"  bordercolor="#777" width="100%">
                                <tbody>
                                    <tr>
                                        <td colSpan="3" style={ paddingdm }>
                                            <p className="yks-w666 font-lg-size" style={ paddingsm }>Invoice from 开票方：</p>
                                            <p className="yks-w333" style={ paddingsm }>{ Invoice.invocingParty }</p>
                                        </td>
                                        <td width="180" style={ paddingdm }>
                                            <p className="yks-w666 font-lg-size " style={ paddingsm }>Date of</p>
                                            <p className="yks-w333" style={ paddingsm }>{ Invoice.billingDate }</p>
                                        </td>
                                        <td width="100" style={ paddingdm }>
                                            <p className="yks-w666 font-lg-size" style={ paddingsm }>Page</p>
                                            <p className="yks-w333" style={ paddingsm }>{ Invoice.page }</p>
                                        </td>
                                        <td width="210" style={ paddingdm }>
                                            <p className="yks-w666 font-lg-size" style={ paddingsm }>Invoice Number发票号：</p>
                                            <p className="yks-w333 " style={ paddingsm }>{ Invoice.invoiceNumber }</p>
                                        </td>
                                    </tr>
                                       <tr>
                                           <td colSpan="3" style={ paddingdm }>
                                               <p className="yks-w333" >{ Invoice.invoiceToAddress }</p>
                                           </td>
                                           <td colSpan="2" style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size" style={ paddingsm }>Invoice From</p>
                                               <p className="yks-w333">{ Invoice.invoiceFrom }</p>
                                           </td>
                                           <td style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size">Extra Information 备注:</p>
                                               <p className="yks-w333">{ Invoice.extraInformation }</p>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td width="67" height="27" style={ paddingdm }>
                                               <span>TEL</span>
                                           </td>
                                           <td colSpan="2" style={ paddingdm }>
                                               <p className="yks-w333">{ Invoice.invoiceTel }</p>
                                           </td>
                                           <td colSpan="2" rowSpan="2" style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size">Tax Number税务登记号：</p>
                                               <p className="yks-w333">{ Invoice.taxNumber }</p>
                                           </td>
                                           <td rowSpan="2" style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size">Contract Number 合同号：</p>
                                               <p className="yks-w333">{ Invoice.contractNumber }</p>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td style={ paddingdm }>
                                               <span>Email</span>
                                           </td>
                                           <td colSpan="2" style={ paddingdm }>
                                               <p className="yks-w333">{ Invoice.invoiceEmail }</p>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td colSpan="3" rowSpan="3" style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size" style={ paddingsm }>Terms of   Delivery 贸易条款：</p>
                                               <p className="yks-w333" style={ paddingsm }>{ Invoice.termsDelivery }</p>
                                           </td>
                                           <td colSpan="3" style={ paddingdm } className="yks-w666 font-lg-size">Invoice To 付款方</td>
                                       </tr>
                                       <tr>
                                           <td colSpan="3" className="yks-w333"  style={{height:"24px",padding:"0 10px"}}>{ Invoice.invoiceTo}</td>
                                       </tr>
                                       <tr>
                                           <td colSpan="3" className="yks-w333"  style={{height:"24px",padding:"0 10px"}}> { Invoice.buyerAdress }</td>
                                       </tr>
                                       <tr>
                                           <td colSpan="3" style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size" style={ paddingsm }>Country of Origin and POL 始发国：</p>
                                               <p className="yks-w333" style={ paddingsm }>{ Invoice.originCountry }</p>
                                           </td>
                                           <td width="320" style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size" style={ paddingsm }>Country of destination and POD 目的国：</p>
                                               <p className="yks-w333" style={ paddingsm }>{ Invoice.destinationCountry }</p>
                                           </td>
                                           <td colSpan="3" style={ paddingdm }>
                                               <p>
                                                   <span className="yks-w666 font-lg-size" style={ paddingsm }>Tel：</span>
                                                   <span className="yks-w333" style={ paddingsm }>{ Invoice.payerTel }</span>
                                               </p>
                                               <p>
                                                   <span className="yks-w666 font-lg-size" style={ paddingsm }>Email：</span>
                                                   <span className="yks-w333" style={ paddingsm }>{ Invoice.payerEmail }</span>
                                               </p>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td colSpan="3" style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size" style={ paddingsm }>Mode of Transport 运输方式：</p>
                                               <p className="yks-w333" style={ paddingsm }>{ Invoice.transportMode }</p>
                                           </td>
                                           <td colSpan="3" style={ paddingdm }>
                                               <p className="yks-w666 font-lg-size">Order reference code 备注：</p>
                                               <p className="yks-w333">{ Invoice.note }</p>
                                           </td>
                                       </tr>
                                </tbody>
                            </table>
                         <table className="table" border="1" bordercolor="#777" width="100%">
                                <tbody>
                                    <tr style={ heightsmH } className="yks-w666">
                                        <td style={ paddingdm }></td>
                                        <td style={ paddingdm }>SKU#</td>
                                        <td style={ paddingdm }>报关品名</td>
                                        <td style={ paddingdm }>Total Quantity</td>
                                        <td style={ paddingdm }>Unit</td>
                                        <td style={ paddingdm }>Unit  Price</td>
                                        <td style={ paddingdm }>Currency</td>
                                        <td style={ paddingdm }>Amount</td>
                                        <td style={ paddingdm }>COO</td>
                                    </tr>
                                    {
                                        ListArray.map(function(item,index){
                                            return  <tr key={index} className="yks-w333" style={ heightsm}>
                                                        <td style={ paddingdm }>{ item.sid }</td>
                                                        <td style={ paddingdm }>{ item.sku}</td>
                                                        <td style={ paddingdm }>{ item.customsName }</td>
                                                        <td style={ paddingdm }>{ item.totalQuantity }</td>
                                                        <td style={ paddingdm }>{ item.unit }</td>
                                                        <td style={ paddingdm }>{ item.unitPrice}</td>
                                                        <td style={ paddingdm }>{ item.currency }</td>
                                                        <td style={ paddingdm }>{ item.amount}</td>
                                                        <td style={ paddingdm }>{ item.coo}</td>
                                                    </tr>
                                        })
                                    }
                                    <tr>
                                        <td className="yks-w333" colSpan="3" style={ paddingdm }>GRAND TOTAL  : </td>
                                        <td className="yks-w333" style={ paddingdm }>{ Invoice.totalQuantity }</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="yks-w333" style={ paddingdm }>{ Invoice.totalAmount }</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                    </Col>
                </Row>
                </Spin>
            </div>
        )
    }
}
