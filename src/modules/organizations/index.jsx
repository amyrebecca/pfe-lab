import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import EditDetails from './components/edit-details';
import ListOrganizations from './components/list-organizations';

import OrganizationContainer from './containers/organization-container';
import CollaboratorsContainer from './containers/collaborators-container';
import OrganizationsContainer from './containers/organizations-container';
import VisibilityContainer from './containers/visibility-container';

const organizationsRoutes = store => (
  <Provider store={store}>
    <Router>
      <Route path="/organizations" component={OrganizationsContainer}>
        <IndexRoute component={ListOrganizations} />
        <Route path=":id" component={OrganizationContainer}>
          <IndexRoute component={EditDetails} />
          <Route path="collaborators" component={CollaboratorsContainer} />
          <Route path="visibility" component={VisibilityContainer} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default organizationsRoutes;
