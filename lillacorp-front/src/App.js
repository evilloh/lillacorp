import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Articles from './components/articles/Articles';
import Home from './components/articles/Home';
import AddArticle from './components/articles/AddArticle';
import EditArticle from './components/articles/EditArticle';
import ShowArticle from './components/articles/ShowArticle';
import Home_hooks from './components/articles/Home_hooks';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

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
              <Route exact path="/" component={Home} />
              <Route exact path="/article/add" component={AddArticle} />
              <Route exact path="/article/:id" component={ShowArticle} />
              <Route exact path="/article/edit/:id" component={EditArticle} />
              <Route exact path="/about" component={About} />
              <Route exact path="/lillachoice" component={About} />
              <Route exact path="/test" component={Home_hooks} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
