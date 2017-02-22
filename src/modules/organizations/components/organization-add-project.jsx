import React from 'react';
import ProjectSearch from '../../common/components/project-search';

const OrganizationAddProject = ({ value, onChange, onAdd }) =>
  (
    <div className="organization-add-project">
      <button onClick={onAdd} className="standard-button add-project-button">Add Project</button>
      <ProjectSearch onChange={onChange} value={value} />
    </div>
  );

OrganizationAddProject.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onAdd: React.PropTypes.func.isRequired,
};

export default OrganizationAddProject;
