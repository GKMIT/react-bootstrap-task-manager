import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

class MuiPassTextBox extends React.Component {
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
        const { name, label, value, required, helperText, index } = this.props
        const { showPassword } = this.state
        return (
            <React.Fragment>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>{label}</Form.Label>

                    <InputGroup className="mb-3">
                        <Form.Control
                            name={name}
                            placeholder={label}
                            type={showPassword ? 'text' : 'password'}
                            required={required}
                            value={value}
                            onChange={e => this.handleChange(e, index)}
                        />
                        <InputGroup.Append>
                            <Button variant="secondary" onClick={this.handleShowPassword}>
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <Form.Text className="text-muted" type="valid">
                        {helperText}
                    </Form.Text>
                </Form.Group>

            </React.Fragment>
        )

    }
}

MuiPassTextBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};

MuiPassTextBox.defaultProps = {
    name: "",
    label: "",
    value: "",
    inputAdornmentPosition: 'end'
}

export default MuiPassTextBox;