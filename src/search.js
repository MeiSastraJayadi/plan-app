import { useState, useEffect } from 'react'; 

const Search = ({search, setSearchEvent, Data, upcoming}) => {
    const [searchValue, setSearch] = useState(null); 

    useEffect(() => {
        setSearch(null); 
        search(false); 
    }, [upcoming])
    
    const useSearch = e => {
        search(true);
        const eventData = Data.filter(value => {
            if(value.name.includes(searchValue)){
                return value; 
            }
            else if((searchValue === null) || (searchValue === "")){
                return value; 
            }
        })
        setSearchEvent(eventData); 
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
