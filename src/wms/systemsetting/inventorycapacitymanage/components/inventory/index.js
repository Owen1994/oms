/**
 *  作者：陈文春
 *  描述：系统设置 - 库容管理 - 储位库存设置
 *  时间：2019年1月15日11:58:14
 */
import React from 'react';
import {
    Form,
} from 'antd';
import '../../css/index.css';
import '../../../../common/css/index.css';
import SearchComponent from './Search';
import Tablelist from './Tablelist';
import AddModal from './AddModal';
// import ImportModal from './ImportModal';
import { filterInventoryParams } from '../../selectors/inventory';
import UpLoadFileModal from '../../../../common/components/modal/UpLoadFileModal';
// import { CREATE_TASK_ORDER, DOWNLOAD_URL } from '../../../../outboundmanage/pickingtask/indexs/constants/Api';
import { IMPORT_SP_CAPACITY } from '../../constants/Api';

class Inventory extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
        addModalVisible: false,
        importModalVisible: false,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    // 请求仓储异常数据列表
    handleSubmit = (page = 1, pageSize = 50) => {
        const filters = this.props.form.getFieldsValue();
        const filter = filterInventoryParams(filters);
        filter.pageNumber = page;
        filter.pageData = pageSize;
        this.setState({
            pageNumber: page,
            pageData: pageSize,
        });
        this.props.queryInventoryList({ data: filter });
    };

    openModal = (type) => {
        switch (type) {
        case '1':
            this.setState({ addModalVisible: true });
            break;
        case '2':
            this.setState({ importModalVisible: true });
            break;
        default:
            break;
        }
    };

    closeModal = (type) => {
        switch (type) {
        case '1':
            this.setState({ addModalVisible: false });
            break;
        case '2':
            this.setState({ importModalVisible: false });
            break;
        default:
            break;
        }
    };

    render() {
        const {
            pageData,
            pageNumber,
            addModalVisible,
            importModalVisible,
        } = this.state;
        return (
            <div>
                <SearchComponent
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
                    downLoadUrl="https://erp.youkeshu.com/download/wms/stock_template.csv"
                    closeModal={this.closeModal}
                    width={550}
                    submitUrl={IMPORT_SP_CAPACITY}
                    visible={importModalVisible}
                    title="批量导入"
                    hint="xls文件中一次上传的数量最好不要超过1000，文件大小最好不要超过500K"
                />
            </div>
        );
    }
}

export default Form.create()(Inventory);
