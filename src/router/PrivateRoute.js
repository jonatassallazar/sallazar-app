import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Header'

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            <div>
                <Header />
                <Component {...props} />
            </div>
        )} />
    )


export { PrivateRoute as default }