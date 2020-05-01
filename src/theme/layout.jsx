import React from 'react'
import Sidebar from "react-sidebar";
import Header from './header'
import Footer from './footer'
import MainMenu from './mainmenu';
import { Container } from 'react-bootstrap';


import { connect } from 'react-redux';
import { loaderActions, confirmActions, alertActions } from '../_actions';

import Loader from '../component/alert/loader';
import AlertConfirmDialog from '../component/alert/alertConfirmDialog';
import AlertMessage from '../component/alert/alertMessage';
import Modal from '../component/modal';

const mql = window.matchMedia(`(min-width: 800px)`);
class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: mql.matches
        }

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }


    onSetSidebarOpen() {
        const { sidebarOpen } = this.state
        this.setState({ sidebarOpen: !sidebarOpen });
        if (mql.matches) {
            this.setState({ sidebarDocked: !sidebarOpen });
        }
    }


    render() {
        const { sidebarOpen, sidebarDocked } = this.state
        console.log(sidebarOpen)
        console.log(sidebarDocked)
        return (
            <React.Fragment>
                <Sidebar
                    sidebar={<MainMenu />}
                    open={sidebarOpen}
                    docked={sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                >
                    <Header openMenu={sidebarOpen} handleOpenMenu={this.onSetSidebarOpen} />
                    <Container fluid>


                        <Loader open={this.props.loader} />


                        {this.props.modal.open && <Modal open={this.props.modal.open} />}

                        {this.props.confirm.show &&
                            <AlertConfirmDialog
                                title={this.props.confirm.title}
                                text={this.props.confirm.text}
                                open={true}
                                handleConfirm={() => this.props.setConfirm(this.props.confirm.data)}
                                handleClose={() => this.props.clearConfirms()}
                            />
                        }

                        {this.props.alert && <AlertMessage
                            open={true}
                            type={this.props.alert.type}
                            message={this.props.alert.message}
                            handleClose={this.props.clearAlerts}
                        />}


                        {this.props.children}
                        <Footer />
                    </Container>
                </Sidebar>
            </React.Fragment>
        )
    }
}


function mapState(state) {
    const { alert, loader, modal, confirm } = state;
    return { alert, loader, modal, confirm };
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    clearConfirms: confirmActions.clear,
    setConfirm: confirmActions.confirm,
    showLoader: loaderActions.show,
    hideLoader: loaderActions.hide,
};

export default (connect(mapState, actionCreators)(Layout));