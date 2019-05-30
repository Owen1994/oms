import React from 'react';
import {
    Form,
} from 'antd';
import '../css/index.css';
import '../../../common/css/index.css';
import Functions from '../../../../components/functions';
import Search from './Search';
import Tablelist from './Tablelist';
import AddModal from './AddModal';
import BodyModal from './BodyModal';
import WarehouseModal from './WarehouseModal';

class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
        addModalVisible: false,
        warehouseModalVisible: false,
        bodyModalVisible: false,
        groupKey: '',
        bodyTitle: '',
    }

    componentDidMount() {
        this.handleSubmit();
    }

    openModal = (type, record) => {
        if (type === '1') {
            this.setState({ addModalVisible: true });
        } else if (type === '2') {
            this.setState({
                warehouseModalVisible: true,
                groupKey: record.key,
            });
        } else if (type === '3') {
            this.setState({
                bodyModalVisible: true,
                groupKey: record.key,
                bodyTitle: record.name,
            });
        }
    }

    closeModal = () => {
        this.setState({
            addModalVisible: false,
            warehouseModalVisible: false,
            bodyModalVisible: false,
            groupKey: '',
            bodyTitle: '',
        });
        this.props.clearBodyItem(); // 清空主体窗口reducer数据
        this.props.clearWarehouseItem(); // 清空仓库项窗口reducer数据
    }

    // 请求仓储异常数据列表
    handleSubmit = (page = 1, pageSize = 50) => {
        const filter = this.props.form.getFieldsValue();
        filter.pageNumber = page;
        filter.pageData = pageSize;
        // filter.searchCode = filter.searchCode ? filter.searchCode[0] : '';
        this.setState({
            pageNumber: page,
            pageData: pageSize,
        });
        this.props.queryBaseList({ data: filter });
    };

    render() {
        const {
            pageData,
            pageNumber,
            addModalVisible,
            warehouseModalVisible,
            bodyModalVisible,
            groupKey,
            bodyTitle,
        } = this.state;
        const {
            bodymodaldata,
            warehousemodaldata,
            // 主体项
            addBodyItem,
            delBodyItem,
            editBodyItem,
            modifyBodyItem,
            saveBodyItem,
            initBodyItem,
            clearBodyItem,
            // 仓库项
            addWarehouseItem,
            delWarehouseItem,
            editWarehouseItem,
            modifyWarehouseItem,
            saveWarehouseItem,
            initWarehouseItem,
            clearWarehouseItem,
        } = this.props;
        return (
            <Functions {...this.props} isPage functionkey="012-000005-000002-001">
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
                    <BodyModal
                        visible={bodyModalVisible}
                        closeModal={this.closeModal}
                        bodymodaldata={bodymodaldata}
                        addBodyItem={addBodyItem}
                        delBodyItem={delBodyItem}
                        editBodyItem={editBodyItem}
                        modifyBodyItem={modifyBodyItem}
                        saveBodyItem={saveBodyItem}
                        initBodyItem={initBodyItem}
                        clearBodyItem={clearBodyItem}
                        groupKey={groupKey}
                        bodyTitle={bodyTitle}
                    />
                    <WarehouseModal
                        visible={warehouseModalVisible}
                        closeModal={this.closeModal}
                        warehousemodaldata={warehousemodaldata}
                        addWarehouseItem={addWarehouseItem}
                        delWarehouseItem={delWarehouseItem}
                        editWarehouseItem={editWarehouseItem}
                        modifyWarehouseItem={modifyWarehouseItem}
                        saveWarehouseItem={saveWarehouseItem}
                        initWarehouseItem={initWarehouseItem}
                        clearWarehouseItem={clearWarehouseItem}
                        groupKey={groupKey}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
