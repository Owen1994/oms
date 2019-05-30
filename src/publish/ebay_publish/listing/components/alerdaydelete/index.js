/**
 * 作者: pzt
 * 描述: listing 列表页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react'
import {
    Form,
} from 'antd'
import Search from '../search'
import Tablelist from './tablelist'
import '../../css/css.css'
import {filterParams} from "../../../../../util/baseTool"
import {levelOptions} from '../../../../../util/options'
import LogModal from '../logmodals'
import Functions from '../../../../../components/functions'

class App extends React.Component {

    state = {
        pageNumber: levelOptions("pageInit").pagenum,
        pageData: levelOptions("pageInit").pagedata,
        logModalVisible: false,
        item: {}
    }

    // componentDidMount() {
    //     this.handleSearch()
    // }

    handleSearch = (
        pageNumber = levelOptions("pageInit").pagenum,
        pageData = levelOptions("pageInit").pagedata
    ) => {
        const { getParams, getList } = this.props;
        const value = getParams();
        value.pageNumber = pageNumber
        value.pageData = pageData
        getList(value)
    }

    render() {
        const { tablemodel } = this.props;
        const {
            pageData,
            pageNumber,
        } = tablemodel.params;
        const {
            logModalVisible,
            item,
        } = this.state
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000001-000001-027">
                <div>
                    <div className="ebay-listing_table">
                        <Tablelist
                            {...this.props}
                            onSearch={this.handleSearch}
                            pageData={pageData}
                            pageNumber={pageNumber}
                            showLogModal={(item) => {
                                this.setState({
                                    logModalVisible: true,
                                    item
                                })
                            }}
                        />
                    </div>
                    <LogModal
                        item={item}
                        visible={logModalVisible}
                        onCancel={() => this.setState({logModalVisible: false})}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
