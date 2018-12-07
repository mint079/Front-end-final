import React from 'react';
import SkyLight from 'react-skylight';

class AddTraining extends React.Component {
  constructor(props) {
      super(props);
      this.state = {date:'',  activity: '', duration: ''}
  };

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
  submitTraining = (event) => {
      event.preventDefault();
      var newTraining={date: this.state.date, activity: this.state.activity, duration: this.state.duration, customer:this.props.idlink};
      this.props.addTraining(newTraining);    
      this.props.loadTraining();
      this.refs.simpleDialog.hide();    
  }
  
  render() {
    const addTrainingDialog = {
      width: '70%',
      height: '450px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
        <div>
          <SkyLight dialogStyles={addTrainingDialog} hideOnOverlayClicked ref="simpleDialog">
                <div className="card" style={{"width": "95%",}}>
                <div className="card-body">
                <h5 className="card-title">New training</h5>
                <form>
                    <div className="form-group">       
                        <input type="date" placeholder="Date" className="form-control" name="date" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="number" placeholder="duration" className="form-control" name="duration" onChange={this.handleChange} min="0"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={(e)=>this.submitTraining(e)}>Save</button>   
                    </div>       
                </form>
                </div>      
                </div>
          </SkyLight>
          <div className="col-md-2">
              <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New training</button>
          </div>
        </div>   
      );
  }
}

export default AddTraining;