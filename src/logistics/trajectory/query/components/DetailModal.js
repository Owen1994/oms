import React from 'react';
import { Modal, Steps, Button, Spin } from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { DETAIL_DATA } from '../constants/Api';
const Step = Steps.Step;

export default class DetailModal extends React.Component {
    state = {
        loading: false,
        data: undefined,
    }

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const item    = nextProps.item;
        const preVisible = this.props.visible;
        if (visible && !preVisible && item) {
            this.setState({loading: true});
            fetchPost(DETAIL_DATA, {data:{ key: item.key}}, 2).then((result) => {
                this.setState({loading: false});
                if (result.state === '000001') {
                    let arrLink = [];
                    if (result.data) {
                        if (result.data.link) {
                            arrLink  = result.data.link.split(',');
                            result.data.arrLink = arrLink;
                        } else {
                            result.data.arrLink = arrLink;
                        }
                    }
                    this.setState({
                        data: result.data,
                    });
                }
            });
        }
    }

    handleCancel = () => {
        this.setState({
            loading: false,
            data: undefined,
        });
        this.props.onCancel();
    }

    render() {
        const { loading, data } = this.state;
        const {
            visible,
        } = this.props;
        const sTelNumber = data ? data.phone : '';
        const showTelNumber = sTelNumber.length !== 0 ? (
            <div className="lgt-query-trajectory-query_label_wrap">
                <span className="lgt-query-trajectory-query_label">物流商电话号码:</span>
                <span className="lgt-query-trajectory-query_value">{data.phone}</span>
            </div>
        ) : null;

        const arrLink = data ? data.arrLink : [];
        const showLink = arrLink.length !== 0 ? (
                <div className="lgt-query-trajectory-query_label_wrap">
                    <span className="lgt-query-trajectory-query_label" >物流商官网链接:</span>
                    {
                        arrLink.map(t => (
                            <a className="margin-ss-left" href={t} target="_blank">{t}</a>)
                        )
                    }
                </div>
        ) : null;

        return (
            <Modal
                title="查看物流详情"
                width={600}
                high={600}
                visible={visible}
                footer={null}
                destroyOnClose
                onCancel={this.handleCancel}
            >
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <div>
                        {
                            (data&&data.trajectorys) ?
                            <Steps className="query-detail-modal" progressDot current={0} size="small" direction="vertical" labelPlacement>
                                {
                                    data.trajectorys.map((item,index) => <Step title={item} key={index}/>)
                                }
                            </Steps>
                            :
                            <div>无</div>
                        }
                        {
                            data ?
                            <div>
                                {showTelNumber}
                                {showLink}
                            </div>
                            :
                            null
                        }
                    </div>
                </Spin>
                <div className="margin-ss-top clear">
                    <Button onClick={this.handleCancel} className="pull-right ">
                        <span>取消</span>
                    </Button>
                </div>
            </Modal>
        )
    }
}
