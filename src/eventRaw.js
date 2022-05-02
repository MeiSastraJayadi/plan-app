import { useState } from 'react'; 
import Detail from './detail'; 

const Raw = ({eventData, setEventData, setAdd, data, setData, venue, token, attribute}) => {
    const [ready, setReady] = useState(false);  
    const [event, setEvent] = useState(null); 
    const [venueVal, setVenueVal] = useState(null);
    const [attd, setAttend] = useState(null); 
    const [onDelete, setOnDelete] = useState(false); 
    
    const getAttnd = data => {
        const list = {};  
        let i = 0; 
            data.attendees.forEach(object => {
                 fetch(`https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_user_by_id/${object}`, 
                    {
                    method : "GET", 
                    headers : {"Authorization" : `Token ${token}`}}
                    )
                    .then(response => response.json())
                    .then(value => {
                        if (list[object] === undefined){
                            list[object] = `${value.first_name} ${value.last_name}`; 
                        }
                        i += 1; 
                        if(i === data.attendees.length){
                            setAttend(list); 
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


    const onClick = (value, venueValue) => {
        setEvent(value); 
        setVenueVal(venueValue); 
       getAttnd(value);  
        const search = document.querySelector(".search"); 
        search.style.top = '80px'; 
    }

    const deleteEvent = (id, object) => {
         fetch(`https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/delete_event/${id}`, 
            {
            method : "DELETE", 
            headers : {"Authorization" : `Token ${token}`}}
            )
            .then(value => {
                setOnDelete(true); 
                let list = data; 
                let eventD = eventData; 
                list.splice(list.indexOf(object),1); 
                eventD.splice(eventD.indexOf(object),1); 
                setData(null); 
                setData(list); 
                setEventData(eventD); 
                setOnDelete(false); 
            }); 
    }

    return (
        <div className="bottom-content"> 
        {ready && <Detail data={event} venue={venueVal} attnd={attd} isReady={setReady} ></Detail>}
        { !onDelete &&
            data.map(value => {
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
                                <label>Venue : { venue[value.venue] }</label><br/>
                                <label>Time : { (new Date(value.day)).toDateString() }</label>
                            </div>
                            <div className="content-detail">
                                <p>
                                { value.description }
                                </p>
                            </div>
                            <button onClick={e => {onClick(value, venue[value.venue], attd); e.preventDefault()}}>See Detail</button>
                        </div>
                    </div>
                )
            })
            }
        </div>
    ) 
}

export default Raw; 
