import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

class FileField extends React.Component {

    handleChange = (e, index) => {
        e.persist()
        this.props.handleChange(e.target.value, e.target.name, index)
    }

    fileUpload = (e) => {
        let file = e.target.files[0];
        this.props.fileUpload(file)
    }

    render() {
        const { name, accept, editable, label, value, helperText, index } = this.props
        return (
            <React.Fragment>
                <input
                    style={{ display: 'none' }}
                    id="document-file"
                    type="file"
                    accept={accept}
                    onChange={this.fileUpload}
                />
                <Form.Group>
                    {label && <Form.Label>{label}</Form.Label>}

                    <InputGroup className="mb-3">
                        <Form.Control
                            isValid={value && !helperText}
                            isInvalid={helperText}
                            readOnly={editable ? false : true}
                            type="text"
                            placeholder={label}
                            name={name}
                            value={value}
                            onChange={e => this.handleChange(e, index)}
                        />
                        <InputGroup.Append>
                            <Button variant="secondary">
                                <label style={{ marginBottom: 0 }} htmlFor="document-file">
                                    <FontAwesomeIcon icon={faUpload} />
                                </label>
                            </Button>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            {helperText}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </React.Fragment>
        )

    }
}

export default FileField;