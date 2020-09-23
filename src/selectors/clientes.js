export default (clientes, { nome, sortBy, email, telefone }) => {
  return clientes.filter((cliente) => {
    const nomeMatch = cliente.nome.toLowerCase().includes(nome.toLowerCase())
    const emailMatch = cliente.email.toLowerCase().includes(email.toLowerCase())
    const telefoneMatch = cliente.telefone.toLowerCase().includes(telefone.toLowerCase())

    return nomeMatch && emailMatch && telefoneMatch
    // eslint-disable-next-line
  }).sort((a, b) => {
    if (sortBy === 'nomeasc') {
      return a.nome > b.nome ? 1 : -1
    } else if (sortBy === 'nomedec') {
      return a.nome < b.nome ? 1 : -1
    }
  })
}