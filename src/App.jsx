import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/login';
import AdminRoutes from './adminRoutes';
import { connect } from 'react-redux';
import { loaderActions, confirmActions, alertActions } from './_actions';

class App extends React.Component {

    componentDidMount() {
        this.props.clearAlerts();
        this.props.clearConfirms();
        this.props.hideLoader();
    }

    render() {
        return (
            <React.Fragment>        
                <Router>
                    <Switch>
                        <Route path='/' exact component={Login} />
                        <AdminRoutes />
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}


function mapState() {
    return {}
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    clearConfirms: confirmActions.clear,    
    hideLoader: loaderActions.hide,
};

export default (connect(mapState, actionCreators)(App));
