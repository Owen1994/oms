import React, { Component } from 'react';
import {
    Form,
    Button,
    Table,
    Pagination,
    Row,
    Col,
} from 'antd';
import Modalmodel from './Modalmodel';
import '../css/css.css';
import { datasaddkey } from '../../../../util/baseTool';


const FormItem = Form.Item;
class Tablelist extends Component {
    // 表头
    columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            width: 60,
        },
        {
            title: '子系统',
            dataIndex: 'sysName',
            width: 60,
        },
        {
            title: '模块',
            dataIndex: 'moduleName',
            width: 100,
        },
        {
            title: '权限名称',
            dataIndex: 'funcDesc',
            width: 120,
            render: (text, record, index) => {
                if (text) {
                    text = JSON.parse(text);
                    if (text) {
                        return text.join(' ，');
                    }
                }
            },
        }];

    componentDidMount() {

    }

    // ----自定义方法----

    currentChange = (current, pageSize) => {
        this.setState({
            pagenum: Number(current),
        });
        this.Paginatihandle(current, pageSize);
    }

    Paginatihandle = (current, pageSize = 20) => {
        const newobj = { pageNumber: current, pageData: pageSize, userName: this.props.Infos.userName };
        this.props.fetchPosts({
            key: 'data',
            value: newobj,
        });
        this.props.tablemodelaction({ selectedRowKeys: [] });
        this.props.menudataaction({ pageCache: { ...this.props.menuInfos.pageCache, [`${location.pathname}${location.search}`]: newobj } });
    }

    deletetablelist = (record, index) => () => {

    }

    ModalhandleOk= () => {


    }

    ModalhandleCancel = value => () => {

    }

    handleSubmit = () => {
        alert('点击了我');
    }

    onSelectChange = () => {

    }

    render() {
        const columns = this.columns;
        const { data } = this.props.tablemodel;
        const newdata = datasaddkey(data.lst || []);
        const buttons = (
            <Row type="flex" justify="end">
                <FormItem>
                    <Col span={6}>
                        <Button
                            className="margin-md-left"
                            onClick={this.handleSubmit}
                            disabled
                        >
                            导出
                        </Button>
                    </Col>
                </FormItem>
            </Row>
        );

        return (
            <div className="newCluenk">
                <div className="title tabTitle">
                    {buttons}
                </div>
                <div className="content">
                    {/* <Spin tip="Loading...">
                            <Table columns={columns} dataSource={[1,2]} bordered
                                pagination={false} />
                        </Spin> */}
                    <Table
                        columns={columns}
                        dataSource={newdata}
                        bordered
                        pagination={false}
                    />
                    <Pagination
                        showTotal={total => `共 ${total} 条`} // 用于显示数据总量和当前数据顺序
                        pageSizeOptions={['20', '30', '40', '50']} // 指定每页可以显示多少条
                        showSizeChanger // 是否可以改变 pageSize
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        current={this.props.Paginationmodel.current} // 当前页数
                        onShowSizeChange={this.Paginatihandle} // pageSize 变化的回调
                        total={this.props.Paginationmodel.total} // 数据总数
                        pageSize={this.props.Paginationmodel.pageSize} // 每页条数
                        onChange={this.currentChange} // 页码改变的回调，参数是改变后的页码及每页条数
                    />
                </div>
                <Modalmodel
                    {...{
                        ...this.props.modalmodel,
                        visible: false,
                        ModalText: '确认删除吗?',
                    }}
                    onOk={this.ModalhandleOk}
                    onCancel={this.ModalhandleCancel('visible2')}
                />
            </div>
        );
    }
}

export default Tablelist;
