import React from 'react';
import { identity } from 'ramda';

import { DEFAULT_LOCALE } from '../i18n';

export const formatMessage = identity;
export const defineMessages = identity;

// eslint-disable-next-line react/prop-types
export const FormattedMessage = ({ id, values }) => (
  <span>
    {id} / {values}
  </span>
);

const intlMock = () => ({
  formatMessage: ({ id, defaultMessage, values = {} }) => `${id} / ${defaultMessage} / ${JSON.stringify(values)}`,
  locale: DEFAULT_LOCALE,
  formatNumber: (value, options) => `${value} / ${JSON.stringify(options)}`,
});

export const useIntl = () => intlMock();

// eslint-disable-next-line react/prop-types
export const IntlProvider = ({ children }) => <div>{children}</div>;
