import { useState, useEffect } from 'react'; 
import Select from 'react-select'; 

const UserForm = ({ setAdd, token, Add, setSearchData, searchData, setUserData, userData, search }) => {
    const createUrl = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/create_ussr`; 
    const updateUrl = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/update_ussr/`; 
    const [firstName, setFirstName] = useState(null); 
    const [lastName, setLastName] = useState(null); 
    const [sexSelect, setSexSelect] = useState(false); 
    const [sexShow, setSexShow] = useState({value : false, label : "Female"})
    const [phone, setPhone] = useState(""); 
    const [email, setEmail] = useState(""); 

    const sexOptions = [
        {value : false, label : "Female"},
        {value : true, label : "Male"}
    ]

    useEffect(() => {
        if(Add !== "create"){
            setFirstName(Add.first_name); 
            setLastName(Add.last_name); 
            setPhone(Add.phone); 
            setEmail(Add.email); 
            setSexSelect(Add.isMale); 
            let gender = "Male"; 
            if(!Add.isMale){
                gender = "Female"; 
            }
            setSexShow({value : Add.isMale, label : gender}); 
        }
    }, [Add])

    const onClick = () => {
        setAdd(false); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
    }

    const onSubmit = e => {
        const data = {first_name : firstName, last_name : lastName, phone : phone, email : email, isMale : sexSelect}; 
        let method = "POST"; 
        let url = createUrl; 
        if(Add !== "create"){
            method = "PUT"; 
            url = `${updateUrl}${Add.id}`; 
        }
        fetch(url, {
            method : method, 
            headers : {
                "Authorization" : `Token ${token}`, 
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        .then(value => {
            if(value.ok || value.status === 302){
                return value.json(); 
            }
            else {
                return new Promise.reject(value); 
            }
        })
        .then(result => {
            if(method === "PUT" && searchData){
                const sData = searchData.map(obj => {
                    if(obj.id === result.id){
                        return result; 
                    }
                    else {
                        return obj; 
                    }
                })
                const uData = userData.map(obj => {
                    if(obj.id === result.id){
                        return result; 
                    }
                    else {
                        return obj; 
                    }
                })
                setSearchData(sData); 
                setUserData(uData); 
            }
            else if(method === "POST" && searchData){
                const sData = searchData.map(o => o); 
                const uData = userData.map(o => o); 
                uData.push(result); 
                if(result.last_name.includes(search) || result.first_name.includes(search)){
                    sData.push(result); 
                }
                setSearchData(sData); 
                setUserData(uData); 
            }
            setAdd(false); 
            onClick(); 
        })
        .catch(err => {
            console.log(`Error Type : ${err.name}`); 
        })
        e.preventDefault(); 
    }

    const changeSex = (object) => {
        setSexShow(object);
        setSexSelect(object.value); 
    }

    return (
        <div className="add-form show user">
            <div className="close">
                <button onClick={onClick}><ion-icon name="close-circle-outline"></ion-icon></button>
            </div>
            {(Add === "create") &&
                <div className="title">
                    <h2>Create Attendees</h2>
                </div>
            }
            {(Add !== "create") &&
                <div className="title">
                    <h2>Update Attendees</h2>
                </div>
            }
            <form onSubmit={onSubmit} enctype="multipart/form-data">
                <div className="form-element firstname">
                    <label>First Name</label><br/>
                    <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                </div>
                <div className="form-element lastname">
                    <label>Last Name</label><br/>
                    <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                </div>
                <div className="double">
                    <div className="form-element user">
                        <label>Phone</label><br/>
                        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="form-element user">
                        <label>Email</label><br/>
                        <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="form-element sex">
                    <label>Sexuality</label><br/>
                    <Select 
                        isMulti={false}
                        options={sexOptions}
                        value={sexShow}
                        onChange={changeSex}>
                    </Select>
                </div>
                <div className="btn">
                    {(Add === "create") &&
                        <button>Create Attendees</button>
                    }
                    {(Add !== "create") &&
                        <button>Update Attendees</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default UserForm; 
