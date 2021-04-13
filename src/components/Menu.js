import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const Menu = () => {
  return (
    <div className="menu-lateral">
      <MenuList className="menu-lateral-paginacao">
        <MenuItem component={NavLink} to="/dashboard">
          Dashboard
        </MenuItem>
        <MenuItem component={NavLink} to="/clientes">
          Clientes
        </MenuItem>
        <MenuItem component={NavLink} to="/produtos">
          Produtos
        </MenuItem>
        <MenuItem component={NavLink} to="/vendas">
          Vendas
        </MenuItem>
        <MenuItem component={NavLink} to="/relatorios">
          Relatórios
        </MenuItem>
        <MenuItem component={NavLink} to="/ajuda">
          Ajuda
        </MenuItem>
      </MenuList>
    </div>
  );
};

export { Menu as default };
