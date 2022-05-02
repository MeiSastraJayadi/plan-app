const RecentUser = ({ data }) => {
    return (
        <div className="attendees-recent">
            {!data && <h4>No Data...</h4>}
            {data && 
                data.map(object => (
                    <div className="object">
                        <div className="object-action">
                            <button className="object-action-add"><ion-icon name="pencil-outline"></ion-icon></button>
                            <button className="object-action-delete"><ion-icon name="trash-outline"></ion-icon></button>
                        </div>
                        <div className="object-detail">
                            <h3>{`${object.first_name} ${object.last_name}`}</h3>
                            <label>Phone : {object.phone}</label><br/>
                            <label>Email : {object.email}</label>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RecentUser; 
