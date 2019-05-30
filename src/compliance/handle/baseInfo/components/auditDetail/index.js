import React from 'react'
import {
  Form,
  message,
  Button,
  Col,
  Row,
  Divider,
} from 'antd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Functions from '../../../../../components/functions';
import { GET_BASEINFO_REVIEW_DETAIL, BASEINFOREVIEW, SENSITIVE } from '../../constants'
import { fetchPost } from '../../../../../util/fetch';
import { getUrlParams } from '../../../../../util/baseTool';
import Log from '../log'
import Modal2 from '../../../../../components/Modal2';

import AuditResult from './auditResult'
import ImgItem from './ImgItem'


import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

import '../../css/index.css';


class AuditDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    visible: false,
    value: 1,
    imgList: [],
    item: {},
    brandVisable: false, //商标弹窗
    copyrightVisable: false, //版权弹窗
    patentVisable: false, //专利弹窗
    platformVisable: false, //平台违禁品弹窗
    platformAuthVisable: false, //认证弹窗
    imgVisible: false, // 图片弹框
    imgIndex: undefined
  }

  componentDidMount() {
    const id = this.handleUrl(this.props.location.search)
    fetchPost(GET_BASEINFO_REVIEW_DETAIL, { id }, 2).then(res => {
      if (res && res.state === "000001") {
        this.setState({
          item: res.data,
          imgList: res.data.img
        })
      } else {
        message.error(res.msg)
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = getUrlParams(this.props.location.search).id;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return err
      }
      let params = {};
      switch (values.rejectType) {
        case 1:
        case 3:
          params = values;
          break;
        case 2:
          let reason = [];
          let flag = false;
          for (let i = 0; i < values.reason.length; i++) {
            if (i === 3) continue;
            let data = values.reason[i];
            if (data.reasonId) {
              flag = true;
              if (!data.remarks || /^\s+?/.test(data.remarks)) {
                return message.warning("敏感原因不能为空")
              }
              reason.push({
                reasonId: i + 1,
                remarks: data.remarks
              })
            }
          }
          if (!flag) {
            return message.warning("敏感原因不能为空")
          }
          let gitSite = {}
          if (this.state.disableinfoRef) {
            gitSite = this.state.disableinfoRef.getData();
          }
          params = {
            ...values,
            reason,
            ...gitSite
          }
          break;
      }
      params.id = id;
      fetchPost(BASEINFOREVIEW, params, 2).then(res => {
        if (res && res.state === '000001') {
          message.success(res.msg)
          this.goBack()
        }
      })
    });

  }
  getRef = (a) => this.setState({ disableinfoRef: a })
  getSensitiveDisableInfoTable = (name, arr) => {
    return fetchPost(SENSITIVE, { [name]: arr }, 2)
  }

  handleUrl = (url) => {
    const query = url.substring(1, url.length)
    return query.split('=')[1]
  }

  goBack = () => {
    const { history } = this.props;
    history.go(-1)
  }

  rowBaseInfoItem = (name, value) => (
    <Row className='detail-col'>
      <Col span={8}>{name}</Col>
      <Col span={16}>{value}</Col>
    </Row>
  )

  showModal = () => {
    this.setState({ visible: true })
  }
  cancelModal = () => {
    this.setState({ visible: false })
  }

  render() {
    const { rowBaseInfoItem } = this;
    const { item, imgList } = this.state
    const imgs = imgList.map(v => ({ src: v.imgUrl, alt: v.imgName }))
    const id = this.handleUrl(this.props.location.search)
    const html = { __html: item.productDesc }
    return (
      <Functions {...this.props} isPage={true} functionkey="007-000004-000002-000001-001">
        <div className="breadcrumb padding-sm-top padding-sm-bottom overflow-hidden data-baseinfo-detail">
          <Form>
            <Row gutter={48}>
              <Col span={16}>
                <span className='data-baseinfo-detail-title'>产品描述</span>
                <Divider />
                <div dangerouslySetInnerHTML={html}></div>
                <span className='data-baseinfo-detail-title'>图片</span>
                {
                  imgList.map((v, index) => {
                    return (
                      <ImgItem click={() => {
                        let i = index;
                        this.setState({ imgVisible: true, imgIndex: i })
                      }} img={v} index={index} key={index} form={this.props.form} />
                    )
                  })
                }
                <span className='data-baseinfo-detail-title'>审核结果</span>
                <AuditResult
                  id={id}
                  getRef={this.getRef}
                  {...this.props} item={item}
                  getSensitiveDisableInfoTable={this.getSensitiveDisableInfoTable}
                />
              </Col>
              <Col span={8}>
                <span className='data-baseinfo-detail-title'>基本信息</span>
                <Divider />
                {rowBaseInfoItem('SKU', item.sku)}
                {rowBaseInfoItem('SPU', item.spu)}
                {rowBaseInfoItem('所属分类', item.category)}
                {rowBaseInfoItem('产品中文名称', item.productChinessName)}
                {rowBaseInfoItem('知产速卖通英文标题', item.aliExpressTitle)}
              </Col>
            </Row>
            <div className="margin-sm-top baseinfo-detail_btns">
              {
                item.isChecked ? (
                  <Functions {...this.props} functionkey="007-000004-000002-004">
                    <Button className="margin-ms-left" type="primary" onClick={this.showModal}>审核日志</Button>
                  </Functions>
                ) : null
              }
              <Button className="margin-ms-left" onClick={this.handleSubmit} >保存</Button>
              <Button className="margin-ms-left" onClick={this.goBack}>取消</Button>
            </div>
          </Form>
          <Modal2
            width='969px'
            component={(<Log ref="form" item={{ id, sku: item.sku }} />)}
            title='日志'
            visible={this.state.visible}
            footer={null}
            handleCancel={this.cancelModal}
          />
          <Viewer
            visible={this.state.imgVisible}
            activeIndex={this.state.imgIndex || 0}
            onClose={() => { this.setState({ imgVisible: false }); }}
            images={imgs}
            drag={false}
          // noNavbar={true} // 是否隐藏底部图库
          // noToolbar={true} // 是否隐藏底部工具栏
          />
        </div>
      </Functions>
    )
  }
}

export default Form.create()(AuditDetail);