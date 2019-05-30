import React from 'react';
import '../css/index.css';
import './index.css';

export default ({ title, children}) => {

  return (
    <div className="ARM-form-row overflow-hidden">
        {title && (
            <div className="label">
                <span>{title}</span>
            </div>
        )}
        <div className="items">{children}</div>
    </div>
  );
};
