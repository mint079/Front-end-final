import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/nb';


import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);
class Calendar extends Component {
    state = {
      events:[],
    }
    
    componentDidMount(){
        this.loadDate();    }
    loadDate= ()=> {
        fetch('https://customerrest.herokuapp.com/api/trainings',)
         .then(response =>response.json())
         .then(data =>{ 
             var List= data.content.map(trainingList =>  {
                var a= {};
                fetch(trainingList.links[2].href)
                .then(response => response.json())
                .then(data =>{
                    a.title = data.firstname+ ' ' + data.lastname +': ' +trainingList.activity;
                    a.start = new Date(trainingList.date);
                    a.end = new Date(trainingList.date);
                    a.resource = trainingList.links;
                    a.allDay =true;
                    

                })
                .catch(er => console.log(er));
                return a;
                }
             )
             this.setState({events: List});
            }
        )
         .catch(err => console.log(err));
    }

    render() {
      return (
        <div className="Container">
            <div>
                <BigCalendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                style={{ height: "100vh" }}
                />
            </div>
        </div>
      );
    }
  }
  export default Calendar;