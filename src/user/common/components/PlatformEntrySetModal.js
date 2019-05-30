import React from 'react';
import { Modal, Tree, Input } from 'antd';
import PropTypes from 'prop-types';
import CustomTree from '../permissions/customtree';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class PlatformEntrySetModal extends React.PureComponent {
    state = {
        searchValue: '',
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchValue: value,
        });
    }

    render() {
        const {
            onOk,
            onCancel,
            title,
            prmissionsData,
            checkedKeys = [],
            onCheck,
            visible,
            selectEntityCode,
            rightData,
        } = this.props;
        let classNames = 'platformSite';


        let width = 800;
        if (rightData) {
            classNames += ' platformSite-display-list';
            width = 960;
        }
        return (
            <Modal
                style={{ maxHeight: '1000px' }}
                width={`${width}px`}
                onOk={onOk}
                onCancel={onCancel}
                title={title}
                visible={visible}
                destroyOnClose
            >
                <div>
                    <Search
                        style={{ marginBottom: 8, width: 300 }}
                        placeholder="Search"
                        onChange={this.onChange}
                    />
                    <div style={{ height: 400, overflowY: 'auto' }}>
                        <div className={classNames}>
                            <div className="platformSite-left">
                                <p>可选账号</p>
                                <CustomTree
                                    defaultExpandedKeys={['1']}
                                    checkedKeys={checkedKeys} // 受控 选择的key
                                    onCheck={onCheck}
                                    prmissionsData={prmissionsData}
                                    visible={visible}
                                    searchValue={this.state.searchValue}
                                />
                            </div>
                            {
                                rightData && rightData.length
                                    ? selectEntityCode !== 'E_CsOrg' ? (
                                        <div className="platformSite-right">
                                            <p>已选账号</p>
                                            <div className="platformSite-right-containe">
                                                <Tree showLine>
                                                    {
                                                        rightData.map(v => (
                                                            <TreeNode title={v.platformName} key={v.platformId}>
                                                                {
                                                                    v.lstShop.map(val => <TreeNode title={val.shopName} key={val.shopId} />)
                                                                }
                                                            </TreeNode>
                                                        ))
                                                    }
                                                </Tree>
                                            </div>
                                        </div>
                                    ) : null
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
PlatformEntrySetModal.propTypes = {
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    prmissionsData: PropTypes.array.isRequired,
};
