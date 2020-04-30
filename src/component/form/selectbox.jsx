import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
class MuiSelectBox extends React.Component {

    handleChange = (e, index) => {
        e.persist()
        this.props.handleChange(e.target.value, e.target.name, index)
    }

    render() {
        const { name, label, value, required, fullWidth, options, helperText, index } = this.props
        return (
            <React.Fragment>
                <Form.Group>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control as="select"
                        required={required}
                        name={name}
                        value={value}
                        onChange={e => this.handleChange(e, index)}>
                        {options && options.map(option => {
                            return (
                                <option key={option.id} value={option.id}>{option.name}</option>)
                        })}
                    </Form.Control>
                    <Form.Text className="text-muted" type="valid">
                        {helperText}
                    </Form.Text>
                </Form.Group>
            </React.Fragment>
        )

    }
}

MuiSelectBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};

MuiSelectBox.defaultProps = {
    name: "",
    label: "",
    value: "",
    inputAdornmentPosition: 'end'
}

export default MuiSelectBox;