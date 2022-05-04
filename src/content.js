import { useParams } from 'react-router-dom'; 
import { HashRouter as Router, Switch, Route } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom'; 
import { useEffect, useRef, useState } from 'react'; 
import EventBottom from './event'; 
import VenueList from './venue'; 
import VenueForm from './venueForm'; 
import RawVenue from './rawVenue'; 
import RecentUser from './recentUser'; 
import Raw from './eventRaw'; 
import User from './ussr'; 
import Cal from './reactCalendar'; 
import Search from './search'; 
import Form from './form'; 
import RecentVenue from './recentVenue'; 
import Add from './add'; 
import Nav from './nav'; 
import UserForm from './userForm'; 
import EventRecentTop from './eventTop'; 
import 'react-calendar/dist/Calendar.css'; 
import './calendar.css'; 
import './content.css'; 
import './nav.css'; 

const Content = ({path}) => {
    const { username } = useParams();  
    const topLeftr = useRef(null); 
    const contentBottom = useRef(null); 
    const location = useLocation(); 
    const token = location.state.token;  
    const [formActive, setForm] = useState(false); 
    const [eventUpcoming, setUpcoming] = useState(true); 
    const [search, setSearch] = useState(false); 
    const [eventData, setEventData] = useState(null); 
    const [venueData, setVenueData] = useState(null); 
    const [searchData, setSearchData] = useState(null); 
    const [allEvent, setAllEvent] = useState(null); 
    const [rVenue, setRecentVenue] = useState(null); 
    const [rUser, setRecentUser] = useState(null); 
    const [add, setAdd] = useState(false); 
    const [attd, setAttdObject] = useState(null); 
    const [user, setUser] = useState(null); 
    const [detail, setDetail] = useState(null);
    const [venueDetail, setVenueDetail] = useState(null); 
    const [venueList, setVenueList] = useState(null)

    useEffect(() => {
        const topLeft = topLeftr.current; 
        if (!topLeft) return; 
        const meteor = function(pcs) {
            let width = topLeft.offsetWidth; 
            let height = topLeft.offsetHeight; 
            let speed = 2; 
            let init = 0; 
            for(let i = 0; i < pcs; i++) {
                const item = document.createElement("i"); 
                const h = Math.abs((Math.random() * (height - 1))/4); 
                topLeft.appendChild(item); 
                item.style.left = Math.abs(Math.random() * (width - 1)) + 'px';  
                item.style.height = h + 'px'; 
                item.style.width = h/13 + 'px';  
                speed += Math.random() * 1.2; 
                if(init > 4) {
                    speed = Math.random(); 
                }
                item.style.animationDuration = speed + 's'; 
            } 
        };
        meteor(65); 

    },[topLeftr]); 

    useEffect(() => {
        const ContentBottom = contentBottom.current; 
        if (!ContentBottom) return;
        ContentBottom.scrollTop = 0; 
    }, [contentBottom, eventUpcoming]); 

    const onScroll = function() {
        const bottom = document.querySelector(".bottom");  
        const search = document.querySelector(".bottom .search"); 
        const desc = document.querySelector(".content-description"); 
        if(desc !== null){
            if (bottom.scrollTop <= 70) {
                desc.style.top = '100px'; 
            }
            else {
                desc.style.top = bottom.scrollTop + 'px'; 
            }
        }
        else {
            if (bottom.scrollTop <= 70) {
                search.style.top = '80px'; 
            }
            else {
                search.style.top = bottom.scrollTop + 4 + 'px'; 
            }
        }
    }
    
    return (
        <Router>
        <div>
            {add && 
                <Switch>
                    <Route exact path={`/${username}/event`}>
                        <Form searchData={searchData} setSearchData={setSearchData} setEventData={setEventData} EventData={eventData} setAdd={setAdd} status={add} setForm={setForm} username={username} token={token}></Form>
                    </Route>
                    <Route exact path={`/${username}/venue`}>
                        <VenueForm setAdd={setAdd} token={token} Add={add}></VenueForm>
                    </Route>
                    <Route exact path={`/${username}/attendees`}>
                        <UserForm setAdd={setAdd} token={token} Add={add}></UserForm>
                    </Route>
                </Switch>
            }
            <div className="page">
                <Nav username={username} path={path}></Nav>
                <div className="content">
                    <div className="top">
                        <div className="left" ref={topLeftr}>
                            <div className="cal">
                                <h1 style={{fontFamily : ["Kalam", "cursive"]}}>Hello {username}!</h1>
                                <div className="calendar">
                                    <Cal></Cal>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <Route exact path={`/${username}/home`}>
                                <h2>Today Event</h2>
                                { (allEvent && venueData) && <EventRecentTop data={allEvent} venueObject={venueData}></EventRecentTop>}
                            </Route>
                            <Route exact path={`/${username}/event`}>
                                <Add setAdd={setAdd} title="Today Event"></Add>
                                { (allEvent && venueData) && <EventRecentTop data={allEvent} venueObject={venueData}></EventRecentTop>}
                            </Route>
                            <Route exact path={`/${username}/venue`}>
                                <Add setAdd={setAdd} title="Recent Venue"></Add>
                                {rVenue && <RecentVenue data={rVenue}></RecentVenue>}
                            </Route>
                            <Route exact path={`/${username}/attendees`}>
                                <Add setAdd={setAdd} title="Recent User"></Add>
                                <RecentUser data={rUser}></RecentUser>
                            </Route>
                        </div>
                    </div>
                    <div className="bottom" ref={contentBottom} id="bottom" onScroll={onScroll}>
                    <Switch>
                        <Route exact path={`/${username}/home`}>
                            <h1>Upcoming Event</h1>
                            <Search search={setSearch} setSearchEvent={setSearchData} Data={eventData} upcoming={true}></Search>
                            {!search && <EventBottom setAdd={setAdd} formActive={formActive} setData={setEventData} attribute={false} setUpcoming={setUpcoming} setVenueData={setVenueData} search={setSearch} token={token} setAttdObject={setAttdObject} upcoming={true} setUser={setUser} setDetail={setDetail} setDetailVenue={setVenueDetail} setAllEvent={setAllEvent} onScroll={onScroll}></EventBottom>}
                            {search && <Raw setEventData={setEventData} setData={null} setAdd={setAdd} data={searchData} venue={venueData} token={token} attribute={false}></Raw>}
                            {(searchData && !searchData.length) && <h2>No Data...</h2>}
                        </Route>
                        <Route exact path={`/${username}/event`}>
                            <h1>All Event</h1>
                            <Search search={setSearch} setSearchEvent={setSearchData} Data={eventData} upcoming={false}></Search>
                            {!search && <EventBottom setAdd={setAdd} formActive={formActive} setUpcoming={setUpcoming} setData={setEventData} attribute={true} setVenueData={setVenueData} token={token} setAttdObject={setAttdObject} upcoming={false} setUser={setUser} setDetail={setDetail} setDetailVenue={setVenueDetail} search={setSearch} setAllEvent={setAllEvent} onScroll={onScroll}></EventBottom>}
                            {search && <Raw eventData={eventData} setEventData={setEventData} setData={setSearchData} setAdd={setAdd} data={searchData} venue={venueData} token={token} attribute={true}></Raw>}
                            {(searchData && !searchData.length) && <h2>No Data...</h2>}
                        </Route>
                        <Route exact path={`/${username}/venue`}>
                            <h1>All Venue</h1>
                            <Search search={setSearch} setSearchEvent={setSearchData} Data={venueList} upcoming={false}></Search>
                            <VenueList token={token} setRV={setRecentVenue} Add={add} setAdd={setAdd} setVenueList={setVenueList}></VenueList>
                            {search && <RawVenue venueData={venueList} setVenueData={setVenueList} searchData={searchData} setSearchData={setSearchData} setAdd={setAdd} token={token}></RawVenue>}
                            {(searchData && !searchData.length) && <h2>No Data...</h2>}
                        </Route>
                        <Route exact path={`/${username}/attendees`}>
                            <h1>All Attendees</h1>
                            <Search search={setSearch} setSearchEvent={setSearchData} Data={eventData} upcoming={false}></Search>
                            <User token={token} setRU={setRecentUser} Add={add} setAdd={setAdd}></User>
                        </Route>
                    </Switch>
                    </div>
                </div>
            </div>
        </div>
        </Router>
    )
}

export default Content; 
