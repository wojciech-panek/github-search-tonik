import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const App = ({ children }) => {
  return <Fragment>{React.Children.only(children)}</Fragment>;
};

App.propTypes = {
  children: PropTypes.node,
};
