import React from 'react'
import { useDispatch } from 'react-redux'
import { startAddCliente } from '../actions/clientes'
import ClienteForm from './ClienteForm'

const AddCliente = (props) => {
    const dispatch = useDispatch()

    return (
        <ClienteForm onSubmit={data => {
            dispatch(startAddCliente(data))
            props.history.push('/clientes')
        }}
        />
    )
}

export { AddCliente as default }