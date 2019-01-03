import React from 'react';
import { Link } from 'gatsby';

import Layout from 'components/Layout';
import Message from 'components/Message';

const IndexPage = () => <Layout>
  <noscript>
    <Message type="error" heading="JavaScript Required">
      <p>You need JavaScript to use Regexper.</p>
      <p>If you have concerns regarding the use of tracking code on Regexper, please see the <Link to="/privacy">Privacy Policy</Link>.</p>
    </Message>
  </noscript>
  <div>Hello world</div>
</Layout>;

export default IndexPage;
