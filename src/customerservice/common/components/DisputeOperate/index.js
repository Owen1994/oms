import React from 'react';
import { message, Button } from 'antd';
import RefuseAddModal from './RefuseAddModal';
import UploadEvidenceModal from './UploadEvidenceModal';
import Modal2 from '../../../../components/Modal2';
import {
    ADD_OR_MODIFY_PROGRAMME, AGREE_BUYER_PROGRAMME, UPLOAD_EVIDENCE, GET_DISPUTE_INFO,
} from '../../constants';
import { fetchPost } from '../../../../util/fetch';
import { showConfirm } from '../../../../compliance/utils';
import { randNum } from '../../../../util/baseTool';
import './index.css';
import { popUpImage, angentPicUrl } from '@/util/baseTool';

class DisputeOperate extends React.Component {
    state = {
        disputeData: {
            buyerImgList: [],
            sellerImgList: [],
            isSnad: '',
        },
        refuseVisible: false,
        evidenceVisible: false,
        refuseConfirmLoading: false,
        evidenceConfirmLoading: false,
    }

    refuseRef = React.createRef();

    evidenceRef = React.createRef();

    componentDidMount() {
        this.getDisputInfo();
    }

    // 获取纠纷列表
    getDisputInfo = () => {
        const {
            platformId, issueId, buyerAccount, sellerAccount,
        } = this.props;
        fetchPost(GET_DISPUTE_INFO, {
            platformId,
            issueId,
            buyerAccount,
            sellerAccount,
            flag: 'handle',
        }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        disputeData: data.data,
                    });
                }
            });
    }

    // 拒绝/新增退款方案
    handleRefuseOk = () => {
        const {
            platformId, orderNumber, issueId, buyerAccount, sellerAccount,
        } = this.props;
        const { disputeData } = this.state;
        const buyerSolutionList = disputeData.buyer_solution_list;
        const sellerSolutionList = disputeData.seller_solution_list;
        this.refuseRef.current.validateFields((err, values) => {
            if (!err) {
                delete values.thumbUrl;
                this.setState({ refuseConfirmLoading: true });
                if (!buyerSolutionList) {
                    return;
                }
                fetchPost(ADD_OR_MODIFY_PROGRAMME, {
                    issueId,
                    orderNumber,
                    buyerAccount,
                    sellerAccount,
                    ...values,
                    platformId,
                    refundAmountCurrency: buyerSolutionList ? buyerSolutionList.refund_money_currency : undefined,
                    isNew: sellerSolutionList ? '0' : '1',
                    buyerSolutionId: sellerSolutionList ? undefined : buyerSolutionList.id,
                    modifySellerSolutionId: sellerSolutionList ? sellerSolutionList.id : undefined,
                }, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.getDisputInfo();
                            this.handleCancel('refuseVisible');
                        }
                        this.setState({ refuseConfirmLoading: false });
                    });
            }
        });
    }

    // 上传证据
    handleEvidenceOk = () => {
        const {
            platformId, buyerAccount, issueId, sellerAccount,
        } = this.props;
        const uploadFileList = this.evidenceRef.current.state.uploadFileList;
        if (uploadFileList.length <= 0) {
            message.info('请先上传文件！');
            return false;
        }
        this.setState({ evidenceConfirmLoading: true });
        fetchPost(UPLOAD_EVIDENCE, {
            issueId,
            platformId,
            buyerAccount,
            sellerAccount,
            ...uploadFileList[0],
        }, 1)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.getDisputInfo();
                    this.handleCancel('evidenceVisible');
                }
                this.setState({ evidenceConfirmLoading: false });
            });
    }

    /**
     * 同意买家/平台方案
     * @param <Object> postIdAndType方案id和类型租场的对象
     */
    handleAgreeProgramme = (postIdAndType) => {
        const addressId = this.state.disputeData.address_id;
        const {
            platformId, issueId, sellerAccount, buyerAccount,
        } = this.props;
        const returnAddressId = postIdAndType.solutionType === 'refund' ? undefined : addressId;
        showConfirm(
            '确定同意该方案？',
            '当双方都同意后，纠纷将会按照该方案执行，同意后无法取消，请确认是否同意该方案?',
            () => {
                fetchPost(AGREE_BUYER_PROGRAMME, {
                    platformId,
                    issueId,
                    buyerAccount,
                    sellerAccount,
                    returnAddressId,
                    ...postIdAndType,
                }, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.getDisputInfo();
                        }
                    });
            },
        );
    }

    changeModal = (visible) => {
        this.setState({
            [visible]: true,
        });
    }

    handleCancel = (visible) => {
        this.setState({
            [visible]: false,
        });
    }

    addKey = (imgList) => {
        imgList.forEach(item => item.uid = randNum());
        return imgList;
    }

    render() {
        const {
            disputeData,
            refuseVisible,
            evidenceVisible,
            refuseConfirmLoading,
            evidenceConfirmLoading,
        } = this.state;
        const platformData = disputeData.platform_solution_list;
        const buyerData = disputeData.buyer_solution_list;
        if (!buyerData) {
            return false;
        }
        const sellerData = disputeData.seller_solution_list;
        let sellerSolution;
        const sellerImgList = this.addKey(disputeData.sellerImgList);
        const buyerImgList = this.addKey(disputeData.buyerImgList);
        if (!buyerData) {
            sellerSolution = <p>暂无数据</p>;
        } else if (sellerData) {
            sellerSolution = (
                <div className="ant-row">
                    <div className="ant-row">
                        <div className="ant-col-24">
                            <span>方案：</span>
                            <span>{sellerData.solution_type === 'refund' ? '退款' : '退货退款'}</span>
                            { sellerData.status === 'buyer_refused' ? <span className="red-tip" style={{ marginLeft: 15 }}> 买家拒绝方案</span> : null }
                        </div>
                        <div className="ant-col-24">
                            <div className="ant-col-2">备注：</div>
                            <div className="ant-col-18">{sellerData.content}</div>
                        </div>
                    </div>
                    <div className="ant-col-24">
                        <Button onClick={() => this.changeModal('refuseVisible')}>修改方案</Button>
                        <Button style={{ marginLeft: 15 }} onClick={() => this.changeModal('evidenceVisible')}>上传证据</Button>
                    </div>
                </div>
            );
        } else {
            sellerSolution = (
                <div className="ant-row">
                    <div className="ant-row">
                        <div className="ant-col-24" style={{ backgroundColor: '#E6F7FF', paddingLeft: 15, marginBottom: 10 }}>
                            <p>等待您提供方案</p>
                            <p>你可以同意买家方案或拒绝并新增一个方案来响应纠纷</p>
                        </div>
                    </div>
                    <div className="ant-col-24">
                        <Button onClick={() => this.changeModal('refuseVisible')}>拒绝并新增退货退款方案</Button>
                    </div>
                </div>
            );
        }
        return (
            <div className="dispute-operate">
                {disputeData.buyer_return_logistics_lp_no
                    ? (
                        <div className="ant-row refuse-goods-logistics">
                            <div className="ant-col-24 refuse-goods-tip">
                                <p>提醒：买家已退货，等待您确认收货，确认收货倒计时16天4时25分40秒，请登录账号机移步至后台快速处理</p>
                            </div>
                            <div className="ant-row">
                                <div className="ant-col-6">退货物流公司：</div>
                                <div className="ant-col-18">{disputeData.buyer_return_logistics_company}</div>
                            </div>
                            <div className="ant-row">
                                <div className="ant-col-6">退货物流订单LP单号：</div>
                                <div className="ant-col-18">{disputeData.buyer_return_logistics_lp_no}</div>
                            </div>
                            <div className="ant-row">
                                <div className="ant-col-6">退货单号：</div>
                                <div className="ant-col-18">{disputeData.buyer_return_no}</div>
                            </div>
                            <div className="ant-row">
                                <div className="ant-col-6">运费金额：</div>
                                <div className="ant-col-18 red-tip">{disputeData.logistics_fee_amount}</div>
                            </div>
                            <div className="ant-row">
                                <div className="ant-col-6">运费承担方：</div>
                                <div className="ant-col-18">{disputeData.logistics_fee_bear_role}</div>
                            </div>
                        </div>
                    )
                    : null
                }
                {platformData
                    ? (
                        <div className="platform-program dispute-program">
                            <div className="dispute-label">平台建议方案</div>
                            <div className="dispute-content">
                                <div className="ant-row">
                                    <div className="ant-col-10">
                                        <span>方案：</span>
                                        <span>{platformData.solution_type === 'refund' ? '退款' : '退货退款'}</span>
                                    </div>
                                    <div className="ant-col-14">
                                        <span>方案创建时间：</span>
                                        <span>{platformData.gmt_create}</span>
                                    </div>
                                    <div className="ant-col-24">
                                        <span>退款金额：</span>
                                        <span>{`${platformData.refund_money_currency} ${platformData.refund_money}（${platformData.refund_money_post_currency} ${platformData.refund_money_post}）`}</span>
                                    </div>
                                    <div className="ant-col-24">
                                        <div className="ant-col-2">备注：</div>
                                        <div className="ant-col-18">{platformData.content}</div>
                                    </div>
                                    <div className="ant-col-24">
                                        <Button type="primary" onClick={() => this.handleAgreeProgramme({ solutionId: platformData.id, solutionType: platformData.solution_type })}>同意</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : null
                }
                <div className="platform-program dispute-program">
                    <div className="dispute-label">买家方案（默认方案）</div>
                    <div className="dispute-content">
                        {buyerData
                            ? (
                                <div className="ant-row">
                                    <div className="ant-col-10">
                                        <span>方案：</span>
                                        <span>{buyerData.solution_type === 'refund' ? '退款' : '退货退款'}</span>
                                    </div>
                                    <div className="ant-col-14">
                                        <span>方案创建时间：</span>
                                        <span>{buyerData.gmt_create}</span>
                                    </div>
                                    <div className="ant-col-24">
                                        <span>退款金额：</span>
                                        <span className="red-tip">{`${buyerData.refund_money_currency} ${buyerData.refund_money}（${buyerData.refund_money_post_currency} ${buyerData.refund_money_post}）`}</span>
                                    </div>
                                    <div className="ant-col-24">
                                        <div className="ant-col-2">备注：</div>
                                        <div className="ant-col-18">{buyerData.content}</div>
                                    </div>
                                    <div className="ant-col-24">
                                        {disputeData.buyerImgList.length > 0
                                            ? buyerImgList.map(item => (
                                                <div className="evidence-thumb" key={item.uid}>
                                                    <span onClick={() => popUpImage(angentPicUrl(item.url), true)}>
                                                        <img src={angentPicUrl(item.url)} alt="" />
                                                    </span>
                                                </div>
                                            ))
                                            : null}
                                    </div>
                                    <div className="ant-col-24">
                                        <Button type="primary" onClick={() => this.handleAgreeProgramme({ solutionId: buyerData.id, solutionType: buyerData.solution_type })}>同意</Button>
                                    </div>
                                </div>
                            )
                            : <p>暂无数据</p>
                        }
                    </div>
                </div>
                <div className="platform-program dispute-program">
                    <div className="dispute-label">卖家方案</div>
                    <div className="dispute-content">
                        <div className="ant-row">
                            {sellerSolution}
                            <div className="ant-col-24">
                                {disputeData.sellerImgList.length > 0
                                    ? sellerImgList.map(item => (
                                        <div className="evidence-thumb" key={item.uid}>
                                            <span onClick={() => popUpImage(angentPicUrl(item.url), true)}>
                                                <img src={angentPicUrl(item.url)} alt="" />
                                            </span>
                                        </div>
                                    ))
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 拒绝并新增方案 */}
                <Modal2
                    component={
                        (
                            <RefuseAddModal
                                orderNumber={this.props.orderNumber}
                                platformId={this.props.platformId}
                                disputeData={disputeData}
                                ref={this.refuseRef}
                            />
                        )
                    }
                    title="拒绝并新增方案"
                    visible={refuseVisible}
                    handleOk={this.handleRefuseOk}
                    handleCancel={() => this.handleCancel('refuseVisible')}
                    confirmLoading={refuseConfirmLoading}
                    width={700}
                />
                {/* 上传证据 */}
                <Modal2
                    component={
                        (
                            <UploadEvidenceModal
                                orderNumber={this.props.orderNumber}
                                platformId={this.props.platformId}
                                ref={this.evidenceRef}
                            />
                        )
                    }
                    title="上传证据"
                    visible={evidenceVisible}
                    handleOk={this.handleEvidenceOk}
                    handleCancel={() => this.handleCancel('evidenceVisible')}
                    confirmLoading={evidenceConfirmLoading}
                    width={600}
                />
            </div>
        );
    }
}
export default DisputeOperate;
