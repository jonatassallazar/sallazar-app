import { render, fireEvent, screen } from '../utils/render';
import { Modal } from '../../components';
import 'jest-styled-components';

it('should have title', () => {
  render(<Modal title="this is a test" />);

  expect(screen.getByRole('heading')).toHaveTextContent('this is a test');
});

it('should have description', () => {
  render(<Modal description="lorem ipsum" />);

  expect(screen.getByText('lorem ipsum')).toBeTruthy();
});

describe('test button', () => {
  const mockBtn = jest.fn();

  it('should have button', () => {
    render(<Modal btnPrimary="Click Me" btnPrimaryFunction={mockBtn} />);

    expect(screen.getByRole('button', { name: 'Click Me' })).toBeTruthy();
  });

  it('should fire mocked buttton', () => {
    render(<Modal btnPrimary="Click Me" btnPrimaryFunction={mockBtn} />);

    fireEvent(
      screen.getByRole('button', { name: 'Click Me' }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(mockBtn).toHaveBeenCalled();
  });
});

it('should close modal with click on background', () => {
  const mockClose = jest.fn();

  render(<Modal handleClose={mockClose} />);

  fireEvent(
    screen.getByRole('background'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockClose).toHaveBeenCalled();
});

it('should NOT close modal with click on content', () => {
  const mockClose = jest.fn();

  render(<Modal handleClose={mockClose} />);

  fireEvent(
    screen.getByRole('modalContent'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockClose).toHaveBeenCalledTimes(0);
});

it('should close modal with click on close button icon', () => {
  const mockClose = jest.fn();

  render(<Modal handleClose={mockClose} />);

  fireEvent(
    screen.getByRole('closeButton'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockClose).toHaveBeenCalled();
});

it('should have width and alignment attributes by props', () => {
  render(<Modal alignment="left" width="250px" />);

  expect(screen.getByRole('modalContent')).toHaveStyleRule(
    'align-items',
    'flex-start'
  );
  expect(screen.getByRole('modalContent')).toHaveStyleRule(
    'text-align',
    'left'
  );
  expect(screen.getByRole('modalContent')).toHaveStyleRule('width', '250px');
});

it('should have width and alignment attributes by default', () => {
  render(<Modal />);

  expect(screen.getByRole('modalContent')).toHaveStyleRule(
    'align-items',
    'center'
  );
  expect(screen.getByRole('modalContent')).toHaveStyleRule(
    'text-align',
    'center'
  );
  expect(screen.getByRole('modalContent')).toHaveStyleRule('width', 'auto');
});
