import React, {Component} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import Cookies from "universal-cookie";
import Feeds from "./views/feeds/Feeds";
import NewsFeeds from "./views/feeds/NewsFeeds";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/login/Login'));

class App extends Component {

  render() {
    const cookies = new Cookies();

    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>

              <Route exact path="/feeds" name="News Feeds" render={props => <Feeds {...props}/>} />

                <Route exact path="/feeds/details/:id" name="News Feeds Details" render={props => <NewsFeeds {...props}/>} />

              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />

              <Route path="/" name="Home" render={props =>

                  (cookies.get('token')!=null?
                  <TheLayout {...props}/>:
                      <Redirect from="/" to="/feeds" />
                      )

              }
              />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
