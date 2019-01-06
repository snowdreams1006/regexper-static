import React from 'react';

import Layout from 'components/Layout';

// eslint-disable-next-line react/prop-types
export const wrapPageElement = ({ element }) => {
  return <Layout>{ element }</Layout>;
};
