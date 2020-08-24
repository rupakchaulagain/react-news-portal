import React from "react";
import {Redirect, Route} from "react-router-dom";
import Cookies from "universal-cookie";

export const ProtectedRoute = ({
                                   component: Component,
                                   ...rest
                               }) => {

    const cookies = new Cookies();
    return (
        <Route
            {...rest}
            render={props => {
                if (cookies.get('token')!=null) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};