import React from 'react';
import { StaticQuery } from 'gatsby';

const withQuery = (query, options = {}) => Component => {
  const { toProps } = {
    toProps: data => data,
    ...options
  };
  const displayName = Component.displayName || Component.name || 'Component';
  const wrapped = props => (
    <StaticQuery query={ query } render={ data => (
      <Component { ...props } { ...toProps(data) } />
    ) } />
  );

  wrapped.displayName = `WithQuery(${ displayName })`;

  return wrapped;
};

export default withQuery;
