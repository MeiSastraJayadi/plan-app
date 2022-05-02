import { useState, useEffect } from 'react'; 

const useFetch = (url, token, upcoming, add, Delete) => {
    const [data, setData] = useState(null); 
    const [pending, setPending] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {
        const abort = new AbortController(); 
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
                setData(json); 
                console.log(data); 
                setPending(false); 
                console.log("Its all Fine"); 
            })
            .catch(e => {
                console.log(e.name); 
                console.log(data); 
                console.log(`Error to fetch ${url}`); 
                setError("Bad Request"); 
            })
        return () => abort.abort(); 
    },[url, token, error, upcoming, add, Delete])
    return { data, pending, error };
}

export default useFetch; 
