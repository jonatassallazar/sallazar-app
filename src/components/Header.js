import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {

    return (
        <div>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/clientes">Clientes</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <NavLink to="/vendas">Vendas</NavLink>
            <NavLink to="/relatorios">Relatórios</NavLink>
            <NavLink to="/ajuda">Ajuda</NavLink>
        </div>
    )
}

export {Header as default}