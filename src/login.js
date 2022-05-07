import { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import './login.css';
import planapp from './planapp.png';
import waveHaikei from './waveHaikei.svg';


const loginFunction = function(url, history, userData, setToken, setError, setPending) {
    const name = userData.username; 
    fetch(url, {
        method : "POST", 
        headers : { 
            "Content-Type" : "application/json",
            //"Access-Control-Allow-Origin" : "*", 
            //"Access-Control-Allow-Credential" : "true", 
            //"Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,HEAD,OPTIONS",
            //"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            }, 
        body : JSON.stringify(userData) 
        })
        .then(value => {
            if(value.ok){
                return value.json(); 
            }
            return Promise.reject(value);
        }) 
        .then(data => {
            const token = data.token; 
            setToken(token);
            setError(false); 
            setPending(false); 
            history.push(`/${name}/home`, {token : token}); 
        })
        .catch(error => {
            setPending(false);
            setError(true);
        });
}

const Login = function() {
    const [nameVal, setName] = useState("");
    const [passVal, setPassword] = useState(null);
    const [tokenVal, setToken] = useState(""); 
    const [isPending, setPending] = useState(false); 
    const [isError, setError] = useState(false); 
    const history = useHistory(); 
    const loginData = {username : nameVal, password : passVal}; 
    const url = `https://planapp6-meisastrajayadi.cloud.okteto.net/register_api/user_login`

    return (
            <div className="form-box">
                <div className="side-left">
                    <div className="ttl left">
                        <h1>Welcome to PlanApp...</h1>
                    </div>
                    <img src={planapp} alt="planapp-ilustration"/>
                    <div className="par">
                        <p style={{fontFamily : ['Kalam', 'cursive']}}>
                        With PlanApp You Can Make and Manage Your Own Plan. 
                        Lets Login And Getting Start {tokenVal}
                        </p>
                    </div>
                </div>
                <div className="middle">
                    <img src={waveHaikei} alt="wave"/>
                </div>
                <div className="side-right">
                    <div className="form">
                        <div className="ttl">
                            <h1>LOGIN</h1>
                        </div>
                            <form onSubmit={function(e) {
                                setPending(true); 
                                loginFunction(url, history, loginData, setToken, setError, setPending);
                                e.preventDefault();
                            }}>
                            <div className="inp">
                                <label>Username</label><br/>
                                <input type="text" placeholder="username" value={nameVal} onChange={e => setName(e.target.value)} required/><br/>
                            </div>
                            <div className="inp">
                                <label>Password</label><br/>
                                <input type="password" placeholder="password" value={passVal} onChange={e => setPassword(e.target.value)} required/><br/>
                            </div>
                            <div style={{textAlign : "center", paddingTop : "10px"}}>
                                {isError && <label className="error" style={{color : "#ff0000"}}>Credential Error</label>}
                            </div>
                            <div className="btn">
                                {isPending && <button style={{fontSize : '18px'}}disabled>Checking Credential...</button>}
                                {!isPending && <button>Login</button>}
                            </div>
                        </form>
                        <div className="submit">
                            <p>Create New Account | <a href="/plan-app/sign-up">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Login; 
export { loginFunction }; 
