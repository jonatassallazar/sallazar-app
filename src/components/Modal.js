import React from 'react';
import styled from 'styled-components';
import { StyledButton } from './forms/elements';

const Modal = styled.div`
  background-color: #0000009e;
  height: 100%;
  width: 100%;
`;

Modal.Content = styled.div`
  align-items: center;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 1.8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  width: auto;
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

const ModalPage = ({
  title,
  description,
  btnPrimary,
  btnPrimaryFunction,
  btnPrimaryIcon
}) => {
  return (
    <Modal>
      <Modal.Content>
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
      </Modal.Content>
    </Modal>
  );
};

export default ModalPage;
