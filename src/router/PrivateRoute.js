import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import Menu from '../components/Menu'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => {
        if (state.auth.uid) {
            return true
        }
        return false
    })

    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div className="app">
                    <Header />
                    <div className="conteudo-app">
                        <Menu />
                        <div className="conteudo-page">
                            <Component {...props} />
                        </div>

                    </div>
                </div>
            ) : (
                    <Redirect to="/" />
                )
        )} />
    )
}

export { PrivateRoute as default }