import React from 'react';
import { connect } from 'react-redux';
import { modalActions } from '../../_actions';
import { Modal } from 'react-bootstrap';
class MuiModal extends React.Component {
    handleClose = () => {
        this.props.closeModal();
    }

    render() {
        const { open, width, height } = this.props

        const customContentStyle = {
            width: `${width}px`,
            maxWidth: `${width}px`,
            height: `${height}px`,
            maxHeight: `${height}px`,
        };

        return (
            <Modal show={open} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={customContentStyle}>
                    {this.props.modal.component}
                </Modal.Body>
            </Modal>
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
