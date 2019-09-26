import React from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import { Divider } from 'antd';

import { Container } from './home.styles';
import messages from './home.messages';
import { RepositoriesList } from './repositoriesList';
import { SearchField } from './searchField';

export const Home = () => {
  const { formatMessage } = useIntl();

  return (
    <Container>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <SearchField />
      <Divider />
      <RepositoriesList />
    </Container>
  );
};
