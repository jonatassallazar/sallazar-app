import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmailFiltro, setNomeFiltro, setTelefoneFiltro, sortByNomeAsc, sortByNomeDec } from '../actions/filtrosClientes'

const FiltroCliente = (props) => {
    const dispatch = useDispatch()
    const { nome, email, telefone, sortBy } = useSelector((state) => state.filtrosClientes)

    return (
        <div>
            <input
                type="text"
                value={nome}
                onChange={(e) => {
                    dispatch(setNomeFiltro(e.target.value))
                }} />
            <input
                type="text"
                value={email}
                onChange={(e) => {
                    dispatch(setEmailFiltro(e.target.value))
                }} />
            <input
                type="text"
                value={telefone}
                onChange={(e) => {
                    dispatch(setTelefoneFiltro(e.target.value))
                }} />
            <select
                value={sortBy}
                onChange={(e) => {
                    if (e.target.value === 'nomeasc') {
                        dispatch(sortByNomeAsc())
                    } else if (e.target.value === 'nomedec') {
                        dispatch(sortByNomeDec())
                    }
                }}>
                <option value="nomeasc">Crescente</option>
                <option value="nomedec">Decrescente</option>
            </select>
        </div>
    )
}



export { FiltroCliente as default }