import { Close } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { StyledButton } from './forms/elements';

const Modal = styled.div`
  background-color: #0000009e;
  height: 100vh;
  width: 100vw;
  position: absolute;
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
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: ${(props) => (props.alignment ? props.alignment : 'center')};
  transform: translate(-50%, -50%);
  width: ${(props) => (props.width ? props.width : 'auto')};
  z-index: 6;
`;

Modal.Title = styled.h1`
  font-size: 2.4rem;
  margin: 0 0 0.5rem;
`;

Modal.Description = styled.p`
  font-size: 1.6rem;
  margin: 0.5rem 0 1.8rem;
  word-wrap: normal;
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
  children,
  width,
  alignment,
  handleClose,
}) => {
  return (
    <Modal onClick={handleClose}>
      <Modal.Content
        width={width}
        alignment={alignment}
        onClick={(e) => e.stopPropagation()}
      >
        {handleClose && (
          <Modal.Close onClick={handleClose}>
            <Close />
          </Modal.Close>
        )}
        <Modal.Title>{title}</Modal.Title>
        <Modal.Description>{description}</Modal.Description>
        {btnPrimary && (
          <StyledButton
            startIcon={btnPrimaryIcon || undefined}
            variant="contained"
            color="primary"
            onClick={btnPrimaryFunction}
          >
            {btnPrimary}
          </StyledButton>
        )}
        {children}
      </Modal.Content>
    </Modal>
  );
};

export default ModalPage;
