import React from 'react';

import Layout from 'components/Layout';
import Message from 'components/Message';

const ErrorPage = () => <Layout title="Page Not Found">
  <Message type="error" heading="404 Page Not Found">
    <p>The page you have requrested could not be found.</p>
  </Message>
</Layout>;

export default ErrorPage;
