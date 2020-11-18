import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const VendaItem = ({ id, numero, total, status, vendaData, cliente }) => (
    <div className="lista-itens">
        <Link to={`/vendas/editar/${id}`}>
            <h3>{numero | cliente}</h3>
        </Link>
        <p>{status} | {total} |
        {moment(vendaData).format(` DD/MM/YY`)}
        </p>

    </div>
)

export { VendaItem as default }