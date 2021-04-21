import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

const MenuLateral = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  min-width: 200px;
  min-height: 100%;
  flex-direction: column;
  background-color: #f9f9f9;
  box-shadow: #d2d2d2 3px 6px 6px;
  z-index: 2;

  a.active {
    background-color: #f1f1f1;
}
`;

const Menu = () => {
  return (
    <MenuLateral>
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
    </MenuLateral>
  );
};

export { Menu as default };
