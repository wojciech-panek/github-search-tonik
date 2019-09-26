import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Input } from 'antd';

import { RepositoriesActions } from '../../../modules/repositories';
import { Container } from './searchField.styles';
import messages from './searchField.messages';

export const SearchField = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const handleSearch = useCallback(
    value => {
      dispatch(RepositoriesActions.search(value));
    },
    [dispatch]
  );

  return (
    <Container>
      <Input.Search
        placeholder={formatMessage(messages.placeholder)}
        enterButton={formatMessage(messages.search)}
        size="large"
        onSearch={handleSearch}
      />
    </Container>
  );
};
