import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

class MenuNode extends React.Component {

    render() {
        const { classes, nested, subNested } = this.props;
        const { name, icon, link } = this.props.data;
        let nestedClass = '';
        // if (nested) {
        //     nestedClass = classes.nested
        // }

        // if (subNested) {
        //     nestedClass = classes.subNested
        // }

        return (
            <React.Fragment>
                <ListGroup.Item component={NavLink} to={link} exact>
                    {/* {icon && <ListItemIcon><Icon>{icon}</Icon></ListItemIcon>} */}
                    
                    <NavLink to={link}>{name}</NavLink>
                </ListGroup.Item>
            </React.Fragment>
        );
    }
}


export default MenuNode;