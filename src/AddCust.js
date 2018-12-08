import React from 'react';
import SkyLight from 'react-skylight';

class AddCust extends React.Component {
  constructor(props) {
      super(props);
      this.state = {firstname: '', lastname: '',  streetaddress: '', postcode : '', city : '',email :'',phone :''};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
  // Save car and load cars and finally close modal
  handleSubmit = (event) => {
      event.preventDefault();
      var newCust = { firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email:this.state.email, phoen:this.state.phone};
      this.props.addCust(newCust);    
      this.props.loadCust();
      this.refs.simpleDialog.hide();    
  }
  
  render() {
    // Add car page doesn't fit to default size modal
    const addCustDialog = {
      width: '70%',
      height: '500px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <SkyLight dialogStyles={addCustDialog} hideOnOverlayClicked ref="simpleDialog">
              <div className="card" style={{"width": "95%"}}>
              <div className="card-body" style={{"height": "90%"}}>
              <h5 className="card-title">New customer</h5>
              <form>
                  <div className="form-group">       
                      <input type="text" placeholder="Firstname" className="form-control" name="firstname" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Lastname" className="form-control" name="lastname" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Streetaddress" className="form-control" name="streetaddress" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="City" className="form-control" name="city" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Email" className="form-control" name="email" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Phone" className="form-control" name="phone" onChange={this.handleChange}/>
                  </div>

                  <div className="form-group">
                      <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>   
                  </div>       
              </form>
              </div>      
              </div>
        </SkyLight>
        <div className="col-md-2">
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New customer</button>
        </div>
      </div>   
    );
  }
}

export default AddCust;
