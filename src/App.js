import Login from './login';
import SignUp from './signup';
import Content from './content'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

function App() {
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
                <Route exact path="/plan-app/:username/home">
                    <Content path="home"></Content>
                </Route>
                <Route exact path="/plan-app/:username/event">
                    <Content path="event"></Content>
                </Route>
                <Route exact path="/plan-app/:username/venue">
                    <Content path="venue"></Content>
                </Route>
                <Route exact path="/plan-app/:username/attendees">
                    <Content path="attendees"></Content>
                </Route>
            </Switch>
        </div>
     </Router>
  );
}

export default App;
