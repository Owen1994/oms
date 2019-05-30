import React from 'react';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import PropType from 'prop-types';

export default class CGallery extends React.Component {
    state = {
        visible: false,
    }

    componentDidMount() {
        const imgs = this.props.imgs;
        if (imgs && Array.isArray(imgs) && imgs.length > 0) {
            this.setState({visible: true});
        }
    }

    componentWillReceiveProps(nextProps) {
        const imgs  = this.props.imgs;
        const cImgs = nextProps.imgs;
        if (imgs !== cImgs && cImgs && Array.isArray(cImgs)) {
            this.setState({visible: true});
        }
    }

    handleClose = () => {
        this.setState({
            visible: false,
        });
        this.props.handleClose();
    }

    render(){
        const imgs    = this.props.imgs;
        const visible = this.state.visible;
        return (
            <div>
                <Viewer
                    visible={visible}
                    onClose={this.handleClose}
                    images={imgs}
                    drag={false}
                    // noNavbar={true} // 是否隐藏底部图库
                    // noToolbar={true} // 是否隐藏底部工具栏
                    {...this.props}
                />
            </div>
        )
    }
}

CGallery.propType = {
    imgs: PropType.array,
}