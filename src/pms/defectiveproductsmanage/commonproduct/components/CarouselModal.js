import React from 'react'
import { 
    Modal,
    Carousel,
    Icon   
} from 'antd';


class CarouselModal extends React.Component {
    

    // 向上
    handlePrev = (obj)=>{
        if (obj === 1) {
            this.refs.basicimg.prev(); //ref = img
        } else if ( obj === 2){
            this.refs.warehouseImg.prev();
        }
    }
    // 向下
    handleNext = (obj)=>{
        if (obj === 1) {
            this.refs.basicimg.next(); //ref = img
        } else if ( obj === 2){
            this.refs.warehouseImg.next();
        }
    }
     
   
    render() {
        const { visible,item } = this.props;
        const basicsImage = item.basicsImage || [];
        const warehouseImages = item.warehouseImages || [];
        return (
            <Modal
                visible={visible}
                title={'查看图片'}
                destroyOnClose
                width={800}
                onCancel={this.props.carouselModalClose}
                maskClosable={false}
                footer={null}
            >
               <div className="defectiveproductsmanage clear">
                   <div className="basic-data">
                    <h4>基本资料图片</h4>
                    {
                        basicsImage.length === 0 ? '' : <div>
                                 <Icon type="left" theme="outlined" onClick={()=>this.handlePrev(1)} className="defectiveproductsmanage-left"/>
                                <Carousel  ref='basicimg'>
                                
                                        {
                                            basicsImage.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h3>
                                                        <img src={item}  alt="图片" onClick={()=>this.props.showImages(basicsImage)}/>
                                                        </h3>
                                                    </div>
                                                )
                                            })
                                        }
                                </Carousel>
                                <Icon type="right" theme="outlined" onClick={()=>this.handleNext(1)} className="defectiveproductsmanage-right"/>
                        </div>
                    }
                   
                    </div>
                   <div className="warehouse">
                    <h4>仓库图片</h4>
                    {
                        warehouseImages.length === 0 ? "" : <div>
                                 <Icon type="left" theme="outlined"  onClick={()=>this.handlePrev(2)} className="defectiveproductsmanage-left"/>
                                <Carousel autoplay ref='warehouseImg'>
                                
                                        {
                                            warehouseImages.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h3>
                                                        <img src={item}  alt="图片" onClick={()=>this.props.showImages(warehouseImages)}/>
                                                        </h3>
                                                    </div>
                                                )
                                            })
                                        }
                                </Carousel>
                        <Icon type="right" theme="outlined" onClick={()=>this.handleNext(2)} className="defectiveproductsmanage-right"/>
                        </div>
                    }
                   
                    </div>
               </div>
            </Modal>
        );
    }
}
export default CarouselModal;
