import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from './home.styles';
import messages from './home.messages';
import { RepositoriesList } from './repositoriesList';
import { SearchField } from './searchField';
import { RepositoriesActions, selectRepositoriesData } from '../../modules/repositories';

export const Home = () => {
  const repositories = useSelector(selectRepositoriesData);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  useEffect(() => {
    dispatch(RepositoriesActions.search());
  }, [dispatch]);

  console.log(repositories);
  return (
    <Container>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <SearchField />

      <RepositoriesList repositories={repositories} />
    </Container>
  );
};
