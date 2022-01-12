import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import logo from '../../images/logologo.png'
import "./NavbarElements.css"
import { selectItems } from '../../features/BasketSlice';
import { Avatar } from '@material-ui/core';
import { logout, selectUser } from '../../features/UserSlice';
import { auth } from '../../firebase';
import { useHistory } from "react-router-dom";

export default function Navbar() {
    const user =useSelector(selectUser);
  
    const history=useHistory();
    const  dispatch = useDispatch();
    const items=useSelector(selectItems)
    const goorder=()=>{
history.push("/orders")
    }
    const signOut=()=>{
        auth.signOut().then(()=>{
            dispatch(logout())
            history.push("/MainLogin");
        })
    }
    function handleClicks() {
        history.push("/contact");
      }
    function handleClick() {
        history.push("/");
      }
      function handletheClickss() {
        history.push("/SignUp");
      }
      function handletheClick() {
        history.push("/Checkout");
      }
    return (
        <nav>
        <div className="wrapper">
            <div className="logoasheader"><a href="/"><img src={logo} alt="" height="81px" /></a></div>
            <input type="radio" name="slider" id="menu-btn" />
            <input type="radio" name="slider" id="close-btn" />
            <ul className="nav-links">
                <label for="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                <li onClick={handleClick}><a >Home</a></li>
                <li onClick={handleClicks}><a>Contact</a></li>
                <li onClick={goorder}><a >{user? "YOUR ORDERS":""}</a></li>
                <li  onClick={signOut}><a  X>{user? "LOGOUT":"LOGIN"}</a></li>
                <li onClick={handletheClickss}><a  className='foodport_partner'>BECOME A PARTNER</a></li>
                <li onClick={handletheClick}><a><i class="fas fa-shopping-cart"></i> {items.length}</a></li>
                {/* <li className='user_icon'></li> */}
                <li className='header_user_icon'>{user? `Hi ${user?.displayName}`:<Avatar/>}</li>
            </ul>
              
            <label for="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
        </div>
    </nav>
    )
};
