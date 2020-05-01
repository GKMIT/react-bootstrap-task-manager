import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
class FormLayout extends React.Component {
    render() {
        const { title, fullWidth } = this.props

        return (
            <Container>
                <Row>
                    <Col md={fullWidth ? 12 : { span: 6, offset: 3 }}>
                        <h1>{title}</h1>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default FormLayout;
