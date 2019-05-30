import React from 'react';
import BaseComponent from '@/common/components/base';
import routers from '../router';
import '../common/css/index.css';

export default class AppComponent extends React.Component {
    componentDidMount() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'https://cdn.webprinter.cn/webprinter/3.6.5/webprinter.js';
        document.body.appendChild(s);
    }

    render() {
        return (
            <BaseComponent
                routes={routers}
                {...this.props}
            />
        );
    }
}
