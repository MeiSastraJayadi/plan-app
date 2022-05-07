import { useEffect, useState } from 'react'; 

const RawUser = ({ token, setAdd, userData, setUserData, searchData, setSearchData }) => {
    const [rowData, setRowData] = useState(null); 

    const onUpdate = object => {
        setAdd(object); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
    }

    const deleteFunction = object => {
        const delUrl = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/delete_user/${object.id}`; 
        fetch(delUrl, {
            method : "DELETE", 
            headers : {
                "Authorization" : `Token ${token}`
            }
        })
        .then(value => {
            if(value.ok){
                const sData = searchData.map(o => o); 
                const uData = userData.map(o => o);  
                sData.splice(sData.indexOf(object), 1); 
                uData.splice(uData.indexOf(object), 1); 
                setSearchData(sData); 
                setUserData(uData); 
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
        if(searchData) {
            let rUniversal = []; 
            let r = []; 
            for(i; i < searchData.length; i++){
                const obj = Object.assign({}, searchData[i]); 
                const jsx = (
                <div className="attendees-bottom">
                    <div className="object-action">
                        <button className="object-action-add" onClick={e => {onUpdate(obj); e.preventDefault()}}><ion-icon name="pencil-outline"></ion-icon></button>
                        <button className="object-action-delete" onClick={e => {deleteFunction(obj); e.preventDefault()}}><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                    <div className="attendees-content">
                        <h2>{`${searchData[i].first_name} ${searchData[i].last_name}`}</h2>
                        <label className="phone">Phone : {searchData[i].phone}</label><br/>
                        <label className="email">Email : {searchData[i].email}</label>
                    </div>
                </div>
                )
                r.push(jsx); 
                j++; 
                if(j > 2 || i === searchData.length - 1){
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
    }, [searchData]); 

    return (
        <div className="content-bottom">
            {rowData !== null && rowData}
        </div>
    )
}

export default RawUser; 
