const clientesSelector = (clientes, { nome, email, telefone }) => {
  return clientes.filter((cliente) => {
    const nomeMatch = cliente.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(
        nome
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      );
    const emailMatch = cliente.email
      .toLowerCase()
      .includes(email.toLowerCase());
    const telefoneMatch = cliente.telefone
      .toLowerCase()
      .includes(telefone.toLowerCase());

    return nomeMatch && emailMatch && telefoneMatch;
    // eslint-disable-next-line
  });
};

export default clientesSelector;
