import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers';

const ClienteForm = (props) => {
    const {nome: nomeP, telefone: telefoneP, email: emailP, dataDeNascimento: dataDeNascimentoP} = props.cliente || { dataDeNascimentoP: new Date()}

    const [nome, setNome] = useState(nomeP)
    const [telefone, setTelefone] = useState(telefoneP)
    const [email, setEmail] = useState(emailP)
    const [dataDeNascimento, setDataDeNascimento] = useState(dataDeNascimentoP)

    const [error, setError] = useState('')

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
                    onChange={setDataDeNascimento}
                />

                <Button variant="contained" color="primary" type="submit">Enviar</Button>
            </form>
            {error ? <p>{error}</p> : null}
        </div>
    )
}

export { ClienteForm as default }