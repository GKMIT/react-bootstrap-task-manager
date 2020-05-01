import React from 'react';
import { withRouter } from 'react-router';
import { ListGroup, Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import MenuNode from './menuNode';

class MenuCollapse extends React.Component {

    render() {
        const { handleClick, menu, item, classes, nested, location } = this.props;

        // open menu if location is same
        if (location) {
            if (item) {
                if (item.subitems) {
                    item.subitems.forEach(em1 => {
                        if (em1.subitems) {
                            em1.subitems.forEach(em2 => {
                                if (location.pathname.startsWith(`${em2.link}`)) {
                                    menu[em1.id] = true;
                                    menu[item.id] = true;
                                }
                            });
                        } else {
                            if (location.pathname.startsWith(`${em1.link}`)) {
                                menu[item.id] = true;
                            }
                        }
                    });
                } else {
                    if (location.pathname.startsWith(`${item.id}`)) {
                        menu[item.id] = true;
                    }
                }
            }
        }

        return (
            <React.Fragment>

                <Accordion defaultActiveKey={item.id}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={item.id} onClick={() => { handleClick(item.id) }}>
                            {item.name}{" "}<FontAwesomeIcon icon={menu[item.id] ? faCaretUp : faCaretDown} />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={item.id}>

                            <ListGroup>
                                {item.subitems.map(
                                    sitem => {
                                        return (
                                            sitem.subitems != null ? (
                                                <MenuCollapse key={`SubMenuCollapse${sitem.id}`} menu={menu} classes={classes} item={sitem} handleClick={() => { handleClick(sitem.id) }} nested={true} />
                                            ) :
                                                (
                                                    <MenuNode key={`SubMenuNode${sitem.id}`} data={sitem} nested={true} subNested={nested} />
                                                )
                                        )
                                    }
                                )}
                            </ListGroup>

                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </React.Fragment>
        );
    }
}


export default withRouter((MenuCollapse));