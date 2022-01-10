
import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import List from "@material-ui/core/List";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { Card } from 'reactstrap'
import { Route, Switch } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Profile from './Profile'
import { login, logout } from '../features/UserSlice'
import { useDispatch } from 'react-redux'
import Restaurant from './Restaurant';
import FoodCart from './FoodCart';
import { useHistory } from 'react-router-dom'
import Orderss from './Orderss';
import { AiOutlineLogout } from "react-icons/ai";
import { selectUser, userSlice } from '../features/UserSlice';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import "./Dash.css"
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 25,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

const sideBarItems = [
  { name: 'Home', links: '/dashboard', icon: <DashboardIcon /> },
  { name: 'Profile', links: '/profile', icon: <AccountCircleIcon /> },
  { name: 'Resturants', links: '/restaurants', icon: <RestaurantIcon/> },
  { name: 'FoodCart', links: '/Foodcart', icon: <LocalShippingIcon/> },
  { name: 'Orders', links: '/Orderss', icon: <BookmarkBorderIcon/> },
]

export default function Sidebars() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(1000)
  const user= useSelector(selectUser)
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDrawerToggle = () => {
    setOpen(!open);
  }
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout())
      history.push('/MainLogin')
    })

  }
  useEffect(() => {

    window.addEventListener('resize', () => {
      // console.log(window.outerWidth)
      setScreenSize(window.outerWidth)
      if (screenSize <= 768) setOpen(false)
    })
    return () => {
    }
  }, [open])

  // if (props)

  const Component = ({ match }) => {
    // console.log(match.params.loc)
    var comp = match.params.loc
    // if (comp === 'Feed')
    //   return (of
    //     // <MyReferals />
    //     <Feed />
    //   )
    if (comp === 'Profile')
      return (
        <Profile/>
      )
    else if (comp === 'Resturants')
      return (
   <Restaurant/>     
      )
    else if (comp === 'FoodCart')
      return (
        <FoodCart/>
      )
   
      else if (comp === 'Orders')
      return (
        <Orderss/>
      )
   
    // else if (comp === 'MyPlans')
    //   return (
    //     // <MyPlans />

    //   )
    // else if (comp === 'Profile')
    //   return (
    //     // <Profile />
    //     ''
    //   )
    // else if (comp === 'ProfileEdit')
    //   return (
    //     // <ProfileEdit />
    //     ''
    //   )
    // else if (comp === 'Checkout')
    //   return (
    //     // <Checkout />
    //     ''
    //   )
  }

  return (
    <>
      <div className="col-11 pt-5 pl-5 ml-5 mt-5">
        <CssBaseline />
        <div>
          <AppBar position="fixed"  className={classes.appBar}>
            <Toolbar style={{ backgroundColor: 'white' }} >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() =>  handleDrawerToggle()}
                edge="start"
                className={clsx(classes.menuButton)}
              >
                <MenuIcon style={{ color: screenSize <= 768 ? '#ccc' : '#cc6c2c' }} />
              </IconButton >
            <h5>Hi {user?.displayName}</h5>
            <AiOutlineLogout className='back_icon_svg'  onClick={() => signOut()} />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            {/* <Toolbar />
              <Toolbar /> */}
            <div className={classes.drawerContainer} style={{ marginTop: screenSize <= 430 ? 142 : 88 }} >
              <Divider />
              {sideBarItems.map((item, index) => {
                var active = window.location.pathname
                // console.log(active === item.links, active, item.links)
                return (
                  <List style={{ color: "#cc6c2c", backgroundColor: active === item.links ? '#cc6c2c' : '#fff' }}>
                    <Link to={item.links} style={{ textDecoration: 'none' }}  >
                      <ListItem
                        button
                      >
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} style={{ color: active === item.links ? '#fff' : "#cc6c2c", textDecorationStyle: 'none' }} />
                      </ListItem>
                    </Link>
                  </List>
                )
              })}

              {/* <List>
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Widthdrawls"} />
                </ListItem>
              </List> */}

            </div>
          </Drawer>
        </div>
        <main className={classes.content}>
         
        </main>
      </div >
    </>
  )
}

