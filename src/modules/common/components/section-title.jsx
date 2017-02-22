import React from 'react';

const SectionTitle = ({ message }) =>
  <h4>{message}</h4>
;

SectionTitle.propTypes = {
  message: React.PropTypes.string.isRequired,
};

export default SectionTitle;
