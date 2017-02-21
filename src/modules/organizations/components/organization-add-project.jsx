import React from 'react';
import ProjectSearch from '../../common/components/project-search';

const OrganizationAddProject = ({ onAdd }) => {
  return (
    <div>
      <ProjectSearch options={{}} />
      <button onClick={onAdd}>Add Project</button>
    </div>
  );
};

export default OrganizationAddProject;
