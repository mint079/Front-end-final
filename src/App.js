import React, { Component } from 'react';
import './App.css';
import Custlist from './Custlist';
import Calendar from './Calendar';
import Home from './Home';
import Navigator from'./Navigator';
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import Login from './Login';
import { firebaseAuth } from './config';

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null, isAuthenticated : false};
  }
  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user ) {
        this.setState({ user: user, isAuthenticated: true });      
      } 
      else {
        this.setState({ user: null, isAuthenticated: false });      
      }
    });
  }
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Navigator isAuthenticated={this.state.isAuthenticated}/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" render={() => <Login />} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/customers" component={() => <Custlist />} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/calendar" component={() => <Calendar />} />
              <Route render={() => <h1>Page not found</h1>} />           
            </Switch>
        </div>
      </Router>      
      </div>
    );
  }
}

export default App;
