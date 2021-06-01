import { render, history } from '../utils/render';
import PublicRoute from '../../router/PublicRoute';
import { LoadingPage } from '../../components';
import authUser from '../fixtures/authUser';

describe('should check user state before load', () => {
  it('should load Dashboard', () => {
    render(<PublicRoute component={LoadingPage} />, {
      initialState: {
        auth: authUser,
      },
    });

    expect(history.location).toHaveProperty('pathname', '/dashboard');
  });

  it('should load the public page', () => {
    history.push('/public');

    render(<PublicRoute component={LoadingPage} />);

    expect(history.location).toHaveProperty('pathname', '/public');
  });
});
