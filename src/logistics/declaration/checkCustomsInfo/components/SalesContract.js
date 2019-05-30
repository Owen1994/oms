/**
 * 作者: 陈林
 * 描述: 销售合同
 * 时间: 2018/6/15 0015 下午 5:11
 * @param
 **/
import React,{ Component } from 'react'
import { post } from "../../../../util/axios";
import logo from './customsLogo.png'
import { Table,Row,Col,Spin } from 'antd';
export default class App extends Component{

    state = {
        SalesContract:{
            items:[]
        },
        loading: true,
    }

    componentDidMount(){
        const id = this.props.id;
        post(`/customs/api/print/Cnotract/cnotract`,{id:id}).then(response => {
            this.setState({
                SalesContract: response.data,
                loading: false,
            });
        })
    }

    render(){
        const SalesContract = this.state.SalesContract;
        const SalesContractArray = SalesContract.items || [];
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
        let paddingdmT = {
            padding:"0 10px",
            borderLeft:"1px #fff solid"
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
        let height = {
            height:"34px"
        }
        let margin = {
            margin:"20px 0 0 0"
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
                                        <span className="text-center" style={ tableTitleSpan }>Sales Contract(销售合同)</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-bordered salesContract salesContract" border="1" width="100%" style={ marginsmTop }>
                            <tbody>
                                <tr>
                                    <td className="tweb-verticalAlign yks-w333" style={ paddingdm }>Seller</td>
                                    <td colSpan="8" style={ paddingdm }>
                                        <p className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.sellerName}</p>
                                        <p className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.sellerAddress }</p>
                                        <div className="col-md-6" style={{ width:"50%",float:"left"}}>
                                            <span className="yks-w333" style={ paddingsm }>TEL:</span>
                                            <span className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.sellerTel }</span>
                                        </div>
                                        <div className="col-md-6" style={{ width:"50%",float:"left"}}>
                                            <span className="yks-w333" style={ paddingsm }>Email </span>
                                            <span className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.sellerEmail }</span>
                                        </div>
                                    </td>
                                    <td colSpan="3" className="tweb-verticalAlign" style={ paddingdm }>
                                        <p className="yks-w333" style={ paddingsm }>Invoice No:</p>
                                        <p className="yks-w666 font-lg-size" style={ paddingsm }>{  SalesContract.invoiceNo }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="tweb-verticalAlign yks-w333" style={ paddingdm }>Buyer</td>
                                    <td colSpan="8" style={ paddingdm }>
                                        <p className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.buyerName }</p>
                                        <p className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.buyerAddress }</p>
                                        <div className="col-md-6" style={{ width:"50%",float:"left"}}>
                                            <span className="yks-w333" style={ paddingsm }>TEL:</span>
                                            <span className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.buyerTel }</span>
                                        </div>
                                        <div className="col-md-6" style={{ width:"50%",float:"left"}}>
                                            <span className="yks-w333" style={ paddingsm }>Email </span>
                                            <span className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.buyerEmail }</span>
                                        </div>
                                    </td>
                                    <td colSpan="3" className="tweb-verticalAlign" style={ paddingdm }>
                                        <p className="yks-w333" style={ paddingsm }>Contract No:</p>
                                        <p className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.contractNo }</p>
                                    </td>
                                </tr>
                                <tr style={ height }>
                                    <td colSpan="9" style={ paddingdm }>&nbsp;</td>
                                    <td className="yks-w333" style={ paddingdm }>Data:</td>
                                    <td  colSpan="2" className="yks-w333" style={ paddingdm }> { SalesContract.date }</td>
                                </tr>
                                <tr style={ height }>
                                    <td colSpan="5" style={ paddingdm }>
                                        <span className="yks-w333" style={ paddingsm }>From:</span>
                                        <span className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.from }</span>
                                    </td>
                                    <td colSpan="4" style={ paddingdmT }>
                                        <span className="yks-w333" style={ paddingsm }>To:</span>
                                        <span className="yks-w666 font-lg-size" style={ paddingsm }>{ SalesContract.to }</span>
                                    </td>
                                    <td className="yks-w666 font-lg-size" style={ paddingdm }>
                                        Shipping Term
                                    </td>
                                    <td colSpan="2" className="yks-w666 font-lg-size" style={ paddingdm }>
                                        { SalesContract.shippingTerm }
                                    </td>
                                </tr>
                                <tr className="yks-w666" style={ paddingdm } style={ height }>
                                    <td style={ paddingdm } >Item</td>
                                    <td style={ paddingdm } width="300">Sku/ERP#</td>
                                    <td style={ paddingdm } colSpan="4">报关品名</td>
                                    <td style={ paddingdm } colSpan="3">Total Quantity</td>
                                    <td style={ paddingdm } >Unit Price</td>
                                    <td style={ paddingdm } >Currency</td>
                                    <td style={ paddingdm } >Amount</td>
                                </tr>
                                {
                                    SalesContractArray.map(function(item,index){
                                        return <tr key={index} className="yks-w333 font-lg-size" style={ height }>
                                            <td style={ paddingdm }>{ item.sid }</td>
                                            <td style={ paddingdm } width="300">{ item.skuName }</td>
                                            <td style={ paddingdm } colSpan="4">{ item.customsName}</td>
                                            <td style={ paddingdm } colSpan="3">{ item.qty }</td>
                                            <td style={ paddingdm }>{ item.unitPrice }</td>
                                            <td style={ paddingdm }>{ item.current }</td>
                                            <td style={ paddingdm }>{ item.totalAmount }</td>
                                        </tr>
                                    })
                                }
                                <tr style={ height }>
                                    <td colSpan="4" className="yks-w333" style={ paddingdm }> &nbsp;</td>
                                    <td colSpan="2" className="yks-w666 font-lg-size" style={ paddingdm }>GRANDTOTAL</td>
                                    <td colSpan="3" style={ paddingdm }>{ SalesContract.geandTotalQty}</td>
                                    <td style={ paddingdm }>&nbsp;</td>
                                    <td style={ paddingdm }></td>
                                    <td className="yks-w666 font-lg-size" style={ paddingdm }>{ SalesContract.geandTotalAmount}</td>
                                </tr>
                                </tbody>
                        </table>
                        <div className="col-md-12 padding-lg-left">
                            <p style={ margin }>1.Quality standard: { SalesContract.quanlityStandard }</p>
                            <p style={ margin }>2. Warranty:{ SalesContract.warranty }</p>
                            <p style={ margin }>3. Payment terms: { SalesContract.paymentTerms }</p>
                            <p style={ margin }>4. Payment:</p>
                            <p style={ margin } className="yks-lh15 yks-ti">Beneficiary:{ SalesContract.beneficiary }</p>
                            <p style={ margin } className="yks-lh15 yks-ti">Beneficiary Bank:{ SalesContract.beneficiaryBank }</p>
                            <p style={ margin } className="yks-lh15 yks-ti">SWIFT Code:{ SalesContract.swiftCode }</p>
                            <p style={ margin } className="yks-lh15 yks-ti">Account No.:{ SalesContract.accountNo }</p>
                            <p style={ margin } className="yks-lh15 yks-ti">Intermediary Bank:{ SalesContract.intermediaryBank }</p>
                            <p style={ margin }>5. Shipment: {  SalesContract.shipment }</p>
                        </div>
                        <div className="col-md-12 tweb-padding-lg-top padding-lg-left" style={{ marginsmTop:"30px"}}>
                            <div  className="inscribe" style={{ width:"50%",float:"left"}}>
                                <p>卖方：<b>{ SalesContract.sellerName }</b></p>
                                <p><b>The sell：</b><b></b></p>
                            </div>
                            <div  className="inscribe" style={{ width:"50%",float:"left"}}>
                                <p>买方：<b>YKS Electronic Commerce Coo.,Limited</b></p>
                                <p><b>The Buyer：</b><b></b></p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                  </Col>
                </Row>
                </Spin>
            </div>
        )
    }
}