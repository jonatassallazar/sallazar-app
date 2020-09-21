import React from 'react'
import { NavLink } from 'react-router-dom'
import { startLogout } from '../actions/auth'
import { useDispatch } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()

    const logout = () => { dispatch(startLogout()) }

    return (
        <div>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/clientes">Clientes</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <NavLink to="/vendas">Vendas</NavLink>
            <NavLink to="/relatorios">Relatórios</NavLink>
            <NavLink to="/ajuda">Ajuda</NavLink>
            <button onClick={logout}>Sair</button>
        </div>
    )
}

export { Header as default }