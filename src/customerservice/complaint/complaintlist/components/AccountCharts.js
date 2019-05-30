import React from 'react';
import echarts from 'echarts';

export default class AccountItem extends React.Component {
    componentDidMount() {
        const { levelData } = this.props;
        this.getChartData(levelData);
    }

    componentWillReceiveProps(nextProps) {
        const serviceData = this.props.accountData.levelData;
        const nextServiceData = nextProps.accountData.levelData;
        if (JSON.stringify(nextServiceData) !== JSON.stringify(serviceData)) {
            this.getChartData(nextServiceData);
        }
    }

    // 获取图表数据
    getChartData = (levelData) => {
        const myChart = echarts.init(document.getElementById('account-chart-container'));
        const dateData = levelData.curList.map(item => item.date);
        const curData = levelData.curList.map(item => item.score);
        const lastData = levelData.lastList.map(item => item.score);
        const curAver = levelData.curList.map(() => levelData.predict_avg_score);
        const lastAver = levelData.curList.map(() => levelData.avg_score);
        const yData = [
            {
                name: '上个月服务分',
                type: 'line',
                data: lastData,
            },
            {
                name: '当月服务分',
                type: 'line',
                data: curData,
            },
            {
                name: '上个月服务分平均值',
                type: 'line',
                data: lastAver,
            },
            {
                name: '当月服务分平均值',
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                },
                data: curAver,
            },
        ];
        myChart.setOption({
            // title: {
            //     text: '每日服务分'
            // },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['上个月服务分', '当月服务分', '上个月服务分平均值', '当月服务分平均值'],
            },
            xAxis: {
                type: 'category',
                name: '日期',
                boundaryGap: false,
                data: dateData,
            },
            yAxis: {
                type: 'value',
                name: '每日服务分',
            },
            series: yData,
        });
    }

    render() {
        const { levelData } = this.props;
        return (
            <div>
                <div className="account-behaviour-item">
                    <div className="add-label">下月等级预估</div>
                    <div className="add-content">
                        <div>
                            <span>当月服务分均值({`${levelData.predict_start_date}-${levelData.predict_end_date}`})：{levelData.predict_avg_score}</span>
                            <span className="account-seperate">|</span>
                            <span>下月等级预估：{levelData.predict_level_desc}</span>
                        </div>
                        <div id="account-chart-container" />
                    </div>
                </div>
            </div>
        );
    }
}
