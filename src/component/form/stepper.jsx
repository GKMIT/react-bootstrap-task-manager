import React from 'react';
import { Button, Tabs, Tab } from 'react-bootstrap';
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

class MuiForm extends React.Component {
    constructor() {
        super()
        this.state = {
            activeStep: 0,
            skipped: null
        }

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

    setActiveStep = (value) => {
        this.setState({
            activeStep: value
        })
    }

    setSkipped = (value) => {
        this.setState({
            skipped: value
        })
    }

    isStepOptional = (step) => {
        const { steps } = this.props
        const optional = steps.findIndex(step => step.optional === true)
        return step === optional;
    };

    isStepSkipped = (step) => {
        const { skipped } = this.state
        return step === skipped;
    };

    handleNext = () => {
        const { activeStep } = this.state
        const { steps } = this.props

        this.validator.hideMessages();

        let isValid = true
        if (steps) {
            steps.forEach((element, index) => {
                if (activeStep === index) {
                    if (element.formFields) {
                        element.formFields.forEach(formField => {
                            if (formField.validation && !this.validator.fieldValid(formField.name)) {
                                isValid = false
                            }
                        });
                    }
                }
            });
        }

        if (isValid) {
            this.isStepSkipped(activeStep)
            this.setActiveStep(activeStep + 1);
            this.setSkipped(activeStep + 1);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    handleBack = () => {
        const { activeStep } = this.state
        this.setActiveStep(activeStep - 1);
    };

    handleSkip = () => {
        const { activeStep } = this.state
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setActiveStep(activeStep + 1);
        this.setSkipped(activeStep);
    };

    handleReset = () => {
        this.setActiveStep(0);
    };

    confirmPanel = () => {
        const { submitText } = this.props
        return (
            <React.Fragment>
                <p>All steps completed - you&apos;re finished</p>
                <Button variant="secondary" onClick={this.handleReset}>
                    Reset
                </Button>
                <Button type="submit" variant="primary">
                    {submitText}
                </Button>
            </React.Fragment>
        )
    }

    handleChange = (value, index) => {
        this.props.handleChange(value, index)
    }

    fileUpload = (file) => {
        this.props.fileUpload(file)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.props.formSubmit) {
            this.handleReset()
        }
        if (this.validator.allValid()) {
            this.props.handleSubmit(event)
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { activeStep } = this.state
        const { steps } = this.props
        return (
            <React.Fragment>
                <form noValidate onSubmit={this.handleSubmit}>

                    <Tabs activeKey={activeStep}>
                        {steps.map((step, stepIndex) => {
                            return (
                                <Tab eventKey={stepIndex} title={step.label}>

                                    {step.formFields.map((form, index) => {

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
                                                        helperText={helperText}
                                                        index={index}
                                                        key={index}
                                                        value={form.value}
                                                        handleChange={this.handleChange}
                                                    />
                                                )
                                        }
                                    })}
                                </Tab>
                            )
                        })}
                    </Tabs>

                    <div>
                        {activeStep === steps.length ? (
                            this.confirmPanel()
                        ) : (
                                <div>
                                    <div className="stepButtonWrapper">
                                        <Button disabled={activeStep === 0} onClick={this.handleBack} variant="secondary">
                                            Back
                                        </Button>

                                        {this.isStepOptional(activeStep) && (
                                            <Button variant="primary" onClick={this.handleSkip}>
                                                Skip
                                            </Button>
                                        )}

                                        <Button
                                            variant="primary"
                                            onClick={this.handleNext}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>

                                </div>
                            )}
                    </div>

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