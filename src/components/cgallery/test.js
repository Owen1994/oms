import React from 'react';
import CGallery from './index';
import { Button } from 'antd';

const imgs = [
    { src: 'http://img1.imgtn.bdimg.com/it/u=3578433611,813539652&fm=200&gp=0.jpg', alt: '' },
    { src: 'http://img5.imgtn.bdimg.com/it/u=1255578998,3790178605&fm=200&gp=0.jpg', alt: '' },
    { src: 'http://img3.imgtn.bdimg.com/it/u=3312934875,2804907568&fm=200&gp=0.jpg', alt: '' },
    { src: 'http://img4.imgtn.bdimg.com/it/u=4071160538,153608450&fm=200&gp=0.jpg', alt: '' },
    { src: 'http://img1.imgtn.bdimg.com/it/u=2383095176,3466787019&fm=200&gp=0.jpg', alt: '' },
    { src: 'http://img2.imgtn.bdimg.com/it/u=486627089,4156560301&fm=200&gp=0.jpg', alt: '' },
    { src: 'http://img0.imgtn.bdimg.com/it/u=557692291,2357795549&fm=26&gp=0.jpg', alt: '' },
]
export default class Gallery extends React.Component {
    state = {
        imgs: undefined,
    }

    handleClose = () => {
        this.setState({
            imgs: undefined,
        });
    }

    handleShowImg = () => {
        this.setState({
            imgs,
        })
    }

    render() {
        return (
            <div>
                <h1>Gallery图库</h1>
                <div>
                    <Button type="primary" onClick={this.handleShowImg}>显示/隐藏</Button>
                </div>
                <CGallery
                    handleClose={this.handleClose}
                    images={imgs}
                />
            </div>
        )
    }
}