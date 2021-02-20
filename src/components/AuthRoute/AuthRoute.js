import React from "react";
import { useSelector } from "react-redux";
import {
    Route,
    Redirect,
    useHistory,
    useLocation,
} from "react-router-dom";
import { isLogged } from "../../features/auth/authSlice";

export default function AuthRoute({ children, ...rest }) {
    const logged = useSelector(isLogged);
    const location = useLocation();
    const history = useHistory();
    if (logged) {
        let { from } = location.state || { from: { pathname: "/" } };
        history.replace(from);
    }
    return (
        <Route {...rest}>{children}</Route>
    );
}