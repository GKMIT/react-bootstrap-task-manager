import React from "react";
import { ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faLock } from '@fortawesome/free-solid-svg-icons'

export const TableAction = (deleteData, editData, editPass = false) => {
    return (
        {
            selector: 'action',
            name: 'Action',
            cell: row => (
                <React.Fragment>
                    <ButtonGroup>
                        {deleteData && <Button variant="danger" aria-label="delete" onClick={() => { deleteData(row) }}><FontAwesomeIcon icon={faTrash} /></Button>}
                        {editData && <Button variant="primary" aria-label="edit" onClick={() => { editData(row) }}><FontAwesomeIcon icon={faEdit} /></Button>}
                        {editPass && <Button variant="secondary" aria-label="edit" onClick={() => { editPass(row) }}><FontAwesomeIcon icon={faLock} /></Button>}
                    </ButtonGroup>
                </React.Fragment>
            )
        }
    )
}
