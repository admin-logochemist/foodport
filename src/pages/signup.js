import React, { useState } from 'react'
import "./signup.css"
import { login } from '../features/UserSlice'
import { auth, db } from '../firebase'
import {  useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import emailpic from '../email.png'
import logo from './logo1.png'
import back from './backgrouds.jpg'
import lock from './password.png'
import phones from './phone.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import signin from './signin.png'
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
        <div className="form_img" style={{backgroundImage: `url(${back})`}}>
 <div class="main_from form form_secd">
        <div class="upper_div"></div>    
    </div>
    <form>
    <center className="center_img">

  <img src={logo} alt='hj'/>

  </center>
  <div className="row justify-content-center form_rows form_secd">
  <div className="col-lg-10">
  <h3 className="text-center">Registration</h3>
  <br/>
  <br/>
  <div class="icons_group icons_groups">
  <img src={signin} alt='asd' className='as' />
  <input className="form-control" value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
  </div>
  <br/>
  <div className="icons_group icons_groups">
  <img src={phones} alt='as' className='df'/>
  <input className="form-control" value={phone} type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
  </div>
  <br/>
  <div className="icons_group icons_groups">
  <img src={emailpic} alt='a' className='gh'/>
  <input className="form-control" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />    
  </div>
  <br/>
  <div className="icons_group icons_groups">
  <img src={lock} alt='asdf' className='jk' />
  <input className="form-control" value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> 
  </div>
  <br/>
  <select name="UserType" className="form-control" id="usertype" value={select} onChange={handleCapacity}>
                           <option disabled selected>User Type</option>
                           <option value="user"> User</option>
                           <option value="business"> Business</option>
                       </select>
                       {select==="business"&& 
                       
                       <input type="text" className="form-control" placeholder="BName" onChange={(e) => setBName(e.target.value)}/>
                       }
                        {select==="user"&& 
                       <input type="text" className="form-control" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>}
                        {/* <input style={{ height: 45 }} value={bname} type="text" placeholder="BuisnessName" onChange={(e) => setBName(e.target.value)} /> */}
                        
                        <br/>
                        <button class="form_btns"onClick={register}>ReGISTER</button> 
                       
                        </div>
                        </div>
    </form>
        </div>
    )
}

export default SignUp;
