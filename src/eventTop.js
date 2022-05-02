const EventRecentTop = ({data, venueObject}) => {
    return (
        <div className="today">
        {data.map(value => {
            return (
                <div className="today-event">
                    <h3>{ value.name }</h3>
                    <div className="detail">
                        <label className="venue">{ venueObject[value.venue] }</label>
                        <label className="time">{ (new Date(value.day)).toDateString() }</label>
                    </div>
                </div>
            )

        })}
        </div>
    )
}

export default EventRecentTop; 
