import React from 'react';
import Feeds from "./views/feeds/Feeds";

//----------------------------------------------------------------------------------------------------------------------

//custom routes
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Questions = React.lazy(() => import('./views/questions/Questions'));
const Kids = React.lazy(() => import('./views/kids/Kids'));
const Results = React.lazy(() => import('./views/results/Results'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  {path: '/home', exact: true, name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/questions', name: 'Questions', component: Questions},
  {path: '/kids', name: 'Kids', component: Kids},
  {path: '/results', name: 'Results', component: Results},
  {path: '/users', name: 'Users', component: User},

];

export default routes;
