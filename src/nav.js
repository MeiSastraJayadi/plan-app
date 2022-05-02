import { Link } from 'react-router-dom'
import './nav.css'; 

const Nav = ({username, path}) => {
    const select = (id) => {
        const item = document.querySelector(`#${id}`); 
        if(id !== "tgl") {
            const allA = document.querySelectorAll(".nav ul li a"); 
            allA.forEach(a => {
                a.classList.remove("active"); 
            })
            item.classList.add("active"); 
        } else {
            const nav = document.querySelector(".page .nav"); 
            item.classList.remove("active"); 
            item.classList.toggle("open"); 
            nav.classList.toggle("open"); 
        }
    }
    
    return (
        <div className="nav">
            <div className="toggle" id="tgl" onClick={() => select("tgl")}>
            </div>
            <ul>
                {path === "home" && <li><Link className="anchor active" id="home" onClick={() => select("home")} to={`/${username}/home`}><span className="icon"><ion-icon name="home-outline"></ion-icon></span><span className="text">Home</span></Link></li>}
                {path !== "home" && <li><Link className="anchor" id="home" onClick={() => select("home")} to={`/${username}/home`}><span className="icon"><ion-icon name="home-outline"></ion-icon></span><span className="text">Home</span></Link></li>}
                {path === "event" && <li><Link  className="anchor active" id="event"  onClick={() => select("event")} to={`/${username}/event`}><span className="icon"><ion-icon name="book-outline"></ion-icon></span><span className="text">Event</span></Link></li>}
                {path !== "event" && <li><Link  className="anchor" id="event"  onClick={() => select("event")} to={`/${username}/event`}><span className="icon"><ion-icon name="book-outline"></ion-icon></span><span className="text">Event</span></Link></li>}
                {path === "venue" && <li><Link className="anchor active" id="venue"  onClick={() => select("venue")} to={`/${username}/venue`}><span className="icon"><ion-icon name="location-outline"></ion-icon></span><span className="text">Venue</span></Link></li>}
                {path !== "venue" && <li><Link className="anchor" id="venue"  onClick={() => select("venue")} to={`/${username}/venue`}><span className="icon"><ion-icon name="location-outline"></ion-icon></span><span className="text">Venue</span></Link></li>}
                {path === "attendees" && <li><Link className="anchor active" id="attendees" onClick={() => select("attendees")} to={`/${username}/attendees`}><span className="icon"><ion-icon name="people-outline"></ion-icon></span><span className="text">Attendees</span></Link></li>}
                {path !== "attendees" && <li><Link className="anchor" id="attendees" onClick={() => select("attendees")} to={`/${username}/attendees`}><span className="icon"><ion-icon name="people-outline"></ion-icon></span><span className="text">Attendees</span></Link></li>}
                <li><a className="anchor" id="logout"  onClick={() => select("logout")} href="#"><span className="icon"><ion-icon name="log-out-outline"></ion-icon></span><span className="text">Logout</span></a></li>
            </ul>
        </div>
    )
}

export default Nav; 
