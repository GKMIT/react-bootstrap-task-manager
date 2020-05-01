import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

class MuiTextBox extends React.Component {

    handleChange = (e, index) => {
        e.persist()
        this.props.handleChange(e.target.value, e.target.name, index)
    }

    render() {
        const { name, type, label, value, required, inputAdornmentPosition, icon, fullWidth, helperText, multiline, rowsMax, index } = this.props
        return (
            <React.Fragment>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        as={multiline ? "textarea" : "input"}
                        placeholder={label}
                        rows={rowsMax}
                        name={name}
                        type={type}
                        required={required}
                        value={value}
                        onChange={e => this.handleChange(e, index)}
                    />

                    <Form.Text className="text-muted" type="valid">
                        {helperText}
                    </Form.Text>
                </Form.Group>
            </React.Fragment>
        )

    }
}

MuiTextBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};

MuiTextBox.defaultProps = {
    name: "",
    label: "",
    value: "",
    inputAdornmentPosition: 'end'
}

export default MuiTextBox;