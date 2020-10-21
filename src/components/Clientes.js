import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import selectClientes from '../selectors/clientes'
import ClienteItem from './ClienteItem'
import FiltroCliente from './FiltroCliente'
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'
import { startSetClientes } from '../actions/clientes'

const Clientes = () => {
    const selection = useSelector((state) => selectClientes(state.clientes, state.filtrosClientes))
    const dispatch = useDispatch()

    dispatch(startSetClientes())
    
    return (
        <div>
            <h1>Clientes</h1>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                component={Link}
                to="/clientes/novo"
            >
                Novo Cliente
            </Button>
            <FiltroCliente />
            {selection.map((cliente) => <ClienteItem key={cliente.id} {...cliente} />)}
        </div>
    )
}

export { Clientes as default }