/**
 * 作者: 陈林
 * 描述: 报关草单组件
 * 时间: 2018/6/14 0014 上午 8:45
 * @param
 **/
import React,{ Component } from 'react'
import { post } from "../../../../util/axios";
import { Row,Col, Spin, } from "antd";
export default class App extends Component{
    state = {
        CustomsDeclarationCase:{
            item:[]
        },
        loading: true,
    }
    componentDidMount(){
        const id = this.props.id;
        post(`/customs/api/print/GrassList/grasslist`,{id:id}).then(response => {
            this.setState({
                CustomsDeclarationCase: response.data,
                loading: false,
            });
        })
    }
    render(){
        const CustomsDeclarationCase  = this.state.CustomsDeclarationCase;
        const ListArray = CustomsDeclarationCase.items || [];
        let twebContentW = {
            marginTop:"30px",
            color:"#555",
        }
        let twewH = {
            textAlign:"center",
            fontSize:"19px",
            color:"#333",
            fontWeight:"bold"
        }
        let paddingBottom = {
            paddingBottom:"10px"
        }
        let paddingdm = {
            padding:"0 10px"
        }
        let  paddingsm  = {
            padding:"3px 0 3px"
        }
        let paddingdmW = {
            padding:"0 10px",
            height:"34px"
        }
        let paddingmB = {
            borderTop:"1px #fff solid",
            height:"34px"
        }
        let borderLeft = {
            borderLeft:"none",
            padding:"0 10px"
        }
        let borderRight = {
            borderRight:"none",
            padding:"0 10px"
        }
        let flex = {
            display:"flex",
            paddingBottom:"10px"
        }
        let widtha = {
            width:"37%"
        }
        let widthb = {
            width:"33%"
        }
        let widthc = {
            width:"30%",
            textAlign:"right"
        }
        let lineH = {
            height:"20px"
        }
         return(
                 <div className="tweb-content padding-sm">
                     <Spin spinning={this.state.loading}>
                            <Row>
                         <Col span={24}  style={ twebContentW }>
                                 <div >
                                     <h4 style={ twewH }>中华人民共和国海关出口货物报关单</h4>
                                     <div  style={ flex }>
                                         <p style={ widtha }>预录入编号:{ CustomsDeclarationCase.preentrycoding }</p>
                                         <p style={ widthb }>海关编号：{ CustomsDeclarationCase.customsNumber }</p>
                                         <p style={ widthc }>
                                             <span>
                                                 页码/页数：{ CustomsDeclarationCase.page }
                                             </span>
                                         </p>
                                     </div>
                                 </div>
                                 <table border="1" bordercolor="#777" width="100%">
                                     <tbody>
                                         <tr>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <p className="yks-w666" style={  paddingsm  }>境内发货人</p>
                                                 <p className="yks-w333" style={  paddingsm  }>{ CustomsDeclarationCase.receiveConsigner }</p>
                                             </td>
                                             <td colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={  paddingsm  }>出境关别</p>
                                                 <p className="yks-w333" style={  paddingsm  }>{ CustomsDeclarationCase.exportPorts }</p>
                                             </td>
                                             <td colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={  paddingsm  }>出口日期</p>
                                                 <p className="yks-w333" style={  paddingsm  }>{ CustomsDeclarationCase.exportDate}</p>
                                             </td>
                                             <td colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={  paddingsm  }>申报日期</p>
                                                 <p className="yks-w333" style={ paddingsm }>{  CustomsDeclarationCase.filingDate }</p>
                                             </td>
                                             <td colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={  paddingsm  }>备案号</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.caseNumber }</p>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>境外收货人</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.overseasConsignee }</p>
                                             </td>
                                             <td  colSpan="2" className="yks-w114" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>运输方式</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.transportationMethod }</p>
                                             </td>
                                             <td  colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>运输工具名称及航次号</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.transportationTools }</p>
                                             </td>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>提运单号</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.deliveryNumber }</p>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>生产销售单位</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.productSalesUnit }</p>
                                             </td>
                                             <td colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>监管方式</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.regulatoryApproach}</p>
                                             </td>
                                             <td colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>征免性质</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.examptionNature }</p>
                                             </td>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>许可证号</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.licenseNumber }</p>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>合同协议号</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.contractAgreementNumber }</p>
                                             </td>
                                             <td colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>贸易国(地区)</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.tradingCountry }</p>
                                             </td>
                                             <td colSpan="2" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>抵运国(地区)</p>
                                                 <p className="yks-w333" style={ paddingsm }>{  CustomsDeclarationCase.stateOfArrival }</p>
                                             </td>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>指运港</p>
                                                 <p className="yks-w333" style={ paddingsm }>{  CustomsDeclarationCase.shippingPort }</p>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>包装种类</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.packingType }</p>
                                             </td>
                                             <td  style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>件数</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.piecesOfNumber }</p>
                                             </td>
                                             <td  style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>毛重（千克）</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.grossWeight }</p>
                                             </td>
                                             <td  style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>净重（千克）</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.netWeight }</p>
                                             </td>
                                             <td  style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>成交方式</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.transactionMethod}</p>
                                             </td>
                                             <td  style={ paddingdm }>
                                                 <p className="yks-w228" style={ paddingsm }>运费</p>
                                                 <p className="yks-w228" style={ paddingsm }>{ CustomsDeclarationCase.freight }</p>
                                             </td>
                                             <td style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>保险费</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.insurance }</p>
                                             </td>
                                             <td  style={ paddingdm }>
                                                 <p className="yks-w666" style={ paddingsm }>杂费</p>
                                                 <p className="yks-w333" style={ paddingsm }>{ CustomsDeclarationCase.miscellaneousFees }</p>
                                             </td>
                                         </tr>
                                         <tr className="tr-sm-height">
                                             <td colSpan="11" style={ paddingdm }>
                                                 <p className="yks-w666">随附单证:{ CustomsDeclarationCase.attachedDocuments }</p>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td colSpan="11" style={ paddingdm }>
                                                 <p className="font-small" style={ paddingsm }>
                                                     <span className="yks-w666"> 标记唛码及备注：</span>
                                                     <span className="yks-w333">{ CustomsDeclarationCase.markingWeight }</span>
                                                 </p>
                                             </td>
                                         </tr>
                                     </tbody>
                                 </table>
                                 <table border="1"  bordercolor="#777" width="100%">
                                     <tbody>
                                         <tr className="yks-w666 font-lg-bg" style={ paddingmB } style={{borderTop:"1px #777 solid"}}>
                                             <td style={ paddingdm }><p>项号</p></td>
                                             <td style={ paddingdm } colSpan="3" width="300">
                                                 <p className="yks-w666">商品编号
                                                     <span style={{marginLeft:"100px"}}>商品名称、规格型号</span>
                                                 </p></td>
                                             <td style={ paddingdm } colSpan="3"><p className="yks-w114">数量及单位</p></td>
                                             <td style={ paddingdm } colSpan="3"><p className="yks-w114">单价/总价/币制</p></td>
                                             <td style={ paddingdm } colSpan="3"><p className="yks-w114">原产国(地区)</p></td>
                                             <td style={ paddingdm } colSpan="3"><p className="yks-w114">最终目的国（地区）</p></td>
                                             <td style={ paddingdm } colSpan="2"><p className="yks-w114">境内货源地</p></td>
                                             <td style={ paddingdm } colSpan="2"><p className="yks-w114">征免</p></td>
                                         </tr>
                                         {
                                             ListArray.map(function(item,index){
                                                 return  <tr key={index} className="yks-w333" >
                                                     <td style={ paddingdm }>
                                                         <p>{ item.count }</p>
                                                     </td>
                                                     <td colSpan="3" width="300">
                                                         <p style={{padding:"0 10px",lineHeight:"45px"}} className="yks-w333">{ item.sno }
                                                            <span style={{marginLeft:"78px"}}>{ item.pname }</span>
                                                         </p>
                                                         <p className="yks-w333">{ item.decElement }</p>
                                                     </td>
                                                     <td style={ paddingdm } colSpan="3">
                                                         <p className="yks-w333" style={ lineH }>{ item.numerA }</p>
                                                         <p className="yks-w333" style={ lineH }>{ item.numerKg }</p>
                                                         <p className="yks-w333" style={ lineH }>{ item.numerSet }</p>
                                                     </td>
                                                     <td style={ paddingdm } colSpan="3">
                                                         <p className="yks-w333" style={ lineH }>{ item.unitPrice }</p>
                                                         <p className="yks-w333" style={ lineH }>{ item.totalPrice }</p>
                                                         <p className="yks-w333" style={ lineH }>{ item.currency }</p>
                                                     </td>
                                                     <td style={ paddingdm } colSpan="3">
                                                         <p className="yks-w333">{ item.countryOrigin }</p>
                                                         <p className="yks-w333">({ item.countryOriginCode })</p>
                                                     </td>
                                                     <td style={ paddingdm } colSpan="3">
                                                         <p className="yks-w333">{ item.destCountry }</p>
                                                         <p className="yks-w333">({ item.destCountryCode })</p>
                                                     </td>
                                                     <td style={ paddingdm } colSpan="2">
                                                         <p className="yks-w333">{ item.territoryAddress }</p>
                                                     </td>
                                                     <td style={ paddingdm } colSpan="2">
                                                         <p className="yks-w333">{ item.levy}</p>
                                                     </td>
                                                 </tr>
                                             })
                                         }
                                     </tbody>
                                 </table>
                                 <table border="1"  bordercolor="#777" width="100%">
                                     <tbody>
                                         <tr style={ paddingmB }  style={{borderTop:"1px #777 solid"}}>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <span className="yks-w666">特殊关系确认:</span>
                                                 <span className="yks-w333">{ CustomsDeclarationCase.specialRelationConfirm }</span>
                                             </td>
                                             <td colSpan="6" style={ paddingdm }>
                                                 <span className="yks-w666">价格影响确认：</span>
                                                 <span className="yks-w333">{ CustomsDeclarationCase.priceImpactConfirm } </span>
                                             </td>
                                             <td colSpan="6" style={ paddingdm }>
                                                 <span className="yks-w666">支付特许权使用确认： </span>
                                                 <span className="yks-w333">{ CustomsDeclarationCase.payLicenseConfirm } </span>
                                             </td>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <span className="yks-w666">自报自缴： </span>
                                                 <span className="yks-w333">{ CustomsDeclarationCase. seleReportingSelfPayment } </span>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td colSpan="16" style={ paddingdm }>
                                                <div style={{display:"flex"}}>
                                                    <p style={{ width:"20%"}}>
                                                        <span className="yks-w666"> 申报人员： </span>
                                                        <span className="yks-w333">{ CustomsDeclarationCase.declarant }</span>
                                                    </p>
                                                    <p style={{ width:"20%"}}>
                                                        <span className="yks-w666">  申报人员证号： </span>
                                                        <span className="yks-w333">{ CustomsDeclarationCase.declarationCard }</span>
                                                    </p>
                                                    <p style={{ width:"20%"}}>
                                                        <span className="yks-w666">  电话： </span>
                                                        <span className="yks-w333">{ CustomsDeclarationCase.telephone}</span>
                                                    </p>
                                                    <p className="yks-w666">兹申明对以上内容承担如实申报、依法纳税之法律责任</p>
                                                </div>
                                                <div style={{display:"flex"}}>
                                                    <p style={{ width:"60%"}}>
                                                        <span className="yks-w666"> 申报单位: </span>
                                                        <span className="yks-w333">{ CustomsDeclarationCase.applicationUnit }</span>
                                                    </p>
                                                    <p>申报单位(签章)</p>
                                                </div>
                                             </td>
                                             <td colSpan="4" style={ paddingdm }>
                                                 <div>
                                                     <p className="yks-w666">海关批注及签章</p>
                                                 </div>
                                             </td>
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
