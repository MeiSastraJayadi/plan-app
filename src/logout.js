import { useHistory, withRouter } from 'react-router-dom'; 

const LogOut = ({ setLogOut, setToken, history }) => {

    const onNo = e => {
        console.log("No"); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
        setLogOut(false); 
        e.preventDefault(); 
    }

    const onYes = () => {
        setToken(null); 
        const page = document.querySelector(".page"); 
        page.classList.toggle("blur"); 
        setLogOut(false); 
        history.push('/plan-app'); 
    } 

    return (
    <div className="logout">
        <h3>Are You Sure Want to Logout?</h3>
        <div className="btn">
            <button onClick={ e => {onYes(); e.preventDefault()}}>Yes</button>
            <button onClick={onNo}>No</button>
        </div>
    </div>
    )
}

export default withRouter(LogOut);  
