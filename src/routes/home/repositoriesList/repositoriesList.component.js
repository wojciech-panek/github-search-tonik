import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Table } from 'antd';
import { format, compareAsc } from 'date-fns';
import { path } from 'ramda';

import { Container } from './repositoriesList.styles';
import { selectRepositoriesData, selectRepositoriesIsLoading } from '../../../modules/repositories';
import messages from './repositoriesList.messages';

const getStringComparator = pathValue => (a, b) => {
  const valueA = path(pathValue, a).toLowerCase();
  const valueB = path(pathValue)(b).toLowerCase();
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

export const RepositoriesList = () => {
  const repositories = useSelector(selectRepositoriesData);
  const isLoadingRepositories = useSelector(selectRepositoriesIsLoading);
  const { formatMessage } = useIntl();

  const [sort, setSort] = useState({});

  const handleTableChange = useCallback((pagination, filters, sorter) => setSort(sorter), []);

  const columns = [
    {
      title: formatMessage(messages.nameColumn),
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => (
        <a href={row.htmlUrl} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
      sorter: getStringComparator(['name']),
      sortOrder: sort.columnKey === 'name' ? sort.order : false,
    },
    {
      title: formatMessage(messages.ownerColumn),
      dataIndex: 'owner.login',
      key: 'owner',
      sorter: getStringComparator(['owner', 'login']),
      sortOrder: sort.columnKey === 'owner' ? sort.order : false,
    },
    {
      title: formatMessage(messages.starsColumn),
      dataIndex: 'stargazersCount',
      key: 'stars',
      sorter: (a, b) => parseInt(a.stargazersCount) - parseInt(b.stargazersCount),
      sortOrder: sort.columnKey === 'stars' ? sort.order : false,
    },
    {
      title: formatMessage(messages.createdAtColumn),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => format(new Date(text), 'yyyy-MM-dd'),
      sorter: (a, b) => compareAsc(new Date(a.createdAt), new Date(b.createdAt)),
      sortOrder: sort.columnKey === 'createdAt' ? sort.order : false,
    },
  ];

  return (
    <Container>
      <Table
        columns={columns}
        dataSource={repositories.asMutable()}
        rowKey="id"
        loading={isLoadingRepositories}
        onChange={handleTableChange}
      />
    </Container>
  );
};
