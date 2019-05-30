import React from 'react';
// import { Form } from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { popUpImage, angentPicUrl } from '@/util/baseTool';

class GoodsInfo extends React.Component {
    state = {
        data: {},
    }

    componentDidMount() {
        this.getInfo({
            platformId: this.props.platformId,
            productId: this.props.selectedOrderNumber,
        });
    }

    componentWillReceiveProps(next) {
        if (next.selectedOrderNumber !== this.props.selectedOrderNumber) {
            this.getInfo({
                platformId: next.platformId,
                productId: next.selectedOrderNumber,
            });
        }
    }

    getInfo = params => fetchPost('/customerServiceSystem/index/api/CustomerComplaints/getProductInfo', params)
        .then((result) => {
            if (result.state === '000001') {
                this.setState({
                    data: result.data,
                });
                return result.data;
            }
        })

    render() {
        const { data } = this.state;
        const isEmpty = !data.name && !data.pic;
        return (
            <div className="order-detail">
                <div className="order-info">
                    <div className="info-capture">
                        <p>商品信息</p>
                    </div>
                    <div className="chatbox-pd15">
                        {
                            isEmpty ? <div>暂无信息</div> : (
                                <div className="info-content">
                                    <div className="label" onClick={() => popUpImage(angentPicUrl(data.pic), true)}>
                                        <img style={{ width: '100%' }} src={angentPicUrl(data.pic)} alt="" />
                                    </div>
                                    <div>{data.name}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default GoodsInfo;
