
import React from 'react';
import {
    Form,
    Button,
    Radio,
    Input,
    Select,
    Upload,
    Checkbox,
    DatePicker,
    Cascader,
} from 'antd';
import CountArea from '../../../common/components/CountArea';
import { randNum } from '../../../../util/baseTool';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class FilterType extends React.Component {
    // 表单类型过滤
    filterType = (item) => {
        let fieldForm;
        let fieldOption = item.fieldOption;
        let options;
        switch (item.fieldType) {
        case 'input':
            fieldForm = (
                <Input placeholder={`请输入${item.fieldName}`} />
            );
            break;
        case 'radio':
            fieldOption = fieldOption.split('|');
            fieldForm = (
                <RadioGroup defaultValue={0}>
                    {fieldOption.map((items, i) => <Radio key={randNum()} value={i}>{items}</Radio>)}
                </RadioGroup>
            );
            break;
        case 'checkbox':
            fieldOption = fieldOption.split('|');
            options = fieldOption.map(items => ({ label: items, value: items }));
            fieldForm = (
                <CheckboxGroup options={options} defaultValue={[fieldOption[0]]} />
            );
            break;
        case 'select':
            fieldOption = fieldOption.split('|');
            fieldForm = (
                <Select style={{ width: 334 }} placeholder={`请选择${item.fieldName}`}>
                    {fieldOption.map(items => <Option key={randNum()} value={items}>{items}</Option>)}
                </Select>
            );
            break;
        case 'file':
            fieldForm = (
                <Upload
                    fileList={[]}
                >
                    <Button>点击上传</Button>
                </Upload>
            );
            break;
        case 'textarea':
            fieldForm = (
                <CountArea
                    {...this.props}
                    autosize={{ minRows: 8, maxRows: 8 }}
                    // label=""
                    maxLength={500}
                    field=" "
                    placeholder="内容控制在500个字符以内"
                />
            );
            break;
        case 'date':
            fieldForm = (
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            );
            break;
        case 'cascader':
            fieldForm = (
                <Cascader
                    fieldNames={{ label: 'category', value: 'categoryId' }}
                    options={this.props.options}
                    placeholder="请选择"
                />
            );
            break;
        default:
            fieldForm = null;
            break;
        }
        return fieldForm;
    }

    render() {
        const { item } = this.props;
        return (
            this.filterType(item)
        );
    }
}
export default Form.create()(FilterType);
