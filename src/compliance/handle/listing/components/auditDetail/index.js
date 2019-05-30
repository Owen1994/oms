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
import { GETLISTINGIMAGEDETAIL, LISTINGIMAGEREVIEW } from '../../constants'
import { fetchPost } from '../../../../../util/fetch';
import { getUrlParams } from '../../../../../util/baseTool';
import Log from '../log'
import Modal2 from '../../../../../components/Modal2';

import ImgItem from './ImgItem'


import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';


import '../../css/index.css';


class AuditDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    value: 1,
    imgList: [],
    item: {},
    detailVisible: false,
    imgVisible: false,
    imgIndex: 0
  }

  componentDidMount() {
    const id = getUrlParams(this.props.location.search).id;
    fetchPost(GETLISTINGIMAGEDETAIL, { id }, 2).then(res => {
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
        return;
        // console.log('Received values of form: ', values);
      }
      let params = values;
      params.id = id
      fetchPost(LISTINGIMAGEREVIEW, params, 2).then(res => {
        if (res && res.state === '000001') {
          message.success(res.msg)
          this.goBack()
        } else {
          message.error(res.msg)
        }
      })
    });

  }

  goBack = () => {
    const { history } = this.props;
    history.go(-1)
  }

  showModal = () => {
    this.setState({ detailVisible: true })
  }
  cancelModal = () => {
    this.setState({ detailVisible: false })
  }

  rowBaseInfoItem = (name, value) => (
    <Row className='detail-col'>
      <Col span={8}>{name}</Col>
      <Col className="breakwrod" span={16}>{value}</Col>
    </Row>
  )

  render() {
    const { rowBaseInfoItem } = this;
    const { item, imgList } = this.state
    const id = getUrlParams(this.props.location.search).id;
    const html = { __html: item.description }
    const imgs = imgList.map(v => ({ src: v.imgUrl, alt: v.imgName }))

    return (

      <Functions {...this.props} isPage={true} functionkey="007-000004-000003-000001-001">
        <div className="breadcrumb padding-sm-top padding-sm-bottom overflow-hidden data-baseinfo-detail">
          <Form>
            <Row gutter={48}>
              <Col span={16}>
                <span className='data-baseinfo-detail-title'>产品描述</span>
                <Divider style={{ width: '80%' }} />
                <div dangerouslySetInnerHTML={html}></div>
                <span className='data-baseinfo-detail-title detail-image'>图片</span>
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
              </Col>
              <Col span={8}>
                <span className='data-baseinfo-detail-title'>基本信息</span>
                <Divider />
                {rowBaseInfoItem('Seller SKU', item.sku)}
                {rowBaseInfoItem('平台分类', item.category)}
                {rowBaseInfoItem('标题', item.title)}
              </Col>
            </Row>
            <div className="margin-sm-top baseinfo-detail_btns">
              {
                item.isChecked ? (
                  <Button className="margin-ms-left" onClick={this.showModal} type="primary">审核日志</Button>
                ) : null
              }
              <Button className="margin-ms-left" onClick={this.handleSubmit} >保存</Button>
              <Button className="margin-ms-left" onClick={this.goBack}>取消</Button>
            </div>
          </Form>
          <Modal2
            width='969px'
            component={(<Log ref="form" item={{ id }} />)}
            title='日志'
            visible={this.state.detailVisible}
            footer={null}
            handleCancel={this.cancelModal}
          />
          <Viewer
            visible={this.state.imgVisible}
            activeIndex={this.state.imgIndex}
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