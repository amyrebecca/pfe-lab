import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape, organizationCollaboratorsShape, organizationOwnerShape } from '../model';
import { setOrganizationCollaborators, setOrganizationOwner } from '../action-creators';

import EditCollaborators from '../components/edit-collaborators';

class CollaboratorsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: null,
    };

    this.fetchCollaborators = this.fetchCollaborators.bind(this);
    this.removeCollaborator = this.removeCollaborator.bind(this);
    this.updateCollaborator = this.updateCollaborator.bind(this);
  }

  componentDidMount() {
    this.fetchCollaborators();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization !== this.props.organization) {
      this.fetchCollaborators(nextProps.organization);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizationCollaborators(null));
    this.props.dispatch(setOrganizationOwner(null));
  }

  removeCollaborator(collaborator) {
    this.setState({ saving: collaborator.id });

    collaborator.delete().then(() => {
      this.props.organization.uncacheLink('organization_roles');
      this.fetchCollaborators();
    })
    .then(() => { this.setState({ saving: null }); })
    .catch((error) => { console.error(error); });
  }

  updateCollaborator(collaborator, role, add) {
    // TODO add Talk roles when Talk is setup for organizations
    this.setState({ saving: collaborator.id });

    let newRoleSet;
    if (add) {
      collaborator.roles.push(role);
      newRoleSet = collaborator.roles;
    } else {
      const index = collaborator.roles.indexOf(role);
      collaborator.roles.splice(index, 1);
      newRoleSet = collaborator.roles;
    }

    collaborator.update({ 'roles': newRoleSet }).save()
      .then((updatedCollaborator) => {
        // Doing this doesn't maintain the array order, so reordering in UI happens on re-render and can be confusing...
        const updatedCollaborators = this.props.organizationCollaborators.filter(currentCollaborator => !(currentCollaborator === collaborator));
        updatedCollaborators.push(updatedCollaborator);
        this.props.dispatch(setOrganizationCollaborators(collaborators));
      }).then(() => {
        this.setState({ saving: null });
      }).catch((error) => { console.error(error); });
  }

  fetchCollaborators(organization = this.props.organization) { // eslint-disable-line class-methods-use-this
    if (!organization) {
      return;
    }

    organization.get('organization_roles', { page_size: 100 })
      .then((panoptesRoles) => {
        const withoutOwnerRole = panoptesRoles.filter(roleSet => !roleSet.roles.includes('owner'));

        if (!this.props.organizationOwner) {
          const ownerRole = panoptesRoles.find(roleSet => roleSet.roles.includes('owner'));

          apiClient.type('users').get(ownerRole.links.owner.id)
            .then((owner) => { this.props.dispatch(setOrganizationOwner(owner)); })
            .catch((error) => { console.error(error); });
        }

        // This is ugly. I've requested to get back display_name in the original request: https://github.com/zooniverse/Panoptes/issues/2123
        this.props.dispatch(setOrganizationCollaborators(withoutOwnerRole));
      });
  }

  render() {
    const props = {
      organization: this.props.organization,
      organizationOwner: this.props.organizationOwner,
      organizationCollaborators: this.props.organizationCollaborators,
      removeCollaborator: this.removeCollaborator,
      saving: this.state.saving,
      updateCollaborator: this.updateCollaborator,
      user: this.props.user,
    };

    return (<EditCollaborators {...props} />);
  }
}

CollaboratorsContainer.propTypes = {
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  organizationCollaborators: organizationCollaboratorsShape,
  organizationOwner: organizationOwnerShape,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationOwner: state.organizationOwner,
    organizationCollaborators: state.organizationCollaborators,
    user: state.user,
  };
}

export default connect(mapStateToProps)(CollaboratorsContainer);
