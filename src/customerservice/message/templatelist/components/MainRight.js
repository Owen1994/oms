import React from 'react';

import Search from './Search';
import Tablelist from './Tablelist';

class App extends React.Component {
    render() {
        const {
            tagValue, listFetch, onReset, onSubmit,
        } = this.props;
        return (
            <div className="customer-service-main-right">
                <div className="main-right">
                    <Search
                        {...this.props}
                        tagValue={tagValue}
                        listFetch={listFetch}
                        onReset={onReset}
                        onSubmit={onSubmit}
                    />
                    <Tablelist
                        {...this.props}
                    />
                </div>
            </div>
        );
    }
}

export default App;
