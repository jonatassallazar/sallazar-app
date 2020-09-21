import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import selectClientes from '../selectors/clientes'
import ClienteItem from './ClienteItem'

const Clientes = () => {
    const selection = useSelector((state) => selectClientes(state.clientes))

    return (
        <div>
            <h1>Clientes</h1>
            <Link to="/clientes/novo">Novo Cliente</Link>
            {
                selection.map((cliente) => (
                    <ClienteItem {...cliente} key={cliente.id} />

                ))
            }
        </div>
    )
}

export { Clientes as default }