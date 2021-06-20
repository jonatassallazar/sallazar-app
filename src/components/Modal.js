import { Close } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { StyledButton } from './forms/elements';
import Tipografia from './layout/Tipografia';

const Modal = styled.div`
  background-color: #0000009e;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

Modal.Content = styled.div`
  align-items: ${(props) => (props.alignment ? 'flex-start' : 'center')};
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 1.8rem;
  position: fixed;
  top: 50%;
  left: 50%;
  text-align: ${(props) => (props.alignment ? props.alignment : 'center')};
  transform: translate(-50%, -50%);
  width: ${(props) => (props.width ? props.width : 'auto')};
  z-index: 6;
`;

Modal.Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: ${({ theme }) => theme.spacing.large} 0;
`;

Modal.Close = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 3%;
  right: 2%;
  cursor: pointer;

  svg {
    width: 36px;
    height: 36px;
  }
`;

const ModalPage = ({
  title,
  description,
  btnPrimary,
  btnPrimaryFunction,
  btnPrimaryIcon,
  btnOutlined,
  btnOutlinedFunction,
  btnOutlinedIcon,
  btnSecondary,
  btnSecondaryFunction,
  btnSecondaryIcon,
  children,
  width,
  alignment,
  handleClose,
}) => {
  return (
    <Modal onClick={handleClose} role="background">
      <Modal.Content
        role="modalContent"
        width={width}
        alignment={alignment}
        onClick={(e) => e.stopPropagation()}
      >
        {handleClose && (
          <Modal.Close onClick={handleClose} role="closeButton">
            <Close />
          </Modal.Close>
        )}
        <Tipografia.H3>{title}</Tipografia.H3>
        <Tipografia.P>{description}</Tipografia.P>
        <Modal.Buttons>
          {btnPrimary && (
            <StyledButton
              data-testid="btn-primary-modal"
              startIcon={btnPrimaryIcon || undefined}
              variant="contained"
              onClick={btnPrimaryFunction}
            >
              {btnPrimary}
            </StyledButton>
          )}
          {btnOutlined && (
            <StyledButton.Outlined
              data-testid="btn-outlined-modal"
              startIcon={btnOutlinedIcon || undefined}
              variant="contained"
              onClick={btnOutlinedFunction}
            >
              {btnOutlined}
            </StyledButton.Outlined>
          )}
          {btnSecondary && (
            <StyledButton.Secondary
              data-testid="btn-secondary-modal"
              startIcon={btnSecondaryIcon || undefined}
              variant="contained"
              onClick={btnSecondaryFunction}
            >
              {btnSecondary}
            </StyledButton.Secondary>
          )}
        </Modal.Buttons>
        {children}
      </Modal.Content>
    </Modal>
  );
};

export default ModalPage;
