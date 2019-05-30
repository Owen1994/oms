const preurl = '/customerServiceSystem/index/api/';
// const preurl = '/mockjsdata/29/customerServiceSystem/index/api/';

// 获取平台
export const GET_PLATFORM_LIST = `${preurl}Pub/GetPlatformList/getPlatformList`;

// 根据模块获取平台
export const GET_MODE_PLATFORM = `${preurl}Pub/getModePlatform`;

// 根据平台ID获取模板分类列表
export const GET_TEMPLATE_CLASS_LIST2 = `${preurl}TemplateClass/GetTemplateClassList2/getTemplateClassList`;

// 获取站内信沟通记录
export const GET_MESSAGE_RECORD = `${preurl}MessageList/getMessageRecord`;

// 获取买家邮件沟通记录
export const GET_BUYER_EMAIL_RECORD = `${preurl}MessageList/getBuyerEmailRecord`;

// 再次编辑锁定延迟发送
export const LOCK_DELAY_SEND = `${preurl}MessageList/lockDelaySend`;

// 回复站内信
export const REPLY_MESSAGE = `${preurl}MessageList/replyMessage`;

// 回复邮件
export const REPLY_EMAIL = `${preurl}MessageList/replyBuyerMail`;

// 新增/编辑草稿
export const SAVE_DRAFT = `${preurl}Pub/saveDraft`;

// 设置成无需处理
export const SET_NO_NEED_DEAL = `${preurl}MessageList/setNoNeedToDeal`;

// 站内信标记为已处理
export const MARK_OPERATE = `${preurl}MessageList/markOperated`;

// 买家邮件标记为已处理
export const EMAIL_MARK_OPERATE = `${preurl}Email/markOperated`;

// 取消发送
export const CANCEL_SEND = `${preurl}MessageList/cancelDelaySend`;

// 获取订单信息
export const GET_ORDER_ASSOCIATION_INFO = `${preurl}CustomerComplaints/getOrderAssociationInfo`;

// 获取延迟收货信息
export const GET_DALAY_RECEIVED_INFO = `${preurl}CustomerComplaints/getDelayInfo`;

// 提交延迟收货信息
export const POST_DALAY_RECEIVED = `${preurl}CustomerComplaints/delayReceivingGoods`;

// 回复评价
export const REPLY_EVALUATION = `${preurl}CustomerComplaints/replyEvaluation`;

// 获取纠纷处理信息
export const GET_DISPUTE_INFO = `${preurl}CustomerComplaints/getDisputeDetail`;

// 拒绝并新增/修改退款方案信息
export const ADD_OR_MODIFY_PROGRAMME = `${preurl}CustomerComplaints/addOrModifyProgramme`;

// 同意买家方案
export const AGREE_BUYER_PROGRAMME = `${preurl}CustomerComplaints/agreeProgramme`;

// 上传证据
export const UPLOAD_EVIDENCE = '/customerServiceSystem/index/api/CustomerComplaints/uploadingEvidence';

// 检测是否可添加退款单
export const CHECK__ADD_REFUND = `${preurl}RefundApplication/ifCanAddRefund`;

// 获取新增/编辑退货单信息
export const GET_REFUND_INFO = `${preurl}RefundApplication/getRefundInfo`;

// 提交新增/编辑退货单信息
export const EDIT_OR_ADD_REFUND = `${preurl}RefundApplication/editOrAddRefund`;

// 获取订单信息 未登记商品和部分登记商品信息
export const UNRECORDED_ORDER_INFO = `${preurl}RefundApplication/unrecordedOrderInfo`;
