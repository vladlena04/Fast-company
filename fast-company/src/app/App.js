import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import UserEditForm from "./components/userEditForm";
import NotFound from "./components/notFound";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path='/' exact component={Main}/>
                <Route path='/login/:type?' component={Login}/>
                <Route path='/users/:userId?/edit' component={UserEditForm}/>
                <Route path='/users/:userId?' component={Users}/>
                <Route path='/404' component={NotFound}/>
                <Redirect from='/admin' to='/users/:user?'/>
                <Redirect to='/404'/>
            </Switch>
        </div>
    );
}

App.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default App;
