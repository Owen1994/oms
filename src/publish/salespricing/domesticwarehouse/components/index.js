import React from 'react';
import { Form, message } from 'antd';
import Search from './Search';
import Table from './Table';
import Modal2 from '../../../../components/Modal2';
import CalSaleModal from './CalSaleModal';

import { SUBMIT_DOMESTIC, GET_DOMESTIC_STATE, IMPORT_FILE, EXPORT_PRICING } from '../constants';
import { fetchPost, openDownloadFile } from "../../../../util/fetch";
import { filterSubmitData } from '../selector';

class DomesticWarehouse extends React.Component {
    state = {
        queryBtnShow: false
    }

    componentDidMount() {
        this.getDomesticState();
    }

    // 提交计算
    submitDomestic = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ queryBtnShow: true, btnDisabled: true });
                const params = filterSubmitData(values);
                fetchPost(SUBMIT_DOMESTIC, params, 2)
                    .then(data => {
                        if(data && data.state === "000001"){
                            const res = data.data;
                            this.setState({ pricingTaskId: res.pricingTaskId });
                        }
                    })
            }
        })
    }

    listFetch = (pageData = 20, pageNumber = 1) => {
        const { pricingTaskId } = this.state;
        let param = {};
        param.pageData = pageData;
        param.pageNumber = pageNumber;
        param.pricingTaskId = pricingTaskId;
        this.props.queryResult(param);
    }

    // isClickBtn: 1 点击查询结果动作
    getDomesticState = (isClickBtn) => {
        fetchPost(GET_DOMESTIC_STATE, { data: {} })
            .then(data => {
                if(data && data.state === "000001"){
                    const res = data.data;
                    // 返回结果不为空对象时回显上一次的计算表单
                    if (Object.keys(res).length) {
                        this.props.pricingStateInit(res);
                        this.setState({ pricingTaskId: res.pricingTaskId });
                    }
                    if (res.handlerResult) {
                        this.listFetch();
                        if (isClickBtn) {
                            this.setState({ queryBtnShow: false, btnDisabled: false });
                        }
                    } else if (res.handlerResult === 0) {
                        if (isClickBtn) {
                            message.info('试算售价暂未完成，请稍后再试');
                        }
                        this.setState({ queryBtnShow: true, btnDisabled: true });
                    }
                }
            })
    }

    // 试算售价
    handleCalSale = () => {
        this.saleRef.validateFields((err, values) => {
            const file = values.file;
            if (!file.length) {
                message.warning('请先选择文件上传');
                return false;
            }
            this.setState({ calSaleLoading: true });
            fetchPost(IMPORT_FILE, { data: file[0] }, 1)
                .then(data => {
                    if(data && data.state === "000001"){
                        this.handleCancel('calSaleVisible');
                    }
                })
                .finally(() => {
                    this.setState({ calSaleLoading: false });
                })
        })
    }

    // 数据导出
    exportPricing = () => {
        const { pricingTaskId } = this.state;
        fetchPost(EXPORT_PRICING, {data: { pricingTaskId }}, 1)
            .then(data => {
                if(data && data.state === "000001"){
                    openDownloadFile(data.data.url);
                }
            })
    }

    handleOpenModal = (visible) => {
        this.setState({ [visible]: true });
    }

    handleCancel = (visible) => {
        this.setState({ [visible]: false });
    }

    onReset = () => {
        this.props.form.setFieldsValue({
            platformCode: undefined,
            basicId: undefined,
            profitsRate: undefined,
            skus: ''
        })
    }

    render() {
        const { pricingTaskId, queryBtnShow, calSaleVisible, btnDisabled, calSaleLoading } = this.state;
        return (
            <div className="domesticWarehouse">
                <Search
                    {...this.props}
                    btnDisabled={btnDisabled}
                    pricingTaskId={pricingTaskId}
                    onReset={this.onReset}
                    onSubmit={this.submitDomestic}
                />
                <Table
                    {...this.props}
                    queryBtnShow={queryBtnShow}
                    handleOpenModal={this.handleOpenModal}
                    listFetch={this.listFetch}
                    exportPricing={this.exportPricing}
                    getDomesticState={this.getDomesticState}
                />
                {/* 试算售价 */}
                <Modal2
                    component={<CalSaleModal ref={sale => this.saleRef = sale} />}
                    title="试算售价"
                    visible={calSaleVisible}
                    confirmLoading={calSaleLoading}
                    handleOk={this.handleCalSale}
                    handleCancel={() => this.handleCancel('calSaleVisible')}
                />
            </div>
        )
    }
}
export default Form.create()(DomesticWarehouse);
