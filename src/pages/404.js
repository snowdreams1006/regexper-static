import React from 'react';

import Metadata from 'components/Metadata';
import Message from 'components/Message';

const ErrorPage = () => <>
  <Metadata title="Page Not Found" />
  <Message type="error" heading="404 Page Not Found">
    <p>The page you have requrested could not be found.</p>
  </Message>
</>;

export default ErrorPage;
