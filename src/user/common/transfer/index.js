/**
 *
 *@param isKeep         当源数据更新时，是否保存已选择数据，默认false
 *@param getData        左右切换时触发的回调，参数为 已选择值的数组
 *@param defualtValues  设置默认选中值，传入包含值对象的数组
 * 其余 参数参考 antd 的 Transfer 组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
    Transfer,
} from 'antd';

class TransferComponent extends React.Component {
    defaultfill = 'key'

    state = {
        targetKeys: [],
        dataSource: [],
        exclude: ['onChange', 'targetKeys', 'dataSource', 'rowKey', 'selectedKeys', 'isKeep', 'getData', 'defualtValues', 'clearData'],
    }

    componentWillMount() {
        this.init(this.props);
    }

    init = (props) => {
        const {
            dataSource, rowKey, targetKeys, defualtValues, getData, clearData,
        } = props;
        const obj = {
            dataSource,
        };
        if (!rowKey) {
            const defualtKeys = [];
            dataSource.forEach((v, k) => {
                if (defualtValues && defualtValues.includes(v)) {
                    defualtKeys.push(k);
                }
                v[this.defaultfill] = k;
            });
            obj.targetKeys = defualtKeys || [];
            getData(defualtValues);
        } else {
            obj.targetKeys = targetKeys || [];
        }
        if (clearData) {
            clearData(this.clearData);
        }
        this.setState(obj);
    }

    changeSource = (source) => {
        const { isKeep, rowKey } = this.props;
        const { targetKeys, dataSource } = this.state;
        const selectKey = [];
        if (!rowKey) {
            source.forEach((v, k) => {
                v[this.defaultfill] = k;
            });
        }
        if (!isKeep) {
            this.setState({
                dataSource: source,
                targetKeys: selectKey,
            });
        } else {
            const old = [];
            let sourceDate = [];
            for (let l = dataSource.length, i = l - 1; i >= 0; i--) {
                for (var len = targetKeys.length, k = len - 1; k >= 0; k--) {
                    if (dataSource[i][this.defaultfill] === targetKeys[k]) {
                        old.unshift(dataSource[i]);
                        break;
                    }
                }
                if (old.length === len) break;
            }
            old.forEach((v, k) => {
                let key;
                if (!rowKey) {
                    v[this.defaultfill] = key = `old_${k}`;
                } else {
                    key = v[this.defaultfill];
                }
                selectKey.push(key);
            });
            sourceDate = this.distinct(old, source);
            this.setState({
                dataSource: sourceDate,
                targetKeys: selectKey,
            });
        }
    }

    // 当isKeep 为 true 时， 清除数据
    clearData = () => {
        if (!this.props.isKeep) return;
        this.setState({
            dataSource: [],
            targetKeys: [],
        });
    }

    // 去重
    distinct = (old, source) => {
        old.forEach((v) => {
            const l = source.length;
            for (let i = l - 1; i >= 0; i--) {
                if (this.isEqualtoObject(v, source[i])) {
                    source.splice(i, 1);
                    break;
                }
            }
        });
        return [...old, ...source];
    }

    isEqualtoObject = (o, l, f = true) => {
        Object.keys(o).forEach((v) => {
            if (v === 'key') return;
            if (typeof o[v] === 'object') {
                if (!this.isEqualtoObject(o[v], l[v])) {
                    l = false;
                }
            } else if (o[v] != l[v]) l = false;
        });
        return l;
    }

    setKey = (dataSource, decorate = '') => {
        dataSource.forEach((v, k) => {
            v[this.defaultfill] = decorate + k;
        });
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        const { onChange, getData } = this.props;
        if (onChange) {
            onChange(nextTargetKeys, direction, moveKeys);
        }
        if (getData) {
            const data = this.getData(nextTargetKeys);
            getData(data);
        }
        this.setState({
            targetKeys: nextTargetKeys,
        });
    }

    getProps = () => {
        const obj = {};
        const p = this.props;
        const exclude = this.state.exclude;
        for (const k in p) {
            if (!exclude.includes(k)) {
                obj[k] = p[k];
            }
        }
        const { rowKey } = p;
        if (rowKey) {
            obj.rowKey = p.rowKey;
        } else {
            obj.rowKey = row => row[this.defaultfill];
        }
        return obj;
    }

    getData = (keys) => {
        const { dataSource } = this.state;
        const data = [];
        for (let l = dataSource.length, i = l - 1; i >= 0; i--) {
            for (var len = keys.length, k = len - 1; k >= 0; k--) {
                if (dataSource[i][this.defaultfill] === keys[k]) {
                    data.unshift(dataSource[i]);
                    break;
                }
            }
            if (data.length === len) break;
        }
        return data;
    }

    componentWillReceiveProps(next) {
        const props = this.props;
        if (next.dataSource !== props.dataSource || next.dataSource.length !== props.dataSource.length) {
            this.changeSource(next.dataSource);
        }
        if (next.defualtValues !== props.defualtValues) {
            this.init(next);
        }
    }

    render() {
        const state = this.state;
        const params = this.getProps();
        return (
            <Transfer
                {...params}
                dataSource={state.dataSource}
                targetKeys={state.targetKeys}
                onChange={this.handleChange}
            />
        );
    }
}

TransferComponent.propTypes = {
    dataSource: PropTypes.array.isRequired,
};
export default TransferComponent;
