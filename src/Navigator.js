import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { firebaseAuth } from './config';


class Navigator extends Component {
    logout = () => {
      return firebaseAuth().signOut()
    }  
  
    render() {
      let logLink = null;
      if (this.props.isAuthenticated)
        logLink = <button className="btn btn-link" onClick={this.logout}>Logout</button>;
      else
        logLink = <Link className="nav-link" to="/login">Login</Link>;
  
      return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">The page</Link>
          <div id='nav_Bar'>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Customers' trainings list</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendar">Calendar</Link>
              </li>
              
            </ul>
            <ul className="navbar-nav ml-auto">
              {logLink}
            </ul>        
          </div>
        </nav>        
        </div>
      );
    }
  }
export default Navigator;