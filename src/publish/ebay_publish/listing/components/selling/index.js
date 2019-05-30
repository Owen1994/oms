/**
 * 作者: pzt
 * 描述: listing 列表页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react'
import {
    Form,
} from 'antd'
import Tablelist from './tablelist'
import '../../css/css.css'
import { levelOptions } from '../../../../../util/options'
import LogModal from '../logmodals'
import EditPriceModal from './editpricemodals'
import EditStockModal from './editstockmodals'
import CopyModal from '../copymodals'
import SyncPlatformDataModal from './SyncPlatformDataModal';
import Functions from '../../../../../components/functions'

class App extends React.Component {

    state = {
        pageNumber: levelOptions("pageInit").pagenum,
        pageData: levelOptions("pageInit").pagedata,
        logModalVisible: false,
        editPriceVisible: false,
        editStockVisible: false,
        copyModalVisible: false,
        syncPlatformVisible: false,
        item: {},
        items: [],
        searchParams: {}
    }

    handleSearch = (number,data, sortInfo) => {
        const { getParams, getList,tablemodel } = this.props;
        const {
            pageData,
            pageNumber,
        } = tablemodel.params;
        let value = getParams();
        if(number){
            value.pageNumber = number
            value.pageData = data
        }else {
            value.pageNumber = pageNumber
            value.pageData = pageData
        }
        if (sortInfo && sortInfo.sortOrder && sortInfo.sortField) {
            sortInfo.sortOrder = sortInfo.sortOrder.replace(/end$/g, '');
            value = { ...value, ...sortInfo };
        }
        this.setState({
            searchParams: { ...value }
        })
        getList(value)
    }

    getParmas = () => {
        const params = this.props.getParams();
        this.setState({
            searchParams: { ...params }
        })
        return params
    }

    resetFields = () => {
        this.props.form.resetFields()
    }

    render() {
        const { tablemodel } = this.props;
        const {
            pageData,
            pageNumber,
        } = tablemodel.params;
        const {
            logModalVisible,
            editPriceVisible,
            editStockVisible,
            copyModalVisible,
            syncPlatformVisible,
            item,
            items,
        } = this.state
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000001-000001-013">
                <div>
                    <div className="ebay-listing_table">
                        <Tablelist
                            {...this.props}
                            getParmas={this.getParmas}
                            onSearch={this.handleSearch}
                            pageData={pageData}
                            pageNumber={pageNumber}
                            showModal={(type, key, value) => {
                                this.setState({
                                    [type]: true,
                                    [key]: value
                                })
                            }}
                        />
                    </div>
                    <LogModal
                        item={item}
                        visible={logModalVisible}
                        onCancel={() => this.setState({ logModalVisible: false })}
                    />
                    <EditPriceModal
                        onSearch={this.handleSearch}
                        items={items}
                        visible={editPriceVisible}
                        onCancel={() => this.setState({ editPriceVisible: false })}
                    />
                    <EditStockModal
                        onSearch={this.handleSearch}
                        items={items}
                        visible={editStockVisible}
                        onCancel={() => this.setState({ editStockVisible: false })}
                    />
                    <CopyModal
                        onSearch={this.handleSearch}
                        getParmas={this.getParmas}                        
                        items={items}
                        state={3}
                        visible={copyModalVisible}
                        onCancel={() => this.setState({ copyModalVisible: false })}
                        // searchColumn={searchParams}
                        total={this.props.sellingData.total}
                        allItems={this.props.sellingData.lst}
                    />
                    <SyncPlatformDataModal 
                        visible={syncPlatformVisible}
                        onCancel={() => this.setState({ syncPlatformVisible: false })}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
