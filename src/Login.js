import React, { Component } from 'react';
import { firebaseAuth } from './config';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = { email: '', password: '', redirect: false};

  resetPassword = (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    firebaseAuth().sendPasswordResetEmail(email).then(function() {
      toast.success("Password reset email sent.", {
        position: toast.POSITION.TOP_RIGHT
      });
    }).catch(function(error) {
      toast.error("Error in resetting password. Type your email to email field.", {
        position: toast.POSITION.TOP_RIGHT
      });
    });    
  }

  onLoginClick = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    firebaseAuth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect 
        this.setState({ redirect: true }); 
      })
      .catch(() => {
        // No account found. Create a new one and send verification email
        firebaseAuth().createUserWithEmailAndPassword(email, password)
          .then(() => { 
            var user = firebaseAuth().currentUser;
            user.sendEmailVerification().then(function() {
              toast.success("Verifiaction email sent.", {
                position: toast.POSITION.TOP_RIGHT
              });
            }).catch(function(error) {
              toast.error("Error in authentication.", {
                position: toast.POSITION.TOP_RIGHT
              });
            });
           })
          .catch(() => {
            toast.error("Could not login. Check your email and password.", {
              position: toast.POSITION.TOP_RIGHT
            });           
          });
      });
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to='/' />);
    }

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
          <h2 className="text-center text-white mb-4">Login Form</h2>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <span className="anchor" id="formLogin"></span>
                <div className="card rounded-0">
                  <div className="card-header">
                    <h3 className="mb-0">Login</h3>
                  </div>
                  <div className="card-body">
                    <form className="form" role="form" id="formLogin">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="text" id="email" className="form-control form-control-lg rounded-0"  name="email" onChange={this.handleChange} placeholder='email@domain.com' />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control form-control-lg rounded-0" name="password" onChange={this.handleChange} />
                      </div>
                        <button onClick={this.resetPassword} className="btn btn-link float-left">Forgot password?</button>
                        <button onClick={this.onLoginClick} className="btn btn-success btn-lg float-right">Login</button>
                      </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>      
    );
  }
}

export default Login;