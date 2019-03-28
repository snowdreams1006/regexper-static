import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'gatsby';
import { Trans } from 'react-i18next';

import GitlabIcon from 'react-feather/dist/icons/gitlab';

import LocaleSwitcher from 'components/LocaleSwitcher';
import InstallPrompt from 'components/InstallPrompt';
import PrivacyPolicy from 'components/PrivacyPolicy';

import style from './style.module.css';

const Header = ({ banner }) => {
  const [ showModal, updateShowModal] = useState(false);
  const handleClose = useCallback(() => {
    updateShowModal(false);
  }, [updateShowModal]);
  const handleOpen = useCallback(event => {
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    event.preventDefault();
    updateShowModal(true);
  }, [updateShowModal]);

  return <>
    <Modal
      isOpen={ showModal }
      onRequestClose={ handleClose }>
      <PrivacyPolicy onClose={ handleClose } />
    </Modal>
    <header
      className={ style.header }
      data-banner={ banner || null }>
      <h1>
        <Link to="/">Regexper</Link>
      </h1>

      <ul className={ style.list }>
        <li>
          <a href="https://gitlab.com/javallone/regexper-static"
            rel="external noopener noreferrer"
            target="_blank">
            <GitlabIcon />
            <Trans>Source on GitLab</Trans>
          </a>
        </li>
        <li>
          <Link to="/privacy"
            data-testid="privacy-link"
            onClick={ handleOpen }
          >
            <Trans>Privacy Policy</Trans>
          </Link>
        </li>
        <li>
          <InstallPrompt />
        </li>
        <li data-requires-js>
          <LocaleSwitcher />
        </li>
      </ul>
    </header>
  </>;
};

Header.propTypes = {
  banner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired
};

export default Header;
