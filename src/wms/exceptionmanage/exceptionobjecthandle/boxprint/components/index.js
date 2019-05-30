import React from 'react';
import {
    Button,
    Form,
} from 'antd';
import '../css/index.css';
import { getUrlParams } from '../../../../../util/baseTool';
import { createBoxLabel } from '../../../../common/util/printUtils';


/**
 * 打印箱唛(废弃)
 */

class App extends React.Component {
    componentDidMount() {
        const urlParams = getUrlParams('');
        const boxNumberArr = urlParams.boxNumberArr.split(',');
        this.props.queryPartList({
            data: {
                ...urlParams,
                boxNumberArr,
            },
        });
    }

    render() {
        const { part } = this.props;
        return (
            <div style={{ paddingBottom: 500 }}>
                <div>
                    <div className="breadcrumb padding-sm" style={{ width: '100%' }}>
                        <div className="print" style={{ width: 500 }} ref={ref => this.boxRef = ref}>
                            {part.list ? part.list.map(item => createBoxLabel(item, item.partNumber)) : null}
                        </div>
                    </div>

                </div>
                <div className="wms-qualitytesting-bottom">
                    <Button
                        type="primary"
                        // onClick={() => {
                        //     printDiv(this.boxRef);
                        // }}
                    >
                        打印
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    >
                        关闭
                    </Button>
                </div>
            </div>
        );
    }
}

export default Form.create()(App);
