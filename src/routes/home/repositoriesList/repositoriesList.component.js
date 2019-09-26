import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Table } from 'antd';
import { format } from 'date-fns';

import { Container } from './repositoriesList.styles';
import { selectRepositoriesData } from '../../../modules/repositories';
import messages from './repositoriesList.messages';

export const RepositoriesList = () => {
  const repositories = useSelector(selectRepositoriesData);
  const { formatMessage } = useIntl();

  const columns = [
    {
      title: formatMessage(messages.nameColumn),
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => (
        <a href={row.html_url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: formatMessage(messages.ownerColumn),
      dataIndex: 'owner.login',
      key: 'owner',
    },
    {
      title: formatMessage(messages.starsColumn),
      dataIndex: 'stargazers_count',
      key: 'stars',
    },
    {
      title: formatMessage(messages.createdAtColumn),
      dataIndex: 'created_at',
      key: 'createdAt',
      render: text => format(new Date(text), 'yyyy-MM-dd'),
    },
  ];

  return (
    <Container>
      <Table columns={columns} dataSource={repositories} pagination={false} rowKey="id" />
    </Container>
  );
};
