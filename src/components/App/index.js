import React from 'react';
import * as Sentry from '@sentry/browser';

import { AppContextProvider } from 'components/AppContext';
import Form from 'components/Form';
import Loader from 'components/Loader';
import Message from 'components/Message';

class App extends React.PureComponent {
  state = {
    loading: false,
    loadingError: null,
    Render: null
  }

  handleRender = async ({ syntax, expr }) => {
    this.setState({
      syntax,
      expr,
      loading: true,
      loadingError: null,
      Render: null
    });

    try {
      const Render = await import(
        /* webpackChunkName: "render-[index]" */
        'components/Render' // TODO: Import syntax-specific render component
      );

      // HACK: Fake loading time
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.setState({
        loading: false,
        Render: Render.default
      });
    }
    catch (e) {
      Sentry.captureException(e, { syntax });
      this.setState({
        loading: false,
        loadingError: e
      });
      throw e;
    }
  }

  handleRetry = event => {
    event.preventDefault();
    this.handleRender(this.state);
  }

  render() {
    const {
      loading,
      loadingError,
      Render
    } = this.state;

    return <AppContextProvider onExpressionChange={ this.handleRender }>
      <Form />

      { loading && <Loader /> }

      { loadingError && <Message type="error" heading="Render Failure">
        <p>An error occurred while rendering the regular expression.</p>
        <a href="#retry" onClick={ this.handleRetry }>Retry</a>
      </Message> }

      { Render && <Render /> }
    </AppContextProvider>;
  }
}

export default App;
