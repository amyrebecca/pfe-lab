import React from 'react';

import { organizationShape } from '../model';

import bindInput from '../../common/containers/bind-input';
import FormContainer from '../../common/containers/form-container';
import SectionTitle from '../../common/components/section-title';

const EditDetails = ({ organization, updateOrganization, resetOrganization }) => {
  // TODO: ARB: this should be broken up into a container and some components
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  const fields = {};

  const collect = () => {
    const result = {};
    Object.keys(fields).forEach((fieldName) => {
      result[fieldName] = fields[fieldName].value;
    });
    return result;
  };

  const onSubmit = () => {
    const patch = collect();
    updateOrganization(patch);
  };

  const onReset = () => {
    resetOrganization();
  };

  const NameInput = bindInput(organization.display_name, <input type="text" />);
  const DescriptionInput = bindInput(organization.description, <textarea />);

  return (
    <div>
      <SectionTitle message="Edit Organization Details" />
      <FormContainer onSubmit={onSubmit} onReset={onReset}>
        <label>
          Name: <NameInput withRef={(n) => { fields.display_name = n; }} />
        </label>
        <br />
        <label>
          Description: <DescriptionInput withRef={(n) => { fields.description = n; }} />
        </label>
      </FormContainer>
    </div>
  );
};

EditDetails.propTypes = {
  organization: organizationShape,
  resetOrganization: React.PropTypes.func,
  updateOrganization: React.PropTypes.func,
};

export default EditDetails;
