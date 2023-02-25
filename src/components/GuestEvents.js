import React, {useState, useEffect} from 'react'
import moment from 'moment';

import { AiFillYoutube } from 'react-icons/ai';
import { IconContext } from "react-icons";

import '../styles/Login.css';

moment().format();

//https://stackoverflow.com/questions/8537602/any-way-to-extend-javascripts-array-sort-method-to-accept-another-parameter
const PropertySorter = (property) =>
(a, b) => a[property] === b[property] ? 0 : a[property] < b[property] ? -1 : 1


function GuestEvents() {
    // list of events
    const [events, setEvents] = useState([])

    // constants to hold user filtering input
    const [eventSearch, setEventSearch] = useState("")
    const [eventTypeFilter, setEventTypeFilter] = useState("")

    // fetching from the api and storing in events
    useEffect(() => {
        fetch('https://api.hackthenorth.com/v3/events/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setEvents(data.sort(PropertySorter('start_time')))
        })
    },[]);

    return (
        // event page
        <div className='eventpage'>
            <div className='sidebar'></div>
            <div className='events'>
                <div className='search-bar'>
                    {/*search bar for hackers to filter events based on name*/}
                    <input
                        type = "text" 
                        placeholder = "Search for an event" 
                        onChange = {(event) => {
                            setEventSearch(event.target.value);
                        }}
                    />

                    {/*drop down menu for hackers to filter events based on type*/}
                    <select 
                        onChange={(event) => setEventTypeFilter(event.target.value)}
                    >
                        <option value="" >All</option>
                        <option value="workshop">Workshop</option>
                        <option value="tech_talk">Tech Talk</option>
                        <option value="activity">Activity</option>
                    </select>
                </div>

                {/*filtering events based on user input previously*/}
                {events.filter((event) => {
                    if (eventSearch === ""){
                        return event
                    } else if (event.name.toLowerCase().includes(eventSearch.toLowerCase())){
                        return event
                    } return null
                }).filter((event) => {
                    if (eventTypeFilter === ""){
                        return event
                    } else if (event.event_type.toLowerCase().includes(eventTypeFilter.toLowerCase())){
                        return event
                    } return null
                }).map ((event) => (
                    // mapping through each element of events and displaying it
                    <div key={event.id}>
                        {event.permission !== "private" &&
                            <div className = "container">
                                <div className='event-name' id={event.name}>{event.name}</div>
                                <div className='event-type'>{event.event_type}</div>
                                <div className='description'>{event.description}</div>
                                <div className='start-time'>Start time: {moment(event.start_time).format("LLLL")}</div>
                                <div className='end-time'> End time: {moment(event.end_time).format("LLLL")}</div>
                                
                                {/*mapping through each related event and displaying it*/}
                                <div className='related-events'>
                                <div>Related Events:</div>
                                    {event.related_events.map((relatedEvent) => {
                                        for (let i = 0; i < events.length; i++){
                                            if (events[i].id === relatedEvent && events[i].permission !== "private"){
                                                return (
                                                    <a href={`#${events[i].name}`}>
                                                        <li>{events[i].name}</li>
                                                    </a>
                                                )
                                            }      
                                        }
                                        return null
                                    })}
                                </div>

                                {/*displaying public links related to event*/}
                                <div className='links'>
                                    {event.public_url &&
                                        <IconContext.Provider value={{ size: 20 }}>
                                            <a href={event.public_url}>
                                                <button><AiFillYoutube/></button>
                                            </a>
                                        </IconContext.Provider>
                                    }
                                </div>  
                            </div>
                        }
                    </div>
                ))}
            </div> 
        </div>
    )
}

export default GuestEvents