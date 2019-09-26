import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Input } from 'antd';
import { stringify, parse } from 'query-string';

import { RepositoriesActions } from '../../../modules/repositories';
import { Container } from './searchField.styles';
import messages from './searchField.messages';
import history from '../../../services/history';
import { ROUTES } from '../../app.constants';

export const SearchField = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [value, setValue] = useState(parse(history.location.search).query || '');

  const handleSearch = useCallback(
    value => {
      const currentParams = parse(history.location.search);
      history.push(`${ROUTES.home}?${stringify({ ...currentParams, query: value })}`);
      dispatch(RepositoriesActions.search(value));
    },
    [dispatch]
  );

  const handleChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  return (
    <Container>
      <Input.Search
        placeholder={formatMessage(messages.placeholder)}
        enterButton={formatMessage(messages.search)}
        size="large"
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
      />
    </Container>
  );
};
