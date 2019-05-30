import {createSelector} from 'reselect'
import {timestampFromat} from '../../../../util/baseTool'
import {parseImportStatus} from './index'

const getParts = state => state.parts;

export const parseParts = createSelector(
    [getParts],
    parts => {
        if (!parts) { //避免parts返回结果为null时出现白屏
            parts = {};
        }
        parts.data = parts.data.map(item => {
            item.key = item.id;
            item.createdTime = timestampFromat(item.createdTime, 2);
            let rslt = {};
            switch (item.importStatus) {
                case 1:
                    rslt = {'txt': '处理中', 'ifOutport': false, 'ifDelete': false};
                    break;
                case 2:
                    rslt = {'txt': '处理成功', 'ifOutport': true, 'ifDelete': true};
                    break;
                case 3:
                    rslt = {'txt': '处理失败', 'ifOutport': false, 'ifDelete': true};
                    break;
                default:
                    rslt = {'txt': '', 'ifOutport': false, 'ifDelete': false};
            }
            item.importStatus = rslt.txt;
            item.ifOutport = rslt.ifOutport;
            item.ifDelete = rslt.ifDelete;
            return item;
        });
        return parts;
    }
);