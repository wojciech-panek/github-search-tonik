import styled from 'styled-components';
import { Select as AntDesignSelect } from 'antd';

export const Container = styled.div`
  width: 800px;
`;

export const SelectContainer = styled.div``;

export const SelectLabel = styled.label`
  margin-right: 5px;
`;

export const Select = styled(AntDesignSelect)`
  width: 100px;
  margin-bottom: 20px;
`;
