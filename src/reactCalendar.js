import React, { useState } from 'react'; 
import Calendar from 'react-calendar'; 

const Cal = () => {
    const [date, setDate] = useState(new Date()); 

    const useChange = () => {
        return;
    }

    return (
        <div>
            <Calendar onChange={useChange} value={date}/>
        </div>
    )
}

export default Cal; 
