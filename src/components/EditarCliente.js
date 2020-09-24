import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startEditCliente, startRemoveCliente } from '../actions/clientes'
import ClienteForm from './ClienteForm'

const EditarCliente = (props) => {
    
    const dispatch = useDispatch()
    const cliente = useSelector((state) => {
        return state.clientes.find((cliente) => cliente.id === props.match.params.id)
    })
    
    const onSubmit = data => {
        dispatch(startEditCliente(cliente.id, data)).then(() => props.history.push('/clientes'))
    }
  
    return (
        <div>
        <ClienteForm 
        cliente={cliente}
        onSubmit={onSubmit}/>
        <button onClick={() => {
          dispatch(startRemoveCliente({ id: cliente.id })).then(() => {
            props.history.push('/clientes')
        })
        }}>Remove</button>
        </div>
    )
}

export { EditarCliente as default }
