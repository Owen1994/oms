/**
 * 作者: pzt
 * 描述: listing 列表页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react';
import {
    Form,
} from 'antd';
import Tablelist from './tablelist';
import '../../css/css.css';
import CopyModal from '../copymodals';
import {levelOptions} from '../../../../../util/options';
import LogModal from '../logmodals';
import Functions from '../../../../../components/functions';

class App extends React.Component {

    state = {
        pageNumber: levelOptions("pageInit").pagenum,
        pageData: levelOptions("pageInit").pagedata,
        logModalVisible: false,
        copyModalVisible: false,
        item: {},
        items: [],
    }

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
        const { tablemodel, getParams } = this.props;
        const {
            pageData,
            pageNumber,
        } = tablemodel.params;
        const {
            logModalVisible,
            item,
            items,
            copyModalVisible,
        } = this.state
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000001-000001-022">
                <div>
                    <div className="ebay-listing_table">
                        <Tablelist
                            {...this.props}
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
                        onCancel={() => this.setState({logModalVisible: false})}
                    />
                    <CopyModal
                        onSearch={this.handleSearch}
                        getParmas={getParams}
                        items={items}
                        state={4}
                        visible={copyModalVisible}
                        onCancel={() => this.setState({ copyModalVisible: false })}
                        total={this.props.tablemodel.total}
                        allItems={this.props.tablemodel.lst}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
