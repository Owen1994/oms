import moment from 'moment';

export const filterSearchParams = (data) => {
    let momentData;
    let end = Number.parseInt(moment().endOf('day').valueOf(), 10);
    let number;
    if (Number.parseInt(String(data.paytime, 10)) === 0) {
        number = 0;
        let start = moment().subtract(number, 'day').startOf('day').valueOf();
        momentData = [moment(start), moment(end)] || [];
        data.payDt = momentData;
    }
    if (Number.parseInt(String(data.paytime, 10)) === 1) {
        number = 1;
        let end = Number.parseInt(moment().endOf('day').valueOf(), 10) - 24*60*60*1000;
        let start = moment().subtract(number, 'day').startOf('day').valueOf();
        momentData = [moment(start), moment(end)] || [];
        data.payDt = momentData;
    }
    if (Number.parseInt(String(data.paytime, 10)) === 2) {
        number = 7;
        let end = Number.parseInt(moment().endOf('day').valueOf(), 10) - 24*60*60*1000;
        let start = moment().subtract(number, 'day').startOf('day').valueOf();
        momentData = [moment(start), moment(end)] || [];
        data.payDt = momentData;
    }
    if (Number.parseInt(String(data.paytime, 10)) === 3) {
        number = 30;
        let end = Number.parseInt(moment().endOf('day').valueOf(), 10) - 24*60*60*1000;
        let start = moment().subtract(number, 'day').startOf('day').valueOf();
        momentData = [moment(start), moment(end)] || [];
        data.payDt = momentData;
    }
    if (Number.parseInt(String(data.paytime, 10)) === 4){
        data.payDt = data.payDt;
    }
    delete data.paytime;
    if (data.payDt) {
        data.payDt = data.payDt.map(item => (
            item.valueOf()
        ));
    }
    if(data.logisticsType && data.logisticsType[0]){
        data.logisticsType = data.logisticsType[0];
    } else {
        delete data.logisticsType;
    }

    if (data.timeZone && data.timeZone[0]) {
        data.timeZone = data.timeZone[0];
    }
};
