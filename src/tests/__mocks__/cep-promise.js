const mockAdress = {
  street: 'street ok',
  neighborhood: 'neighbour',
  city: 'Atlanta',
  state: 'Nevada',
};

const cep = () => {
  return Promise.resolve(mockAdress);
};

export default cep;
