import { Pagination } from 'antd';
import React from 'react';

const MAX_COUNT = 200000;
export default class CPagination extends React.Component {
    state = {
        total: 0,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.size !== nextProps.size) {
            computeTotal(nextProps.size);
        }
    }

    componentDidMount() {
        computeTotal(this.props.size);
    }

    computeTotal = (size) => {
        const newSize = Number.parseInt(size, 10);
        if (size > MAX_COUNT) {
            newSize = MAX_COUNT;
        }
        this.setState({size: newSize});
    }

    render() {
        const total = this.state.total;
        return (
            <Pagination
                {...this.props}
                total={total}
            />
        )
    }
}
