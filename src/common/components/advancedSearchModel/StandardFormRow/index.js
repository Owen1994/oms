import React from 'react';
import './index.css';

export default ({ title, children, required=false, className}) => {

    return (
        <div className={`standard-form-row overflow-hidden ${className ? className: ''}`}>
            {title && (
                <div className="label">
                    {required ? <span className="isRequired">*</span> : null}
                    <span>{title}</span>
                </div>
            )}
            <div className="items">{children}</div>
        </div>
    );
};
