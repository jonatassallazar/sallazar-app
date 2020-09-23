import React from 'react'
import {useForm} from 'react-hook-form'

const ClienteForm = (props) => {

    const { register, handleSubmit, errors } = useForm()

    const {nome = "", telefone = "", email = "", dataDeNascimento = ""} = props.cliente || {}

    return (
        <div>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <label>Nome Completo</label>
                <input name="nome" defaultValue={nome} ref={register({
                    required: true
                })} />
                {errors.nome && <span>Este campo é obrigatório</span>}
                <label>Telefone</label>
                <input name="telefone" ref={register()} defaultValue={telefone}/>
                <label>E-mail</label>
                <input name="email" ref={register()} defaultValue={email}/>
                <label>Data de Nascimento</label>
                <input name="dataDeNascimento" ref={register()} defaultValue={dataDeNascimento}/>
                <input type="submit" />
            </form>
        </div>
    )
}

export { ClienteForm as default }