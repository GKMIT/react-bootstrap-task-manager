import React from 'react'
import Sidebar from "react-sidebar";
import Header from './header'
import Footer from './footer'
import MainMenu from './mainmenu';
import { Container, Row, Col } from 'react-bootstrap';
class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            openMenu: false
        }
    }

    componentDidMount() {
        // window.addEventListener("resize", this.resize.bind(this));
        // this.resize();
    }

    resize() {
        if (window.innerWidth > 414) {
            this.setState({
                openMenu: true
            })
        } else {
            this.setState({
                openMenu: false
            })
        }
    }

    handleOpenMenu = () => {
        const { openMenu } = this.state
        this.setState({
            openMenu: !openMenu
        })
    }

    render() {
        const { openMenu } = this.state

        return (
            <React.Fragment>
                <Sidebar
                    sidebar={<MainMenu />}
                    open={openMenu}
                    onSetOpen={this.handleOpenMenu}
                    styles={{ sidebar: { background: "white" } }}
                >
                    <Header openMenu={openMenu} handleOpenMenu={this.handleOpenMenu} />
                    <Container>
                        {this.props.children}
                        <Footer />
                    </Container>
                </Sidebar>
            </React.Fragment>
        )
    }
}

export default Layout;