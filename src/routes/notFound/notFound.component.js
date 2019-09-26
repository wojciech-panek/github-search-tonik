import React from 'react';
import Helmet from 'react-helmet';
import { useIntl, FormattedMessage } from 'react-intl';

import { Container } from './notFound.styles';
import messages from './notFound.messages';

export const NotFound = () => {
  const { formatMessage } = useIntl();

  return (
    <Container>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <FormattedMessage {...messages.title} />
    </Container>
  );
};
