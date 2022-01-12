import { IconButton } from '@material-ui/core'
import { Button } from 'antd'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import logo from '../images/logologo.png'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import "./ResNavbar.css"
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
function ResNavbar() {
    return (
        <div class="site-header">
           
  <div class="wrapper site-header__wrapper">
    <a href="#" class="brand"><img src={logo} alt="brand" /></a>
  
    <div class="searchs">
        <div className='searchmenu'>
        <input type="text" className='inputtext' placeholder='Your FoodItem' />
        <input type="text" className='inputtext' placeholder='Your Location'/>
     
        <Button className='btnsearch'><FaSearch/></Button>
        </div>
        <div className="inpurmenu">
            <ul className='foodmegamenu'>
                <li className='foodmegalist'>
                    
                   <RestaurantIcon/> Resturants
                  
                </li>
                <li className='foodmegalist'>
                   <DinnerDiningIcon/>FoodCart
                </li>
            </ul>
        </div>
    </div>
  </div>
 
    <div >
    <IconButton>
        <span style={{fontSize:15}}>For Buisness</span>
        </IconButton>
        <IconButton>
        <span style={{fontSize:15}}>Write a Review</span>
        </IconButton>
      
        <Button className='btnsearches'>LOGIN</Button>
         <Button className='btnsearch'>SiGNUP</Button>
    </div>

        </div>
    )
}

export default ResNavbar
