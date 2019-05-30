import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        if (parts.list) {
            parts.list.forEach((item, index) => {
                item.isFunctionalCheck = item.isFunctionalCheck === '1' ? '是' : '否';
                item.isPickingConfirm = item.isPickingConfirm === '1' ? '是' : '否';
                item.index = index;
                item.isBare = item.isBare || '';
                item.packageSpecification = item.packageSpecification || '';
                item.priority = item.priority || '';
                item.reasonForFailure = item.reasonForFailure || '';
                // item.qualityInspector = item.qualityInspector || [];
                // console.log(item.qualityInspector);
                if (!item.isEdit) { // 刷新默认是不可编辑,如果通过点击手动修改成编辑状态,则不处理
                    item.isEdit = item.isQualityInspection === '2' && item.isCanEdit === '1';// 默认是否是编辑状态
                    if (item.isEdit) { // 默认就为可编辑的情况时,合格量为0.则默认显示到货数量.
                        item.inputQualifiedAmount = item.inputQualifiedAmount || item.arrivalQuantity;
                    }
                }
            });
        }
        return parts;
    },
);

export default parseParts;
