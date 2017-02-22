import React from 'react';

const MainTitle = ({ message }) =>
  <h3>{message}</h3>
;

MainTitle.propTypes = {
  message: React.PropTypes.string.isRequired,
};

export default MainTitle;
