import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import cep from 'cep-promise'


let CEPerror = false

const FormEndereco = ({
    CEP, setCEP, endereco, setEndereco, numero, setNumero, complemento, setComplemento, bairro, setBairro, cidade, setCidade, estado, setEstado
}) => {

    const [CEPErrorText, setCEPErrorText] = useState(undefined)

    useEffect(() => {
        return () => {
            CEPerror = false
        }
        // eslint-disable-next-line
    }, [])

    const gerarEndereco = (event) => {
        if(event.length === 8) {
            cep(event).then((valor) => {
                setEndereco(valor.street)
                setBairro(valor.neighborhood)
                setCidade(valor.city)
                setEstado(valor.state)
                CEPerror = false
                setCEPErrorText(undefined)
            }).catch((e) => {
                CEPerror = true
                setCEPErrorText('CEP Inválido')
            })
        }
    }


return (
    <div>
        <TextField
            id="standard-basic"
            label="CEP"
            value={CEP}
            error={CEPerror}
            helperText={CEPErrorText}
            onChange={(e) => {
                setCEP(e.target.value)
                gerarEndereco(e.target.value)
            }}
        />
        <TextField
            id="standard-basic"
            label="Endereço"
            value={endereco}
            onChange={(e) => {
                setEndereco(e.target.value)
            }}
            InputLabelProps={{ shrink: true }}
        />
        <TextField
            id="standard-basic"
            label="Número"
            value={numero}
            onChange={(e) => {
                setNumero(e.target.value)
            }}
        />
        <TextField
            id="standard-basic"
            label="Complemento"
            value={complemento}
            onChange={(e) => {
                setComplemento(e.target.value)
            }}
        />
        <TextField
            id="standard-basic"
            label="Bairro"
            value={bairro}
            onChange={(e) => {
                setBairro(e.target.value)
            }}
            InputLabelProps={{ shrink: true }}
        />
        <TextField
            id="standard-basic"
            label="Cidade"
            value={cidade}
            onChange={(e) => {
                setCidade(e.target.value)
            }}
            InputLabelProps={{ shrink: true }}
        />
        <TextField
            id="standard-basic"
            label="Estado"
            value={estado}
            onChange={(e) => {
                setEstado(e.target.value)
            }}
            InputLabelProps={{ shrink: true }}
        />
    </div>
)
}

export { FormEndereco as default }