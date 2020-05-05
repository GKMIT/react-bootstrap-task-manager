import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

class TextBox extends React.Component {

    handleChange = (e, index) => {
        e.persist()
        this.props.handleChange(e.target.value, e.target.name, index)
    }

    render() {
        const { name, type, label, value, helperText, multiline, rowsMax, index } = this.props
        return (
            <React.Fragment>
                <Form.Group>
                    {label && <Form.Label>{label}</Form.Label>}
                    <Form.Control
                        isValid={value && !helperText}
                        isInvalid={helperText}
                        as={multiline ? "textarea" : "input"}
                        placeholder={label}
                        rows={rowsMax}
                        name={name}
                        type={type}
                        value={value}
                        onChange={e => this.handleChange(e, index)}
                    />

                    <Form.Control.Feedback type="invalid">
                        {helperText}
                    </Form.Control.Feedback>
                </Form.Group>
            </React.Fragment>
        )

    }
}

TextBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};

TextBox.defaultProps = {
    name: "",
    label: "",
    value: "",
    inputAdornmentPosition: 'end'
}

export default TextBox;