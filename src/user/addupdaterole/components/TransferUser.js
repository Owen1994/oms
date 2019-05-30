import React from 'react';
import { Transfer } from 'antd';
import PropTypes from 'prop-types';
import { fetchPost } from '../../../util/fetch';

export default class TransferUser extends React.Component {
    state = {
        searchKeyArray: [],
    }

    timer=null

    onsearchvalue=(direction, event) => {
        clearTimeout(this.timer);
        const value = event.target.value;
        this.timer = setTimeout(() => { this.sourceuserName(value); }, 500);
        return false;
    }

    filterOption = () => true

    handleChange = (targetKeys) => {
        const lock = this.props.lock;
        if (lock > 0 && this.props.targetKeys.length >= lock) {
            const lockItem = this.props.targetKeys[lock - 1];
            targetKeys = targetKeys.filter(item => lockItem !== item);
            targetKeys.unshift(lockItem);
        }
        this.props.handleChange(this.props.name, undefined, targetKeys);
    }

    sourceuserName= (value) => {
        const newobj = {};
        var value = value.replace(/(^\s*)|(\s*$)/g, '');
        if (value == '') {
            return false;
        }
        const { searchKeyArray } = this.state;
        const { dataSource, handleChange } = this.props;
        if (searchKeyArray.length > 0) {
            for (let i = 0; i < searchKeyArray.length; i++) {
                if (value == searchKeyArray[i]) {
                    return false;
                }
            }
        }
        const users = {
            userName: value,
        };
        newobj.user = users;

        fetchPost('/urc/motan/service/api/IUrcService/getUserByUserName', newobj)
            .then((result) => {
                if (result.state == '000001') {
                    const sercedatas = {
                        userName: result.data[0].userName,
                        key: result.data[0].userName,
                    };
                    dataSource.push(sercedatas);
                    searchKeyArray.push(value);
                    handleChange(this.props.name, [...dataSource]);
                    this.setState({
                        searchKeyArray: [...searchKeyArray],
                    });
                }
            });
    }

    render() {
        const {
            dataSource, targetKeys, showSearch, disabledValue,
        } = this.props;
        return (
            <div className={disabledValue === true ? 'transfer-disabled' : ''}>
                <Transfer
                    showSearch={showSearch}
                    dataSource={dataSource}
                    listStyle={{
                        width: 280,
                        height: 366,
                    }}
                    onSearchChange={this.onsearchvalue}
                    operations={['增加', '移除']} // 操作文案集合
                    targetKeys={targetKeys} // 设置哪些项应该被选中
                    onChange={this.handleChange}
                    filterOption={this.filterOption}
                    render={item => `${item.userName}`}
                    disabled={disabledValue}
                />
            </div>);
    }
}

TransferUser.propTypes = {
    dataSource: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    targetKeys: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    lock: PropTypes.number,
};
