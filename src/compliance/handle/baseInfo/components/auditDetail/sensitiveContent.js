import React from 'react'
import {
  Row,
  Col,
  Form
} from 'antd'
import Disableinfo from '../../../../common/components/Disableinfo';


const FormItem = Form.Item

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={24}>
        <Col span={24}>
          <FormItem>
            {getFieldDecorator('reasonId', {
            })(
              <Checkbox>商标</Checkbox>
            )}

          </FormItem>

          <Disableinfo
              {...props}
              disableInfo={state.disableInfo}
              addSensitiveLayer={addSensitiveLayer}
              addPlatformSite={addPlatformSite}
              remove={remove}
          /> 
        </Col>
      </Row>
    )
  }
}

export default Demo