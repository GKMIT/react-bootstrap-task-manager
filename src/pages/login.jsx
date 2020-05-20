import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Copyright from '../component/copyright'
import MuiForm from '../component/form'

import { connect } from 'react-redux';
import { userActions } from '../_actions';


class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            title: 'Sign in',
            submitText: 'Sign in',
            form: {
                email: '',
                password: '',
            }
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.history.push('/dashboard')
        }
    }

    createForm = () => {
        const { form } = this.state
        let formFields = []

        formFields.push({
            name: 'email',
            label: 'Email',
            type: 'email',            
            value: form.email,
            validation: 'required|email',
        })

        formFields.push({
            name: 'password',
            label: 'Password',
            type: 'password',
            value: form.password,
            validation: 'required',
        })

        return formFields
    }

    handleChange = (value, name) => {
        const { form } = this.state
        form[name] = value
        this.setState(form)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { form } = this.state
        this.props.login(form.email, form.password)
    }

    render() {        
        const { title, submitText } = this.state
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1>{title}</h1>
                            <MuiForm
                                formFields={this.createForm()}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                submitText={submitText}
                                submitFullWidth={true}
                                fullWidth={true}
                                noValidate={false}
                            />
                            <Copyright />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const actionCreators = {
    login: userActions.login,
};

export default (connect(mapState, actionCreators)(Login));
