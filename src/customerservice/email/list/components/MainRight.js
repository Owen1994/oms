import React from 'react';
import MailSearch from './Search';
import Tablelist from './Tablelist';

class MainRight extends React.Component {
    render() {
        const {
            tagValue, listFetch, onReset, onSubmit, handleOperate, rowSelection, taglistFetch, openInfo,
        } = this.props;
        return (
            <div className="mail-main-right">
                <div className="main-right">
                    <MailSearch
                        {...this.props}
                        openInfo={openInfo}
                        tagValue={tagValue}
                        onReset={onReset}
                        onSubmit={onSubmit}
                        listFetch={listFetch}
                        taglistFetch={taglistFetch}
                    />
                    <Tablelist
                        {...this.props}
                        rowSelection={rowSelection}
                        listFetch={listFetch}
                        handleOperate={handleOperate}
                    />
                </div>
            </div>
        );
    }
}

export default MainRight;
