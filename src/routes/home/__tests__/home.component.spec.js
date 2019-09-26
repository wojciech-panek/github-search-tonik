import React from 'react';
import { shallow } from 'enzyme';
import { clone } from 'ramda';

import { Home } from '../home.component';
import { store } from '../../../fixtures/store';

let mockStore = clone(store);
jest.mock('react-redux', () => ({
  useSelector: selector => selector(mockStore),
}));

describe('Home: Component', () => {
  const defaultProps = {};

  const component = props => <Home {...defaultProps} {...props} />;

  it('should render correctly', () => {
    const wrapper = shallow(component());
    expect(wrapper).toMatchSnapshot();
  });
});
