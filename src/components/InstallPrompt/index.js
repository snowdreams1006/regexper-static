import React, { useState, useEffect, useCallback } from 'react';
import { Trans } from 'react-i18next';

const InstallPrompt = () => {
  const [ installPrompt, updateInstallPrompt ] = useState(null);

  const handleInstall = useCallback(async event => {
    event.preventDefault();

    try {
      installPrompt.prompt();
      await installPrompt.userChoice;
    }
    catch {
      // User cancelled install
    }

    updateInstallPrompt(null);
  }, [installPrompt, updateInstallPrompt]);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', updateInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', updateInstallPrompt);
    };
  });

  if (!installPrompt) {
    return null;
  }

  return <a href="#install"
    data-testid="install"
    onClick={ handleInstall }
  >
    <Trans>Add to Home Screen</Trans>
  </a>;
};

export default InstallPrompt;
