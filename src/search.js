import { useState, useEffect } from 'react'; 

const Search = ({search, setSearchEvent, Data, upcoming}) => {
    const [searchValue, setSearch] = useState(null); 

    useEffect(() => {
        setSearch(null); 
        search(false); 
    }, [upcoming])
    
    const useSearch = e => {
        search(searchValue);
        const retData = Data.filter(value => {
            if(upcoming !== "attendees"){
                if(value.name.includes(searchValue)){
                    return value; 
                }
                else if((searchValue === null) || (searchValue === "")){
                    return value; 
                }
            }
            else {
                if(value.first_name.includes(searchValue) || value.last_name.includes(searchValue)){
                    return value; 
                }
                else if((searchValue === null) || (searchValue === "")){
                    return value; 
                }
            }
        })
        console.log(retData); 
        setSearchEvent(retData); 
        e.preventDefault(); 
    }

    return (
        <div>
            <div className="search">
                <form onSubmit={useSearch}>
                    <input type="text" placeholder="Search" value={searchValue} onChange={e => setSearch(e.target.value)}/>
                    <button><ion-icon name="search-outline"></ion-icon></button>
                </form>
            </div>
        </div>
    )
}

export default Search;
