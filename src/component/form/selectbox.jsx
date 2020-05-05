import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
class SelectBox extends React.Component {

    handleChange = (e, index) => {
        e.persist()
        this.props.handleChange(e.target.value, e.target.name, index)
    }

    render() {
        const { name, label, value, options, helperText, index } = this.props
        return (
            <React.Fragment>
                <Form.Group>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        isValid={value && !helperText}
                        isInvalid={helperText}
                        as="select"
                        name={name}
                        value={value}
                        onChange={e => this.handleChange(e, index)}>
                        <option>---select---</option>
                        {options && options.map(option => {
                            return (
                                <option key={option.id} value={option.id}>{option.name}</option>)
                        })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {helperText}
                    </Form.Control.Feedback>
                </Form.Group>
            </React.Fragment>
        )

    }
}

SelectBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};

SelectBox.defaultProps = {
    name: "",
    label: "",
    value: "",
}

export default SelectBox;