import React from 'react'
import {
  Radio,
  Input,
  Row,
  Form,
  Checkbox,
  Col,
  Modal,
  message,
  Button
} from 'antd'

import Disableinfo from '../../../../common/components/Disableinfo-new'
// import Disableinfo from '../../../../common/components/Disableinfo'
import Modal2 from '../../../../../components/Modal2';
import SensitivelyModal from './Modal/SensitivelyModal'
import CopyrightModal from './Modal/CopyrightModal'
import AuthenticationModal from './Modal/AuthenticationModal'
import PatentModal from './Modal/PatentModal'
import ProhibitedModdal from './Modal/ProhibitedModdal'
import { distinct } from '../../../../../util/baseTool'
const RadioGroup = Radio.Group;
const FormItem = Form.Item
const { TextArea } = Input;
const confirm = Modal.confirm;

const itemCheck = [
  {
    // 当前项
    id: 0,
    // 当前项弹窗名称
    name: '商标',
    // 选择项 state 存储名称
    sgin: 'brandVisable',
    // 请求 禁售信息字段名称
    eng: 'sensitiveId',
    // 获取id 对应的字段
    uid: "id"
  },

  {
    id: 1,
    name: '专利',
    sgin: 'patentVisable',
    eng: 'patentId',
    uid: "id"
  },
  {
    id: 2,
    name: '版权',
    sgin: 'copyrightVisable',
    eng: 'versionId',
    uid: "versionId"
  },
  {
    id: 3,
    // name: '平台认证',
    // sgin: 'platformAuthVisable',
    // eng: 'authenticationId',
    // uid: "platformAuthenticationId"
  },
  {
    id: 4,
    name: '平台违禁品',
    sgin: 'platformVisable',
    eng: 'contraband',
    uid: "platformContrabandId"
  },
]

class AuditResult extends React.Component {
  state = {
    // 标识审核结果
    value: 1,
    // 标识敏感原因
    index: null,
    title: "商标",
    // 弹窗控制
    visible: false,
    //商标列表
    brandVisable: {
      checked: false,
      list: []
    },
    //版权列表
    copyrightVisable: {
      checked: false,
      list: []
    },
    //专利列表
    patentVisable: {
      checked: false,
      list: []
    },
    //平台违禁品列表
    platformVisable: {
      checked: false,
      list: []
    },
    //认证列表
    platformAuthVisable: {
      checked: false,
      list: []
    },
    // 用于设置 Disableinfo ；我不服气
    disableInfo: [],
    isAudited:null
  }



  setValue = (list, index) => {
    const { setFieldsValue } = this.props.form;
    let strArr = list.map(v => {
      switch (index) {
        case 0:
          // 商标词：xiaomi，商标号：224252，权利人：qwrrq，注册国家：us,de，参考图片：url
          return `商标词：${v.sensitive || '--'}，商标号：${v.trademarkNumber || '--'}，权利人：${v.obligee || '--'}，注册国家：${v.country || '--'}，参考图片：${v.img || '--'}`
        case 2:
          // 版权号：123，权利人：25252
          return `版权号：${v.version || '--'}，权利人：${v.obligee || '--'}`;
        case 1:
          // 专利号：3143，权利人：2425，注册国家：US。
          return `专利号：${v.patentNumber || '--'}，权利人：${v.obligee || '--'}，注册国家：${v.registerCountry || '--'}`
        case 4:
          // 中文违禁品名：电子烟
          return `中文违禁品名：${v.chineseContraband || '--'}`
        case 3:
          // 认证名称：电子烟，认证项目：qrqwr
          return `认证名称：${v.chineseName || '--'}，认证项目：${v.authenticationProject || '--'}`
        default:
          return ""
      }
    })
    const value = strArr.join('/');
    setFieldsValue({
      [`reason[${index}.remarks]`]: value
    })
  }



  getTitle = (index) => {
    if (index === null) return "";
    const data = itemCheck.find(v => v.id === index);
    return data.name || ""
  }

  checkboxHandle = (e, index, sgin) => {
    const value = e.target.checked;
    if (value) {
      this.setState({
        index,
        visible: true
      })
    } else {
      confirm({
        maskClosable: true,
        title: '确定要取消当前选项吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.props.form.setFieldsValue({
            [`reason[${index}.remarks]`]: undefined
          })
          this.setState({
            [sgin]: {
              checked: false,
              list: []
            }
          })
        },
        onCancel: () => { }
      });
    }
  }

  sensitiveContent = () => {
    const { disableInfo } = this.state;
    return (
      <div className="handle-baseInfo-sensitivity">
        {
          this.createSensitiveItem()
        }
        <Disableinfo
          defaultItem={1}
          getRef ={this.props.getRef}
          form={this.props.form}
          setValue={disableInfo}
        />
      </div>
    )
  }

  showRadioContent = () => {
    const { value } = this.state
    switch (value) {
      case 2:
        return this.sensitiveContent(this.props);
      case 3:
        return this.turndownContent(this.props);
      default:
        return null
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      index: null
    })
  }

  clearTag2 = () => {
    this.setState({
      brandVisable: {
        checked: false,
        list: []
      },
      //版权列表
      copyrightVisable: {
        checked: false,
        list: []
      },
      //专利列表
      patentVisable: {
        checked: false,
        list: []
      },
      //平台违禁品列表
      platformVisable: {
        checked: false,
        list: []
      },
      //认证列表
      platformAuthVisable: {
        checked: false,
        list: []
      },
      disableInfo: []
    })
  }
  clearTag3 = () => {
  }



  onRadioGroupChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case 1:
        this.clearTag2();
        this.clearTag3();
        break;
      case 2:
        this.clearTag3();
        break;
      case 3:
        this.clearTag2();
        break;
    }
    this.setState({ value })
  }

  handleOk = () => {
    const { index } = this.state
    const { getSensitiveDisableInfoTable } = this.props
    const { setFieldsValue } = this.props.form;
    const list = this.refs.form.checkedList;
    const { sgin, uid, eng } = itemCheck[index];
    if (list && list.length) {
      this.setState({
        [sgin]: {
          checked: true,
          list: list
        },
      }, () => {
        this.setValue(list, index)
      })
      getSensitiveDisableInfoTable(eng, list.map(v => v[uid]))
        .then(result => {
          const { data, state } = result
          if (state === '000001') {
            if (data && data.length) {
              this.setState({
                disableInfo: data
              })
            }
          }
        })
      setFieldsValue({
        [`reason[${index}.reasonId]`]: true
      })
    } else {
      setFieldsValue({
        [`reason[${index}.reasonId]`]: false
      })
      message.warning("未选择项，不会保存")
    }
    this.handleCancel()
  }

  componentWillReceiveProps(next) {
    const item = next.item;
    if (item !== this.props.item) {
      const { disableInfo, reason } = item;
      const setState = {
        isAudited:item.isAudited,
        value: item.rejectType,
        // 标识敏感原因
        index: null,
      }
      if (disableInfo && Array.isArray(disableInfo) && disableInfo.length) {
        setState.disableInfo = disableInfo
      }
      this.setState(setState, () => {
        if (item.rejectType == 2) {
          if (reason && Array.isArray(reason) && reason.length) {
            this.setReason(reason)
          }
        }
      })

    }
  }

  setReason = (list) => {
    const { setFieldsValue } = this.props.form;
    const setState = {}
    const setParams = {}
    for (let i = 0; i < list.length; i++) {
      let index = Number(list[i].id) - 1;
      const name = itemCheck[index].sgin;
      setState[name] = {
        checked: true,
        list: []
      }
      setParams[`reason[${index}.remarks]`] = list[i].remarks
      setParams[`reason[${index}.reasonId]`] = true

    }
    this.setState(setState)
    setFieldsValue(setParams)

  }

  getModalContent = (index) => {
    switch (index) {
      case 0:
        return <SensitivelyModal ref="form" list={this.state.list} />;
      case 1:
        return <PatentModal ref="form" list={this.state.list} />;
      case 2:
        return <CopyrightModal ref="form" list={this.state.list} />;
      case 3:
        return <AuthenticationModal ref="form" list={this.state.list} />;
      case 4:
        return <ProhibitedModdal ref="form" list={this.state.list} />;

      default:
        return null;
    }
  }

  createSensitiveItem = () => {
    return (
      <Row type="flex" className="mb15">
        <Col className="audit-result-left">
          <span className="ant-form-item-required">敏感原因:</span>
        </Col>
        <Col span={20} className="audit-result-right">
          {
            itemCheck.map((v, index) => {
              if (v.id === 3) return null;
              const data = this.state[v.sgin]
              return (
                <Row className="mb15" key={index} type="flex" align="middle">
                  <Col span={5} className="audit-result-right-label">
                    <FormItem>
                      {
                        this.props.form.getFieldDecorator(`reason[${v.id}.reasonId]`)(
                          <Checkbox
                            checked={data.checked}
                            onChange={e => this.checkboxHandle(e, v.id, v.sgin)}
                          >{v.name}</Checkbox>
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col span={14}>
                    {

                      this.getSensitiveDetail(index, v.sgin)
                      // <TextArea rows={1} style={{ width: "100%" }} placeholder="详细描述" />
                      // <Input placeholder={'详细描述'} />
                    }
                  </Col>
                </Row>
              )
            })
          }
        </Col>
      </Row>

    )
  }

  turndownContent = (props) => {
    const { getFieldDecorator } = props.form
    return (
      <Row type="flex">
        <Col className="audit-result-left margin-ss-top">
          <span className='ant-form-item-required'>驳回原因:</span>
        </Col>
        <Col span={20}>
          <FormItem>
            {
              getFieldDecorator('rejectReason', {
                rules: [{
                  required: true,
                  message: '驳回原因必填!',
                }]
              })(
                <TextArea rows={4} maxLength="500" style={{ width: "100%" }} placeholder="详细描述" />
              )
            }
          </FormItem>
        </Col>
      </Row>
    )
  }

  getSensitiveDetail = (index, name) => {
    return <FormItem>
      {
        this.props.form.getFieldDecorator(`reason[${index}.remarks]`)(
          <TextArea autosize={{ minRows: 2, maxRows: 6 }} style={{ width: "100%" }} placeholder="详细描述" />
        )
      }
    </FormItem>
  }

  render() {
    const { value, index, visible } = this.state
    const { item } = this.props;
    return (
      <div className='baseinfo-detail-result'>
        <FormItem>
          {
            this.props.form.getFieldDecorator('rejectType', {
              initialValue: item.isAudited ? value : undefined
            })(
              <RadioGroup onChange={this.onRadioGroupChange}>
                <Radio value={1}>不敏感</Radio>
                <Radio value={2}>敏感</Radio>
                <Radio value={3}>驳回</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        {
          this.showRadioContent()
        }
        <Modal2
          width='1000px'
          component={this.getModalContent(index)}
          title={this.getTitle(index)}
          visible={visible}
          handleCancel={() => {
            const { index } = this.state;
            this.props.form.setFieldsValue({
              [`reason[${index}.reasonId]`]: false
            })
            this.handleCancel()
          }}
          handleOk={this.handleOk}
        />
      </div>
    )
  }
}

export default AuditResult
