import React from 'react';
import { withTranslation, Trans } from 'react-i18next';

class InstallPrompt extends React.PureComponent {
  state = {
    installPrompt: null
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
  }

  handleInstallPrompt = event => {
    this.setState({
      installPrompt: event
    });
  }

  handleInstall = async event => {
    event.preventDefault();

    const { installPrompt } = this.state;

    try {
      installPrompt.prompt();
      await installPrompt.userChoice;
    }
    catch {
      // User cancelled install
    }

    this.setState({ installPrompt: null });
  }

  render() {
    const { installPrompt } = this.state;

    if (!installPrompt) {
      return null;
    }

    return <a href="#install" onClick={ this.handleInstall }>
      <Trans>Add to Home Screen</Trans>
    </a>;
  }
}

export { InstallPrompt };
export default withTranslation()(InstallPrompt);
