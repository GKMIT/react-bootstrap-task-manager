import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

export default function Loader(props) {
    if (props.open) {
        return (
            <Modal show={true} centered className="modal-loader">
                <Modal.Body>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    <p>Loading...</p>
                </Modal.Body>
            </Modal>
        )
    }
    return ""
}