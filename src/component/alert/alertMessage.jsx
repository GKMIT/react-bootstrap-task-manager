import React from 'react';
import { Alert } from 'react-bootstrap';


export default function SimpleAlert(props) {

    return (
        <Alert variant={props.type} onClose={props.handleClose} dismissible>
            {props.message}
        </Alert>
    );
}