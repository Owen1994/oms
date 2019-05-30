import React from 'react';
import { Form, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';

import Tabplatform from '../../../common/components/Tabplatflat';
import Treelist from '../../../common/components/Treelist';
import MainRight from './MainRight';
import Modal2 from '../../../../components/Modal2';
import Languages from './Languages';
import AddTemp from './AddTemp';
import TempDetail from './TempDetail';
import { page } from '../../../../constants';
import { filterRequest } from '../../../../utils';
import { getPlatformList, getTempClassList } from '../../../common/request';
import { MESSAGE_TEMP_ADD_OR_EDIT } from '../constants';
import { strTrim } from '../../../../util/baseTool';
import { fetchPost } from '../../../../util/fetch';

/**
 * 作者: yangbo
 * 功能描述: 模板管理组件容器
 * 时间: 2018/9/12 15:55
 */

/**
 * 查找模板数据最内层的数据
 */
const findInnerKey = (treeData) => {
    if (treeData[0].children && treeData[0].children.length !== 0) {
        return findInnerKey(treeData[0].children);
    }
    return treeData[0].key;
};

const findInnerTitle = (treeData) => {
    if (treeData[0].children && treeData[0].children.length !== 0) {
        return findInnerTitle(treeData[0].children);
    }
    return treeData[0].title;
};

class App extends React.Component {
    state = {
        tagValue: {
            tempState: [0],
            tempType: [0],
        },
        item: {}, // 操作项该项的数据
        platform: [], // 平台请求的数据
        treeData: [],
        languagesVisible: false,
        addTempVisible: false,
        tempDetailVisible: false,
        tempModalTitle: '',
        addBtnShow: false,
        platformLabel: '', // 平台的label值
        platformKey: '', // 平台的key值
        tempClass: '', // 模板分类值
        tempClassId: '', // 模板分类id
        addtempConfirmLoading: false,
    }

    addTempRef = React.createRef();

    componentDidMount() {
        getPlatformList({ commonStatus: 1 }).then((result) => {
            if (result.length > 0) {
                this.setState({
                    platform: result,
                    platformLabel: result[0].label,
                    platformKey: `${result[0].key}`,
                });
                this.taglistFetch(result[0].key);
            } else {
                message.error('暂无平台数据');
            }
        });
    }

    // 模板标签数据请求
    taglistFetch = (platformId) => {
        getTempClassList({ platformId }).then((result) => {
            const data = result.data;
            this.setState({
                treeData: data,
                tempClass: data.length ? findInnerTitle(data, 'title') : '',
                tempClassId: data.length ? findInnerKey(data, 'key') : null,
                addBtnShow: !!(data.length && data[0].children && data[0].children[0].children),
            });
            this.listFetch();
        });
    }

    /**
     * 请求列表
     * @param <Number> pageNumber 页码
     * @param <Number> pageData 每页条数
     */
    listFetch = (pageNumber, pageData) => {
        const { tagValue } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const platformId = values.platformId;
                const filter = filterRequest(values);
                filter.pageNumber = pageNumber || page.defaultCurrent;
                filter.pageData = pageData || page.defaultPageSize;
                filter.platformId = platformId;
                const filters = { ...tagValue, ...filter };
                this.setState({
                    tagValue: filters,
                });
                this.props.listFetch({ name: 'data', value: filter });
            }
        });
    };

    /**
     * 弹框
     * @param <String> name   弹窗visible状态
     * @param <Boolean> bool   弹窗开启状态
     * @param <Array> item   某一项数据
     */
    onChangeModal = (name, bool, item, tempModalTitle) => {
        this.setState({
            [name]: bool,
            item,
            tempModalTitle,
        });
    };

    /**
     * 模板树节点点击回调
     * @param <String> selectedKeys  点击激活项的key值
     * @param <String> e  封装过的事件对象
     */
    handleTreeSelect = (selectedKeys, e) => {
        let isAddBtnShow = false;
        if (!e.node.props.children && e.selected) {
            const posArr = e.node.props.pos.split('-');
            if (posArr.length >= 4) {
                isAddBtnShow = true;
            }
        }
        this.setState({
            addBtnShow: isAddBtnShow,
            tempClass: e.node.props.title.props.children[2],
            tempClassId: selectedKeys,
        });
    }

    /**
     * tab栏点击回调
     * @param <String> activeKey  tab点击激活项的key值
     */
    handleTabChange = (activeKey) => {
        const { platform } = this.state;
        const target = platform.find(ele => ele.key === +activeKey);
        this.setState({ platformLabel: target.label, platformKey: target.key });
    }

    // 添加/编辑表单提交
    onAddTempOk = () => {
        this.addTempRef.current.validateFields((err, values) => {
            const { item } = this.state;
            const { editModalData } = this.props;
            if (!err) {
                const messageArr = [];
                Object.keys(values).forEach((key) => {
                    if (/^messageInfo/.test(key)) {
                        // const messageTitle = strTrim(values[key].messageTitle);
                        const messageContent = strTrim(values[key].messageContent);
                        const languagesId = values[key].languagesId;
                        if (editModalData.length) {
                            editModalData.map((v) => {
                                if ((v.languagesId === languagesId && v.messageContent !== messageContent) || (v.languagesId === languagesId && messageContent !== '')) {
                                    messageArr.push(values[key]);
                                }
                                return true;
                            });
                        } else {
                            messageArr.push(values[key]);
                        }
                        delete values[key];
                    }
                });
                // messageArr = Array.from(new Set(messageArr))
                // if (messageArr.length === 0) {
                //     message.warning('请填写至少一项语言信息');
                //     return;
                // }
                this.setState({ addtempConfirmLoading: true });
                fetchPost(MESSAGE_TEMP_ADD_OR_EDIT, { ...values, languagesContent: messageArr, tempId: item ? item.tempId : '' }, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.setState({ addTempVisible: false });
                            this.listFetch();
                            this.addTempRef.current.resetFields();
                        }
                        this.setState({ addtempConfirmLoading: false });
                    });
            }
        });
    }

    // 表单重置
    onReset = () => {
        this.setState({
            tagValue: {
                tempState: [0],
                tempType: [0],
            },
        });
        const { resetFields, getFieldsValue, setFieldsValue } = this.props.form;
        const { platformId } = getFieldsValue(['platformId']);
        resetFields();
        setFieldsValue({
            platformId,
        });
    }

    // 表单提交
    onSubmit = (e) => {
        e.preventDefault();
        this.listFetch();
    }

    render() {
        const {
            tagValue,
            platform,
            item,
            treeData,
            languagesVisible,
            addTempVisible,
            tempDetailVisible,
            tempModalTitle,
            addBtnShow,
            platformLabel,
            platformKey,
            tempClass,
            tempClassId,
            addtempConfirmLoading,
        } = this.state;
        return (
            <div className="position-relative customer-service-main">
                {platform.length > 0
                    ? (
                        <Tabplatform
                            {...this.props}
                            listFetch={this.listFetch}
                            taglistFetch={this.taglistFetch}
                            platform={platform}
                            loading={this.props.listReducer}
                            handleTabChange={this.handleTabChange}
                            activeKey={platformKey}
                        />
                    )
                    : (
                        <div className="mail-detail">
                            <div className="breadcrumb customer-service-tab-platform">
                                <p style={{ lineHeight: '43px', paddingLeft: 15 }}>暂无数据</p>
                            </div>
                        </div>
                    )
                }
                <Treelist
                    {...this.props}
                    treeData={treeData}
                    name="tempClassId"
                    handleListFetch={this.listFetch}
                    onSelect={this.handleTreeSelect}
                />
                <MainRight
                    {...this.props}
                    listFetch={this.listFetch}
                    tagValue={tagValue}
                    addBtnShow={addBtnShow}
                    onChangeModal={this.onChangeModal}
                    onReset={this.onReset}
                    onSubmit={this.onSubmit}
                />
                {/* 语种管理 */}
                <Modal2
                    component={(<Languages {...this.props} />)}
                    title="语种管理"
                    visible={languagesVisible}
                    handleCancel={() => this.onChangeModal('languagesVisible', false)}
                    footer={null}
                    width={590}
                    className="language-control-modal"
                />
                {/* 新增/编辑模板 */}
                <Modal2
                    component={
                        (
                            <AddTemp
                                platform={platform}
                                tempClass={tempClass}
                                tempClassId={tempClassId}
                                platformKey={platformKey}
                                platformLabel={platformLabel}
                                item={item}
                                editDataAction={this.props.editDataAction}
                                ref={this.addTempRef}
                            />
                        )
                    }
                    title={tempModalTitle}
                    confirmLoading={addtempConfirmLoading}
                    visible={addTempVisible}
                    handleOk={this.onAddTempOk}
                    handleCancel={() => this.onChangeModal('addTempVisible', false)}
                    width={590}
                    className="add-edit-modal"
                />
                {/* 模板详情 */}
                <Modal2
                    component={(<TempDetail tempId={item ? item.tempId : ''} />)}
                    title="模板详情"
                    visible={tempDetailVisible}
                    handleCancel={() => this.onChangeModal('tempDetailVisible', false)}
                    footer={null}
                    width={590}
                />
            </div>
        );
    }
}

export default connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch),
)(
    Form.create()(App),
);
