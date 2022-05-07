import { useRef, useEffect, useState } from 'react'; 

const VenueList = ({ token, setRV, Add, setAdd, setVenueList}) => {
    const url = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_venue`; 
    const deleteUrl = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/delete_venue/`; 
    const [Del, setDel] = useState(false); 
    const [data, setData] = useState(null); 
    const [pending, setPending] = useState(true); 
    const [error, setError] = useState(false); 
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
                return value.json(); 
            }
            return Promise.reject(value); 
        })
        .then(json => {
            const venueD = json.filter(object => {
                if(object !== null){
                    return object; 
                }
                }); 
            setData(venueD); 
            setVenueList(venueD)
            if(pending){
                setPending(false); 
            }
        })
        .catch(e => {
            if(e.name === "AbortError"){
                console.log("fetch aborted"); 
            }
            else if(e.name === "TypeError"){
                setError(e.name); 
                return; 
            }
            else {
                console.log(`Error to fetch ${url}`); 
                setError(e.name); 
            }
        })

        return () => abort.abort(); 
    },[url, token, error, Add, Del])

    const nameR = useRef([]); 

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
    },[nameR, data, pending])

    useEffect(() => {
        if((!pending && !error) && data){
            const reverseData = data.reverse(); 
            let rData = [];  
            if(reverseData.length < 10){
                rData = reverseData; 
            }
            else {
                for(let i = 0; i < 10; i++){
                    rData.push(reverseData[i]); 
                }
            }

            setRV(rData); 
        }
    }, [data, pending, error, setRV, Add, Del])

    const onDelete = object => {
        fetch(`${deleteUrl}${object.id}`, {
            method : "DELETE", 
            headers : {
                "Authorization" : `Token ${token}`
            }
        })
        .then(value => {
            if(value.ok){
                setDel(!Del)
                //data.splice(data.indexOf(object), 1); 
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
            {pending && <h2>Fetching Data...</h2>}
            {error && <h2>An Error Occured...</h2>}
            {((!pending && data) && !error) && 
                data.map((object,i) => {
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

export default VenueList; 
