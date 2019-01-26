import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces, Trans } from 'react-i18next';
import * as Sentry from '@sentry/browser';
import URLSearchParams from '@ungap/url-search-params';

import Form from 'components/Form';
import FormActions from 'components/FormActions';
import Loader from 'components/Loader';
import Message from 'components/Message';

class App extends React.PureComponent {
  static propTypes = {
    syntax: PropTypes.string.isRequired,
    expr: PropTypes.string.isRequired,
    permalinkUrl: PropTypes.string,
    syntaxList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    })),
    t: PropTypes.func.isRequired
  }

  state = {
    loading: false,
    loadingError: null,
    render: {}
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
      render: {}
    });

    if (!expr) {
      return;
    }

    this.setState({
      loading: true
    });

    try {
      const syntaxModule = await import(
        /* webpackChunkName: "render-[index]" */
        `syntax/${ syntax }`
      );

      const parsed = syntaxModule.parse(expr);

      this.setState({
        loading: false,
        render: {
          syntax,
          parsed,
          Component: syntaxModule.Render
        }
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
      // eslint-disable-next-line no-console
      console.error(e);
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
      syntaxList,
      t
    } = this.props;
    const {
      loading,
      loadingError,
      imageDetails,
      render: {
        syntax: renderSyntax,
        parsed,
        Component
      }
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
      parsed
    };

    const doRender = renderSyntax === syntax;

    return <>
      <Form { ...formProps }>
        { doRender && <FormActions { ...actionProps } /> }
      </Form>

      { loading && <Loader /> }

      { loadingError && <Message type="error" heading={ t('Render Failure') }>
        <p><Trans>
          An error occurred while rendering the regular expression.
        </Trans></p>
        <a href="#retry" onClick={ this.handleRetry }><Trans>Retry</Trans></a>
      </Message> }

      { doRender && <Component { ...renderProps } /> }
    </>;
  }
}

export { App };
export default withNamespaces()(App);
