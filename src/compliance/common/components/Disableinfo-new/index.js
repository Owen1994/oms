import React, { Component } from 'react';
import { Form, Button, Icon, Row, Col, message } from 'antd';
import { getSensitiveLayer } from '../../../common/constants';
import { getPlatform, getSite } from '../../../common/request';
import { distinct } from '../../../../util/baseTool'
import Sensitivelayer from "./sensitivelayer"
import './index.css'
const FormItem = Form.Item;


class App extends Component {
    state = {
        list: [
            // {
            //     key: 0,
            //     lineUid: 1,
            //     list: [0],
            // },
            // {
            //     key: 1,
            //     lineUid: 2,
            //     list: [0, 2]
            // }
        ]
    }

    uid = 0

    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
    };
    // 更新队列，用于设置值
    updateQueue = []
    // 缓存
    manualCache = {
        platformList: []
    }
    // 仓库
    store = {
        sensitiveLayer: {},
        platform: {},
        site: {},
    }
    // 控制器
    control = {
        controlSensitiveLayer: (value, key) => {
            const { sensitiveLayer } = this.store
            Object.keys(sensitiveLayer).forEach(v => {
                if (sensitiveLayer[v] === key) {
                    delete sensitiveLayer[v]
                }
            })
            sensitiveLayer[value] = key
            this.setState({})
        },
        removeSensitiveLayer: (key) => {
            const { sensitiveLayer } = this.store
            Object.keys(sensitiveLayer).forEach(v => {
                if (sensitiveLayer[v] === key) {
                    delete sensitiveLayer[v]
                }
            })
        },
        controlPlatform: (value, key, index) => {
            const { platform } = this.store;
            let platformControl;
            if (platform[key]) {
                platformControl = platform[key]
            } else {
                platformControl = platform[key] = {}
            }
            Object.keys(platformControl).forEach(v => {
                if (platformControl[v] === index) {
                    delete platformControl[v]
                }
            })
            platformControl[value] = index
            this.setState({})
        },
        removePlatform: (key, index) => {
            const { platform } = this.store;
            const data = platform[key];
            if (!data) return;
            Object.keys(data).forEach(v => {
                if (data[v] === index) {
                    delete data[v]
                }
            })
        },
        controlSite: (value, platform, key) => {
            const { site } = this.store;
            const { manualCache } = this;
            let siteControl;
            if (site[platform]) {
                siteControl = site[platform]
            } else {
                siteControl = site[platform] = {}
            }
            Object.keys(siteControl).forEach(v => {
                if (siteControl[v] === key) {
                    delete siteControl[v]
                }
            })
            if (siteControl.isAll === undefined) {
                Object.defineProperty(siteControl, "isAll", {
                    "value": false,
                    enumerable: false,
                    configurable: true,
                    writable: true
                })
            }

            if (value && value.length) {
                if (value.includes('_all')) {
                    let list = manualCache[platform];
                    list.forEach(v => {
                        siteControl[v.id] = key
                    })
                    siteControl.isAll = true;
                } else {
                    value.forEach(v => {
                        siteControl[v] = key
                    })
                    siteControl.isAll = false;
                }
            } else {
                siteControl.isAll = false;
            }
            this.setState({})
        },
        removeSite: (platform, key) => {
            const { site } = this.store;
            const data = site[platform];
            if (!data) return;
            Object.keys(data).forEach(v => {
                if (data[v] === key) {
                    delete data[v]
                    if (v === "_all") {
                        data.isAll = false;
                    }
                }
            })
        },
    }

    sensitiveLayerListData = getSensitiveLayer.slice(1).map(v => {
        return {
            id: v.id,
            name: v.name
        }
    })

    findListObj = (key) => {
        const { list } = this.state
        return list.find(v => v && v.key == key) || -1;
    }
    // 新增一列
    addLine = (key) => {
        const obj = this.findListObj(key);
        if (obj === -1) return obj;
        obj.lineUid++;
        obj.list.push(obj.lineUid)
        this.setState({})
        return obj.lineUid
    }
    // 新增一项
    addItem = () => {
        this.uid++;
        this.state.list.push({
            key: this.uid,
            lineUid: 0,
            list: [0],
        })
        this.setState({})
        return this.uid
    }
    removeLine = (key, lineKey, platform) => {
        const { removePlatform, removeSite } = this.control;
        const obj = this.findListObj(key);
        if (obj === -1) return;
        const index = obj.list.indexOf(lineKey);
        if (index === -1) return;
        obj.list.splice(index, 1)
        removePlatform(key, lineKey)
        if (platform) {
            removeSite(platform, key)
        }
        this.setState({})
    }
    removeItem = (key, lineKey, platform) => {
        const { removeSensitiveLayer, removePlatform, removeSite } = this.control;
        const { list } = this.state;
        const obj = this.findListObj(key);
        if (obj === -1) return;
        const index = list.indexOf(obj)
        if (index === -1) return;
        list.splice(index, 1)
        removeSensitiveLayer(key)
        removePlatform(key, lineKey)
        if (platform) {
            removeSite(platform, key)
        }
        this.setState({})
    }

    // 这数据结构让人头大
    mergeDisableInfo = (list) => {
        const { isEmpty, control } = this;
        const { mode } = this.props
        const { controlSensitiveLayer, controlPlatform, controlSite } = control
        const { getFieldsValue } = this.props.form;
        let params = {}
        const data = getFieldsValue();
        let { platform = [], sensitiveLayer = [], site = [] } = data;
        if (mode === "replace") {
            this.clearStore()
            this.state.list = this.state.list.map(v => null)
            platform = []
            sensitiveLayer = []
            site = []
        } else {
            for (let i = sensitiveLayer.length - 1; i >= 0; i--) {
                if (isEmpty(sensitiveLayer[i]) && isEmpty(platform[i])) {
                    this.removeItem(i, 0)
                }
            }
        }

        const value = this.formatList(list);
        Object.keys(value).forEach(v => {
            const data = value[v];
            let key = sensitiveLayer.indexOf(v);
            if (key !== -1) {
                Object.keys(data).forEach(val => {
                    const newsite = data[val];
                    let linekey = platform[key].indexOf(val);
                    if (linekey !== -1) {
                        const address = site[key][linekey];
                        var set = new Set([...address, ...newsite]);
                        const items = this.formatSite(Array.from(set), platform[key][linekey], key)
                        params[`site[${key}][${linekey}]`] = items
                        controlSite(items, val, key)
                    } else {
                        linekey = this.addLine(key);
                        if (linekey === -1) return;
                        params[`platform[${key}][${linekey}]`] = val
                        controlPlatform(value, key, linekey)
                        const items = this.formatSite(data[val], val, key)
                        params[`site[${key}][${linekey}]`] = items
                        controlSite(items, val, key)
                        if (!this.manualCache[val]) {
                            this.getSite(val)
                        }
                    }
                })
            } else {
                key = this.addItem();
                params[`sensitiveLayer[${key}]`] = v
                controlSensitiveLayer(v, key)
                Object.keys(data).forEach((value, k) => {
                    let linekey = 0;
                    if (k !== 0) {
                        linekey = this.addLine(key)
                    }
                    if (linekey === -1) {
                        linekey = k
                    }
                    params[`platform[${key}][${linekey}]`] = value
                    controlPlatform(value, key, linekey)
                    const items = this.formatSite(data[value], value, key)
                    params[`site[${key}][${linekey}]`] = items
                    controlSite(items, value, key)
                    if (!this.manualCache[value]) {
                        this.getSite(value)
                    }
                })
            }
        })
        // this.setState({}, () => setFieldsValue(params))
        this.updateQueue.push(params)
    }

    formatSite = (site, platform, key) => {
        let store = this.store.site[platform];
        if (!store) {
            store = this.store.site[platform] = {};
        }
        return site.filter(v => {
            return v && (!store[v] || store[v] == key)
        })
    }

    isEmpty = (a) => {
        if (!a) {
            return true
        }
        if (Array.isArray(a)) {
            const str = a.toString()
            if (!str || /^,+$/.test(str)) return true
        }
    }

    formatList = (list) => {
        // const obj = {
        //   "1": {
        //     22:[1231,123]
        //   }
        // }
        const obj = {}
        list.forEach(v => {
            let key = v.sensitiveLayer.key;
            this.distinct(v.sensitiveLayer.platformSite)
            let platformSite = obj[key] = {}
            Object.defineProperty(platformSite, "__origin", {
                "value": v,
                enumerable: false,
                writeable: true,
                configurable: true
            })
            Object.defineProperty(platformSite, "__structure", {
                "value": [String(key), [], []],
                enumerable: false,
                writeable: true,
                configurable: true
            })
            v.sensitiveLayer.platformSite.forEach(val => {
                let key = val.platform.key;
                let orgSite = val.site;
                let site = platformSite[key] = [];
                platformSite.__structure[1].push(String(key))
                platformSite.__structure[2].push(site)
                Object.defineProperty(site, "__origin", {
                    "value": val,
                    enumerable: false,
                    writeable: true,
                    configurable: true
                })
                if (Array.isArray(orgSite)) {
                    orgSite.forEach(value => {
                        if (value.key && !site.includes(value.key)) {
                            site.push(value.key)
                        }
                    })
                }
            })
        })
        return obj
    }

    distinct = (platformSite) => {
        platformSite.forEach(v => {
            const list = distinct(v.site, "key")
            v.site = list.map(val => {
                val.key = val.key + ''
                return val
            })
        })

    }
    // 设置默认项
    setDfaultItem = () => {
        const { defaultItem } = this.props;
        if (typeof defaultItem != "number" || defaultItem < 0) return;
        for (let i = 0; i < defaultItem; i++) {
            this.addItem()
        }
    }
    addAll = ['22', '24', '26']
    getSite = (key) => {
        if (this.manualCache[key]) {
            return Promise.resolve(this.manualCache[key])
        } else {
            return getSite({
                platformId: key
            }).then((result) => {
                result = result.map(v => ({ id: v.id.toString(), name: v.name }))
                if (this.addAll.includes(key)) {
                    result.unshift({ id: "_all", name: "ALL" })
                }
                this.manualCache[key] = result
                this.setState({})
                return result
            });
        }
    }

    componentDidMount() {
        const { setValue, getRef } = this.props;
        getRef && getRef(this)
        if (setValue && Array.isArray(setValue) && setValue.length) {
            this.mergeDisableInfo(setValue)
        } else {
            this.setDfaultItem()
        }
        getPlatform().then(reuslt => {
            this.manualCache.platformList = reuslt.map(v => ({ id: v.id.toString(), name: v.name })) || [];
            this.setState({})
        })

    }

    componentWillReceiveProps(next) {
        if (next.setValue && next.setValue.length && next.setValue !== this.props.setValue) {
            this.mergeDisableInfo(next.setValue)
        }
    }

    componentDidUpdate() {
        const { setFieldsValue } = this.props.form;
        if (this.updateQueue.length) {
            this.updateQueue.forEach(v => {
                setFieldsValue(v)
            })
            this.updateQueue = []
        }
    }

    replaceMode = () => {
        this.store = {
            sensitiveLayer: {},
            platform: {},
            site: {},
        }
    }

    clearStore = () => {
        this.store = {
            sensitiveLayer: {},
            platform: {},
            site: {},
        }
    }

    componentDidUnMount() {
        this.props.getRef && this.props.getRef(null)
        this.state.list = []
        this.manualCache = {
            platformList: []
        }
        this.clearStore()
        this.uid = 0
    }

    getData = () => {
        const { manualCache } = this;
        const { getFieldsValue } = this.props.form;
        const value = this.filterParams(getFieldsValue())
        if (!value.site || !value.platform || !value.sensitiveLayer) {
            message.warning("敏感信息为必填")
            throw 0
        }
        value.site = value.site.map((v, key) => {
            return v.map((val, index) => {
                if (val.includes("_all")) {
                    return manualCache[value.platform[key][index]].slice(1).map(v => v.id)
                } else {
                    return val
                }
            })
        })
        return value
    }

    filterParams = (params) => {
        let { platform, sensitiveLayer, site } = params;
        sensitiveLayer = sensitiveLayer && sensitiveLayer.filter(v => v)
        platform = platform && platform.filter(v => v).map(v => {
            return v && v.filter(value => value)
        })
        site = site && site.filter(v => v).map(v => {
            return v && v.filter(value => value)
        })
        return { platform, sensitiveLayer, site }
    }

    render() {
        const { form, getRef } = this.props;
        const { list } = this.state;
        const {
            sensitiveLayerListData,
            addItem,
            addLine,
            removeLine,
            removeItem,
            manualCache,
            getSite,
            control,
            store
        } = this;
        return (
            <Row >
                <Col className="disableinfo-title" span={4}>
                    <label className="ant-form-item-required">禁售信息：</label>
                </Col>
                <Col span={20}>
                    {
                        list.map(v => {
                            if (!v) return null;
                            return <Sensitivelayer
                                store={store}
                                control={control}
                                sensitiveLayerListData={sensitiveLayerListData}
                                manualCache={manualCache}
                                getSite={getSite}
                                addLine={addLine}
                                removeLine={removeLine}
                                removeItem={removeItem}
                                key={v.key.toString()}
                                form={form}
                                data={v}
                            />
                        })
                    }
                    <Button className="margin-sm-bottom" onClick={addItem} icon="plus" type="dashed" style={{ width: '515px' }}>新增敏感等级</Button>
                </Col>
            </Row>
        );
    }
}
export default App;