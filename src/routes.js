import React from 'react';
import Feeds from "./views/feeds/Feeds";

//----------------------------------------------------------------------------------------------------------------------

//custom routes
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const News = React.lazy(() => import('./views/news/News'));
const Polls = React.lazy(() => import('./views/polls/Polls'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/news', name: 'News', component: News},
  {path: '/polls', name: 'Polls', component: Polls},
  {path: '/users', name: 'Users', component: User},
  {path: '/feeds', name: 'Feeds', component: Feeds},

];

export default routes;
