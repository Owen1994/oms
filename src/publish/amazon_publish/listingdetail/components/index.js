import React from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'
import {
    Tabs,
    Form,
    Row,
    Col
} from 'antd'
import Head from './head';

const TabPane = Tabs.TabPane;
import Functions from '@/components/functions'
import { getUrlParams } from '@/util/baseTool'
import BasicInfo from './basicInfo'
import SkuInfo from './skuInfo'
import DetailInfo from './detailInfo'
import MoreSkuInfo from './moreSkuInfo'
import ImgInfo from './imgInfo'
import Right from './right'
import Footer from './footer'
import '../css/css.css'

const style = {
    paddingBottom: {
        paddingBottom: '70px'
    }
}

class App extends React.Component {

    state = {
    }

    componentDidMount() {
        // 获取浏览器url参数
        const { getDetialAsync, location } = this.props;
        const { listingStatus, id } = getUrlParams(location.search);
        getDetialAsync({
            data: { listingStatus: Number(listingStatus), id: Number(id) }
        })
    }
    componentWillUnmount() {
    }

    render() {
        const data = this.props.detial;
        const { form, publishAsync, history } = this.props;
        const {
            basicInfo = {},
            detailInfo = {},
            imgInfo = [],
            skuInfo = {},
            varSkuInfo = {},
        } = data;
        const {
            listingType = 1,
            asinSite = "",
            id = "",
        } = basicInfo
        return (
            <div className="position-relative" style={style.paddingBottom}>
                <div className="amazon-listing-detail">
                    <BasicInfo basicInfo={basicInfo} form={form} />
                    {
                        listingType === 1 ? <SkuInfo skuInfo={skuInfo} form={form} /> : <MoreSkuInfo data={varSkuInfo} form={form} />
                    }
                    <DetailInfo detailInfo={detailInfo} form={form} />
                    <Head id="imgInfo" title="图片信息" className="margin-ms-top">
                        <ImgInfo imgInfo={imgInfo} field="imgInfo" form={form} />
                    </Head>
                </div>
                <Right />
                <Footer publishAsync={publishAsync} history={history} data={data} form={form} />
            </div>
        )
    }
}

export default Form.create()(App)
