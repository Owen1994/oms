import React, { PureComponent } from 'react';

import {
    Tag,
} from 'antd';

class Userlist extends PureComponent {

    state = {
        tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
        inputVisible: false,
        inputValue: '',
    };

    // 自定义方法
    // 删除用户--------代码勿删------------
    // deluser = (e) => {
    //     const objs = {};
    //     let runabled = false;
    //     const value = e.target.parentNode.querySelectorAll('span')[0].textContent;
    //     console.log(value);
    // }


    handleClose = (removedTag) => {
        const tags = this.props.userlist.userArr.filter(tag => tag !== removedTag);
        this.props.userlistaction({ userArr: tags });
    }

    render() {
        const tags = this.props.userlist.userArr || [];
        return (
            <div className="accredit-user-list">
                <div className="accredit-user-list-title">
                    <div className="toplf" />
                    <div className="toprt"> 授权用户</div>
                </div>
                <div className="accredit-user-list-content">
                    {tags.map((tag, index) => {
                        const tagElem = (
                            <Tag key={tag} closable={tags.length > 2} afterClose={() => this.handleClose(tag)}>
                                {tag}
                            </Tag>
                        );
                        return tagElem;
                    })}

                </div>
            </div>
        );
    }
}

export default Userlist;
