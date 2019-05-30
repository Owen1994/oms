/**
 *作者: chenlin
 *功能描述: PRtable
 *时间: 2018/10/27 11:55
 */
import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入扇形
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Sector extends React.Component {

    myChart;
    componentDidMount() {
        this.myChart = echarts.init(document.getElementById('mainEchat'));
    }


    componentWillReceiveProps(nextProps) {
        const options = nextProps.options;
        this.myChart.setOption(options);
    }

    render() {
        return (
            <div className="breadcrumb margin-ms-top">
                <div className="echar">
                    <p><span>说明：</span>订单数的统计是按照订单的“付款时间”来计算。</p>
                </div>
                <div
                    id="mainEchat"
                    style={{ width: '500px', height: '500px' }}
                >

                </div>
            </div>
        );
    }
}
