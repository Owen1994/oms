import React from 'react';
import Search from './Search';
import { Form } from 'antd';
import { filterParams } from '../../../../../util/baseTool';
import Tablelist from './Tablelist_user';
class User extends React.Component {
    state = {
        page: 1,
        pageSize: 20
    }
    handleSearch = (page = 1, pageSize = 20) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filters = filterParams(values);
                filters.pageNumber = page;
                filters.pageData = pageSize;
                this.setState({
                    page,
                    pageSize
                })
                this.props.list_fetch1(filters);
            }
        });
    }

    componentDidMount() {
        this.handleSearch();
    }
    render(){
        return (
            <div>
                <Search 
                    {...this.props}
                    onChangeName={this.handleChangeName}
                    onSearch={this.handleSearch}
                />
                <Tablelist
                    {...this.state}
                    {...this.props}
                    onSearch={this.handleSearch}
                />
            </div>
        )
    }
}

export default Form.create()(User)