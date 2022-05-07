import { useState, useEffect } from 'react'; 
import Detail from './detail'; 

const EventBottom = ({setAdd, formActive, token, setUpcoming, setData, upcoming, setVenueData, setAttdObject, setAllEvent, search, attribute}) => {
    const [eventVenue, setVenue] = useState(); 
    const [isVenue, setStatus] = useState(false); 
    const [attend, setAttend] = useState(null); 
    const [detailVenue, setDetailVenue] = useState(null); 
    const [detail, setDetail] = useState(null); 
    const [ready, setReady] = useState(false); 
    const [onDelete, setOnDelete] = useState(false); 
    let now = new Date(); 

    const getVenue = (data, pending) => {
        const list = {};  
        let i = 0; 
        if(!pending && data.length){
            data.forEach(object => {
                 fetch(`https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_venue_by_id/${object.venue}`, 
                    {
                    method : "GET", 
                    headers : {"Authorization" : `Token ${token}`}}
                    )
                    .then(response => response.json())
                    .then(value => {
                        if (list[object.venue] === undefined){
                            list[object.venue] = value.name; 
                        }
                        i += 1; 
                        if(i === data.length){
                            setVenue(list); 
                            setVenueData(list); 
                            setStatus(true); 
                        }
                    }) 
                    .catch(e => console.log(e.message));  
                }
            )
        }
    }

    const getAttnd = (data, pending) => {
        const list = {};  
        let i = 0; 
        if(!pending){
            data.attendees.forEach(object => {
                 fetch(`https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_user_by_id/${object}`, 
                    {
                    method : "get", 
                    headers : {"authorization" : `token ${token}`}}
                    )
                    .then(response => response.json())
                    .then(value => {
                        if (list[object] === undefined){
                            list[object] = `${value.first_name} ${value.last_name}`; 
                        }
                        i += 1; 
                        if(i === data.attendees.length){
                            setAttend(list); 
                            setAttdObject(list); 
                            setReady(true); 
                            const bottom = document.querySelector("#bottom"); 
                            const desc = document.querySelector(".content-description"); 
                            if (bottom.scrollTop > 80){
                                desc.style.top = bottom.scrollTop + 4 + 'px'; 
                            }
                            desc.classList.add("active"); 
                            }
                    }) 
                    .catch(e => console.log(e.message));  
                }
            )
        }
    }

    const onClick = (data, pending, venue) => {
        setDetail(data); 
        setDetailVenue(venue); 
       getAttnd(data, pending);  
        const search = document.querySelector(".search"); 
        search.style.top = '80px'; 
    } 

    const url = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_event`

    const [data, setdata] = useState(null); 
    const [pending, setPending] = useState(true); 
    const [error, setError] = useState(null); 
    const abort = new AbortController(); 
    useEffect(() => {
        fetch(url, {
            signal: abort.signal, 
            headers: {
                "Authorization" : `Token ${token}`
                }
        })
        .then(value => {
            if (value.ok || value.status === 302){
                console.log("Reload"); 
                return value.json(); 
            }
            return Promise.reject(value); 
        })
        .then(json => {
            console.log(json); 
            setdata(json); 
            setPending(false); 
            setOnDelete(false); 
        })
        .catch(e => {
            if(e.name === "AbortError"){
                console.log("fetch aborted"); 
            }
            else {
                console.log(`Error to fetch ${url}`); 
                setError("Bad Request"); 
            }
        })

        return () => abort.abort(); 
    },[url, token, error, upcoming, onDelete, formActive])

    const [isNew, setIsNew] = useState(false); 
    const [newData, setNew] = useState(null); 

    useEffect(() => {
        search(false); 
        let eventData; 
        let recentEvent;  
        if (!pending){
            if(upcoming){
                setUpcoming(true);
                eventData = data.filter(object => {
                    if ((new Date(object.day)) > now){
                        return object; 
                    }
                })

                recentEvent = data.filter(object => {
                    if ((new Date(object.day)).toDateString() === now.toDateString()){
                        return object
                    }
                })
            }
            else {
                setUpcoming(false); 
                console.log("upcoming is false"); 
                eventData = data; 

                recentEvent = data.filter(object => {
                    if ((new Date(object.day)).toDateString() === now.toDateString()){
                        return object
                    }
                })
                console.log(eventData); 
                console.log(recentEvent); 
            }
        }
        setNew(eventData); 
        getVenue(eventData, pending); 
        setData(eventData); 
        setAllEvent(recentEvent); 
        setIsNew(true); 
    }, [data, pending, upcoming]); 

    const deleteEvent = id => {
         fetch(`https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/delete_event/${id}`, 
            {
            method : "DELETE", 
            headers : {"Authorization" : `Token ${token}`}}
            )
            .then(value => setOnDelete(true)); 
    }

    return (
        <div className="bottom-content">
            {ready && <Detail data={detail} venue={detailVenue} attnd={attend} isReady={setReady} ></Detail>}
            {pending && <h2>Fetching Data...</h2>}
            {error && <h2>An Error Occured...</h2>}
            {(!newData && !pending) && <h2>No Data...</h2>}
            {((newData && !newData.length) && !pending) && <h2>No Data...</h2>}
            {((!pending && !error) && (isVenue && isNew) && newData.length) && 
            newData.map(value => {
                return (
                    <div className="cntn">
                        {attribute && 
                        <div className="attr">
                            <button id="update" onClick={e => {
                                    setAdd(value.id); 
                                    console.log("Active"); 
                                    const page = document.querySelector(".page"); 
                                    page.classList.toggle("blur"); 
                                    e.preventDefault(); 
                            }}><ion-icon name="pencil-outline"></ion-icon></button>
                            <button id="delete" onClick={() => deleteEvent(value.id)}><ion-icon name="trash-outline"></ion-icon></button>
                        </div>
                        }
                        <div className="data">
                            <div className="data-title">
                                <h3>{ value.name }</h3>
                                <label>Venue : { eventVenue[value.venue] }</label><br/>
                                <label>Time : { (new Date(value.day)).toDateString() }</label>
                            </div>
                            <div className="content-detail">
                                <p>
                                { value.description }
                                </p>
                            </div>
                            <button onClick={e => {onClick(value, pending, eventVenue[value.venue]); e.preventDefault()}}>See Detail</button>
                        </div>
                    </div>
                )
            })
            }
        </div>
    ) 
}

export default EventBottom; 
