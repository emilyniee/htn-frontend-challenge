import React, {useState, useEffect} from 'react'
import moment from 'moment';

import { AiFillYoutube } from 'react-icons/ai';
import { SiCodeproject } from "react-icons/si";
import { IconContext } from "react-icons";

import '../styles/Events.css';

moment().format();

//https://stackoverflow.com/questions/8537602/any-way-to-extend-javascripts-array-sort-method-to-accept-another-parameter
const PropertySorter = (property) =>
  (a, b) => a[property] === b[property] ? 0 : a[property] < b[property] ? -1 : 1

function Events() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('https://api.hackthenorth.com/v3/events/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setEvents(data.sort(PropertySorter('start_time')))
        })
    },[]);

    return (
        <div className='eventpage'>
            <div className='sidebar'></div>
            <div className='events'>
                {events.map ((event) => (
                    <div className='container' key={event.id}>
                        <div className='event-name' id={event.name}>{event.name}</div>
                        <div className='event-type'>{event.event_type}</div>
                        
                        <div className='description'>{event.description}</div>

                        <div className='start-time'>Start time: {moment(event.start_time).format("LLLL")}</div>
                        <div className='end-time'> End time: {moment(event.end_time).format("LLLL")}</div>
                        
                        <div className='related-events'>
                            <div>Related Events:</div>
                            {event.related_events.map((relatedEvent) => {
                                for (let i = 0; i < events.length; i++){
                                    if (events[i].id === relatedEvent){
                                        return (
                                            <a href={`#${events[i].name}`} key= {i}>
                                                <li>{events[i].name}</li>
                                            </a>
                                        )
                                    }
                                      
                                }
                                return null  
                            })}
                        </div>

                        <div className='links'>
                            {event.public_url &&
                                <IconContext.Provider value={{ size: 20 }}>
                                    <a href={event.public_url}>
                                        <button><AiFillYoutube/></button>
                                    </a>
                                </IconContext.Provider>
                            }

                            {event.private_url &&
                                <IconContext.Provider value={{ size: 20 }}>
                                    <a href={event.private_url}>
                                        <button><SiCodeproject/></button>
                                    </a>
                                </IconContext.Provider>
                            }
                        </div>
                    </div>    
                ))}
            </div> 
        </div>
    )
}

export default Events