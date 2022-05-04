import { useRef, useEffect } from 'react'; 

const RawVenue = ({venueData, setVenueData, searchData, setSearchData, setAdd, token}) => {
    const nameR = useRef([]); 
    const deleteUrl = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/delete_venue/`; 

    useEffect(() => {
        const name = nameR.current; 
        if(!name) {console.log("Is Null"); return}; 
        name.forEach(object => {
            if(object){
                if(object.innerHTML.length <= 9){
                    object.style.fontSize = '70px'; 
                }
                else {
                    object.style.fontSize = 70 - Math.round(object.innerHTML.length/1.5) + 'px';
                }
            }
        })
    },[venueData])

    const onDelete = object => {
        fetch(`${deleteUrl}${object.id}`, {
            method : "DELETE", 
            headers : {
                "Authorization" : `Token ${token}`
            }
        })
        .then(value => {
            if(value.ok){
                //data.splice(data.indexOf(object), 1); 
                const data = searchData.map(obj => obj);  
                const allData = venueData.map(obj => obj); 
                data.splice(data.indexOf(object), 1)
                allData.splice(data.indexOf(object), 1); 
                setSearchData(data); 
                setVenueData(allData); 
                return; 
            }
            else {
                return new Promise.reject(value); 
            }
        })
        .catch(err => {
            console.log(err.name); 
        })
    }

    const onUpdate = object => {
        setAdd(object); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
    }

    return (
        <div className="bottom-content">
        {venueData !== null && 
            searchData.map((object, i) => {
                return (
                <div className="venue-cntn">
                    <div className="image">
                        <img alt="" src={`https://planapp6-meisastrajayadi.cloud.okteto.net${object.image}` || ""}/>
                    </div>
                    <div className="venue-detail">
                        <div className="attr">
                            <button id="update" onClick={e => {onUpdate(object); e.preventDefault()}}><ion-icon name="pencil-outline"></ion-icon></button>
                            <button id="delete" onClick={e => {onDelete(object); e.preventDefault();}}><ion-icon name="trash-outline"></ion-icon></button>
                        </div>
                        <div className="venue-data">
                            <h2 key={i} ref={el => nameR.current[i] = el}>{object.name || " "}</h2>
                            <label className="address">{object.address || " -"} - {object.zip_code || " "}</label>
                            <label>Website : {object.website || " -"}</label>
                            <label>Phone : {object.phone || " -"}</label>
                            <label>Email : {object.email || " -"}</label>
                        </div>
                    </div>
                </div>
                )
            })
        }
        </div>
    )
}

export default RawVenue; 
