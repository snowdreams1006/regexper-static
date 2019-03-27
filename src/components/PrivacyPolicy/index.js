import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Message from 'components/Message';

export const PrivacyPolicy = props => {
  const { t } = useTranslation();

  return <Message type="info" heading={ t('Privacy Policy') } { ...props }>
    <Trans i18nKey="Privacy policy copy">
      <p>
        Regexper and the tools used to create it are all open source. If you are
        concerned that the JavaScript being delivered is in any way malicious,
        please inspect the source in the <a
          href="https://gitlab.com/javallone/regexper-static"
          rel="external noopener noreferrer"
          target="_blank">GitLab repository</a>.
      </p>
      <p>
        There are two data collection tools integrated in the app. These tools
        are not used to collect personal information:
      </p>
      <ul>
        <li>
          <b>Google Analytics</b> is used to track browser usage data and
          application performance. It is configured to anonymize the client IP
          address.
        </li>
        <li>
          <b>Sentry.io</b> is a tool used to capture and report client-side
          JavaScript errors. It is configured to not store the client IP
          address.
        </li>
      </ul>
      <p>
        Regexper honors the browser <b>&ldquo;Do Not Track&rdquo;</b> setting
        and will not enable these data collection tools if that setting is
        enabled. Also, most popular ad blockers will prevent these tools from
        sending any tracking data. Disabling or blocking these data collection
        tools will <b>not</b> impact the performance of this app. The
        information collected by these tools is used to monitor application
        performance, determine browser support, and collect error reports.
      </p>
      <p>
        Regexper is not supported by ad revenue or sales of any kind.
      </p>
    </Trans>
  </Message>;
};

export default PrivacyPolicy;
