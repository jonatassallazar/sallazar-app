import { render, history } from '../utils/render';
import PrivateRoute from '../../router/PrivateRoute';
import { LoadingPage } from '../../components';
import authUser from '../fixtures/authUser';

describe('should check user state before load', () => {
  it('should load page', () => {
    history.push('/initial');

    render(<PrivateRoute component={LoadingPage} />, {
      initialState: {
        auth: authUser,
      },
    });

    expect(history.location).toHaveProperty('pathname', '/initial');
  });

  it('should NOT load page', () => {
    history.push('/initial');

    render(<PrivateRoute component={LoadingPage} />);

    expect(history.location).toHaveProperty('pathname', '/');
  });
});
