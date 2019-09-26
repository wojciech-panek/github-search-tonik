import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

import messages from './app.messages';
import { DEFAULT_LOCALE, translationMessages } from '../i18n';

export const App = ({ children }) => {
  return (
    <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <Fragment>
        <FormattedMessage {...messages.pageTitle}>
          {pageTitle => <Helmet titleTemplate={`%s - ${pageTitle}`} defaultTitle={pageTitle} />}
        </FormattedMessage>

        {React.Children.only(children)}
      </Fragment>
    </IntlProvider>
  );
};

App.propTypes = {
  children: PropTypes.node,
};
