import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import URLSearchParams from '@ungap/url-search-params';

import Metadata from 'components/Metadata';
import Message from 'components/Message';
import App from 'components/App';
import InstallPrompt from 'components/InstallPrompt';

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        defaultSyntax
        syntaxList { id, label }
      }
    }
  }
`;

const readURLHash = (location, defaultSyntax) => {
  const query = location.hash.slice(1);
  const params = new URLSearchParams(query);
  const permalinkUrl = query ? location.href : null;

  if (params.get('syntax')) {
    return {
      syntax: params.get('syntax'),
      expr: params.get('expr'),
      permalinkUrl
    };
  } else {
    // Assuming old-style URL
    return {
      syntax: defaultSyntax,
      expr: query,
      permalinkUrl
    };
  }
};

class IndexPage extends React.PureComponent {
  state={
    installPrompt: null
  }

  static propTypes = {
    location: PropTypes.object,
    data: PropTypes.shape({
      site: PropTypes.shape({
        siteMetadata: PropTypes.shape({
          defaultSyntax: PropTypes.string,
          syntaxList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string
          }))
        })
      })
    })
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
  }

  handleInstallPrompt = event => {
    event.preventDefault();

    this.setState({
      installPrompt: event
    });
  }

  handleInstallReject = () => {
    this.setState({ installPrompt: null });
  }

  handleInstallAccept = () => {
    const { installPrompt } = this.state;

    this.setState({ installPrompt: null });
    installPrompt.prompt();
  }

  render() {
    const {
      installPrompt
    } = this.state;
    const {
      location,
      data: { site: { siteMetadata } }
    } = this.props;

    return <>
      <Metadata/>
      <noscript>
        <Message type="error" heading="JavaScript Required">
          <p>You need JavaScript to use Regexper.</p>
          <p>
            If you have concerns regarding the use of tracking code on Regexper,
            please see the <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </Message>
      </noscript>
      <App
        syntaxList={ siteMetadata.syntaxList }
        { ...readURLHash(location, siteMetadata.defaultSyntax) } />
      { installPrompt && <InstallPrompt
        onAccept={ this.handleInstallAccept }
        onReject={ this.handleInstallReject } /> }
    </>;
  }
}

export default IndexPage;
