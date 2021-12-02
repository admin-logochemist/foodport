import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import "./signup.css"
import { login } from '../features/UserSlice'
import { auth, db, provider } from '../firebase'
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { SocialIcon } from 'react-social-icons';
import SignupImage from '../images/panda.png'
function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [bname, setBName] = useState("");
    const [address, setAddress] = useState("")
    const [select,setSelect]= React.useState();
    const dispatch = useDispatch();
    const history = useHistory();
    const register = (props) => {
     
        auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                usertype:select
            }).then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    usrtype:select
                }))
            })
        })
        history.push('./signin')

        db.collection('user').add(
            {
                name: name,
                phone: phone,
                email: email,
                bname: bname,
                usertype:select,
                address:address,

            }
        )
    }
    const handleCapacity=(e)=>{
        setSelect(e.target.value);
       
      }
    return (
        <div>
            <div className="login">

                <div className="login__container">
                    {/* <img src="data:image/png;base64,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" className="logo" />               */}
                    <h1>SignUp</h1>
                    <form style={{
                        width: 350,
                    }}>

                        <input style={{ height: 45 }} value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        <input style={{ height: 45 }} value={phone} type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                        <input style={{ height: 45 }} value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input style={{ height: 45 }} value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                       <select name="UserType" id="usertype" value={select} onChange={handleCapacity}>
                           <option disabled selected>User Type</option>
                           <option value="user"> User</option>
                           <option value="business"> Business</option>
                       </select>
                       {select==="business"&& 
                       <input type="text" placeholder="Name" onChange={(e) => setBName(e.target.value)}/>}
                        {select==="user"&& 
                       <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>}
                        {/* <input style={{ height: 45 }} value={bname} type="text" placeholder="BuisnessName" onChange={(e) => setBName(e.target.value)} /> */}


                        <Button style={{
                            backgroundColor: '#d70000'
                        }} onClick={register}>LOGIN</Button>
                        <div className="divider" />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 5
                        }}>
                            {/* <SocialIcon url="https://twitter.com/" />
                            <SocialIcon url="https://facebook.com/" /> */}
                        </div>
                        <p>Already a Member <button className="register-btn" onClick={() => history.push('./SignIn')}>Sign In Now</button></p>

                    </form>
                    {/* <Button variant="contained" color="danger" onClick={signin}>SIGN UP WITH GOOGLE</Button> */}

                </div>
                <div className="Signup-Image">
                    <div className="sign-up-image">
                        <img src={SignupImage} />
                    </div>
                </div>
            </div>
            <div className="copyright-login">
                <h1>Copyright 2020.All rights reserved.</h1>
            </div>
        </div>
    )
}

export default SignUp;
