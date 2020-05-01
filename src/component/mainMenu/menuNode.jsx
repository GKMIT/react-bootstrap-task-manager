import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

class MenuNode extends React.Component {

    render() {
        const { name, link } = this.props.data;

        return (
            <React.Fragment>
                <ListGroup.Item component={NavLink} to={link}>
                    <NavLink to={link}>{name}</NavLink>
                </ListGroup.Item>
            </React.Fragment>
        );
    }
}


export default MenuNode;