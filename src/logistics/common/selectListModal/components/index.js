/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react'
import '../css/css.css'
import Condition from './Condition';
import Tablelist from './Tablelist';
import Modalmodel from '../../../../components/modalmodel/searchmodel';
import {
    Tag,
    Row,
    Col
} from 'antd'

class UserForm extends React.Component {

    formItemLayout = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    };

    handleCancel = () => () => {
        this.props.searchVluesaction({visible: false, tags: []});
    };

    closehaddle = () => {
        this.props.searchVluesaction({visible: false, tags: []});
    };

    handleOk = () => {
        this.props.searchVluesaction({visible: false});
    };

    componentWillReceiveProps(nextProps) {
        const visible    = nextProps.searchValues.visible;
        const preVisible = this.props.searchValues.visible;
        if (visible && (preVisible !== visible)) {
            const { url, key } = nextProps.searchValues;
            nextProps.searchVluesaction({ tags: [] });
            // 执行搜索请求
            this.props.fetchsearchValues({
                url,
                key
            })
        }
    }

    render() {
        const {tags, type, title, searchabled} = this.props.searchValues;
        const condition = searchabled ? <Condition {...this.props} /> : '';
        const taglist = tags ? tags.map((v, i) => {
            return <Tag key={i} closable onClose={() => {
                this.closehaddle(v.id)
            }}>{v.name}</Tag>
        }) : [];
        const newtitle = type === 'multiple' ? `请选择${title}(支持多选)` : `请选择${title}(单选)`;
        const content = <div className="searchwk">
            <div className="content">
                {condition}
                <Row>
                    <Col span={24}>
                        {taglist}
                    </Col>
                </Row>

                <Tablelist {...this.props} />
            </div>
        </div>;
        return (
            <Modalmodel  {...{
                ...this.props.searchValues,
                visible: this.props.searchValues.visible,
                title: newtitle,
                ModalContent: content,
            }}
                 onOk={this.handleOk} zIndex={9999} wrapClassName={'searchdiv'} width={550}
                 confirmLoading={this.props.searchValues.confirmLoading}
                 onCancel={this.handleCancel('visible')}/>
        );
    }
}

export default UserForm;
