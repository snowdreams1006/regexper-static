import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'gatsby';
import { withTranslation, Trans } from 'react-i18next';

import GitlabIcon from 'react-feather/dist/icons/gitlab';

import LocaleSwitcher from 'components/LocaleSwitcher';
import InstallPrompt from 'components/InstallPrompt';
import PrivacyPolicy from 'components/PrivacyPolicy';

import style from './style.module.css';

class Header extends React.PureComponent {
  state = {
    showModal: false
  }

  static propTypes = {
    banner: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]).isRequired
  }

  handleOpen = event => {
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    event.preventDefault();
    this.setState({ showModal: true });
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { banner } = this.props;
    const { showModal } = this.state;

    return <>
      <Modal
        isOpen={ showModal }
        onRequestClose={ this.handleClose }>
        <PrivacyPolicy onClose={ this.handleClose } />
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
            <Link to="/privacy" onClick={ this.handleOpen }>
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
  }
}

export { Header };
export default withTranslation()(Header);
