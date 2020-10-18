import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { startAddCliente } from '../actions/clientes'
import ClienteForm from './ClienteForm'
import { removerEndereco} from '../actions/endereco'

const AddCliente = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(removerEndereco)
    })

    return (
        <ClienteForm onSubmit={data => {
            dispatch(startAddCliente(data))
            props.history.push('/clientes')
        }}
        />
    )
}

export { AddCliente as default }