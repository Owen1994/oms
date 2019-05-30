import React from 'react';
import { Form } from 'antd';
import { fetchPost } from '../../../../util/fetch';
import Treelist from '../Treelist/tree';
import { GET_TAG_LIST } from '../../../email/list/constants';
import './index.css';

class MoveToTag extends React.Component {
    state = {
        taglist: [],
    }

    componentDidMount() {
        this.fetchTagList();
    }

    fetchTagList = () => {
        const { platformId, form, emailDate } = this.props;
        const emailTime = form.getFieldValue('emailTime') || emailDate;
        const startTime = emailTime[0].unix();
        const endTime = emailTime[1].unix();
        fetchPost(GET_TAG_LIST, { platformId, isShowBuyerEmailTag: 1, emailTime: [startTime, endTime] }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        taglist: data.data,
                    });
                } else {
                    this.setState({
                        taglist: [],
                    });
                }
            });
    }

    render() {
        const {
            taglist,
        } = this.state;
        return (
            <div className="move-to-tag">
                {taglist.length <= 0
                    ? <p>暂无数据</p>
                    : (
                        <Treelist
                            {...this.props}
                            treeData={taglist}
                            onSelect={this.props.onSelect}
                            isDefaultExpandFirst={false}
                        />
                    )
                }
            </div>
        );
    }
}
export default Form.create()(MoveToTag);
