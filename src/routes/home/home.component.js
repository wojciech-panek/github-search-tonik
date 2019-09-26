import React from 'react';
import Helmet from 'react-helmet';
import { useIntl, FormattedMessage } from 'react-intl';

import { Container } from './home.styles';
import messages from './home.messages';

export const Home = () => {
  const { formatMessage } = useIntl();

  return (
    <Container>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <FormattedMessage {...messages.welcome} />
    </Container>
  );
};
