import React from 'react';
import Helmet from 'react-helmet';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { Container } from './home.styles';
import messages from './home.messages';
import { selectRepositoriesData } from '../../modules/repositories';

export const Home = () => {
  const repositories = useSelector(selectRepositoriesData);
  const { formatMessage } = useIntl();

  console.log(repositories);
  return (
    <Container>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <FormattedMessage {...messages.welcome} />
    </Container>
  );
};
