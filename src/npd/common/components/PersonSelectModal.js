import React from 'react';
import { 
    Modal,
    Row,
    Col
 } from 'antd';
 import ItemSelect from '../../../common/components/itemSelect'
//  import { USER_LIST_API } from '../../constants/Api'
 import PropTypes from 'prop-types'

 export default class App extends React.Component {

    state = {
        item: undefined
    }
    handleChange = (item, index) => {
        this.setState({
            item
        })
    }

    render(){
        const item = this.state.item;
        const { title, labelDesc, visible, handleConfirm, url } = this.props;
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={() => handleConfirm(1, item)}
                onCancel={() => handleConfirm(-1)}
            >
                <Row gutter={8} type="flex" justify="center" align="middle">
                    <Col>
                        <label>{labelDesc}</label>
                    </Col>
                    <Col>
                        <ItemSelect 
                            url={url} 
                            code="userName"
                            onChange={this.handleChange}
                            params={{'pageData': 20, 'pageNumber': 1}}
                        />
                    </Col>
                </Row>
            </Modal>
        )
    }
 }

 App.propTypes = {
    title: PropTypes.string.isRequired,
    labelDesc: PropTypes.string.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
 }