import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader(props) {
    if (props.open) {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }
    return ""
}