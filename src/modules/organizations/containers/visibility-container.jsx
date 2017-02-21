import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { projectsShape } from '../../projects/model';

import OrganizationProjectsList from '../components/organization-projects-list';
import OrganizationAddProject from '../components/organization-add-project';

import { addOrganizationProject } from '../action-creators';

class VisibilityContainer extends React.Component {

  constructor(props) {
    super(props);

    this.addProject = this.addProject.bind(this);
  }

  addProject(project) {
    this.props.dispatch(addOrganizationProject(project));
  }

  render() {
    return (
      <div>
        <OrganizationProjectsList projects={this.props.organizationProjects} />
        <OrganizationAddProject onAdd={this.addProject} />
      </div>
    );
  }
}

VisibilityContainer.propTypes = {
  dispatch: React.PropTypes.func,
  organizationProjects: projectsShape,
};

function mapStateToProps(state) {
  return {
    organizationProjects: state.organizationProjects,
  };
}

export default connect(mapStateToProps)(VisibilityContainer);
