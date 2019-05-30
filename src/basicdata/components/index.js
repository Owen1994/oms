import React from 'react';
import BaseComponent from '@/common/components/base';
import routers from '../router';

export default class AppComponent extends React.Component {
    render() {
        return (
            <BaseComponent
                routes={routers}
                {...this.props}
            />
        );
    }
}
