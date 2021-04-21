import React, { useState } from 'react';
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
import { Save, Delete } from '@material-ui/icons';
import InputMask from 'react-input-mask';

const ClienteForm = (props) => {
  const [nome, setNome] = useState(props.cliente?.nome || '');
  const [telefone, setTelefone] = useState(props.cliente?.telefone || '');
  const [email, setEmail] = useState(props.cliente?.email || '');
  const [dataDeNascimento, setDataDeNascimento] = useState(
    props.cliente?.dataDeNascimento || null
  );
  const [status, setStatus] = useState(props.cliente?.status || 'Ativo');
  const [genero, setGenero] = useState(props.cliente?.genero || '');
  //const [foto, setFoto] = useState('')
  const [selectedTags, setSelectedTags] = useState(
    props.cliente?.selectedTags || []
  );
  const [CEP, setCEP] = useState(props.cliente?.enderecoCompleto.CEP || '');
  const [endereco, setEndereco] = useState(
    props.cliente?.enderecoCompleto.endereco || ''
  );
  const [numero, setNumero] = useState(
    props.cliente?.enderecoCompleto.numero || ''
  );
  const [complemento, setComplemento] = useState(
    props.cliente?.enderecoCompleto.complemento || ''
  );
  const [bairro, setBairro] = useState(
    props.cliente?.enderecoCompleto.bairro || ''
  );
  const [cidade, setCidade] = useState(
    props.cliente?.enderecoCompleto.cidade || ''
  );
  const [estado, setEstado] = useState(
    props.cliente?.enderecoCompleto.estado || ''
  );
  const [createdAt] = useState(props.cliente?.createdAt || new Date());
  const [error, setError] = useState('');

  const tags = ['Teste', 'Pagador', 'Devedor'];

  const enderecoCompleto = {
    CEP,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
  };

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

  const replacer = (match, p1, p2, p3) => {
    return [p1, p2, p3].join('');
  };

  const getRawValue = (value) => {
    const newValue = value.replace(/\((\d*)\)(\d*)-(\d*)/, replacer);
    console.log(newValue);
    return newValue;
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Division>
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
          <InputMask
            value={telefone}
            onChange={(e) => setTelefone(getRawValue(e.target.value))}
            mask="(99)99999-9999"
            maskChar=""
          >
            {(inputProps) => (
              <TextField
                id="standard-basic"
                label="Telefone"
                type="tel"
                {...inputProps}
              />
            )}
          </InputMask>
          <TextField
            id="standard-basic email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Division>
        <Form.Division>
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
        </Form.Division>
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
        {error && <p>{error}</p>}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<Save />}
        >
          Salvar
        </Button>
        {props?.handleDelete && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Delete />}
            onClick={props?.handleDelete}
          >
            Remove
          </Button>
        )}
      </Form>
    </>
  );
};

export { ClienteForm as default };
