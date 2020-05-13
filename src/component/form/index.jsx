import React from 'react';
import Button from 'react-bootstrap/Button';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import { crudActions } from '../../_actions';

import RenderFormField from './renderFormField'

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
        const { formFields, submitText, submitFullWidth } = this.props
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

                        return (
                            <RenderFormField                                
                                helperText={helperText}
                                index={index}
                                form={form}
                                handleChange={this.handleChange}
                                fileUpload={this.fileUpload}
                            />
                        )

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

export default connect(mapState, actionCreators)(MuiForm);