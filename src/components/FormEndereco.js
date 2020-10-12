import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import cep from 'cep-promise'

const FormEndereco = (props) => {
    const [CEP, setCEP] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')

    if (CEP.length === 8) {
        cep(CEP).then((valor) => {
            setEndereco(valor.street)
            setBairro(valor.neighborhood)
            setCidade(valor.city)
            setEstado(valor.state)
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <div>
            <TextField
                id="standard-basic"
                label="CEP"
                value={CEP}
                onChange={(e) => setCEP(e.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            />
            
        </div>
    )
}

export { FormEndereco as default }