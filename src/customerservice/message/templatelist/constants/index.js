import getTempState from './tempState';
import getTempType from './tempType';

// api接口
export {
    GET_MESSAGE_TEMP_LIST,
    GET_TEMPLATE_CLASS_LIST2,
    GET_LANGUAGES_LIST,
    LANGUAGES_ADD_OR_EDIT,
    GET_MESSAGE_TEMPDETAIL,
    MESSAGE_TEMP_ADD_OR_EDIT,
    MESSAGE_TEMP_DELETE,
    MESSAGE_TEMP_TO_EXAM_EINE,
    MESSAGE_TEMP_SET_INVALID,
    MESSAGE_TEMP_SET_PUBLIC_OR_PRAIVATE,
    LANGUAGES_DELETE,
    GET_VARIAYE_LIST_API,
} from './api';

// redux 状态常量
export const LIST = 'list';
// edit 弹窗数据
export const EDIT_DATA = 'edit_data';

export { getTempState, getTempType };
