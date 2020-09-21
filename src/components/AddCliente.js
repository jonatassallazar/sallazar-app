import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { startAddCliente } from '../actions/clientes'



const AddCliente = (props) => {
    const dispatch = useDispatch()

    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => {
        dispatch(startAddCliente(data))
        props.history.push('/clientes')
    }

    
   
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Nome Completo</label>
                <input name="nome" defaultValue="" ref={register({
                    required: true
                })} />
                {errors.nome && <span>Este campo é obrigatório</span>}
                <label>Telefone</label>
                <input name="telefone" ref={register()} />
                <label>E-mail</label>
                <input name="email" ref={register()}/>
                <label>Data de Nascimento</label>
                <input name="dataDeNascimento" ref={register()}/>

                <input type="submit" />
            </form>
        </div>
    )
}

export { AddCliente as default }