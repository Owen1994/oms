import React, { Component } from 'react';
import { Icon, Input } from 'antd';
import './index.css';


class App extends Component {
    state = {
        value: this.props.value,
        editable: this.props.editable,
        isSys: this.props.isSys,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({ value: nextProps.value });
            // if(nextProps.editable) {
            //     console.log(1)
            //     this.setState({editable: nextProps.editable})
            // }
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }

    check = () => {
        const { onChangeCheck } = this.props;
        const { value } = this.state;
        this.setState({ editable: !value });
        if (onChangeCheck) {
            onChangeCheck(this.state.value);
        }
    }

    edit = () => {
        this.setState({ editable: true });
    }

    render() {
        const { value, editable, isSys } = this.state;
        let edit;
        if (isSys) {
            edit = (
                <div style={{ paddingRight: 24, height: 24 }}>
                    {value || ''}
                </div>
            );
        } else {
            edit = editable ? (
                <Input
                    value={value}
                    onChange={this.handleChange}
                    onPressEnter={this.check}
                    suffix={(
                        <Icon
                            type="check"
                            className="editable-cell-icon-check"
                            onClick={this.check}
                        />
                    )}
                />
            ) : (
                <div style={{ paddingRight: 24, height: 24 }}>
                    {value || ''}
                    <Icon
                        type="edit"
                        className="editable-cell-icon"
                        onClick={this.edit}
                    />
                </div>
            );
        }
        return (
            <div className="common-editable-cell" style={{ width: this.props.width }}>
                { edit }
            </div>
        );
    }
}

export default App;
