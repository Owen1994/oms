/**
 *  作者：陈文春
 *  描述：系统设置 - 库容管理 - 储位管理
 *  时间：2019年1月15日11:58:14
 */
import React from 'react';
import {
    Form,
} from 'antd';
import '../../css/index.css';
import '../../../../common/css/index.css';
import Search from './Search';
import Tablelist from './Tablelist';
import AddModal from './AddModal';
import EditModal from './EditModal';
import UpLoadFileModal from '../../../../common/components/modal/UpLoadFileModal';
import { IMPORT_PLACE_MANAGE } from '../../constants/Api';

class StoragePlace extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
        addModalVisible: false,
        importModalVisible: false,
        editModalVisible: false,
        record: '',
    }

    componentDidMount() {
        this.handleSubmit();
    }

    // 请求仓储异常数据列表
    handleSubmit = (page = 1, pageSize = 50) => {
        const filter = this.props.form.getFieldsValue();
        filter.pageNumber = page;
        filter.pageData = pageSize;
        // filter.warehouseCode = filter.warehouseCode ? filter.warehouseCode[0] : '';
        // filter.storageType = filter.storageType ? filter.storageType[0] : '';
        // filter.goodShelvesNumber = filter.goodShelvesNumber ? filter.goodShelvesNumber : '';
        this.setState({
            pageNumber: page,
            pageData: pageSize,
        });
        this.props.queryStoragePlaceList({ data: filter });
    };

    openModal = (type, record) => {
        switch (type) {
        case '1':
            this.setState({ addModalVisible: true });
            break;
        case '2':
            this.setState({ importModalVisible: true });
            break;
        case '3':
            this.setState({ editModalVisible: true, record });
            break;
        default:
            break;
        }
    }

    closeModal = (type) => {
        switch (type) {
        case '1':
            this.setState({ addModalVisible: false });
            break;
        case '2':
            this.setState({ importModalVisible: false });
            break;
        case '3':
            this.setState({ editModalVisible: false });
            break;
        default:
            break;
        }
    }

    render() {
        const {
            pageData,
            pageNumber,
            addModalVisible,
            importModalVisible,
            editModalVisible,
            record,
        } = this.state;
        return (
            <div>
                <Search
                    {...this.props}
                    handleSubmit={this.handleSubmit}
                />
                <Tablelist
                    {...this.props}
                    pageData={pageData}
                    pageNumber={pageNumber}
                    handleSubmit={this.handleSubmit}
                    openModal={this.openModal}
                />
                <AddModal
                    visible={addModalVisible}
                    closeModal={this.closeModal}
                    handleSubmit={this.handleSubmit}
                />
                {/* <ImportModal */}
                {/* visible={importModalVisible} */}
                {/* closeModal={this.closeModal} */}
                {/* handleSubmit={this.handleSubmit} */}
                {/* /> */}
                <UpLoadFileModal
                    sumbitSuccess={() => this.handleSubmit()}
                    downLoadUrl="https://erp.youkeshu.com/download/wms/001.csv"
                    closeModal={this.closeModal}
                    width={550}
                    submitUrl={IMPORT_PLACE_MANAGE}
                    visible={importModalVisible}
                    title=" 批量导入"
                    hint="xls文件中一次上传的数量最好不要超过1000，文件大小最好不要超过500K"
                />
                <EditModal
                    visible={editModalVisible}
                    closeModal={this.closeModal}
                    record={record}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default Form.create()(StoragePlace);
