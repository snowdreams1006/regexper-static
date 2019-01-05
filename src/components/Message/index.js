import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

import InfoIcon from 'react-feather/dist/icons/info';
import ErrorIcon from 'react-feather/dist/icons/alert-octagon';
import WarningIcon from 'react-feather/dist/icons/alert-triangle';

const iconTypes = {
  info: InfoIcon,
  error: ErrorIcon,
  warning: WarningIcon
};

const renderIcon = (type, icon) => {
  const Icon = icon || iconTypes[type];

  if (!Icon) {
    return;
  }

  return <Icon />;
};

const Message = ({ type, icon, heading, children }) => (
  <div className={ [
    style.message,
    type && style[type]
  ].filter(Boolean).join(' ') }>
    <div className={ style.header }>
      { renderIcon(type, icon) }
      <h2>{ heading }</h2>
    </div>
    <div className={ style.content }>
      { children }
    </div>
  </div>
);

Message.propTypes = {
  type: PropTypes.oneOf([
    'info',
    'error',
    'warning'
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  heading: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Message;
