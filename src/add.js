const Add = ({setAdd, title}) => {
    const onClick = e => {
        setAdd("create"); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
        e.preventDefault(); 
    }

    return (
        <div className="add-recent-box">
            <h2>{title}</h2>
            <button onClick={onClick}><ion-icon name="add-circle-outline"></ion-icon></button>
        </div>
    ) 
}

export default Add; 
