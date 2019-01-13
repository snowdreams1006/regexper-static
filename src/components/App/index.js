import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import URLSearchParams from '@ungap/url-search-params';

import Form from 'components/Form';
import FormActions from 'components/FormActions';
import Loader from 'components/Loader';
import Message from 'components/Message';

const toUrl = params => new URLSearchParams(params).toString();

const createSvgLink = async ({ svg }) => {
  try {
    const type = 'image/svg+xml';
    const blob = new Blob([svg], { type });

    return {
      url: URL.createObjectURL(blob),
      label: 'Download SVG',
      filename: 'image.svg',
      type
    };
  }
  catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

const createPngLink = async ({ svg, width, height }) => {
  try {
    const type = 'image/png';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const loader = new Image();

    loader.width = canvas.width = Number(width) * 2;
    loader.height = canvas.height = Number(height) * 2;

    await new Promise(resolve => {
      loader.onload = resolve;
      loader.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    });

    context.drawImage(loader, 0, 0, loader.width, loader.height);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, type));

    return {
      url: URL.createObjectURL(blob),
      label: 'Download PNG',
      filename: 'image.png',
      type
    };
  }
  catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

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
      document.location.hash = toUrl({ syntax, expr });
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

  handleSvgMarkup = async ({ svg, width, height }) => {
    if (svg !== this.state.svg) {
      this.setState({
        svg,
        svgLink: await createSvgLink({ svg }),
        pngLink: await createPngLink({ svg, width, height })
      });
    }
  }

  render() {
    const {
      syntax,
      expr,
      permalinkUrl
    } = this.props;
    const {
      loading,
      loadingError,
      Render,
      svgLink,
      pngLink
    } = this.state;

    const formProps = {
      onSubmit: this.handleSubmit,
      syntax,
      expr
    };
    const actions = {
      permalinkUrl,
      svgLink,
      pngLink
    };
    const renderProps = {
      onRender: this.handleSvgMarkup,
      syntax,
      expr
    };

    return <>
      <Form { ...formProps }>
        <FormActions { ...actions } />
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
  permalinkUrl: PropTypes.string
};

export default App;
