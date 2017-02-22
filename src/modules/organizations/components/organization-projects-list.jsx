import React from 'react';

import { projectsShape } from '../../projects/model';

import OrganizationProjectItem from './organization-project-item';

const OrganizationProjectsList = ({ projects, onRemove }) => {
  if (!projects || projects.length < 1) {
    return (<div><h3>Organization Projects</h3><p>No projects associated with this organization</p></div>);
  }

  const sorted = projects.sort((a, b) => a.display_name > b.display_name);

  return (
    <div className="organization-projects-list">
      <ul>
        {sorted.map(proj => (
          <OrganizationProjectItem key={proj.id} project={proj} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  );
};

OrganizationProjectsList.propTypes = {
  projects: projectsShape.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default OrganizationProjectsList;
