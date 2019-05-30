import React from 'react';
import { Modal, Tree, Input, Form, Spin } from 'antd';
import { fetchPost } from '@/util/fetch';
import CTree from '@/components/ctree';
import { GET_PLATFORM_DATALIST } from '../constants/Api';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class LogisticsEntrySetModal extends React.PureComponent {
    
    state = {
        loadingState: false,
        searchValue: '',
        list: [],
        selectPlatformList: []
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.visible && !this.props.visible) {
            this.loadData(nextProps.data);
        }
    }

    loadData = (data) => {
        this.setState({loadingState: true});
        fetchPost(GET_PLATFORM_DATALIST, { entityCode: "E_Logistics" }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({list: result.data}, () => {
                        setTimeout(() => {
                            this.props.form.setFieldsValue({platforms: data});
                        }, 1000);
                    });
                }
                this.setState({loadingState: false});
            });
    }

    handleChange = (selectPlatformList) => {
        this.setState({selectPlatformList});
    }

    // onChange = (e) => {
    //     const value = e.target.value;
    //     this.setState({
    //         searchValue: value,
    //     });
    // }

    handleOk = () => {
        const formData = {...this.props.form.getFieldsValue()};
        const result = formData.platforms.map((item) => {
                            const newItem = {};
                            newItem.platformId = item.platformId;
                            newItem.platformName = item.platformName;
                            return newItem;
                        });
        this.props.onOk(result);
    }

    render() {
        const {
            onCancel,
            title,
            visible,
        } = this.props;
        const { list, loadingState } = this.state;
        let classNames = 'platformSite';
        let width = 800;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const platforms = getFieldValue('platforms');
        if (platforms) {
            classNames += ' platformSite-display-list';
            width = 960;
        }
        return (
            <Modal
                style={{ maxHeight: '1000px' }}
                width={`${width}px`}
                onOk={this.handleOk}
                onCancel={onCancel}
                title={title}
                visible={visible}
                destroyOnClose
            >
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <div>
                        {/* <Search
                            style={{ marginBottom: 8, width: 300 }}
                            placeholder="Search"
                            onChange={this.onChange}
                        /> */}
                            <div className={classNames}>
                                <div className="platformSite-left">
                                    <p>可选平台</p>
                                    <div style={{ height: 400, overflowY: 'auto' }}>
                                        {getFieldDecorator('platforms', {
                                            initialValue: []
                                        })(
                                            <CTree
                                                code="platformId"
                                                name="platformName"
                                                list={list}
                                                formType={1}
                                                handleChange={this.handleChange}
                                            />
                                        )}
                                    </div>
                                </div>
                                {
                                    platforms && platforms.length
                                        ? (
                                            <div className="platformSite-right">
                                                <p>已选平台</p>
                                                <div style={{ height: 400, overflowY: 'auto' }}>
                                                    <div className="platformSite-right-containe">
                                                        <Tree showLine>
                                                            {
                                                                platforms.map(v => (
                                                                    <TreeNode title={v.platformName} key={v.platformId}>
                                                                    </TreeNode>
                                                                ))
                                                            }
                                                        </Tree>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                }
                            </div>
                        </div>
                </Spin>
            </Modal>
        );
    }
}

export default Form.create()(LogisticsEntrySetModal);
