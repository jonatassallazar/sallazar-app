import React, { useState, useEffect } from 'react';
import FormEndereco from '../forms/FormEndereco';
import Form from '../forms/Form';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Input,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import CurrencyFormat from 'react-currency-format';

let hasPopulated = false;

const ClienteForm = (props) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState(null);
  const [status, setStatus] = useState('Ativo');
  const [genero, setGenero] = useState('');
  //const [foto, setFoto] = useState('')
  const [selectedTags, setSelectedTags] = useState([]);
  const [CEP, setCEP] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [error, setError] = useState('');

  const tags = ['Teste', 'Pagador', 'Devedor'];

  //Popula os campos
  if (props.cliente && !hasPopulated) {
    setNome(props.cliente.nome);
    setTelefone(props.cliente.telefone);
    setEmail(props.cliente.email);
    setDataDeNascimento(props.cliente.dataDeNascimento);
    setStatus(props.cliente.status || ['Ativo']);
    setGenero(props.cliente.genero || '');
    setSelectedTags(props.cliente.selectedTags || []);
    setCEP(props.cliente.enderecoCompleto.CEP || '');
    setEndereco(props.cliente.enderecoCompleto.endereco || '');
    setNumero(props.cliente.enderecoCompleto.numero || '');
    setComplemento(props.cliente.enderecoCompleto.complemento || '');
    setBairro(props.cliente.enderecoCompleto.bairro || '');
    setCidade(props.cliente.enderecoCompleto.cidade || '');
    setEstado(props.cliente.enderecoCompleto.estado || '');
    setCreatedAt(props.cliente.createdAt);
    hasPopulated = true;
  }

  const enderecoCompleto = {
    CEP,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
  };

  //Limpa a função de popular os campos
  useEffect(() => {
    return () => (hasPopulated = false);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!nome) {
      setError('Digite um nome para o cliente');
      // Set error state equal to 'Please provide description and amount.'
    } else {
      setError('');
      // Clear the error
      props.onSubmit({
        nome,
        email,
        telefone,
        dataDeNascimento: dataDeNascimento.valueOf(),
        status,
        genero,
        selectedTags,
        enderecoCompleto,
        createdAt: createdAt.valueOf(),
      });
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Ativo">Ativo</MenuItem>
          <MenuItem value="Inativo">Inativo</MenuItem>
        </Select>
        <TextField
          id="standard-basic nome"
          label="Nome Completo"
          required={true}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <CurrencyFormat
          id="standard-basic"
          label="Telefone"
          value={telefone}
          onValueChange={(e) => setTelefone(e.value)}
          customInput={TextField}
          isNumericString={true}
          format="(##)#####-####"
          mask="_"
        />
        <TextField
          id="standard-basic email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
          <Select
            autoWidth
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <MenuItem value="" disabled>
              Sexo
            </MenuItem>
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          id="date"
          label="Data de Nascimento"
          format="DD/MM/YYYY"
          value={dataDeNascimento}
          onChange={(e) => setDataDeNascimento(e._d)}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Tags</InputLabel>
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
        </FormControl>
        <FormEndereco
          CEP={CEP}
          setCEP={setCEP}
          endereco={endereco}
          setEndereco={setEndereco}
          numero={numero}
          setNumero={setNumero}
          complemento={complemento}
          setComplemento={setComplemento}
          bairro={bairro}
          setBairro={setBairro}
          cidade={cidade}
          setCidade={setCidade}
          estado={estado}
          setEstado={setEstado}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button>
      </Form>
      {error ? <p>{error}</p> : null}
    </>
  );
};

export { ClienteForm as default };
