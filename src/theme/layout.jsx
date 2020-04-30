import React from 'react'
import Sidebar from "react-sidebar";
import Header from './header'
import Footer from './footer'
import MainMenu from './mainmenu';
import { Container } from 'react-bootstrap';
const mql = window.matchMedia(`(min-width: 800px)`);
class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false
        }

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen() {
        const { sidebarOpen } = this.state
        this.setState({ sidebarOpen: !sidebarOpen });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }


    render() {
        const { sidebarOpen, sidebarDocked } = this.state

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
                        {this.props.children}
                        <Footer />
                    </Container>
                </Sidebar>
            </React.Fragment>
        )
    }
}

export default Layout;