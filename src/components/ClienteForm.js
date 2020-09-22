import React from 'react'
import {useForm} from 'react-hook-form'

const ClienteForm = (props) => {

    const { register, handleSubmit, errors } = useForm()

    return (
        <div>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <label>Nome Completo</label>
                <input name="nome" defaultValue="" ref={register({
                    required: true
                })} />
                {errors.nome && <span>Este campo é obrigatório</span>}
                <label>Telefone</label>
                <input name="telefone" ref={register()} />
                <label>E-mail</label>
                <input name="email" ref={register()} />
                <label>Data de Nascimento</label>
                <input name="dataDeNascimento" ref={register()} />
                <input type="submit" />
            </form>
        </div>
    )
}

export { ClienteForm as default }