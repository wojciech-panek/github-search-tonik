import React from 'react';
import PropTypes from 'prop-types';

import { Container, Item } from './repositoriesList.styles';

export const RepositoriesList = ({ repositories }) => {
  return (
    <Container>
      {repositories.map(({ id, name }) => (
        <Item key={id}>{name}</Item>
      ))}
    </Container>
  );
};

RepositoriesList.propTypes = {
  repositories: PropTypes.array,
};
