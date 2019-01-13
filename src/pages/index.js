import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import URLSearchParams from '@ungap/url-search-params';

import Metadata from 'components/Metadata';
import Message from 'components/Message';
import App from 'components/App';

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

export const IndexPage = ({
  location,
  data: { site: { siteMetadata } }
}) => <>
  <Metadata/>
  <noscript>
    <Message type="error" heading="JavaScript Required">
      <p>You need JavaScript to use Regexper.</p>
      <p>If you have concerns regarding the use of tracking code on Regexper,
        please see the <Link to="/privacy">Privacy Policy</Link>.</p>
    </Message>
  </noscript>
  <App
    syntaxList={ siteMetadata.syntaxList }
    { ...readURLHash(location, siteMetadata.defaultSyntax) } />
</>;

IndexPage.propTypes = {
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
};

export default IndexPage;
