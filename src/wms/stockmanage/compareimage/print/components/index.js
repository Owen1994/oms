import React from 'react';
import {
    Button,
    Form,
} from 'antd';
import '../css/index.css';
import { getUrlParams } from '../../../../../util/baseTool';
// import { createSkuPrintContent } from '../../../../common/util/printUtils';


/**
 * 打印SKU(废弃)
 */
class App extends React.Component {
    componentDidMount() {
        const urlParams = getUrlParams('');
        const printLabels = urlParams.printLabels.split(',');

        this.props.queryPartList({
            data: {
                ...urlParams,
                printLabels,
            },
        });
    }


    render() {
        // const { part } = this.props;
        // const number = part.number || '';
        return (
            <div>
                <div className="breadcrumb padding-sm ">
                    <div className="print" ref={ref => this.skuRef = ref}>
                        {
                            // createSkuPrintContent(part.printInfoArr, number)
                        }
                    </div>
                </div>
                <div className="wms-compareimage-print-bottom">
                    <Button
                        type="primary"
                        // onClick={() => {.
                        //     printDiv(this.skuRef, 100, 105);
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
