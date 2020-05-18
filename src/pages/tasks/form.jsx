import React from 'react';
import MuiForm from '../../component/form'
import FormLayout from '../../theme/formLayout'

import { connect } from 'react-redux';
import { crudActions, alertActions } from '../../_actions';

class Form extends React.Component {

    constructor() {
        super()
        this.state = {
            title: 'Create task',
            submitText: 'Create',
            action: 'create',
            id: null,
            form: {
                user_id: '',
                name: '',
                datetime: new Date(),
                start_date: new Date(),
                start_time: new Date(),
                end_date: new Date(),
                end_time: new Date(),
                details: ''
            },
        }
    }

    createForm = () => {
        const { form } = this.state
        const { users } = this.props
        let formFields = []
        formFields.push({
            name: 'user_id',
            label: 'User',
            type: 'select',
            value: form.user_id,
            options: users,
            validation: 'required',
        })

        formFields.push({
            name: 'name',
            label: 'Name',
            type: 'text',
            value: form.name,
            validation: 'required',
        })

        formFields.push({
            name: 'datetime',
            label: 'Date Time',
            type: 'datetime',
            variant: 'inline',
            format: 'dd-MM-yyyy hh:mm aa',
            value: form.datetime,
            validation: 'required',
        })

        formFields.push({
            name: 'start_date',
            label: 'Start Date',
            type: 'date',
            variant: 'inline',
            format: 'dd-MM-yyyy',
            value: form.start_date,
            validation: 'required',
        })

        formFields.push({
            name: 'start_time',
            label: 'Start Time',
            type: 'time',
            variant: 'inline',
            format: 'hh:mm aa',
            value: form.start_time,
            validation: 'required',
        })

        formFields.push({
            name: 'end_date',
            label: 'End Date',
            type: 'date',
            variant: 'inline',
            format: 'dd-MM-yyyy',
            value: form.end_date,
            validation: 'required',
        })

        formFields.push({
            name: 'end_time',
            label: 'End Time',
            type: 'time',
            variant: 'inline',
            format: 'hh:mm aa',
            value: form.end_time,
            validation: 'required',
        })


        formFields.push({
            name: 'details',
            label: 'Details',
            type: 'text',
            value: form.details,
            validation: 'required',
        })

        return formFields
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.getAll('users', 'users')
        if (id && id !== 'new') {
            this.props.getData('form', 'tasks', id)
        }
    }

    static getDerivedStateFromProps(props) {
        let newState = {};
        if (props.match.params.id !== 'new' && props.form !== null) {
            newState.id = props.match.params.id
            newState.title = 'Edit Task'
            newState.submitText = 'Edit'
            newState.action = 'update'
            newState.form = props.form
        }
        if (props.formSubmit) {
            props.history.push('/tasks')
        }
        return newState
    }


    handleChange = (value, name) => {
        const { form } = this.state
        form[name] = value
        this.setState(form)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { action, id, form } = this.state
        if (form) {
            const formData = {
                user_id: form.user_id,
                name: form.name,
                start_date: form.start_date,
                start_time: form.start_time,
                end_date: form.end_date,
                end_time: form.end_time,
                details: form.details,
            }
            if (action === 'update') {
                this.props.updateData('form', 'tasks', id, formData)
            } else {
                this.props.createData('form', 'tasks', formData)
            }
        }
    }

    render() {
        const { title, submitText } = this.state
        return (
            <FormLayout title={title} fullWidth={false}>
                <MuiForm
                    formFields={this.createForm()}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    submitText={submitText}
                    submitFullWidth={true}
                    fullWidth={true}
                    noValidate={false}
                />
            </FormLayout >
        );
    }
}

function mapState(state) {
    const { form, formSubmit, users } = state;
    return {
        form,
        formSubmit,
        users
    };
}

const actionCreators = {
    getAll: crudActions._getAll,
    getData: crudActions._get,
    showError: alertActions.error,
    createData: crudActions._create,
    updateData: crudActions._update,
};

export default connect(mapState, actionCreators)(Form);
