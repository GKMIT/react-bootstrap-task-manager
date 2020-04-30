import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader(props) {
    return (
        <div>
            {props.open && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
        </div>
    );
}