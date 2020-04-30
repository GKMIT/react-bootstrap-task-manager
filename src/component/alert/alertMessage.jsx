import React from 'react';

export default function SimpleSnackbar(props) {

    const Alert = (props) => {
        // return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div>
            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={props.open}
                autoHideDuration={6000}
                onClose={() => props.handleClose()}
            >
                <Alert onClose={() => props.handleClose()} severity={props.type}>
                    {props.message}
                </Alert>
            </Snackbar> */}
        </div>
    );
}