import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Articles from './components/articles/Articles';
import Profile from './components/profile/Profile';
import Home from './components/articles/Home';
import SignIn from './components/SignIn';
import AddArticle from './components/articles/AddArticle';
import EditArticle from './components/articles/EditArticle';
import ShowArticle from './components/articles/ShowArticle';
import Home_hooks from './components/articles/Home_hooks';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import './App.scss';

// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <div className="container">
            <Switch>
              <PublicRoute exact path="/" component={Home} />
              <PublicRoute exact path="/article/add" component={AddArticle} />
              <PublicRoute exact path="/article/:id" component={ShowArticle} />
              <PublicRoute exact path="/article/edit/:id" component={EditArticle} />
              <PublicRoute exact path="/about" component={About} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PublicRoute exact path="/mangusta" component={SignIn} />
              <PrivateRoute exact path="/test" component={Home_hooks} />
              <PublicRoute component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
