import React from "react";
import { useSelector } from "react-redux";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { isLogged } from "../features/auth/authSlice";

export default function PrivateRoute({ children, ...rest }) {
    const logged = useSelector(isLogged);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                logged ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}