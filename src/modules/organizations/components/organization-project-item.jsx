import React from 'react';
import { projectShape } from '../../projects/model';

const OrganizationProjectItem = ({ project, onRemove }) => {
  const removeThis = () => onRemove(project.id);

  return (
    <li className="organization-project-item">
      <a href={`#remove${project.id}`} onClick={removeThis} className="remove-project">x</a>
      <strong>{project.display_name}</strong>
      <div className="project-description">{project.description}</div>
    </li>
  );
};

OrganizationProjectItem.propTypes = {
  project: projectShape.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default OrganizationProjectItem;
