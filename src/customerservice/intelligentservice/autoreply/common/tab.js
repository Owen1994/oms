import React from 'react';

export default class Tab extends React.PureComponent {
    first = true;

    state = {
        active: null,
    }

    componentDidMount() {
        const { defualtValue } = this.props;
        if (defualtValue !== undefined) {
            this.setState({
                active: defualtValue,
            });
        }
    }

    componentWillReceiveProps(next) {
        if (next.list !== this.props.list && this.first) {
            this.first = false;
            const { defualtValue } = next;
            if (defualtValue !== undefined) {
                this.setState({
                    active: defualtValue,
                });
            }
        }
    }

    click = (key) => {
        const { onClick } = this.props;
        const { active } = this.state;
        if (active === key) return;
        this.setState({
            active: key,
        });
        if (onClick) {
            onClick(key);
        }
    }

    setActive = (v, i) => {
        const { active } = this.state;
        if ((active === null && i === 0) || active === v.key) {
            return 'autoreply-detail-tab-active';
        }
    }

    noop = () => { }

    render() {
        const { list } = this.props;
        return list && list.length ? (
            <ul className="autoreply-detail-tab-wrap clear">
                {
                    list.map((v, i) => {
                        const { key, label, disabled } = v;
                        return (
                            <li
                                className={disabled ? 'autoreply-detail-tab-disabled' : this.setActive(v, i)}
                                key={key}
                                onClick={disabled ? this.noop : () => this.click(key)}
                            >
                                {label}
                            </li>
                        );
                    })
                }
            </ul>
        ) : null;
    }
}
