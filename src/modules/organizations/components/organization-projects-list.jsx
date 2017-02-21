import React from 'react';

const OrganizationProjectsList = ({ projects }) => {
  if (!projects || projects.length < 1) {
    return (<div><h3>Organization Projects</h3><p>No projects associated with this organization</p></div>);
  }

  return (
    <div>
      <h3>Organization Projects</h3>
      <p>there are {projects.length} projects</p>
    </div>
  );
};

export default OrganizationProjectsList;
