const RecentVenue = ({data}) => {
    return (
        <div className="today venue-recent">
        {
            data.map(object => {
                return (
                    <div className="recently">
                        <div className="image">
                            <img alt="" src={`https://planapp6-meisastrajayadi.cloud.okteto.net${object.image}`}/>
                        </div>
                        <div className="venue-recently-detail">
                            <h3>{object.name}</h3>
                            <label>{object.address}</label>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}

export default RecentVenue; 
