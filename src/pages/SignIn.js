import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import "./signup.css"
import { login, logout } from '../features/UserSlice'
import SocialIcon from 'react-social-icons'
import { auth, provider } from '../firebase'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import Home from './home'
import SigninImage from '../images/panda.png'
import logo from './logo1.png'
import back from './backgrouds.jpg'
import lock from './password.png'
import signin from './signin.png'
import 'bootstrap/dist/css/bootstrap.min.css';
function SignIn(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          isLogin: true,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
        }))
     
      } else {
        dispatch(logout)
      }
    })
  }, [])
  const logintoApp = (e) => {
    auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
      dispatch(login({
        email: userAuth.user.email,
        uid: userAuth.user.uid,
        displayName: userAuth.user.displayName,
      }))
    })
    history.push('/dashboard')
  }
  function handleClick() {
    history.push("/SignUp");
  }
  return (
<div className="form_img" style={{backgroundImage: `url(${back})`}}>
<div className="main_from">
<div className="upper_div"></div>
</div>
<form>
  <center>
  <img src={logo}/>

  </center>
  <div className="row justify-content-center form_row">
  <div className="col-lg-10">
  <h3 className="text-center"> Sign In</h3>
                    <br/>
                    <br/>
                    <div className="icons_group">
                   <img src={signin}/>
                   <input className="form-control" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                 <br/>
                    <div class="icons_group secd">
                        <img src={lock}/>
                        <input className="form-control" value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br/>
                    <br/> <br/>                   
                    <button className="form_btns" onClick={()=>logintoApp()}>LOGIN</button> 
                 
                    <div className="btns-div">Not a Member?  <button className="form_btns" onClick={() => handleClick()}>Register Now</button></div>
  </div>
  </div>
</form>
</div>

  )
}

export default SignIn
