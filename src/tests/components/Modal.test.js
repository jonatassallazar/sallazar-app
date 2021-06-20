import { render, fireEvent, screen } from '../utils/render';
import { Modal } from '../../components';
import 'jest-styled-components';

it('should have title', () => {
  render(<Modal title="this is a test" />);

  expect(screen.getByRole('heading', { name: 'this is a test' })).toBeInTheDocument();
});

it('should have description', () => {
  render(<Modal description="lorem ipsum" />);

  expect(screen.getByText('lorem ipsum')).toBeInTheDocument();
});

describe('test buttons', () => {
  const mockBtn = jest.fn();

  it('should have a primary button', () => {
    render(<Modal btnPrimary="Click Me" btnPrimaryFunction={mockBtn} />);

    expect(screen.getByTestId('btn-primary-modal')).toBeInTheDocument();
  });

  it('should fire primary mocked buttton', () => {
    render(<Modal btnPrimary="Click Me" btnPrimaryFunction={mockBtn} />);

    fireEvent.click(screen.getByTestId('btn-primary-modal'));

    expect(mockBtn).toHaveBeenCalled();
  });

  it('should have a secondary button', () => {
    render(<Modal btnSecondary="Click Me" btnSecondaryFunction={mockBtn} />);

    expect(screen.getByTestId('btn-secondary-modal')).toBeInTheDocument();
  });

  it('should fire secondary mocked buttton', () => {
    render(<Modal btnSecondary="Click Me" btnSecondaryFunction={mockBtn} />);

    fireEvent.click(screen.getByTestId('btn-secondary-modal'));

    expect(mockBtn).toHaveBeenCalled();
  });

  it('should have a outlined button', () => {
    render(<Modal btnOutlined="Click Me" btnOutlinedFunction={mockBtn} />);

    expect(screen.getByTestId('btn-outlined-modal')).toBeInTheDocument();
  });

  it('should fire outlined mocked buttton', () => {
    render(<Modal btnOutlined="Click Me" btnOutlinedFunction={mockBtn} />);

    fireEvent.click(screen.getByTestId('btn-outlined-modal'));

    expect(mockBtn).toHaveBeenCalled();
  });
});

it('should close modal with click on background', () => {
  const mockClose = jest.fn();

  render(<Modal handleClose={mockClose} />);

  fireEvent.click(screen.getByRole('background'));

  expect(mockClose).toHaveBeenCalled();
});

it('should NOT close modal with click on content', () => {
  const mockClose = jest.fn();

  render(<Modal handleClose={mockClose} />);

  fireEvent.click(screen.getByRole('modalContent'));

  expect(mockClose).toHaveBeenCalledTimes(0);
});

it('should close modal with click on close button icon', () => {
  const mockClose = jest.fn();

  render(<Modal handleClose={mockClose} />);

  fireEvent.click(screen.getByRole('closeButton'));
  expect(mockClose).toHaveBeenCalled();
});

it('should have width and alignment attributes by props', () => {
  render(<Modal alignment="left" width="250px" />);

  expect(screen.getByRole('modalContent')).toHaveStyleRule('align-items', 'flex-start');
  expect(screen.getByRole('modalContent')).toHaveStyleRule('text-align', 'left');
  expect(screen.getByRole('modalContent')).toHaveStyleRule('width', '250px');
});

it('should have width and alignment attributes by default', () => {
  render(<Modal />);

  expect(screen.getByRole('modalContent')).toHaveStyleRule('align-items', 'center');
  expect(screen.getByRole('modalContent')).toHaveStyleRule('text-align', 'center');
  expect(screen.getByRole('modalContent')).toHaveStyleRule('width', 'auto');
});
