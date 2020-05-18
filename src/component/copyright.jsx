import React from 'react';
import { appTitle } from '../theme/constant';


class Copyright extends React.Component {

    showCurrentYear = () => {
        return new Date().getFullYear();
    }

    render() {
        return (
            <React.Fragment>
                <p>
                    All rights reserved
                    {' '}{appTitle}{' '}
                    &copy; {this.showCurrentYear()}
                </p>
            </React.Fragment>
        )

    }
}

export default Copyright;