import './signup.css'; 
import { useState } from 'react'; 

const SignUp = () => {
    const [username, setName] = useState(""); 
    const [password1, setPas1] = useState(""); 
    const [password2, setPas2] = useState(""); 
    const [tokenVal, setToken] = useState(""); 
    const [isPending, setPending] = useState(false); 
    const [isError, setError] = useState(false); 
    const data = {username : username, password : password1, password2 : password2}; 
    const url = `https://planapp6-meisastrajayadi.cloud.okteto.net/register_api/register`
    
    const Sign = (url, data) => {
        fetch(url, {
            method : "POST", 
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify(data)
        })
        .then(value => {
            if(value.ok){
                return value.json(); 
            }
            else {
                return Promise.reject(value); 
            }
        }) 
        .then(response => response.token)
        .then(token => {
            setToken(token); 
            setPending(false); 
            setError(false); 
        })
        .catch(e => {
            setPending(false); 
            setError(true);
        })
    }

    return (
        <div className="sign-box">
            <div className="form">
                <div className="ttl">
                    <h1>SIGN UP</h1>
                </div>
                <form onSubmit={e => {
                    setPending(true); 
                    Sign(url, data);
                    e.preventDefault(); 
                }}>
                    <div className="attr">
                        <label>Username</label><br/>
                        <input type="text" placeholder="username" onChange={e => {setName(e.target.value)}} required/>
                    </div>
                    <div className="attr">
                        <label>Password</label><br/>
                        <input type="password" placeholder="password 1" onChange={e => {setPas1(e.target.value)}} required/>
                    </div>
                    <div className="attr ps2">
                        <label>Valid Password</label><br/>
                        <input type="password" placeholder="password 2" onChange={e => {setPas2(e.target.value)}} required/>
                    </div>
                    <div style={{textAlign : "center"}}>
                        {isError && <label style={{color : "#ff0000"}}>Credential Error</label>}
                    </div>
                    <div className="btn">
                        {isPending && <button style={{fontSize : '18px'}}disabled>Checking Credential...</button>}
                        {!isPending && <button>Login</button>}
                    </div>
                </form>
            </div>
        </div>
    ); 
}

export default SignUp; 
