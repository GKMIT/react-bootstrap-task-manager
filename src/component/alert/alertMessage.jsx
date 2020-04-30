import React from 'react';
import { Alert } from 'react-bootstrap';


export default function SimpleSnackbar(props) {

    return (
        <div>
            <Alert variant={props.type}>
                {props.message}
            </Alert>
        </div>
    );
}