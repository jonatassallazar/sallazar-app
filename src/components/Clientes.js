import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import selectClientes from '../selectors/clientes'
import ClienteItem from './ClienteItem'
import FiltroCliente from './FiltroCliente'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import { Add } from '@material-ui/icons'

const Clientes = () => {
    const selection = useSelector((state) => selectClientes(state.clientes, state.filtrosClientes))

    return (
        <div>
            <h1>Clientes</h1>
            <Button startIcon={<Icon></Icon>} component={Link} to="/clientes/novo">Novo Cliente</Button>
            <FiltroCliente />
            {selection.map((cliente) => <ClienteItem key={cliente.id} {...cliente} />)}
        </div>
    )
}

export { Clientes as default }