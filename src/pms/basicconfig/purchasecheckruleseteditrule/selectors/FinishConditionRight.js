import { condtionsName } from '../constants/Condtions';

const pasrecondtionDatas = (condtions, datas) => {
    const array = condtions.map((key) => {
        const item = { key };
        const titles = condtionsName[key - 1].split(',');
        item.title = titles[0];
        item.subTitle = titles[1];
        switch (key) {
        case 1: {
            item.children = datas.supplier;
            break;
        }
        case 2: {
            item.children = datas.sku;
            break;
        }
        case 3: {
            item.children = datas.paymentMethod;
            break;
        }
        case 4: {
            item.value = datas.total;
            break;
        }
        case 5: {
            item.value = datas.quantityInterval;
            break;
        }
        default:
        }
        return item;
    });
    return array;
};

export default pasrecondtionDatas;
