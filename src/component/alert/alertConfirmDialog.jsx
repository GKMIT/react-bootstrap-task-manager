import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function AlertConfirmDialog(props) {
    return (
        <SweetAlert
            warning
            showCancel
            title={props.title}
            onConfirm={props.handleConfirm}
            onCancel={props.handleClose}
            confirmBtnText="Yes"
            cancelBtnText="No"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="default"
        >
            {props.text}
        </SweetAlert>
    );
}