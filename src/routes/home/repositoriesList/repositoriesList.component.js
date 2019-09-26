import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Table } from 'antd';
import { format, compareAsc } from 'date-fns';
import { path } from 'ramda';
import { parse, stringify } from 'query-string';

import { Container, Select, SelectContainer, SelectLabel } from './repositoriesList.styles';
import { selectRepositoriesData, selectRepositoriesIsLoading } from '../../../modules/repositories';
import messages from './repositoriesList.messages';
import history from '../../../services/history';
import { ROUTES } from '../../app.constants';

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

  const { order, field, columnKey, pageSize, current } = parse(history.location.search);

  const [sort, setSort] = useState({ order, field, columnKey });
  const [selectedPageSize, setPageSize] = useState(pageSize ? parseInt(pageSize, 10) : 10);
  const [selectedCurrent, setCurrent] = useState(current ? parseInt(current, 10) : 1);

  const handleTableChange = useCallback((pagination, filters, sorter) => {
    const currentParams = parse(history.location.search);
    const { current } = pagination;
    const { order, field, columnKey } = sorter;
    history.push(`${ROUTES.home}?${stringify({ ...currentParams, current, order, field, columnKey })}`);
    setSort(sorter);
    setCurrent(current);
  }, []);

  const handlePageSizeChange = useCallback(value => {
    const currentParams = parse(history.location.search);
    history.push(`${ROUTES.home}?${stringify({ ...currentParams, pageSize: value })}`);
    setPageSize(value);
  }, []);

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
      <SelectContainer>
        <SelectLabel>
          <FormattedMessage {...messages.pageSize} />:
        </SelectLabel>
        <Select value={pageSize} onChange={handlePageSizeChange}>
          <Select.Option value={5}>5</Select.Option>
          <Select.Option value={10}>10</Select.Option>
          <Select.Option value={15}>15</Select.Option>
          <Select.Option value={20}>20</Select.Option>
        </Select>
      </SelectContainer>

      <Table
        columns={columns}
        dataSource={repositories.asMutable()}
        rowKey="id"
        loading={isLoadingRepositories}
        onChange={handleTableChange}
        pagination={{
          pageSize: selectedPageSize,
          current: selectedCurrent,
        }}
      />
    </Container>
  );
};
