import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape } from '../model';
import { setCurrentOrganization } from '../action-creators';

import MainTitle from '../../common/components/main-title';

class OrganizationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchOrganization(props.params.id);

    this.organizationName = this.organizationName.bind(this);
    this.resetOrganization = this.resetOrganization.bind(this);
    this.updateOrganization = this.updateOrganization.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params && this.props.params && nextProps.params.id === this.props.params.id) return;
    this.fetchOrganization(nextProps.params.id);
  }

  componentWillUnmount() {
    this.props.dispatch(setCurrentOrganization(null));
  }

  updateOrganization(organizationFields) {
    this.props.organization.update(organizationFields).save().then((result) => {
      this.props.dispatch(setCurrentOrganization(result));
    });
  }

  resetOrganization() {
    this.props.dispatch(setCurrentOrganization(this.props.organization));
  }

  fetchOrganization(id) { // eslint-disable-line class-methods-use-this
    if (!id) {
      return;
    }

    apiClient.type('organizations').get(id.toString())
      .then((org) => {
        this.props.dispatch(setCurrentOrganization(org));
      });
  }

  organizationName() {
    if (this.props.organization) {
      return this.props.organization.display_name;
    }

    return '';
  }

  render() {
    const children = this.props.children; // eslint-disable-line react/prop-types
    const organization = this.props.organization;
    const organizationId = this.props.params.id;

    // inject props into children
    const wrappedChildren = React.Children.map(children, child =>
      React.cloneElement(child, {
        organization,
        organizationId,
        resetOrganization: this.resetOrganization,
        updateOrganization: this.updateOrganization,
      }),
    );

    return (
      <div>
        <MainTitle message={`Organization: ${this.organizationName()}`} />
        {wrappedChildren}
      </div>
    );
  }
}

OrganizationContainer.propTypes = {
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  params: React.PropTypes.shape({ id: React.PropTypes.string }),
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(OrganizationContainer);
