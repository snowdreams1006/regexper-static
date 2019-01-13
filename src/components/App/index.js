import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import URLSearchParams from '@ungap/url-search-params';

import Form from 'components/Form';
import FormActions from 'components/FormActions';
import Loader from 'components/Loader';
import Message from 'components/Message';

class App extends React.PureComponent {
  state = {
    loading: false,
    loadingError: null,
    Render: null
  }

  componentDidMount() {
    if (this.props.expr) {
      this.handleRender();
    }
  }

  componentDidUpdate(prevProps) {
    const { syntax, expr } = this.props;

    if (syntax !== prevProps.syntax || expr !== prevProps.expr) {
      this.handleRender();
    }
  }

  handleSubmit = ({ syntax, expr }) => {
    if (expr) {
      document.location.hash = new URLSearchParams({
        syntax,
        expr
      }).toString();
    }
  }

  handleRender = async () => {
    const { syntax, expr } = this.props;

    this.setState({
      loading: false,
      loadingError: null,
      Render: null
    });

    if (!expr) {
      return;
    }

    this.setState({
      loading: true
    });

    try {
      const Render = await import(
        /* webpackChunkName: "render-[index]" */
        `syntax/${ syntax }`
      );

      // HACK: Fake loading time
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.setState({
        loading: false,
        Render: Render.default
      });
    }
    catch (e) {
      Sentry.withScope(scope => {
        scope.setExtra('syntax', syntax);
        Sentry.captureException(e);
      });
      this.setState({
        loading: false,
        loadingError: e
      });
      throw e;
    }
  }

  handleRetry = event => {
    event.preventDefault();
    this.handleRender();
  }

  handleSvg = imageDetails => this.setState({ imageDetails });

  render() {
    const {
      syntax,
      expr,
      permalinkUrl,
      syntaxList
    } = this.props;
    const {
      loading,
      loadingError,
      Render,
      imageDetails
    } = this.state;

    const formProps = {
      onSubmit: this.handleSubmit,
      syntax,
      expr,
      syntaxList
    };
    const actionProps = {
      imageDetails,
      permalinkUrl
    };
    const renderProps = {
      onRender: this.handleSvg,
      expr
    };

    return <>
      <Form { ...formProps }>
        { Render && <FormActions { ...actionProps } /> }
      </Form>

      { loading && <Loader /> }

      { loadingError && <Message type="error" heading="Render Failure">
        <p>An error occurred while rendering the regular expression.</p>
        <a href="#retry" onClick={ this.handleRetry }>Retry</a>
      </Message> }

      { Render && <Render { ...renderProps } /> }
    </>;
  }
}

App.propTypes = {
  syntax: PropTypes.string,
  expr: PropTypes.string,
  permalinkUrl: PropTypes.string,
  syntaxList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
};

export default App;
