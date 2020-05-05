import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

class PassTextBox extends React.Component {
    constructor() {
        super()
        this.state = {
            showPassword: false
        }
    }

    handleShowPassword = () => {
        const { showPassword } = this.state
        this.setState({
            showPassword: !showPassword
        })
    }

    handleChange = (e, index) => {
        e.persist()
        this.props.handleChange(e.target.value, e.target.name, index)
    }

    render() {
        const { name, label, value, helperText, index } = this.props
        const { showPassword } = this.state
        return (
            <React.Fragment>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>{label}</Form.Label>

                    <InputGroup className="mb-3">
                        <Form.Control
                            isValid={value && !helperText}
                            isInvalid={helperText}
                            name={name}
                            placeholder={label}
                            type={showPassword ? 'text' : 'password'}
                            value={value}
                            onChange={e => this.handleChange(e, index)}
                        />
                        <InputGroup.Append>
                            <Button variant="secondary" onClick={this.handleShowPassword}>
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <Form.Control.Feedback type="invalid">
                        {helperText}
                    </Form.Control.Feedback>
                </Form.Group>

            </React.Fragment>
        )

    }
}

PassTextBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};

PassTextBox.defaultProps = {
    name: "",
    label: "",
    value: "",
    inputAdornmentPosition: 'end'
}

export default PassTextBox;