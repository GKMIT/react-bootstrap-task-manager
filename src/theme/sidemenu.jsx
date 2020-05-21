import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import { userActions } from '../_actions';

class SideMenu extends React.Component {
    handleLogout = () => {
        this.props.logout();
        this.props.history.push('/');        
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown alignRight>
                    <Dropdown.Toggle id="dropdown-basic">
                        My Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </React.Fragment>
        )

    }
}


function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const actionCreators = {
    logout: userActions.logout,
};

export default withRouter(connect(mapState, actionCreators)(SideMenu));
