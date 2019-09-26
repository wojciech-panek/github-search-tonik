import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Input, Button } from './searchField.styles';
import { RepositoriesActions } from '../../../modules/repositories';

export const SearchField = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = useCallback(e => {
    setQuery(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(RepositoriesActions.search(query));
    },
    [query, dispatch]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Input value={query} onChange={handleChange} />
      <Button type="submit">Search</Button>
    </Form>
  );
};
