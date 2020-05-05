import React from 'react';
import Button from 'react-bootstrap/Button';
import SimpleReactValidator from 'simple-react-validator';

import TextBox from './textbox'
import CheckBox from './checkbox'
import PassTextBox from './password'
import SelectBox from './selectbox'
import MultiSelectBox from './multiselectbox'
import DatePicker from './date'
import TimePicker from './time'

class MuiForm extends React.Component {
    constructor() {
        super()
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            element: message => message
        });
    }

    handleChange = (value, index) => {
        console.log(index)
        this.props.handleChange(value, index)
        this.validator.showMessageFor(index);
        this.forceUpdate();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            this.props.handleSubmit(event)
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { formFields, submitText, submitFullWidth, fullWidth } = this.props
        return (
            <React.Fragment>
                <form noValidate onSubmit={this.handleSubmit}>

                    {formFields.map((form, index) => {

                        switch (form.type) {
                            case 'select':
                                return (
                                    <SelectBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        options={form.options}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'multiselect':
                                return (
                                    <MultiSelectBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        options={form.options}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'password':
                                return (
                                    <PassTextBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'checkbox':
                                return (
                                    <CheckBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        handleChange={this.handleChange}
                                    />
                                )

                            case 'date':
                                return (
                                    <DatePicker
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        variant={form.variant}
                                        format={form.format}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'time':
                                return (
                                    <TimePicker
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        variant={form.variant}
                                        format={form.format}
                                        handleChange={this.handleChange}
                                    />
                                )

                            default:
                                return (
                                    <TextBox
                                        label={form.label}
                                        name={form.name}
                                        type={form.type}
                                        icon={form.icon}
                                        multiline={form.multiline}
                                        rowsMax={form.rowsMax}
                                        fullWidth={fullWidth}
                                        helperText={this.validator.message(form.name, form.value, form.validation)}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        handleChange={this.handleChange}
                                    />
                                )
                        }
                    })}


                    <Button
                        type="submit"
                        fullWidth={submitFullWidth}
                        variant="primary"
                    >
                        {submitText}
                    </Button>

                </form>
            </React.Fragment>
        )

    }
}


export default MuiForm;