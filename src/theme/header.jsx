import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { appTitle } from './constant'
import SideMenu from './sidemenu'

class Header extends React.Component {

    render() {
        const { handleOpenMenu } = this.props

        return (
            <React.Fragment>
                <Navbar bg="light" expand="lg">
                    <div className="mr-auto">
                        <Navbar.Brand>
                            <Button variant="primary"
                                onClick={handleOpenMenu}
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </Button>
                            {" "}
                            {appTitle}
                        </Navbar.Brand>
                    </div>


                    <div className="ml-auto">
                        <SideMenu />
                    </div>

                </Navbar>
            </React.Fragment>
        )

    }
}

export default Header;