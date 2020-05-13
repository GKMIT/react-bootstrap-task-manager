import React from 'react';
import Button from 'react-bootstrap/Button';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import { crudActions } from '../../_actions';


import TextBox from './textbox'
import CheckBox from './checkbox'
import PassTextBox from './password'
import SelectBox from './selectbox'
import MultiSelectBox from './multiselectbox'
import DatePicker from './date'
import TimePicker from './time'
import FileField from './file'
import DateTimePicker from './datetime'

class MuiForm extends React.Component {
    constructor() {
        super()
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            element: message => message
        });
    }

    clearFieldError = () => {
        this.props.clearData('formError')
    }

    getFieldError = (field) => {
        const { formError } = this.props
        let error
        if (formError) {
            formError.forEach(element => {
                if (element.field === field) {
                    error = element.message
                }
            });
        }
        return error
    }

    handleChange = (value, index) => {
        this.props.handleChange(value, index)
        this.clearFieldError()
        this.validator.showMessageFor(index);
        this.forceUpdate();
    }

    fileUpload = (file) => {
        this.props.fileUpload(file)
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

                        let helperText
                        if (form.validation) {
                            helperText = this.validator.message(form.name, form.value, form.validation)
                        }

                        if (this.getFieldError(form.name)) {
                            helperText = this.getFieldError(form.name)
                        }

                        switch (form.type) {
                            case 'select':
                                return (
                                    <SelectBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
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
                                        helperText={helperText}
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
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        handleChange={this.handleChange}
                                    />
                                )

                            case 'file':
                                return (
                                    <FileField
                                        label={form.label}
                                        name={form.name}
                                        type={form.type}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        editable={form.editable}
                                        accept={form.accept}
                                        handleChange={this.handleChange}
                                        fileUpload={this.fileUpload}
                                    />
                                )

                            case 'checkbox':
                                return (
                                    <CheckBox
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
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
                                        helperText={helperText}
                                        index={index}
                                        key={index}
                                        value={form.value}
                                        variant={form.variant}
                                        format={form.format}
                                        handleChange={this.handleChange}
                                    />
                                )
                            case 'datetime':
                                return (
                                    <DateTimePicker
                                        label={form.label}
                                        name={form.name}
                                        required={form.required}
                                        fullWidth={fullWidth}
                                        helperText={helperText}
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
                                        helperText={helperText}
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
                                        helperText={helperText}
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

function mapState(state) {
    const { formError } = state;
    return {
        formError
    };
}

const actionCreators = {
    clearData: crudActions._clear,
};

export default connect(mapState, actionCreators)(withStyles(styles)(MuiForm));