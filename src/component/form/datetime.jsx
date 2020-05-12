import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
class BootDateTimePicker extends React.Component {

    handleChange = (value, name, index) => {
        console.log(value)
        this.props.handleChange(value, name, index)
    }

    render() {
        const { name, label, value, helperText, index, format } = this.props
        return (
            <React.Fragment>
                <Form.Group>
                    <Form.Label>{label}</Form.Label>
                    <DatePicker
                        className={`form-control ${!helperText ? 'is-valid' : 'is-invalid'}`}
                        selected={value}
                        showTimeSelect
                        dateFormat={format}
                        onChange={e => this.handleChange(e, name, index)}
                    />
                    <div className="is-invalid"></div>
                    <div className="invalid-feedback">
                        {helperText}
                    </div>
                </Form.Group>
            </React.Fragment>
        )

    }
}

export default BootDateTimePicker;