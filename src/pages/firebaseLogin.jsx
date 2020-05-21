import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { userService } from '../_services';

class Login extends React.Component {

    componentWillMount() {
        userService.firebaseCheckAuth()
    }

    login = (type) => {
        userService.firebaseLogin(type)
    }

    render() {
        return (
            <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Col md={6} style={{ textAlign: 'right' }}>
                    <Button variant="primary" onClick={() => this.login('facebook')}>
                        Sign in with Facebook
                        </Button>
                </Col>
                <Col md={6} style={{ textAlign: 'left' }}>
                    <Button variant="danger" onClick={() => this.login('google')}>
                        Sign in with Google
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default Login