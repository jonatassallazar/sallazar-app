import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import selectClientes from '../selectors/clientes'
import ClienteItem from './ClienteItem'
import FiltroCliente from './FiltroCliente'

const Clientes = () => {
    const selection = useSelector((state) => selectClientes(state.clientes, state.filtrosClientes))

    return (
        <div>
            <h1>Clientes</h1>
            <Link to="/clientes/novo">Novo Cliente</Link>
            <FiltroCliente />
            { selection.map((cliente) => <ClienteItem key={cliente.id} {...cliente}/>)}
        </div>
    )
}

export { Clientes as default }