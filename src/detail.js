const Detail = ({data, venue, attnd, isReady}) => {
    const onClick = () => {
        const bottom = document.querySelector("#bottom"); 
        const description = document.querySelector(".content-description"); 
        const search = document.querySelector(".search"); 
        if(bottom.scrollTop > 70){
            search.style.top = bottom.scrollTop + 4 + 'px'; 
        }
        description.classList.remove("active"); 
        isReady(false); 
    }


    return (
        <div className="content-description">
            <div className="data-title">
                <h3>{ data.name }</h3>
                <label>{venue}</label><br/>
                <label>Time : { (new Date(data.day)).toString() }</label><br/>
                <label>Attendees : 
                    <ul>
                        {data.attendees.map(value => <li>{ attnd[value] }</li>)}
                    </ul>
                </label>
            </div>
            <div className="content-detail">
                <p>
                    {data.description}
                </p>
            </div>
            <div className="btn">
                <button onClick={onClick}>Close</button>
            </div>
        </div>
    )
}

export default Detail; 
