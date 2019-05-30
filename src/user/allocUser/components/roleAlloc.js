import React from 'react';
import OrganizationStructure from '@/user/common/components/OrganizationStructure';
import {
    message,
    Button,
    Row
} from 'antd';

class Rolealloc extends React.Component {

    state = {
        selectUsers: []
    }

    componentWillReceiveProps(nextProps) {
        const preSelectUsers = this.props.targetKeysModel.lstUserName;
        const selectUsers    = nextProps.targetKeysModel.lstUserName;
        if (preSelectUsers !== selectUsers) {
            this.setState({selectUsers });
        }
    }

    componentDidMount() {
        this.setState({selectUsers: this.props.targetKeysModel.lstUserName });
    }

    changeSelected = (selectUsers) => {
        this.setState({selectUsers});
    }

    save = ()=>{
        const { saveUserByListAsync,userByRoleIdModel } = this.props
        const selectUsers = this.state.selectUsers;
        const lstRole = userByRoleIdModel.map(v=>{
            return {"roleId":v.roleId,"lstUserName":selectUsers}
        });
        const params = {
            lstRole
        }
        saveUserByListAsync(params)
            .then((msg) => {
                if (msg) {
                    message.success(msg);
                    this.goback();
                }
            });
    }

    goback = () => {
        this.props.history.go(-1);
    }

    render() {
        const { selectUsers } = this.state;
        return (
            <div className="alloc-role-content">
                <div className="alloc-role-content-title position-relative">
                    <span className="longstring">分配用户</span>
                </div>
                <OrganizationStructure
                    value={this.props.targetKeysModel.lstUser}
                    onChange={this.changeSelected}
                />
                <div className="alloc-role-btn"></div>
                <div className="addupdatafootbtn">
                    <Row className="exc-detail-footer-content" style={{ textAlign: 'right' }}>
                        <div className="addupdateuserbtn">
                            <Button type="primary" onClick={this.save}>确定</Button>
                            <Button onClick={this.goback} className="margin-sm-left">取消</Button>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Rolealloc;
