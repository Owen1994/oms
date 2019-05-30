import React from 'react';
import { Modal, Form, Spin } from 'antd';
import CTree from '@/components/ctree';
import CCheckBox from '@/components/ccheckbox';
import { fetchPost } from '@/util/fetch';
import { GET_BASIC_DATALIST } from '../constants/Api';
import { parseBasicData } from '../selectors/statistics';

class StatisticsEntitySetModal extends React.PureComponent {
    state = {
        firstCategory: [],
        dataColumn: [],
        loadingState: true,
    }

    handleChange = (firstCategorySelect) => {
        this.setState({firstCategorySelect});
    }

    componentWillReceiveProps(nextProps) {
        const preVisible = this.props.visible;
        const visible    = nextProps.visible;
        if(visible && visible !== preVisible) {
            this.setState({loadingState: true});
            this.loadData(nextProps.data);
        }
    }

    handleOk = () => {
        const formData = {...this.props.form.getFieldsValue()};
        const dataColumn = this.state.dataColumn;
        const dataColumnSelect = formData.dataColumnSelect;
        const result = [];
        const selectValues = this.props.selectValues.get('E_StatisticsSystem');
        let preCategorySelect = [];
        if (selectValues && selectValues.operValuesArr && selectValues.operValuesArr.length > 0) {
            preCategorySelect = selectValues.operValuesArr[0].data;
        }
        let originCategorySelect = this.state.firstCategorySelect || preCategorySelect;
        result.push({
            value: 'firstCategory',
            name: '品类',
            data: originCategorySelect,
            checkedKeys: formData.firstCategorySelect
        });
        result.push({
            value: 'dataColumn',
            name: '数据列',
            data: dataColumn.map((item) => {
                const newItem = {};
                newItem.key = item.key;
                newItem.name = item.name;
                newItem.visiable = '不可见';
                if (dataColumnSelect.indexOf(item.key) >= 0) {
                    newItem.visiable = '可见';
                }
                return newItem;
            }),
            checkedKeys: formData.dataColumnSelect,
        });
        this.props.onOk(result);
    }

    loadData = (data) => {
        fetchPost(GET_BASIC_DATALIST).then(result => {
            return new Promise((resolve, reject) => {
                if (result.state === '000001') {
                    const basicData = result.data.basicData;
                    const { firstCategory, dataColumn } = parseBasicData(basicData);
                    this.setState({
                        firstCategory,
                        dataColumn,
                    }, () => {
                        setTimeout(() => {
                            if (Array.isArray(data)) {
                                data.forEach((item) => {
                                    if(item.value === 'firstCategory') {
                                        let firstCategorySelect = item.checkedKeys || [];
                                        this.props.form.setFieldsValue({firstCategorySelect});
                                    }
                                    if(item.value === 'dataColumn') {
                                        let dataColumnSelect = item.checkedKeys || [];
                                        this.props.form.setFieldsValue({dataColumnSelect});
                                    }
                                });
                            }
                            resolve();
                        }, 1000);
                    });
                    return ;
                }
                resolve();
            });
        }).then(() => {
            this.setState({loadingState: false});
        });
    }

    render() {
        const {
            onCancel,
            visible,
        } = this.props;
        const {
            firstCategory,
            dataColumn,
            loadingState,
        } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                style={{ maxHeight: '1000px' }}
                width={960}
                onOk={this.handleOk}
                onCancel={onCancel}
                title="可查看品类范围设置"
                visible={visible}
                destroyOnClose
            >
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <div>
                        <div style={{ height: 400, overflowY: 'auto' }}>
                            <div className="platformSite platformSite-display-list">
                                <div className="platformSite-left">
                                    {getFieldDecorator('firstCategorySelect', {
                                        initialValue: []
                                    })(
                                        <CTree
                                            checkAllOption={true}
                                            code="cateId"
                                            name="cateNameCn"
                                            list={firstCategory}
                                            formType={2}
                                            handleChange={this.handleChange}
                                        />
                                    )}
                                </div>
                                <div className="platformSite-right" style={{paddingLeft: 5, paddingRight: 5}}>
                                    <p>报表数据列是否可见（勾选代表可见）</p>
                                    {getFieldDecorator('dataColumnSelect', {
                                        initialValue: []
                                    })(
                                        <CCheckBox
                                            checkAllOption={true}
                                            list={dataColumn}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }
}

export default Form.create()(StatisticsEntitySetModal);
