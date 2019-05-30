/**
 *作者: chenlin
 *功能描述: 弹窗
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Form,
    Modal,
    Button,
    Input,
    message,
} from 'antd';
import { fetchPost } from 'util/fetch';
import TrialFreightModalSearch from './TrialFreightModalSearch';
import TrialFreightModalTable from './TrialFreightModalTable';
import parseList from '../selectors/TrialFreight';
import { GET_FREIGHT_TRIAL } from '../constants';
import '../css/css.css';


const FormItem = Form.Item;
class TrialFreightModal extends React.Component {
    state = {
        loading: false,
        pageNumber: 1,
        pageSize: 20,
        dataList: { data: [], total: 0 },
    }

    componentDidUpdate(prevProps){
        const prevVisible = prevProps.trialFreightVisible;
        const visible = this.props.trialFreightVisible;
        const warehouseOrderNumber = this.props.record ? this.props.record.warehouseOrderNumber : '';
        if(prevVisible !== visible && visible && warehouseOrderNumber){
            this.setState({ whether: true }, () =>{
                this.props.form.setFieldsValue({ 'packageCode': warehouseOrderNumber });
                this.handleSearch();
            });
        }
    }
  
     // 运费试算搜索
     handleSearch = (pageNumber=1, pageSize=20) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values};
                data.pageNumber = pageNumber;
                data.pageSize = pageSize;
                if (data.packageCode) {
                    data.packageCode = data.packageCode;
                    delete data.countryCode;
                    delete data.platformName;
                    delete data.skuCode;
                    delete data.skuWeight;
                    delete data.warehouseCode;
                } else {
                    delete data.packageCode;
                }
                this.setState({
                    pageNumber,
                    pageSize,
                });
                this.loadData(data);
            }
        });
    }

    loadData = (params) => {
        this.setState({loading: true});        
        fetchPost(GET_FREIGHT_TRIAL, params, 2)
            .then((result) => {
                this.setState({loading: false});
                if (result.state === '000001') {
                    this.setState({dataList: parseList(result)});
                } 
            });
    }

    // 弹窗关闭
    handleCancel = () => {
        this.setState({
            loading: false,
            dataList: { data: [], total: 0 },
        });
        this.props.onCancel();
    }

    render() {
        const { 
            trialFreightVisible,
        } = this.props;
        const {
            loading,
            pageSize,
            pageNumber,
            dataList,
        } = this.state;
        const paginationData = {
            pageSize,
            pageNumber,
        };
      
        return (
            <div>
                <Modal
                    {...this.props}
                    title="运费试算"
                    visible={trialFreightVisible}
                    maskClosable={false}
                    forceRender={true}
                    destroyOnClose={true}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>关闭</Button>,
                    ]}
                    onCancel={this.handleCancel}
                    className="order-negativeprofitauditlist yks-erp-search_order oms_inx"
                >
                <TrialFreightModalSearch 
                    {...this.props}
                    onSearch={this.handleSearch}
                />
                <TrialFreightModalTable 
                    {...this.props}
                    paginationData={paginationData}
                    onSearch={this.handleSearch}
                    dataList={dataList}
                    loading={loading}
                />
                </Modal>
            </div>
        );
    }
}


export default Form.create()(TrialFreightModal);
