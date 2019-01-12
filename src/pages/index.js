import React from 'react';
import { Link } from 'gatsby';

import Metadata from 'components/Metadata';
import Message from 'components/Message';
import App from 'components/App';

export const IndexPage = () => <>
  <Metadata/>
  <noscript>
    <Message type="error" heading="JavaScript Required">
      <p>You need JavaScript to use Regexper.</p>
      <p>If you have concerns regarding the use of tracking code on Regexper,
        please see the <Link to="/privacy">Privacy Policy</Link>.</p>
    </Message>
  </noscript>
  <App />
</>;

export default IndexPage;
