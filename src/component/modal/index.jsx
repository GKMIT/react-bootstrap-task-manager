import React from 'react';
import { connect } from 'react-redux';
import { modalActions } from '../../_actions';

class MuiModal extends React.Component {
    handleClose = () => {
        this.props.closeModal();
    }

    render() {
        const { open } = this.props
        return (

            <div>
                {/* <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {this.props.modal.title && <DialogTitle id="alert-dialog-title">{this.props.modal.title}</DialogTitle>}
                <DialogContent>
                    {this.props.modal.component}
                </DialogContent>
            </Dialog> */}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const { modal } = state;
    return { modal };
}
const actionCreators = {
    closeModal: modalActions.close,
}

export default connect(mapStateToProps, actionCreators)((MuiModal));
