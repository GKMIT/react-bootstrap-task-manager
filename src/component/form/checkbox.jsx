import React from 'react';
import Form from 'react-bootstrap/Form';
class MuiCheckBox extends React.Component {

    handleChange = (e, index) => {
        e.persist()
        this.props.handleChange(e.target.checked, e.target.name, index)
    }

    render() {
        const { name, label, value, required, fullWidth, helperText, index } = this.props
        return (
            <React.Fragment>
                <Form.Group>
                    <Form.Label>{label}</Form.Label>
                    <Form.Check
                        type="checkbox"   
                        checked={value ? true : false}
                        name={name}                     
                        label={label}
                        required={required}
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

export default MuiCheckBox;