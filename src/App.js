import Login from './login';
import SignUp from './signup';
import Content from './content'; 
import { useHistory } from 'react-router-dom'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

function App() {
    const history = useHistory();  
  return (
    <Router>
        <div className="App">
            <Switch>
                <Route exact path="/plan-app">
                    <Login></Login>
                </Route>
                <Route exact path="/plan-app/sign-up">
                    <SignUp></SignUp>
                </Route>
                <Route exact path="/:username/home">
                    <Content path="home" history={history}></Content>
                </Route>
                <Route exact path="/:username/event">
                    <Content path="event" history={history}></Content>
                </Route>
                <Route exact path="/:username/venue">
                    <Content path="venue" history={history}></Content>
                </Route>
                <Route exact path="/:username/attendees">
                    <Content path="attendees" history={history}></Content>
                </Route>
            </Switch>
        </div>
     </Router>
  );
}

export default App;
