import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react'; 
import { useHistory } from 'react-router-dom'; 
import Select from 'react-select'; 
import useFetch from './usefetch'; 

const Form = ({searchData, setSearchData, setEventData, EventData, setAdd, username, token, setForm, status}) => {
    const urlVenue = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_venue`
    const urlUser = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_userevent`
    const createEventURL = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/create_event`; 
    const getEventURL = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_event_by_id/${status}`; 
    const updateEventURL = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/update_event/${status}`; 
    const [eventName, setEvent] = useState(null); 
    const [eventPending, setEventPending] = useState(false); 
    const [eventError, setEventError] = useState(false); 
    const [venueS, setVenueSelect] = useState(null); 
    const [attndS, setAttndSelect] = useState([]); 
    const [day, setDay] = useState(null); 
    const [atndObject, setAtdObject] = useState(null); 
    const [venueObject, setVenueObject] = useState(null); 
    const [textDescription, setDescription] = useState(null); 
    const [time, setTime] = useState(null); 
    //const [venueId, setVenueId] = useState(null); 
    //const [usrId, setUsrId] = useState(null); 
    //const [getData, setGetData] = useState(null); 
    const [eventData, setData] = useState(null); 
    const [Pending, isPending] = useState(null); 
    const [EventError, isError] = useState(false); 
    const [obVenue, setObVenue] = useState(null); 
    const [obAtnd, setObAtnd] = useState(null); 
    const history = useHistory(); 
    
    useEffect(() => {
        if(status !== "create"){
            isPending(true); 
            const abort = new AbortController(); 
            fetch(getEventURL, {
                signal: abort.signal, 
                headers: {
                    "Authorization" : `Token ${token}`
                    }
            })
            .then(value => {
                if (value.ok || value.status === 302){
                    return value.json(); 
                }
                return Promise.reject(value); 
            })
            .then(json => {
                console.log(json); 
                setData(json); 
                isPending(false); 
            })
            .catch(e => {
                if(e.name === "AbortError"){
                    console.log("fetch aborted"); 
                }
                else {
                    console.log(`Error to fetch ${updateEventURL}`); 
                    isError("Bad Request"); 
                    isError(true); 
                }
            })

            //if(!Pending && !EventError){
                //setEvent(eventData.name); 
            //}
        }
    }, [status, token, updateEventURL])

    useEffect(() => {
        if(!Pending && eventData){
            setEvent(eventData.name); 
            setDescription(eventData.description); 
            const eventTime = eventData.day; 
            const inputTime = `${eventTime.substring(0,10)} ${eventTime.substring(11,eventTime.length-1)}`; 
            setTime(inputTime); 
            setDay(eventData.day); 
            if (venueObject && atndObject){
                const objectV = venueObject.filter(obj => {if(obj.value === eventData.venue) return obj}); 
                const objectA = atndObject.filter(obj => {if(eventData.attendees.includes(obj.value)) return obj})
                const objV = objectV[0];  
                setObVenue(objV); 
                setObAtnd(objectA); 
                const atndValue = objectA.map(object => object.value);
                const venueValue = objV.value;  
                setVenueSelect(venueValue); 
                setAttndSelect(`[${atndValue}]`); 
            }
        }
    }, [Pending, eventData, venueObject, atndObject])


    const eventPost = {"name" : eventName, "venue" : venueS, "attendees" : attndS, "day" : day, "description" : textDescription}; 
    
    const createObject = (label, value) => {
        const obj = {}; 
        obj.value = value; 
        obj.label = label; 
        return obj
    }

    const onClick = () => {
        setAdd(false); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
    }

    const createEvent = create => {
        setEventPending(true); 
        let funcURL = createEventURL; 
        let mth = "POST"; 
        if(create !== "create"){
            funcURL = updateEventURL; 
            mth = "PUT"; 
        }
        fetch(funcURL, {
            method : mth, 
            headers : { 
                "Content-Type" : "application/json",
                "Authorization" : `Token ${token}` 
                }, 
            body : JSON.stringify(eventPost) 
            })
            .then(value => {
                if(value.ok){
                    setEventPending(false); 
                    setEventError(false); 
                    if(searchData && EventData){
                        const atnString = eventPost.attendees.substring(1,eventPost.attendees.length - 1); 
                        const at = atnString.split(','); 
                        const attn = at.map(value => parseInt(value)); 
                        const post = eventPost;
                        post.attendees = attn; 
                        post.id = status; 
                        const sDMod = searchData.map(value => {
                            if(value.id === status){
                                return eventPost; 
                            }
                            else{
                                return value; 
                            }
                            }) 

                        const eDMod = EventData.map(value => {
                                    if(value.id === status){
                                        return eventPost; 
                                    }
                                    else {
                                        return value; 
                                    }
                                })
                        setSearchData(eDMod); 
                        setEventData(sDMod); 
                    }
                    history.push(`/${username}/event`); 
                    setForm(false); 
                   onClick();  
                    return; 
                }
                else {
                    return new Promise.reject(value); 
                }
            })
            .catch(e => {
                setEventError("An Error Occured"); 
                setEventPending(false); 
            })
    }

    const dayChange = e => {
        setTime(e.target.value); 
        if(e.target.value.includes(" ") && (e.target.value.length >= 19)){
           let str = e.target.value.replaceAll(" "); 
            const und = 'undefined'; 
            const index2 = 10 + und.length; 
            let str2 = str.substring(0,10)+'T'+str.substring(index2,str.length)+'Z'; 
            setDay(str2); 
            console.log(str2); 
        }
        else {
            setDay(null); 
        }
    }

    const changeAtnd = (event) => {
        const allValue = event.map(object => object.value); 
        const valueString = `[${allValue}]`; 
        setObAtnd(event); 
        setAttndSelect(valueString); 
    }

    const changeVenue = (event) => {
        setObVenue(event); 
        setVenueSelect(event.value); 
    }

    const {data:venueData, pending:venuePending, error:venueError} = useFetch(urlVenue, token);   
    const {data:attndData, pending:attndPending, error:attndError} = useFetch(urlUser, token);   

    useEffect(() => {
        setForm(true); 
        if(!venuePending){
            const list = venueData.map(object => createObject(object.name, object.id))  
            setVenueObject(list); 
        }
        if(!attndPending){
            const list = attndData.map(object => createObject(`${object.first_name} ${object.last_name}`, object.id))  
            setAtdObject(list); 
        }
    },[venuePending, attndPending])

    return (
        <Router>
            <div className="add-form show">
                <div className="close">
                    <button onClick={onClick}><ion-icon name="close-circle-outline"></ion-icon></button>
                </div>
                <Switch>
                    <Route exact path={`/${username}/event`}>
                        <h2>{ attndPending }</h2>
                        { (!venuePending && !attndPending) && 
                        <div>
                            <div className="title">
                                {(status === "create") && <h2>Create Venue</h2>}
                                {(status !== "create") && <h2>Update Venue</h2>}
                            </div>
                            <form onSubmit={e => {createEvent(status); e.preventDefault()}}>
                                <div className="form-element name">
                                    <label>Event Name</label><br/>
                                    <input type="text" placeholder="Event Name" value={eventName} onChange={e => setEvent(e.target.value)} required/>
                                </div>
                                <div className="double loc">
                                    <div className="form-element location">
                                        <label for="venueSelect">Venue</label><br/>
                                        <Select
                                            isMulti={false}
                                            options={venueObject}
                                            value={obVenue}
                                            onChange={changeVenue} 
                                        />
                                    </div>
                                    <div className="form-element location">
                                        <label>Day</label><br/>
                                        <input type="text" placeholder="yy-mm-dd h:m:s" value={time} onChange={dayChange} required/>
                                    </div>
                                </div>
                                <div className="single">
                                    <div className="form-element location">
                                        <label>Description</label><br/>
                                        <textarea value={textDescription} onChange={e => setDescription(e.target.value)} required></textarea>
                                    </div>
                                </div>
                                <div className="single">
                                    <div className="form-element location">
                                        <label>Attendees</label><br/>
                                        <Select
                                            isMulti={true}
                                            options={atndObject}
                                            value={obAtnd}
                                            onChange={changeAtnd} 
                                        />
                                    </div>
                                </div>
                                <div style={{textAlign : "center", paddingTop : "10px"}}>
                                    {eventError && <label className="error" style={{color : "#ff0000"}}>Data is Invalid</label>}
                                </div>
                                <div className="btn">
                                    {eventPending && <button disabled>Please Wait...</button>}
                                    {(!eventPending && (status === "create")) && <button>Create Event</button>}
                                    {(!eventPending && (status !== "create")) && <button>Update Event</button>}
                                </div>
                            </form>
                            </div>
                        }
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Form; 
