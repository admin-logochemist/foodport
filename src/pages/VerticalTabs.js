import * as React from 'react';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./DashboardTabs.css" ;
import { Link, useHistory } from "react-router-dom";
import test1 from "../images/test1.png"
import {db} from "../firebase"
import Profile from './Profile';
import FoodcartDetails from './Food-cartDetails'
import TableCell from './RestaurantCard'
import BoxSx from './RestaurentsDetails'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({name,email,phone,bname}) {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState("")
  const history = useHistory();

  function handleClick() {
    history.push("/addResturant");
  }
  
  function handleClickedd() {
    history.push("/addFood");
  }

  function handleClicked() {
    history.push("/addfoodcart");
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getProfile=()=>{
    db.collection('user').onSnapshot(snapshot=>(
     setUser(snapshot.docs.map(doc=>({
       data:doc.data()
     }
     ))) 
    ))
  };
  useEffect(() => {
    getProfile();
    
  }, [])

  return (
    <div className="Dashboard-Tabs" style={{backgroundColor:'white' ,width:'100%'}}>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="Width"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
        <Tab label="Profile" {...a11yProps(1)} />
        <Tab label="Restaurants" {...a11yProps(2)} />
        <Tab label="Foodcart" {...a11yProps(3)} />
      </Tabs>
      <div style={{ }}>
        <TabPanel value={value} index={0}>
          <div >
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <div classname="Dashboard-box">
                <h1 style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Dashboard</h1>
                <h2 style={{ fontWeight: 'bold' }}>Welcome to Dashboard</h2>
              </div>
              <div className="btn-one">
                <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2, marginLeft: 300 }} onClick={()=>{handleClicked()}}>Add FoodCart</button>
                <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2 }} onClick={()=>{handleClick()}}>Add Restaurents</button>
              </div>
            </div>
            <div style={{ backgroundColor: '#f8f8f8',display: 'flex', justifyContent: 'space-evenly' }}>
            {/* <div style={{  }}>
              <p style={{ fontWeight: 'bold', padding: 30 }}>Advance filters</p>
            </div> */}
            {/* <div>
            <form style={{ padding: 25 }}>
                  <label>
                    Date
                    <input type="text" name="name" />
                  </label>
                </form>
            </div> */}
            {/* <div>
            <form style={{ padding: 25 }}>
                  <label>
                    Type
                    <input type="text" name="name" />
                  </label>
                </form>
              </div> */}
            </div>
          </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
     <Profile/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <div classname="Dashboard-box">
                <h1 style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Dashboard</h1>
                <h2 style={{ fontWeight: 'bold' }}>Your Restaurants</h2>
              </div>
              <div className="btn-one">
                <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2, marginLeft: 400 }} onClick={()=>{handleClickedd()}}>Add FoodItem</button>
                {/* <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2 }} onClick={()=>{handleClick()}}>Add Restaurents</button> */}
              </div>
            </div>
            <div style={{ backgroundColor: '#f8f8f8',display: 'flex', justifyContent: 'space-evenly' }}>
            </div>
            <br/>
            <br/>
                  <BoxSx/>
            {/* <TableCell/> */}
          </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <div classname="Dashboard-box">
                <h1 style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Dashboard</h1>
                <h2 style={{ fontWeight: 'bold' }}>Your FoodCart</h2>
              </div>
              <div className="btn-one">
                <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2, marginLeft: 400 }} onClick={()=>{handleClickedd()}}>Add FoodItem</button>
                {/* <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2 }} onClick={()=>{handleClick()}}>Add Restaurents</button> */}
              </div>
            </div>
            <div style={{ backgroundColor: '#f8f8f8',display: 'flex', justifyContent: 'space-evenly' }}>
            </div>
            <br/>
            <br/>
                  <FoodcartDetails/>
            {/* <TableCell/> */}
          </div>
      </TabPanel>
      </div>
    </Box>
    </div>
  );
} 