import React from 'react';
import './index.css';

export default ({ title, children}) => {

  return (
    <div className="common-standard-form-row clear">
        {title && (
            <div className="label">
                <span>{title}</span>
            </div>
        )}
        <div className="items">{children}</div>
    </div>
  );
};
