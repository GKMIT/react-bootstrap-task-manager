import React from "react";
import { Button, Row, Col } from 'react-bootstrap';

export const TableAction = (deleteData, editData, editPass = false) => {
    return (
        {
            selector: 'action',
            name: 'Action',            
            cell: row => (
                <React.Fragment>
                    {deleteData && <Button aria-label="delete" onClick={() => { deleteData(row) }}>Delete</Button>}
                    {editData && <Button aria-label="edit" onClick={() => { editData(row) }}>Edit</Button>}
                    {editPass && <Button aria-label="edit" onClick={() => { editPass(row) }}>Edit Password</Button>}
                </React.Fragment>
            )
        }
    )
}
