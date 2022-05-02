import { useState, useEffect } from 'react'; 
import useFetch from './usefetch'; 

const User = ({ token, setRU, Add, setAdd}) => {
    const fetchUrl = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/get_userevent`; 
    const [onDelete, setOnDelete] = useState(false); 
    const [rowData, setRowData] = useState(null); 

    const { data, pending, error } = useFetch(fetchUrl, token, false, Add, onDelete)

    const onUpdate = object => {
        setAdd(object); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
    }

    const deleteFunction = id => {
        const delUrl = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/delete_user/${id}`; 
        fetch(delUrl, {
            method : "DELETE", 
            headers : {
                "Authorization" : `Token ${token}`
            }
        })
        .then(value => {
            if(value.ok){
                setOnDelete(!onDelete)
                return; 
            }
            else {
                return new Promise.reject(value);
            }
        })
        .catch(err => {
            console.log(`Error Type : ${err.name}`)
        })
    }

    useEffect(() => {
        let i = 0; 
        let j = 0; 
        if(data) {
            let rUniversal = []; 
            let r = []; 
            for(i; i < data.length; i++){
                const obj = Object.assign({}, data[i]); 
                const jsx = (
                <div className="attendees-bottom">
                    <div className="object-action">
                        <button className="object-action-add" onClick={e => {onUpdate(obj); e.preventDefault()}}><ion-icon name="pencil-outline"></ion-icon></button>
                        <button className="object-action-delete" onClick={e => {deleteFunction(obj.id); e.preventDefault()}}><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                    <div className="attendees-content">
                        <h2>{`${data[i].first_name} ${data[i].last_name}`}</h2>
                        <label className="phone">Phone : {data[i].phone}</label><br/>
                        <label className="email">Email : {data[i].email}</label>
                    </div>
                </div>
                )
                r.push(jsx); 
                j++; 
                if(j > 2 || i === data.length - 1){
                    const rw = r.map(object => object); 
                    const rowJsx = (
                        <div className="row">
                            {rw}
                        </div>
                    )
                    rUniversal.push(rowJsx); 
                    r = []; 
                    j = 0; 
                }
            }
            setRowData(rUniversal); 
        }
    }, [data]); 

    useEffect(() => {
        if(data){
            const rData = data.map(object => object).reverse(); 
            let recent = []; 
            if(rData.length < 10){
                recent = rData; 
            }
            else {
                for(let i = 0; i < 10; i++){
                    recent.push(rData[i]); 
                }
            }
            setRU(recent); 
        }
    }, [data]); 


    return (
        <div className="content-bottom">
            {pending && <h2>Fetching Data...</h2>}
            {error && <h2>An Error Occured...</h2>}
            {rowData !== null && rowData}
        </div>
    )
}

export default User; 
