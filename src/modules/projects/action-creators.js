import * as types from '../../constants/action-types';

export function setOrganizationProjects(projects) {
  return {
    type: types.SET_ORGANIZATION_PROJECTS,
    projects,
  };
}

export function addOrganizationProject(project) {
  return {
    type: types.ADD_ORGANIZATION_PROJECT,
    project,
  };
}

export function removeOrganizationProject(project) {
  return {
    type: types.REMOVE_ORGANIZATION_PROJECT,
    project,
  };
}
