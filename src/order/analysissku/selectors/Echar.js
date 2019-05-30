const options = {
    color: ['#FDA055','#38CBA9','#765EE7'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['c301', 'b301', 'A301']
    },
    series: [
        {
            name: 'YKS',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            // data: [
            //     { value: 335, name: 'C301' },
            //     { value: 310, name: 'B301' },
            //     { value: 234, name: 'A301' },
            // ],
            itemStyle: {
                emphasis: {
                    // shadowBlur: 10,
                    // shadowOffsetX: 0,
                    // shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

const parseEcharData = (data) => {
    data.skuRate = data.skuRate || [];
    data.skuRate = data.skuRate.map((item) => {
        item.value = item.rate;
        item.name = item.sku;
        return item;
    });
    options.series[0].data = data.skuRate;
    return options;
}

export default parseEcharData;
