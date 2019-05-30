import React from 'react'
import { Input } from 'antd'

class ImgItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { img, index,click } = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='detail-imgdiv'>
        <img className="pointer" onClick={click} width='121' height='106' src={img.imgUrl} />
        {
          getFieldDecorator(`img[${index}][imgUrl]`, {
            initialValue: img.imgUrl
          })(<Input type="hidden" />)
        }
        <span className='detail-img-title'>{img.imageName}</span>
        {
          !img.isReviewed ?
            getFieldDecorator(`img[${index}][imgDesc]`, {
              initialValue: img.imgDesc
            })(
              <Input className='detail-img-text' maxLength={200} />
            )
            :
            getFieldDecorator(`img[${index}][imgDesc]`, {
              initialValue: img.imgDesc
            })(null)
        }
      </div>
    )
  }
}

export default ImgItem