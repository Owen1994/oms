
export const baseInfo = 'baseInfo';
export const userList = 'userList';
export const basicInformationInfo = 'basicInformationInfo';
export const roleuseractionInfo = 'roleuseractionInfo';

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value,
});

export const userListAction = value => ({
    type: userList,
    payload: value,
});

export const basicInformation = value => ({
    type: basicInformationInfo,
    payload: value,
});
export const roleuseraction = value => ({
    type: roleuseractionInfo,
    payload: value,
});
const actions = {
    baseInfoForm, userListAction, basicInformation, roleuseraction,
};

export default actions;
