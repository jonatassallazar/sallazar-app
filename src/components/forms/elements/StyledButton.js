import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.primary};
    margin: 0 ${({ theme }) => theme.spacing.medium};
    color: ${({ theme }) => theme.colors.pText};
  }

  &&:hover {
    background-color: ${({ theme }) => theme.colors.pDark};
  }
`;

StyledButton.Secondary = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.secondary};
    margin: 0 ${({ theme }) => theme.spacing.medium};
    color: ${({ theme }) => theme.colors.sText};
  }

  &&:hover {
    background-color: ${({ theme }) => theme.colors.sDark};
    color: ${({ theme }) => theme.colors.sText};
  }
`;

StyledButton.Outlined = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.bgColor};
    border: ${({ theme }) => theme.colors.primary} solid 1px;
    margin: 0 ${({ theme }) => theme.spacing.medium};
  }

  &&:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.pText};
  }
`;

StyledButton.Borderless = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.bgColor};
    border: none;
    margin: 0 ${({ theme }) => theme.spacing.medium};
  }

  &&:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: none;
  }
`;

StyledButton.Icon = styled(StyledButton)`
  && {
    margin: 0;
    min-width: 30px;
    padding: ${({ theme }) => theme.spacing.medium};
    line-height: 1;
  }

  &&:hover {
  }
`;

StyledButton.OnlyIcon = styled(Button)`
  && {
    margin: 0;
    min-width: 30px;
    padding: 0 ${({ theme }) => theme.spacing.small} 0 0;
    background: none;
  }

  &&:hover {
    background: none;
  }
`;

StyledButton.Link = styled(Link)`
  color: inherit;
`;

export default StyledButton;
