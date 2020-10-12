import React, { useState, useEffect } from 'react'
import FormEndereco from './FormEndereco'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

let hasPopulated = false

const ClienteForm = (props) => {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [dataDeNascimento, setDataDeNascimento] = useState(new Date())
    const [status, setStatus] = useState('Ativo')
    const [genero, setGenero] = useState('')
    //const [foto, setFoto] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [error, setError] = useState('')

    const tags = [
        'Teste',
        'Pagador',
        'Devedor'
    ]

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
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Ativo">Ativo</MenuItem>
                    <MenuItem value="Inativo">Inativo</MenuItem>
                </Select>
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
                <Select
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                >
                    <MenuItem value=''></MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                </Select>
                <DatePicker
                    id="date"
                    label="Data de Nascimento"
                    value={dataDeNascimento}
                    onChange={(e) => setDataDeNascimento(e._d)}
                />
                <Select
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {tags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                            <ListItemText primary={tag} />
                        </MenuItem>
                    ))}
                </Select>
                <FormEndereco/>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                >Salvar</Button>
            </form>
            {error ? <p>{error}</p> : null}
        </div>
    )
}

export { ClienteForm as default }