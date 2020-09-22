import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ClienteItem = ({ id, nome, telefone, email, dataDeNascimento }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{nome}</h3>
        </Link>
        <p>{telefone} | {email} |
        {moment(dataDeNascimento).format(` Do MMMM, YYYY`)}
        </p>

    </div>
)

export { ClienteItem as default }