import React from 'react';

export const projectShape = React.PropTypes.shape({
  id: React.PropTypes.string,
  display_name: React.PropTypes.string,
  description: React.PropTypes.string,
});

export const projectsShape = React.PropTypes.arrayOf(projectShape);
