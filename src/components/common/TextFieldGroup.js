import React from 'react';

import classnames from 'classnames';

export default function TextFieldGroup({ field, inputType, label, error, onChange }) {
    let inputField;

    return (
        <div className={classnames("form-group", { "has-error": error })}>
            <label className="control-label">{ label }</label>
            <input
                type={inputType}
                name={field}
                className="form-control"
                ref={(input) => inputField = input}
                onChange={() => onChange(field, inputField.value)}
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
}