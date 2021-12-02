import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
NavLogo,
} from './NavbarElements';
import { useSelector,useDispatch } from 'react-redux';
import "./NavbarElements.css"
import { logout, selectUser } from '../../features/UserSlice';
import { auth } from '../../firebase';
import logo from '../../images/logologo.png'
import { Link, useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { selectItems } from '../../features/BasketSlice';
const Navbar = () => {
    const user =useSelector(selectUser);
    const [itemCount, setItemCount] = React.useState(0);
    const history=useHistory();
    const  dispatch = useDispatch();
    const items=useSelector(selectItems)
    const signOut=()=>{
        auth.signOut().then(()=>{
            dispatch(logout())
            history.push("/MainLogin");
        })
    }
    function handleClick() {
        history.push("/");
      }
      function handletheClick() {
        history.push("/SignUp");
      }
    return (
        <>
           <Nav style={{ cursor: 'pointer' }}>
           
            <img className="logo-png" src={logo} onClick={() => handleClick()}/>
            {/* <Bars /> */}
            <div className="Mobile-layout">
            <a href="/">HOME</a>
            <a href="/contact">CONTACT</a>
            <a href="/MainLogin">LOGIN</a>
            </div>
            <NavMenu>
                <NavLink to="/" activeStyle>
                    HOME
                </NavLink>
                <NavLink to="/contact" activeStyle>
                    CONTACT
                </NavLink>
                
                <div style={{marginRight:10}} onClick={signOut} activeStyle>
                    <span>{user? "LOGOUT":"LOGIN"}</span>
                </div>
                <button className="btn-main-nav" onClick={() => handletheClick()}>BECOME A PARTNER</button>
                    <Badge color="secondary" badgeContent={itemCount}>
                        <div style={{ color: '#d70000', marginLeft: 10 }}>
                        <ShoppingCartIcon  onClick={()=>{history.push('Checkout')}}/>
                        {items.length}
                        </div>
                    </Badge>
            </NavMenu> 
           </Nav> 
        </>
);
};

export default Navbar;