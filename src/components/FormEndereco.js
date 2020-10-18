import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEnderecoCompleto } from '../actions/endereco'
import TextField from '@material-ui/core/TextField'
import cep from 'cep-promise'

let CEPgenerated = false

const FormEndereco = (props) => {
    const dispatch = useDispatch()

    const { CEP = '', endereco, numero, complemento, bairro, cidade, estado } = useSelector((state) => state.endereco)

    //e = evento | f = final
    const onChange = ({ CEPe, enderecoe, numeroe, complementoe, bairroe, cidadee, estadoe }) => {
        const CEPf = CEPe || CEP
        const enderecof = enderecoe || endereco
        const numerof = numeroe || numero
        const complementof = complementoe || complemento
        const bairrof = bairroe || bairro
        const cidadef = cidadee || cidade
        const estadof = estadoe || estado

        const enderecoCompleto = {
            CEP: CEPf,
            endereco: enderecof,
            numero: numerof,
            complemento: complementof,
            bairro: bairrof,
            cidade: cidadef,
            estado: estadof
        }

        dispatch(setEnderecoCompleto(enderecoCompleto))
    }

    if (CEP.length === 8 && !CEPgenerated) {
        cep(CEP).then((valor) => {
            onChange({ enderecoe: valor.street, bairroe: valor.neighborhood, cidadee: valor.city, estadoe: valor.state })
            CEPgenerated = true
        }).catch((e) => {
            console.log(e);
            CEPgenerated = false
        })
    }



    return (
        <div>
            <TextField
                id="standard-basic"
                label="CEP"
                value={CEP}
                onChange={(e) => {
                    onChange({ CEPe: e.target.value })
                }}
            />
            <TextField
                id="standard-basic"
                label="Endereço"
                value={endereco}
                onChange={(e) => {
                    onChange({ enderecoe: e.target.value })
                }}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                id="standard-basic"
                label="Número"
                value={numero}
                onChange={(e) => {
                    onChange({ numeroe: e.target.value })
                }}
            />
            <TextField
                id="standard-basic"
                label="Complemento"
                value={complemento}
                onChange={(e) => {
                    onChange({ complementoe: e.target.value })
                }}
            />
            <TextField
                id="standard-basic"
                label="Bairro"
                value={bairro}
                onChange={(e) => {
                    onChange({ bairroe: e.target.value })
                }}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                id="standard-basic"
                label="Cidade"
                value={cidade}
                onChange={(e) => {
                    onChange({ cidadee: e.target.value })
                }}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                id="standard-basic"
                label="Estado"
                value={estado}
                onChange={(e) => {
                    onChange({ estadoe: e.target.value })
                }}
                InputLabelProps={{ shrink: true }}
            />
        </div>
    )
}

export { FormEndereco as default }