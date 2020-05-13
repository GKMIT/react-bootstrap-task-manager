import React from 'react';

import TextBox from './textbox'
import CheckBox from './checkbox'
import PassTextBox from './password'
import SelectBox from './selectbox'
import MultiSelectBox from './multiselectbox'
import DatePicker from './date'
import TimePicker from './time'
import FileField from './file'
import DateTimePicker from './datetime'


class RenderFormField extends React.PureComponent {
    handleChange = (value, index) => {
        this.props.handleChange(value, index)
    }

    render() {
        const { form, fullWidth, helperText, index } = this.props

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
    }
}

export default RenderFormField