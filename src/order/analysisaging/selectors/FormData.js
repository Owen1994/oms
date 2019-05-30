import moment from 'moment';

export const filterSearchParams = (data) => {
    let momentData;
    let end = Number.parseInt(moment().endOf('day').valueOf(), 10);
    let number;
    if (Number.parseInt(String(data.gTime, 10)) === 0) {
        number = 0;
        let start = moment().subtract(number, 'day').startOf('day').valueOf();
        momentData = [moment(start), moment(end)] || [];
        data.grabTime = momentData;
    }
    if (Number.parseInt(String(data.gTime, 10)) === 1) {
        number = 1;
        let end = Number.parseInt(moment().endOf('day').valueOf(), 10) - 24 * 60 * 60 * 1000;
        let start = moment().subtract(number, 'day').startOf('day').valueOf();
        momentData = [moment(start), moment(end)] || [];
        data.grabTime = momentData;
    }
    if (Number.parseInt(String(data.gTime, 10)) === 2) {
        number = 7;
        let end = Number.parseInt(moment().endOf('day').valueOf(), 10) - 24 * 60 * 60 * 1000;
        let start = moment().subtract(number, 'day').startOf('day').valueOf();
        momentData = [moment(start), moment(end)] || [];
        data.grabTime = momentData;
    }
    if (Number.parseInt(String(data.gTime, 10)) === 3) {
        number = 30;
        let end = Number.parseInt(moment().endOf('day').valueOf(), 10) - 24 * 60 * 60 * 1000;
        let start = moment().subtract(number, 'day').startOf('day').valueOf();
        momentData = [moment(start), moment(end)] || [];
        data.grabTime = momentData;
    }
    if (Number.parseInt(String(data.gTime, 10)) === 4) {
        data.grabTime = data.grabTime;
    }
    delete data.gTime;

    if (data.grabTime) {
        data.grabTime = data.grabTime.map(item => item.valueOf());
    }
};

