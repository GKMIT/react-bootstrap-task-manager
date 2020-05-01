import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function SimpleAlert(props) {

    return (
        <SweetAlert
            success={props.type === 'success'}
            warning={props.type === 'warning'}
            error={props.type === 'error'}
            info={props.type === 'info'}
            onConfirm={props.handleClose}
        >
            {props.message}
        </SweetAlert>
    );
}