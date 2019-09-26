import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Input } from 'antd';
import { stringify, parse } from 'query-string';
import { useDebouncedCallback } from 'use-debounce';

import { RepositoriesActions } from '../../../modules/repositories';
import { Container } from './searchField.styles';
import messages from './searchField.messages';
import history from '../../../services/history';
import { ROUTES } from '../../app.constants';

export const SearchField = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [value, setValue] = useState(parse(history.location.search).query || '');

  const [handleSearch] = useDebouncedCallback(value => {
    const currentParams = parse(history.location.search);
    history.push(`${ROUTES.home}?${stringify({ ...currentParams, query: value })}`);
    dispatch(RepositoriesActions.search(value));
  }, 500);

  const handleChange = useCallback(
    e => {
      setValue(e.target.value);
      handleSearch(e.target.value);
    },
    [handleSearch]
  );

  return (
    <Container>
      <Input placeholder={formatMessage(messages.placeholder)} size="large" value={value} onChange={handleChange} />
    </Container>
  );
};
