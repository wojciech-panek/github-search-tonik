import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Item } from './repositoriesList.styles';
import { selectRepositoriesData } from '../../../modules/repositories';

export const RepositoriesList = () => {
  const repositories = useSelector(selectRepositoriesData);

  return (
    <Container>
      {repositories.map(({ id, name }) => (
        <Item key={id}>{name}</Item>
      ))}
    </Container>
  );
};
