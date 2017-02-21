import * as types from '../../constants/action-types';
import initialState from '../../initial-state';

export default function (state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_ORGANIZATION_PROJECTS:
      return {
        organizationProjects: action.projects,
      };
    case types.ADD_ORGANIZATION_PROJECT:
      return {
        organizationProjects: (state.organizationProject || []).concat([action.project]),
      };
    case types.REMOVE_ORGANIZATION_PROJECT:
      return {
        organizationProjects: (state.organizationProjects || []).filter(p => p.id !== action.project.id),
      };
    default:
      return state;
  }
}
