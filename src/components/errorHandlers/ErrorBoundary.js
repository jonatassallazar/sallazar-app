import React from 'react';
import { connect } from 'react-redux';
import { logNewError } from '../../actions/errors';
import ErrorPage from './ErrorPage';
import moment from 'moment';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, hasLogged: false, logMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props
      .dispatch(
        logNewError({
          error: error.toString(),
          errorInfo: errorInfo.componentStack,
          createdAt: +moment(),
        })
      )
      .then(() => {
        this.setState({ hasLogged: true, logMessage: '' });
      })
      .catch((err) => {
        this.setState({ hasLogged: false, logMessage: err });
      });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          logMessage={this.state.logMessage}
          hasLogged={this.state.hasLogged}
        />
      );
    }

    return this.props.children;
  }
}

export default connect()(ErrorBoundary);
