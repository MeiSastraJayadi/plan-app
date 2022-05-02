import { useState, useEffect} from 'react'; 

const VenueForm = ({ setAdd, token, Add}) => {
    const urlVenue = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/create_venue`; 
    const updateUrl = `https://planapp6-meisastrajayadi.cloud.okteto.net/content_api/update_venue/`; 
    const [venueName, setVenueName] = useState(null); 
    const [zipCode, setZipCode] = useState(null); 
    const [address, setAddress] = useState(null); 
    const [website, setWebsite] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [image, setImage] = useState(null); 

    const createFile = async function(img, name) {
        let response = await fetch(img); 
        let data = response.blob(); 
        let metadata = {
            type : 'image/jpeg'
        }
        let file = new File([data], name, metadata); 
        return file; 
    }

    useEffect(() => {
        if(Add !== "create"){
            setVenueName(Add.name); 
            setZipCode(Add.zip_code); 
            setAddress(Add.address);
            setWebsite(Add.website); 
            setPhone(Add.phone); 
            setEmail(Add.email); 
            //if(Add.image){
                //const img = `https://planapp6-meisastrajayadi.cloud.okteto.net${Add.image}`;
                ////const imageFile = createFile(img, Add.image.substring(13, Add.image.length))
                ////imageFile
                    ////.then(value => {
                        ////setImage(value); 
                    ////})
            //}
        }
    }, [Add]); 

    const onClick = () => {
        setAdd(false); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
    }

    const onSubmit = e => {
        let venueData = new FormData();  
        console.log(venueName); 
        console.log(zipCode); 
        console.log(address)
        venueData.append("name", venueName); 
        venueData.append("zip_code", zipCode); 
        venueData.append("address", address); 
        venueData.append("website", website);
        venueData.append("phone", phone); 
        venueData.append("email", email); 
        if(Add === "create"){
            venueData.append("image", image, image.name); 
        }
        else {
            if(image){
                venueData.append("image", image, image.name); 
            }
        }

        let url = urlVenue; 
        let method = "POST"; 
        if(Add !== "create"){
            url = updateUrl+Add.id;
            method = "PUT";
        }

        fetch(url, {
            method: method, 
            headers : {
                "Authorization" : `Token ${token}`}, 
            body : venueData 
            })
            .then(value => {
                console.log(value); 
                console.log(venueData); 
                if(value.ok || value.status === 302){
                    setAdd(false); 
                    onClick(); 
                    e.preventDefault();
                    return; 
                }
                else {
                    return new Promise.reject(value); 
                }
            })
            .catch(err => {
                console.log("Failed to Created"); 
            })
        e.preventDefault(); 
    }

    return (
        <div className="add-form show venue">
            <div className="close">
                <button onClick={onClick}><ion-icon name="close-circle-outline"></ion-icon></button>
            </div>
            {(Add === "create") &&
                <div className="title">
                    <h2>Create Venue</h2>
                </div>
            }
            {(Add !== "create") &&
                <div className="title">
                    <h2>Update Venue</h2>
                </div>
            }
            <form onSubmit={onSubmit} enctype="multipart/form-data">
                <div className="form-element name">
                    <label>Venue Name</label><br/>
                    <input type="text" placeholder="Venue Name" value={venueName} onChange={e => setVenueName(e.target.value)} required/>
                </div>
                <div className="double loc">
                    <div className="form-element location zip">
                        <label>Zip Code</label><br/>
                        <input type="text" placeholder="Zip Code" value={zipCode} onChange={e => setZipCode(e.target.value)} required/>
                    </div>
                    <div className="form-element location">
                        <label>Address</label><br/>
                        <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required/>
                    </div>
                </div>
                <div className="double">
                    <div className="form-element">
                        <label>Phone</label><br/>
                        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="form-element">
                        <label>Website</label><br/>
                        <input type="url" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)}/>
                    </div>
                    <div className="form-element">
                        <label>Email</label><br/>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="single">
                    {(Add !== "create") && <h4>Current Image : {Add.image || ""}</h4>}
                    <input type="file" onChange={e => setImage(e.target.files[0])}/>
                </div>
                <div className="btn">
                    {(Add === "create") &&
                        <button>Create Venue</button>
                    }
                    {(Add !== "create") &&
                        <button>Update Venue</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default VenueForm; 
