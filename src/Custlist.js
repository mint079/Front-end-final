import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ToastContainer, toast } from 'react-toastify';
import AddCust from './AddCust';
import Traininglist from './Traininglist';

class Custlist extends Component {
  state = { cust: [] };

  componentDidMount() {
    this.loadCust();
  }
  
  // Load customers
  loadCust = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        cust: responseData.content,
      }); 
    })   
  }

  // Delete customer
  onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',                            
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadCust())
        .catch(err => console.error(err)) 

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_RIGHT
        });        
      }
    })   
  }

  // Create new customer
  addCust(cust) {
    fetch('https://customerrest.herokuapp.com/api/customers', 
    {   method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cust)
    })
    .then(res => this.loadCust())
    .catch(err => console.error(err))
  }

    // Update customer
  updateCust(cust, link) {
    fetch(link, 
    { method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cust)
    })
    .then(
      toast.success("Changes saved", {
        position: toast.POSITION.BOTTOM_LEFT
      })         
    )
    .catch( err => console.error(err))
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.cust];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ cust: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.cust[cellInfo.index][cellInfo.column.id]
        }}                
      />
    );
  }  

  render() {
    return (
      <div className="App-body">
      <div className="row">
        <AddCust addCust={this.addCust} loadCust={this.loadCust} />
        </div>
        <ReactTable data={this.state.cust}
        columns={[
            {
              columns: [
                {
                  accessor: "links[0].href",
                  show: false
                },
                {
                  Header: "Firstname",
                  accessor: "firstname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Lastname",
                  accessor: "lastname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Street Address",
                  accessor: "streetaddress",
                  Cell: this.renderEditable
                },
                {
                  Header: "Post Code",
                  accessor: "postcode",
                  Cell: this.renderEditable
                },
                {
                  Header: "City",
                  accessor: "city",
                  Cell: this.renderEditable
                },
                {
                  Header: "Email",
                  accessor: "email",
                  Cell: this.renderEditable
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                  Cell: this.renderEditable
                },              
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                }              
              ]
            }
          ]}
          filterable
          className="-highlight" 
          SubComponent={
            row => {
                return (
                    <Traininglist link={this.state.cust[row.index].links[2].href} />
                );
            }
        }> 
        </ReactTable>
        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default Custlist;