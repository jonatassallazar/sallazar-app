import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers';

let hasPopulated = false

const ClienteForm = (props) => {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [dataDeNascimento, setDataDeNascimento] = useState(new Date())

    const [error, setError] = useState('')

    //Popula os campos
    if (props.cliente && !hasPopulated) {
        setNome(props.cliente.nome)
        setTelefone(props.cliente.telefone)
        setEmail(props.cliente.email)
        setDataDeNascimento(props.cliente.dataDeNascimento)
        hasPopulated = true
    }

    //Limpa a função de popular os campos
    useEffect(() => {
        return () => hasPopulated = false
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!nome) {
            setError('Digite um nome para o cliente')
            // Set error state equal to 'Please provide description and amount.'
        } else {
            setError('')
            // Clear the error
            props.onSubmit({
                nome,
                email,
                telefone,
                dataDeNascimento: dataDeNascimento.valueOf()
            })
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField
                    id="standard-basic"
                    label="Nome Completo"
                    required={true}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <DatePicker
                    id="date"
                    label="Data de Nascimento"
                    value={dataDeNascimento}
                    onChange={(e) => setDataDeNascimento(e._d)}
                />

                <Button variant="contained" color="primary" type="submit">Enviar</Button>
            </form>
            {error ? <p>{error}</p> : null}
        </div>
    )
}

export { ClienteForm as default }