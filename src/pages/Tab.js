import * as React from 'react';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./tabsstyle.css"
import ResturantInfo from './ResturantInfo';
import { db } from '../firebase';
import useGeoLocation from '../hooks/useGeolocation';

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTab(item, address) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [resturant, setResturants] = useState([]);
  const [resturantb, setResturantb] = useState([]);
  const [details, setDetails] = useState(null);
  const [foodcart, setfoodcart] = useState([]);
  useEffect(() => {
    getUserGeolocationDetails()
  }, [])
  const getUserGeolocationDetails = () => {
    const data = "Karachi, KHI, Pakistan"
    fetch(
      "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    )
      .then(response => response.json())
      .then(data => { console.log('data', data); setDetails(data) });
  };

  const getResturants = () => {
    db.collection('resturant').where('type', '==', "Big Chain Resturant").onSnapshot(snapshot => {
      console.log('Big Chain Resturant', snapshot)
      setResturants(snapshot.docs.map(doc => ({
        _id: doc.id, ...doc.data()
      }
      )))
    })
  };

  const getFoodCart = () => {
    db.collection('foodcart').where('address', '==', { address }).onSnapshot(snapshot => (
      setfoodcart(snapshot.docs.map(doc => ({
        _id: doc.id, ...doc.data()
      }
      )))
    ))
  };
  const getResturant = () => {
    console.log('Local getResturant')
    db.collection('resturant').where('type', '==', "Local Resturant").onSnapshot(snapshot => {
      console.log('Local Resturant', snapshot)
      setResturantb(snapshot.docs.map(doc => ({
        _id: doc.id, ...doc.data()
      }
      )))
    })
  };
  useEffect(() => {
    console.log('??hangr in detail')
    if (details && Object.keys(details).length) {
      getResturants();
      getResturant();
      getFoodCart();
    }

  }, [details])
  const renderResturants = () => {
    if (resturantb && resturantb?.length) {
      async function trying(url) {
        let image = await url.then(async (url) => { return url })
        console.log('image', image)
        return image.toString()
      }
      // console.log('state', img)
      return resturantb.map((item, index) => {
        return <ResturantInfo
          obj={item}
        />
        // var detail = []
        // console.log("??", item)
        // for (const i in item) {
        //   detail.push(item[i])
        // }
        //   return detail.map((item) => {
        //     // const storageRef = projectStorage.ref(`images/${item.id}/`).getDownloadURL();
        //     { console.log('resturant', resturant) }
        //     return (

        //       <BoxSx
        //         resname={item.resName}
        //       />
        //     );
        //   })
      })
    }
  };
  const renderResturant = () => {
    if (resturant && resturant?.length) {
      async function trying(url) {
        let image = await url.then(async (url) => { return url })
        console.log('image', image)
        return image.toString()
      }
      // console.log('state', img)
      return resturant.map((item, index) => {
        return <ResturantInfo
          obj={item}
        />
        // var detail = []
        // console.log("??", item)
        // for (const i in item) {
        //   detail.push(item[i])
        // }
        //   return detail.map((item) => {
        //     // const storageRef = projectStorage.ref(`images/${item.id}/`).getDownloadURL();
        //     { console.log('resturant', resturant) }
        //     return (

        //       <BoxSx
        //         resname={item.resName}
        //       />
        //     );
        //   })
      })
    }
  };
  const renderFoodCart = () => {
    if (foodcart && foodcart?.length) {
      async function trying(url) {
        let image = await url.then(async (url) => { return url })
        console.log('image', image)
        return image.toString()
      }
      // console.log('state', img)
      return foodcart.map((item, index) => {
        return <ResturantInfo
          obj={item}
        />
        // var detail = []
        // console.log("??", item)
        // for (const i in item) {
        //   detail.push(item[i])
        // }
        //   return detail.map((item) => {
        //     // const storageRef = projectStorage.ref(`images/${item.id}/`).getDownloadURL();
        //     { console.log('resturant', resturant) }
        //     return (

        //       <BoxSx
        //         resname={item.resName}
        //       />
        //     );
        //   })
      })
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };



  const location = useGeoLocation();
  return (
    <div className="tabs">
      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
        <AppBar position="static">
          <Tabs className="main-tabs"
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="Width"
            aria-label="full width tabs example"
            centered
          >
            <Tab className="labels" label="Food Trucks" {...a11yProps(0)} />
            <Tab className="labels" label="Local Resturants" {...a11yProps(1)} />
            <Tab className="labels" label="BigChain Restaurants" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="Tabpanel12">
              {renderFoodCart()}

            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="Tabpanel12">
              {renderResturants()}

            </div>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="Tabpanel12">

              {renderResturant()}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}