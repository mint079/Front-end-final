import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ToastContainer, toast } from 'react-toastify';
import AddTraining from './AddTraining';

class Traininglist extends Component {
  state = { training: [] };

  componentDidMount() {
    this.loadTraining(this.props.link);
  }
  
  // Load cars from REST API
  loadTraining = (link) => {
    var traininglink = link+'/trainings';
    fetch(traininglink)
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        training: responseData.content,
      }); 
    })   
  }


  delTraining = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',                            
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadTraining(this.props.link))
        .catch(err => console.error(err)) 

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_LEFT
        });        
      }
    })   
  }

  
  addTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(training)
            })
            .then(re => console.log(this.loadTraining(this.props.link)))
            .catch(er => console.log(er));
    }

  render() {
 
        return (
        <div className="App-body">
        <div className="row">
            <AddTraining addTraining={this.addTraining} loadTraining={()=>this.loadTraining(this.props.link)} idlink ={this.props.link}/>
            </div>
            <ReactTable data={this.state.training}
            columns={[
                {
                columns: [
                    {
                    Header: "date",
                    id:"date",
                    accessor: d=> { 
                        var a= new Date(d.date);
                            return a.getFullYear() +"-"+a.getMonth()+"-" +a.getDate();
                        }
                    },  
                    {
                    Header: "Duration",
                    accessor: "duration",
                    },
                    {
                    Header: "Activity",
                    accessor: "activity",
                    },                        
                    {
                    id: 'button',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    accessor: 'links[0].href',
                    Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.delTraining(value)}}>Delete</button>)
                    }              
                ]
                }
            ]}
            filterable
            className="-highlight" 
            defaultPageSize={4}> 
            </ReactTable>
            <ToastContainer autoClose={2000}/>
        </div>
        );
    }
  
}

export default Traininglist;