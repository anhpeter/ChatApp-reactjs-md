import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Route,
    Redirect,
    useHistory,
    useLocation,
} from "react-router-dom";
import { isLogged } from "../../features/auth/authSlice";

export default function AuthRoute({ ...rest }) {
    const logged = useSelector(isLogged);
    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        if (logged) {
            let { from } = location.state || { from: { pathname: "/" } };
            history.replace(from);
        }
    }, [logged])
    return (
        <Route {...rest}></Route>
    );
}