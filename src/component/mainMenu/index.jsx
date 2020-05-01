import React, { Component } from 'react'

import { withRouter } from 'react-router';
import MenuCollapse from './menuCollapse'
import MenuNode from './menuNode'

import { ListGroup } from 'react-bootstrap';

class MaterialUICollapseMenu extends Component {

    constructor() {
        super()
        this.state = { menu: [] };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const { menu } = this.state;
        menu[e] = !menu[e];
        this.setState({ menu });
    }

    render() {
        const { menu } = this.state;
        const { items } = this.props;
        return (
            <React.Fragment>
                {items.map((list, listIndex) => {
                    return (
                        <ListGroup key={`list${listIndex}`}>
                            {list.items.map((item, itemIndex) => {
                                return (
                                    <div key={`listItemStart${itemIndex}`}>
                                        {item.subitems != null ? (
                                            <MenuCollapse key={`MenuCollapse${item.id}`} menu={menu} item={item} handleClick={this.handleClick} />
                                        ) :
                                            (<MenuNode key={`MenuNode${item.id}`} data={item} />)
                                        }
                                    </div>
                                );
                            })}
                        </ListGroup>
                    );
                })}
            </React.Fragment>
        )
    }
}


export default withRouter((MaterialUICollapseMenu));