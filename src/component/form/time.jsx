import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
class MuiTimePicker extends React.Component {

    handleChange = (value, name, index) => {
        this.props.handleChange(value, name, index)
    }

    render() {
        const { name, label, value, helperText, index, format } = this.props
        const finalValue = new Date(value)
        return (
            <React.Fragment>
                <Form.Group>
                    <Form.Label>{label}</Form.Label>
                    <DatePicker
                        className="form-control"
                        selected={finalValue}
                        showTimeSelect
                        showTimeSelectOnly
                        dateFormat={format}
                        onChange={e => this.handleChange(e, name, index)}
                    />
                    <Form.Text className="text-muted" type="valid">
                        {helperText}
                    </Form.Text>
                </Form.Group>
            </React.Fragment>
        )

    }
}

export default MuiTimePicker;