import React from 'react'
import { useDispatch } from 'react-redux'
import { startAddCliente } from '../actions/clientes'
import ClienteForm from './ClienteForm'

const AddCliente = (props) => {
    const dispatch = useDispatch()

    const onSubmit = data => {
        dispatch(startAddCliente(data))
        props.history.push('/clientes')
    }
  
    return (
        <ClienteForm onSubmit={onSubmit}/>
    )
}

export { AddCliente as default }